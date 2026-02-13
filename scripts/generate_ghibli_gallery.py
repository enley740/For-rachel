#!/usr/bin/env python3
"""
Batch-transform couple photos into Ghibli-style images with OpenAI.

Usage:
  export OPENAI_API_KEY="..."
  python3 scripts/generate_ghibli_gallery.py
"""

from __future__ import annotations

import argparse
import base64
import json
import os
import sys
from pathlib import Path
from urllib.parse import quote
from urllib.error import HTTPError
from urllib.request import Request, urlopen

from openai import OpenAI
from PIL import Image
import pillow_heif


pillow_heif.register_heif_opener()


def parse_args() -> argparse.Namespace:
  parser = argparse.ArgumentParser(description="Generate Ghibli-style gallery images.")
  parser.add_argument(
    "--input-dir",
    default="couple-pics",
    help="Folder containing source images (HEIC/PNG/JPG).",
  )
  parser.add_argument(
    "--output-dir",
    default="couple-pics-ghibli",
    help="Folder for generated images and manifest.json.",
  )
  parser.add_argument(
    "--model",
    default="gpt-image-1.5",
    help="OpenAI image edit model (default: gpt-image-1.5).",
  )
  parser.add_argument(
    "--prompt",
    default="animate in the style of studio ghibli",
    help="Prompt passed to OpenAI image edit API.",
  )
  parser.add_argument(
    "--overwrite",
    action="store_true",
    help="Regenerate files even if output already exists.",
  )
  return parser.parse_args()


def discover_images(input_dir: Path) -> list[Path]:
  exts = {".heic", ".heif", ".jpg", ".jpeg", ".png", ".webp"}
  return sorted([p for p in input_dir.iterdir() if p.is_file() and p.suffix.lower() in exts])


def to_png_bytes(path: Path) -> bytes:
  with Image.open(path) as img:
    rgb = img.convert("RGB")
    from io import BytesIO

    buff = BytesIO()
    rgb.save(buff, format="PNG")
    return buff.getvalue()


def generate_image(client: OpenAI, source_png_bytes: bytes, prompt: str, model: str) -> bytes:
  from io import BytesIO

  # GPT image models use the newer `images[]` input format with data URLs.
  if model.startswith("gpt-image") or model == "chatgpt-image-latest":
    api_key = os.environ.get("OPENAI_API_KEY")
    if not api_key:
      raise RuntimeError("OPENAI_API_KEY is not set.")
    data_url = f"data:image/png;base64,{base64.b64encode(source_png_bytes).decode('utf-8')}"
    payload = {
      "model": model,
      "images": [{"image_url": data_url}],
      "prompt": prompt,
      "size": "1024x1024",
      "quality": "high",
    }
    body = json.dumps(payload).encode("utf-8")
    req = Request(
      "https://api.openai.com/v1/images/edits",
      data=body,
      headers={
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json",
      },
      method="POST",
    )
    try:
      with urlopen(req) as resp:
        response = json.loads(resp.read().decode("utf-8"))
    except HTTPError as exc:
      try:
        error_body = exc.read().decode("utf-8")
      except Exception:  # noqa: BLE001
        error_body = str(exc)
      raise RuntimeError(f"HTTP {exc.code}: {error_body}") from exc
    if not response.get("data") or not response["data"][0].get("b64_json"):
      raise RuntimeError(f"Unexpected API response: {response}")
    b64_data = response["data"][0]["b64_json"]
  else:
    response_obj = client.images.edit(
      model=model,
      image=BytesIO(source_png_bytes),
      prompt=prompt,
      size="1024x1024",
      response_format="b64_json",
    )
    b64_data = response_obj.data[0].b64_json
  return base64.b64decode(b64_data)


def main() -> int:
  args = parse_args()
  input_dir = Path(args.input_dir).resolve()
  output_dir = Path(args.output_dir).resolve()
  output_dir.mkdir(parents=True, exist_ok=True)

  if not input_dir.exists():
    print(f"Input folder does not exist: {input_dir}", file=sys.stderr)
    return 1

  sources = discover_images(input_dir)
  if not sources:
    print(f"No supported images found in: {input_dir}", file=sys.stderr)
    return 1

  try:
    client = OpenAI()
  except Exception as exc:  # noqa: BLE001
    print(f"Could not initialize OpenAI client: {exc}", file=sys.stderr)
    return 1

  manifest_paths: list[str] = []
  failures: list[str] = []

  for src in sources:
    out_name = f"{src.stem}_ghibli.png"
    out_path = output_dir / out_name
    rel_url = quote((Path(output_dir.name) / out_name).as_posix())

    if out_path.exists() and not args.overwrite:
      manifest_paths.append(rel_url)
      print(f"Skip existing: {out_name}")
      continue

    try:
      png_bytes = to_png_bytes(src)
      generated = generate_image(client, png_bytes, args.prompt, args.model)
      out_path.write_bytes(generated)
      manifest_paths.append(rel_url)
      print(f"Generated: {out_name}")
    except Exception as exc:  # noqa: BLE001
      failures.append(f"{src.name}: {exc}")
      print(f"Failed: {src.name} -> {exc}", file=sys.stderr)

  manifest = {"images": manifest_paths}
  manifest_path = output_dir / "manifest.json"
  manifest_path.write_text(json.dumps(manifest, indent=2), encoding="utf-8")
  print(f"Wrote manifest: {manifest_path}")

  if failures:
    print("\nSome images failed:", file=sys.stderr)
    for item in failures:
      print(f"- {item}", file=sys.stderr)
    return 2
  return 0


if __name__ == "__main__":
  raise SystemExit(main())
