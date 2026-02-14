const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const preludePanel = document.getElementById("preludePanel");
const preStartBtn = document.getElementById("preStartBtn");
const skipBtn = document.getElementById("skipBtn");
const beginBtn = document.getElementById("beginBtn");

const connectionsPanel = document.getElementById("connectionsPanel");
const connectionsStatus = document.getElementById("connectionsStatus");
const solvedGroups = document.getElementById("solvedGroups");
const connectionsComplete = document.getElementById("connectionsComplete");
const wordGrid = document.getElementById("wordGrid");
const submitGroupBtn = document.getElementById("submitGroupBtn");
const clearSelectionBtn = document.getElementById("clearSelectionBtn");
const shuffleWordsBtn = document.getElementById("shuffleWordsBtn");

const wordlePanel = document.getElementById("wordlePanel");
const wordleStatus = document.getElementById("wordleStatus");
const wordleGrid = document.getElementById("wordleGrid");
const wordleSubmitBtn = document.getElementById("wordleSubmitBtn");
const wordleResetBtn = document.getElementById("wordleResetBtn");

const finalChallengePanel = document.getElementById("finalChallengePanel");
const finalYesOneBtn = document.getElementById("finalYesOneBtn");
const finalYesTwoBtn = document.getElementById("finalYesTwoBtn");

const decoderPanel = document.getElementById("decoderPanel");
const decoderStatus = document.getElementById("decoderStatus");
const decoderInput = document.getElementById("decoderInput");
const decoderSubmitBtn = document.getElementById("decoderSubmitBtn");
const decoderHintBtn = document.getElementById("decoderHintBtn");
const continuePrompt = document.getElementById("continuePrompt");

const SCENE = {
  PRELUDE: "prelude",
  HOME: "home",
  CITY: "city",
  AUTUMN_RACHEL_ENTER: "autumn-rachel-enter",
  AUTUMN_OWLET_ENTER: "autumn-owlet-enter",
  AUTUMN_DIALOGUE: "autumn-dialogue",
  CONNECTIONS: "connections",
  CH1_GERTRUDE: "ch1-gertrude",
  CH1_PAPER: "ch1-paper",
  CH2_RACHEL_ENTER: "ch2-rachel-enter",
  CH2_DUDE_ENTER: "ch2-dude-enter",
  CH2_DIALOGUE: "ch2-dialogue",
  WORDLE: "wordle",
  CH2_CONGRATS: "ch2-congrats",
  CH2_PAPER: "ch2-paper",
  FINAL_RACHEL_ENTER: "final-rachel-enter",
  FINAL_OWLET_ENTER: "final-owlet-enter",
  FINAL_DIALOGUE: "final-dialogue",
  FINAL_CHALLENGE: "final-challenge",
  FINAL_MESSAGE: "final-message",
  FINAL_PAPER: "final-paper",
  DECODER: "decoder",
  FINALE: "finale",
};

const assets = {
  titleA: createImage("title screen/ChatGPT Image Feb 11, 2026, 10_38_53 PM.png"),
  titleB: createImage("title screen/ChatGPT Image Feb 11, 2026, 10_38_55 PM.png"),
  cityBg: createImage(
    "craftpix-net-219100-free-futuristic-city-pixel-art-backgrounds/city 3/ChatGPT Image Feb 11, 2026, 10_51_37 PM.png"
  ),
  cityShimmerBg: createImage(
    "craftpix-net-219100-free-futuristic-city-pixel-art-backgrounds/city 3/city-shimmer.png"
  ),
  cityNightBg: createImage("Futuristic cityscape at night.png"),
  cityNightAltBg: createImage("ChatGPT Image Feb 12, 2026, 02_48_14 PM.png"),
  autumnBg: createImage(
    "craftpix-net-311636-free-autumn-pixel-backgrounds-for-game/PNG/background 4/background 4.png"
  ),
  challengeTwoBgA: createImage(
    "craftpix-net-311636-free-autumn-pixel-backgrounds-for-game/PNG/background 1/ChatGPT Image Feb 12, 2026, 03_05_01 PM.png"
  ),
  challengeTwoBgB: createImage(
    "craftpix-net-311636-free-autumn-pixel-backgrounds-for-game/PNG/background 1/ChatGPT Image Feb 12, 2026, 03_05_03 PM.png"
  ),
  finalBgA: createImage(
    "craftpix-net-311636-free-autumn-pixel-backgrounds-for-game/PNG/background 2/ChatGPT Image Feb 11, 2026, 11_30_02 PM.png"
  ),
  finalBgB: createImage(
    "craftpix-net-311636-free-autumn-pixel-backgrounds-for-game/PNG/background 2/ChatGPT Image Feb 12, 2026, 02_53_00 PM.png"
  ),
  rachelWalk: createImage(
    "craftpix-net-622999-free-pixel-art-tiny-hero-sprites/1 Pink_Monster/Pink_Monster_Walk_6.png"
  ),
  rachelIdle: createImage(
    "craftpix-net-622999-free-pixel-art-tiny-hero-sprites/1 Pink_Monster/Pink_Monster_Idle_4.png"
  ),
  owletWalk: createImage(
    "craftpix-net-622999-free-pixel-art-tiny-hero-sprites/2 Owlet_Monster/Owlet_Monster_Walk_6.png"
  ),
  owletIdle: createImage(
    "craftpix-net-622999-free-pixel-art-tiny-hero-sprites/2 Owlet_Monster/Owlet_Monster_Idle_4.png"
  ),
  dudeWalk: createImage(
    "craftpix-net-622999-free-pixel-art-tiny-hero-sprites/3 Dude_Monster/Dude_Monster_Walk_6.png"
  ),
  dudeIdle: createImage(
    "craftpix-net-622999-free-pixel-art-tiny-hero-sprites/3 Dude_Monster/Dude_Monster_Idle_4.png"
  ),
  paper: createImage("paper.png"),
  bear: createImage("bear.png"),
  bear2: createImage("bear2.png"),
  heart: createImage("heart.png"),
  birdFlyA: createImage(
    "animals/craftpix-net-610575-free-street-animal-pixel-art-asset-pack/7 Bird/Walk.png"
  ),
  birdFlyB: createImage(
    "animals/craftpix-net-610575-free-street-animal-pixel-art-asset-pack/8 Bird 2/Walk.png"
  ),
};

const cityDialogue = [
  "This is little Rachel. A beautiful 22 year old girl who lives in a big city.",
  "Rachel yearns to venture beyond the hustle and bustle of urban life",
  "So even though she loved busy season at Deloitte...",
  "She left",
];

const autumnNarration =
  "Wow! What a change of scenery. Autumn makes Rachel so happy. And it looks like she found herself right in the middle of it!";

const autumnDialogue = [
  "Rachel: Who are you? Are you friendly? Tread carefully. I will eat your family",
  "Gertrude: Hi, I was cutting potatoes when I heard a knock on my door. It was your secret admirer (your boyfriend)! He has a secret message for you.",
  "Gertrude: This message can only be revealed by completing our challenges.",
  "Gertrude: After completing each challenge, I will reveal one word to you.",
  "Gertrude: Are you down?",
  "Rachel: Yuh",
  "Gertrude: gang gang",
  "Rachel: I want fruit"
];

const ch2Dialogue = "Hummus: Hi Rachel. I've been sent to give you your second challenge. Wordle!";
const ch2Congrats = "Hummus: Congratulations rachel! Here is your second message";
const ch2PaperMessage =
  "I hope you like this game so far. You're my Wordle, the way you're the first thing I think about every morning (or afternoon depending on when I wake up). Your next word is 'Erab'.";

const finalDialogue = "Gertrude: Hi Rachel, it's me again. Welcome to your final challenge! This is the hardest one yet.";
const finalMessage = "Gertrude: Good answer! As promised, here's your final message";
const ch1GertrudeMessage = "Gertrude: Nice job! Here is your first message from your secret admirer";
const ch1PaperMessage =
  "Hello bebs! Congratulations on completing your very first challenge! I always love playing Connections with you. The first word of my secret message is 'Huo'";
const finalPaperMessage = "Hi Bebs! You completed the game! Woohoo! The very last word is 'Naej'";

const connectionsCategories = [
  {
    name: "Begins with the first word of a Tyler, the Creator album",
    color: "#f8df74",
    words: ["Cherry Sprite", "Flower Box Donuts", "Wolf Spider", "Call Me By Your Name"],
  },
  {
    name: "Timothy Chalamet Movies",
    color: "#9ce3a7",
    words: ["Beautiful Boy", "Miss Stevens", "Dune", "Marty Supreme"],
  },
  {
    name: "Things that are Korean",
    color: "#c7a3ff",
    words: ["Kim Jae-jin", "Moo doo", "Danji Fried Chicken", "Nathan"],
  },
  {
    name: "Located in International district",
    color: "#8fc6ff",
    words: ["Pho Bac", "H Mart", "Oasis", "The boat"],
  },
];

const game = {
  scene: SCENE.HOME,
  lastTime: 0,
  homeFrameToggleElapsed: 0,
  showHomeA: true,
  cityDialogueIndex: 0,
  cityNightMode: false,
  cityDialogueVisible: true,
  cityDialogueDelayMs: 0,
  autumnDialogueIndex: 0,
  showSecretHud: false,
  secretWords: ["", "", ""],
  promptPulseTimer: 0,
  promptPulseBig: false,
  autoSceneDelayMs: 0,
  bgSwapTimer: 0,
  bgSwapToggle: false,
};

const dialogueTyping = {
  text: "",
  visibleCount: 0,
  timerMs: 0,
  speedMs: 28,
  done: true,
  startDelayMs: 0,
};

const sfx = {
  ctx: null,
  lastTypeMs: 0,
};
const SFX_VOLUME_MULTIPLIER = 1.22;
const SENTENCE_PAUSE_MS = 0;

const vineBoomAudio = new Audio("Vine boom sound effect.mp3");
vineBoomAudio.preload = "auto";
vineBoomAudio.volume = 0.22;
const bopAudio = new Audio("bop.mp3");
bopAudio.preload = "auto";
bopAudio.volume = 0.9;
const walkGrassAudio = new Audio("Walking on grass sound effect  walking sound effect.mp3");
walkGrassAudio.preload = "auto";
walkGrassAudio.loop = true;
walkGrassAudio.volume = 0.56;
let walkGrassPlaying = false;
const gameMusic = new Audio("49. [Sector 4] - Ravaged Rustworks - Hey! Pikmin.mp3");
const endingMusic = new Audio("070 - Don't Ever Forget... - (Pokémon Mystery Dungeon - Explorers of Sky).mp3");
gameMusic.preload = "auto";
endingMusic.preload = "auto";
gameMusic.volume = 0.72;
endingMusic.volume = 0.72;
let gameMusicLoopEnabled = false;
let gameMusicDelayTimeout = null;
let endingMusicLoopEnabled = false;
let endingMusicDelayTimeout = null;

const rachel = createWalker(assets.rachelWalk, assets.rachelIdle, 6, 4, 4, 0.9);
const owlet = createWalker(assets.owletWalk, assets.owletIdle, 6, 4, 4, 0.9);
const dude = createWalker(assets.dudeWalk, assets.dudeIdle, 6, 4, 4, 0.9);

const connections = {
  deck: [],
  selected: new Set(),
  solved: [],
  mistakesRemaining: 4,
  message: "Pick four words that belong together.",
  gameOver: false,
  completed: false,
  completeBanner: "",
  transitionDelayMs: 0,
};

const wordle = {
  target: "BEBES",
  maxAttempts: 6,
  guesses: [],
  currentInput: "",
  message: "Guess the five-letter word.",
};

const decoder = {
  triesRemaining: 3,
  hintIndex: 0,
  hints: [
    "Hint 1: a very soft boy",
    "Hint 2: egg plant",
    "Hint 3: it's just the 3 words spelled backwards",
  ],
  message: "You have 3 tries remaining",
  acceptedAnswers: new Set(["OUH BARE JEAN", "OUH BEAR JEAN"]),
};

const finale = {
  timer: 0,
  phase: "glide",
  phrase: "OUH BARE JEAN",
  phraseStartY: canvas.height * 0.78,
  phraseTargetY: canvas.height * 0.5,
  phraseY: canvas.height * 0.78,
  subjectAlpha: 0,
  vinePlayed: false,
  bopPlayed: false,
  endingMusicStarted: false,
};

const ghibliGallery = {
  images: [],
  bubbles: [],
  spawnTimer: 0,
  nextSpawnDelayMs: 7000,
  nextImageIndex: 0,
  maxBubbles: 2,
};

const flyingBirds = {
  active: [],
  spawnTimerMs: 0,
  nextSpawnMs: 25000,
  startDelayMs: 1000,
  stageKey: "",
};

const delayedRightEntry = {
  active: false,
  scene: "",
  walker: null,
  targetX: 0,
  waitMs: 0,
};

function createImage(src) {
  const img = new Image();
  img.src = src;
  return img;
}

function isBirdFlightScene() {
  return (
    game.scene === SCENE.AUTUMN_RACHEL_ENTER ||
    game.scene === SCENE.AUTUMN_OWLET_ENTER ||
    game.scene === SCENE.AUTUMN_DIALOGUE ||
    game.scene === SCENE.CONNECTIONS ||
    game.scene === SCENE.CH1_GERTRUDE ||
    game.scene === SCENE.CH1_PAPER ||
    game.scene === SCENE.CH2_RACHEL_ENTER ||
    game.scene === SCENE.CH2_DUDE_ENTER ||
    game.scene === SCENE.CH2_DIALOGUE ||
    game.scene === SCENE.WORDLE ||
    game.scene === SCENE.CH2_CONGRATS ||
    game.scene === SCENE.CH2_PAPER ||
    game.scene === SCENE.FINAL_RACHEL_ENTER ||
    game.scene === SCENE.FINAL_OWLET_ENTER ||
    game.scene === SCENE.FINAL_DIALOGUE ||
    game.scene === SCENE.FINAL_CHALLENGE
  );
}

function spawnFlyingBird() {
  if (flyingBirds.active.length > 0) {
    return false;
  }
  const choices = [assets.birdFlyA, assets.birdFlyB].filter((img) => img.complete && img.width > 0 && img.height > 0);
  if (choices.length === 0) {
    return false;
  }

  const sheet = choices[Math.floor(Math.random() * choices.length)];
  const frameHeight = sheet.height;
  const frameCount = Math.max(1, Math.floor(sheet.width / frameHeight));
  const frameWidth = Math.floor(sheet.width / frameCount);
  const scale = randomBetween(2.2, 3.2);
  const drawWidth = frameWidth * scale;
  const drawHeight = frameHeight * scale;
  const movingRight = Math.random() < 0.5;
  const speed = randomBetween(120, 180);

  flyingBirds.active.push({
    sheet,
    frameCount,
    frameWidth,
    frameHeight,
    frameIndex: 0,
    frameTimerMs: 0,
    frameIntervalMs: 90,
    drawWidth,
    drawHeight,
    x: movingRight ? -drawWidth - 10 : canvas.width + 10,
    y: randomBetween(canvas.height * 0.08, canvas.height * 0.48),
    vx: movingRight ? speed : -speed,
    movingRight,
  });
  return true;
}

function updateFlyingBirds(dtMs) {
  if (!isBirdFlightScene()) {
    flyingBirds.active = [];
    flyingBirds.spawnTimerMs = 0;
    flyingBirds.nextSpawnMs = 25000;
    flyingBirds.startDelayMs = 1000;
    flyingBirds.stageKey = "";
    return;
  }

  if (flyingBirds.startDelayMs > 0) {
    flyingBirds.startDelayMs -= dtMs;
    if (flyingBirds.startDelayMs <= 0) {
      spawnFlyingBird();
      flyingBirds.spawnTimerMs = 0;
    }
  } else {
    flyingBirds.spawnTimerMs += dtMs;
    if (flyingBirds.spawnTimerMs >= flyingBirds.nextSpawnMs && spawnFlyingBird()) {
      flyingBirds.spawnTimerMs = 0;
    }
  }

  const alive = [];
  for (const bird of flyingBirds.active) {
    bird.x += (bird.vx * dtMs) / 1000;
    bird.frameTimerMs += dtMs;
    if (bird.frameTimerMs >= bird.frameIntervalMs) {
      bird.frameTimerMs = 0;
      bird.frameIndex = (bird.frameIndex + 1) % bird.frameCount;
    }

    const offRight = bird.x > canvas.width + bird.drawWidth + 20;
    const offLeft = bird.x < -bird.drawWidth - 20;
    if (!offRight && !offLeft) {
      alive.push(bird);
    }
  }
  flyingBirds.active = alive;
}

function drawFlyingBirds() {
  for (const bird of flyingBirds.active) {
    const sx = bird.frameIndex * bird.frameWidth;
    const sy = 0;
    if (bird.movingRight) {
      ctx.drawImage(bird.sheet, sx, sy, bird.frameWidth, bird.frameHeight, bird.x, bird.y, bird.drawWidth, bird.drawHeight);
      continue;
    }
    ctx.save();
    ctx.translate(bird.x + bird.drawWidth / 2, 0);
    ctx.scale(-1, 1);
    ctx.drawImage(
      bird.sheet,
      sx,
      sy,
      bird.frameWidth,
      bird.frameHeight,
      -bird.drawWidth / 2,
      bird.y,
      bird.drawWidth,
      bird.drawHeight
    );
    ctx.restore();
  }
}

function startBirdFlightsForStage(stageKey) {
  if (!isBirdFlightScene()) {
    return;
  }
  if (flyingBirds.stageKey === stageKey) {
    return;
  }
  flyingBirds.stageKey = stageKey;
  flyingBirds.active = [];
  flyingBirds.spawnTimerMs = 0;
  flyingBirds.nextSpawnMs = 25000;
  flyingBirds.startDelayMs = 1000;
}

function updateWalkGrassAudio() {
  const anyWalkerMoving = rachel.moving || owlet.moving || dude.moving;
  const rightEntryPreRoll = delayedRightEntry.active && delayedRightEntry.waitMs <= 1000;
  const shouldPlay = anyWalkerMoving || rightEntryPreRoll;

  if (shouldPlay && !walkGrassPlaying) {
    walkGrassPlaying = true;
    try {
      walkGrassAudio.currentTime = 0;
      void walkGrassAudio.play();
    } catch {
      // Ignore autoplay failures.
    }
    return;
  }

  if (!shouldPlay && walkGrassPlaying) {
    walkGrassPlaying = false;
    walkGrassAudio.pause();
    walkGrassAudio.currentTime = 0;
  }
}

function createWalker(walkSheet, idleSheet, walkFrameCount, idleFrameCount, drawScale, speed) {
  return {
    walkSheet,
    idleSheet,
    walkFrameCount,
    idleFrameCount,
    walkFrameWidth: 0,
    walkFrameHeight: 0,
    idleFrameWidth: 0,
    idleFrameHeight: 0,
    drawScale,
    x: 0,
    y: 0,
    targetX: 0,
    speed,
    facing: "right",
    moving: false,
    active: false,
    frameIndex: 0,
    frameTimer: 0,
    walkFrameIntervalMs: 95,
    idleFrameIntervalMs: 170,
  };
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function shuffleArray(items) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function randomBetween(min, max) {
  return min + Math.random() * (max - min);
}

function wrapText(text, maxWidth) {
  const words = text.split(" ");
  const lines = [];
  let line = "";
  for (const word of words) {
    const tryLine = line ? `${line} ${word}` : word;
    if (ctx.measureText(tryLine).width > maxWidth && line) {
      lines.push(line);
      line = word;
    } else {
      line = tryLine;
    }
  }
  if (line) {
    lines.push(line);
  }
  return lines;
}

function normalizePhrase(value) {
  return value.toUpperCase().replace(/[^A-Z ]/g, "").replace(/\s+/g, " ").trim();
}

function ensureAudio() {
  if (!sfx.ctx) {
    const Ctx = window.AudioContext || window.webkitAudioContext;
    if (!Ctx) {
      return null;
    }
    sfx.ctx = new Ctx();
  }
  if (sfx.ctx.state === "suspended") {
    sfx.ctx.resume();
  }
  return sfx.ctx;
}

function playSfx({ freq = 440, duration = 0.06, type = "square", volume = 0.03, endFreq = freq }) {
  const ctx = ensureAudio();
  if (!ctx) {
    return;
  }
  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, now);
  osc.frequency.linearRampToValueAtTime(endFreq, now + duration);
  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.linearRampToValueAtTime(volume * SFX_VOLUME_MULTIPLIER, now + 0.01);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(now);
  osc.stop(now + duration + 0.01);
}

function playTypeTick() {
  const now = performance.now();
  if (now - sfx.lastTypeMs < 28) {
    return;
  }
  sfx.lastTypeMs = now;
  playSfx({ freq: 780, endFreq: 700, duration: 0.03, volume: 0.018 });
}

function setTypingText(text, startDelayMs = 400) {
  dialogueTyping.text = text || "";
  dialogueTyping.visibleCount = 0;
  dialogueTyping.timerMs = 0;
  dialogueTyping.startDelayMs = startDelayMs;
  dialogueTyping.done = dialogueTyping.text.length === 0;
}

function finishTyping() {
  dialogueTyping.visibleCount = dialogueTyping.text.length;
  dialogueTyping.done = true;
}

function getTypedText() {
  return dialogueTyping.text.slice(0, dialogueTyping.visibleCount);
}

function revealSecretWord(index, value) {
  if (index < 0 || index >= game.secretWords.length) {
    return;
  }
  game.secretWords[index] = value;
}

function updateUIVisibility() {
  preludePanel.style.display = game.scene === SCENE.PRELUDE ? "flex" : "none";
  skipBtn.style.display = game.scene === SCENE.PRELUDE ? "none" : "block";
  beginBtn.style.display = game.scene === SCENE.HOME ? "block" : "none";
  connectionsPanel.style.display = game.scene === SCENE.CONNECTIONS ? "flex" : "none";
  wordlePanel.style.display = game.scene === SCENE.WORDLE ? "flex" : "none";
  finalChallengePanel.style.display = game.scene === SCENE.FINAL_CHALLENGE ? "flex" : "none";
  decoderPanel.style.display = game.scene === SCENE.DECODER ? "flex" : "none";
  syncContinuePrompt();
}

function startGameMusic() {
  if (gameMusicLoopEnabled) {
    return;
  }
  gameMusicLoopEnabled = true;
  endingMusicLoopEnabled = false;
  if (endingMusicDelayTimeout) {
    clearTimeout(endingMusicDelayTimeout);
    endingMusicDelayTimeout = null;
  }
  endingMusic.pause();
  endingMusic.currentTime = 0;
  gameMusic.currentTime = 0;
  void gameMusic.play().catch(() => {});
}

function stopGameMusic() {
  gameMusicLoopEnabled = false;
  if (gameMusicDelayTimeout) {
    clearTimeout(gameMusicDelayTimeout);
    gameMusicDelayTimeout = null;
  }
  gameMusic.pause();
  gameMusic.currentTime = 0;
}

function startEndingMusic() {
  if (finale.endingMusicStarted) {
    return;
  }
  finale.endingMusicStarted = true;
  endingMusicLoopEnabled = true;
  endingMusic.currentTime = 18.5;
  void endingMusic.play().catch(() => {});
}

function skipStage() {
  ensureAudio();
  switch (game.scene) {
    case SCENE.HOME:
      enterCityScene();
      return;
    case SCENE.CITY:
      enterAutumnRachelScene();
      return;
    case SCENE.AUTUMN_RACHEL_ENTER:
      enterAutumnOwletScene();
      return;
    case SCENE.AUTUMN_OWLET_ENTER:
      enterAutumnDialogueScene();
      return;
    case SCENE.AUTUMN_DIALOGUE:
      enterConnectionsScene();
      return;
    case SCENE.CONNECTIONS:
      enterChallengeOneGertrudeScene();
      return;
    case SCENE.CH1_GERTRUDE:
      enterChallengeOnePaperScene();
      return;
    case SCENE.CH1_PAPER:
      revealSecretWord(0, "HUO");
      enterChallengeTwoRachelScene();
      return;
    case SCENE.CH2_RACHEL_ENTER:
      enterChallengeTwoDudeScene();
      return;
    case SCENE.CH2_DUDE_ENTER:
      enterChallengeTwoDialogueScene();
      return;
    case SCENE.CH2_DIALOGUE:
      enterWordleScene();
      return;
    case SCENE.WORDLE:
      enterChallengeTwoCongratsScene();
      return;
    case SCENE.CH2_CONGRATS:
      enterChallengeTwoPaperScene();
      return;
    case SCENE.CH2_PAPER:
      revealSecretWord(1, "ERAB");
      enterFinalRachelScene();
      return;
    case SCENE.FINAL_RACHEL_ENTER:
      enterFinalOwletScene();
      return;
    case SCENE.FINAL_OWLET_ENTER:
      enterFinalDialogueScene();
      return;
    case SCENE.FINAL_DIALOGUE:
      enterFinalChallengeScene();
      return;
    case SCENE.FINAL_CHALLENGE:
      enterFinalMessageScene();
      return;
    case SCENE.FINAL_MESSAGE:
      enterFinalPaperScene();
      return;
    case SCENE.FINAL_PAPER:
      revealSecretWord(2, "NAEJ");
      enterDecoderScene();
      return;
    case SCENE.DECODER:
      enterFinaleScene();
      return;
    default:
  }
}

function setScene(scene) {
  game.scene = scene;
  updateUIVisibility();
}

function loadGhibliGallery() {
  fetch("couple-pics-ghibli/manifest.json")
    .then((res) => {
      if (!res.ok) {
        throw new Error("manifest missing");
      }
      return res.json();
    })
    .then((data) => {
      if (!Array.isArray(data.images)) {
        return;
      }
      ghibliGallery.images = new Array(data.images.length).fill(null);
      data.images.forEach((relPath, index) => {
        const img = new Image();
        img.onload = () => {
          if (img.naturalWidth > 0 && img.naturalHeight > 0) {
            ghibliGallery.images[index] = img;
          }
        };
        img.onerror = () => {
          // Skip missing/corrupt files listed in manifest.
        };
        img.src = relPath;
      });
    })
    .catch(() => {
      // Optional feature; keep game functional without gallery assets.
    });
}

function getLoadedGhibliImages() {
  return ghibliGallery.images.filter((img) => img && img.complete && img.naturalWidth > 0);
}

function pickNextGhibliImage() {
  const loaded = getLoadedGhibliImages();
  if (loaded.length === 0) {
    return null;
  }
  const active = new Set(ghibliGallery.bubbles.map((bubble) => bubble.image));
  if (active.size >= loaded.length) {
    return null;
  }
  for (let offset = 0; offset < loaded.length; offset += 1) {
    const idx = (ghibliGallery.nextImageIndex + offset) % loaded.length;
    const candidate = loaded[idx];
    if (!active.has(candidate)) {
      ghibliGallery.nextImageIndex = (idx + 1) % loaded.length;
      return candidate;
    }
  }
  return null;
}

function spawnGhibliBubble() {
  if (ghibliGallery.bubbles.length >= ghibliGallery.maxBubbles) {
    return;
  }
  const image = pickNextGhibliImage();
  if (!image) {
    return;
  }
  const longestSide = Math.max(image.width, image.height) || 1;
  const targetSize = randomBetween(Math.min(canvas.width, canvas.height) * 0.82, Math.min(canvas.width, canvas.height) * 0.95);
  const scale = targetSize / longestSide;
  const bubbleHeight = image.height * scale;
  const spawnOnLeft = Math.random() < 0.5;
  const spawnX = spawnOnLeft
    ? randomBetween(canvas.width * 0.12, canvas.width * 0.34)
    : randomBetween(canvas.width * 0.66, canvas.width * 0.88);
  ghibliGallery.bubbles.push({
    image,
    x: spawnX,
    // Start fully below the viewport so bubbles rise into view.
    y: canvas.height + bubbleHeight * 0.5 + randomBetween(30, 110),
    vx: randomBetween(-8, 8),
    vy: randomBetween(-90, -68),
    wobbleSeed: randomBetween(0, Math.PI * 2),
    wobbleAmp: randomBetween(4, 10),
    scale,
    age: 0,
    lifeMs: randomBetween(14000, 19000),
  });
}

function setupWalkers() {
  rachel.walkFrameWidth = Math.floor(assets.rachelWalk.width / rachel.walkFrameCount);
  rachel.walkFrameHeight = assets.rachelWalk.height;
  rachel.idleFrameWidth = Math.floor(assets.rachelIdle.width / rachel.idleFrameCount);
  rachel.idleFrameHeight = assets.rachelIdle.height;

  owlet.walkFrameWidth = Math.floor(assets.owletWalk.width / owlet.walkFrameCount);
  owlet.walkFrameHeight = assets.owletWalk.height;
  owlet.idleFrameWidth = Math.floor(assets.owletIdle.width / owlet.idleFrameCount);
  owlet.idleFrameHeight = assets.owletIdle.height;

  dude.walkFrameWidth = Math.floor(assets.dudeWalk.width / dude.walkFrameCount);
  dude.walkFrameHeight = assets.dudeWalk.height;
  dude.idleFrameWidth = Math.floor(assets.dudeIdle.width / dude.idleFrameCount);
  dude.idleFrameHeight = assets.dudeIdle.height;

  const tallest =
    Math.max(
      Math.max(rachel.walkFrameHeight, rachel.idleFrameHeight) * rachel.drawScale,
      Math.max(owlet.walkFrameHeight, owlet.idleFrameHeight) * owlet.drawScale,
      Math.max(dude.walkFrameHeight, dude.idleFrameHeight) * dude.drawScale
    ) + 24;

  const groundY = canvas.height - tallest;
  rachel.y = groundY;
  owlet.y = groundY;
  dude.y = groundY;
}

function placeWalkerFromLeft(walker, targetX) {
  const width = Math.max(walker.walkFrameWidth, walker.idleFrameWidth) * walker.drawScale;
  walker.active = true;
  walker.moving = true;
  walker.facing = "right";
  walker.x = -width - 20;
  walker.targetX = targetX;
  walker.frameIndex = 0;
  walker.frameTimer = 0;
}

function placeWalkerFromRight(walker, targetX) {
  const width = Math.max(walker.walkFrameWidth, walker.idleFrameWidth) * walker.drawScale;
  walker.active = true;
  walker.moving = true;
  walker.facing = "left";
  walker.x = canvas.width + width + 20;
  walker.targetX = targetX;
  walker.frameIndex = 0;
  walker.frameTimer = 0;
}

function scheduleWalkerFromRight(scene, walker, targetX, waitMs = 2000) {
  walker.active = false;
  walker.moving = false;
  delayedRightEntry.active = true;
  delayedRightEntry.scene = scene;
  delayedRightEntry.walker = walker;
  delayedRightEntry.targetX = targetX;
  delayedRightEntry.waitMs = waitMs;
}

function enterCityScene() {
  game.cityDialogueIndex = 0;
  game.cityNightMode = false;
  game.cityDialogueVisible = true;
  game.cityDialogueDelayMs = 0;
  game.autumnDialogueIndex = 0;
  game.showSecretHud = false;
  game.secretWords = ["", "", ""];
  rachel.active = false;
  owlet.active = false;
  dude.active = false;
  setScene(SCENE.CITY);
  setTypingText(cityDialogue[game.cityDialogueIndex], 0);
}

function enterAutumnRachelScene() {
  setScene(SCENE.AUTUMN_RACHEL_ENTER);
  startBirdFlightsForStage("game1");
  placeWalkerFromLeft(rachel, 130);
  owlet.active = false;
  dude.active = false;
  setTypingText(autumnNarration, 0);
}

function enterAutumnOwletScene() {
  setScene(SCENE.AUTUMN_OWLET_ENTER);
  scheduleWalkerFromRight(
    SCENE.AUTUMN_OWLET_ENTER,
    owlet,
    canvas.width - Math.max(owlet.walkFrameWidth, owlet.idleFrameWidth) * owlet.drawScale - 130
  );
}

function enterAutumnDialogueScene() {
  game.autumnDialogueIndex = 0;
  setScene(SCENE.AUTUMN_DIALOGUE);
  setTypingText(autumnDialogue[game.autumnDialogueIndex], 0);
}

function enterChallengeTwoRachelScene() {
  setScene(SCENE.CH2_RACHEL_ENTER);
  startBirdFlightsForStage("game2");
  placeWalkerFromLeft(rachel, 130);
  owlet.active = false;
  dude.active = false;
}

function enterChallengeTwoDudeScene() {
  setScene(SCENE.CH2_DUDE_ENTER);
  scheduleWalkerFromRight(
    SCENE.CH2_DUDE_ENTER,
    dude,
    canvas.width - Math.max(dude.walkFrameWidth, dude.idleFrameWidth) * dude.drawScale - 130
  );
}

function enterChallengeTwoDialogueScene() {
  setScene(SCENE.CH2_DIALOGUE);
  setTypingText(ch2Dialogue, 0);
}

function enterWordleScene() {
  setScene(SCENE.WORDLE);
  resetWordle();
}

function enterChallengeTwoCongratsScene() {
  setScene(SCENE.CH2_CONGRATS);
  setTypingText(ch2Congrats, 0);
  game.autoSceneDelayMs = 0;
}

function enterChallengeTwoPaperScene() {
  setScene(SCENE.CH2_PAPER);
  game.autoSceneDelayMs = 0;
}

function enterFinalRachelScene() {
  setScene(SCENE.FINAL_RACHEL_ENTER);
  startBirdFlightsForStage("game3");
  placeWalkerFromLeft(rachel, 130);
  owlet.active = false;
  dude.active = false;
}

function enterFinalOwletScene() {
  setScene(SCENE.FINAL_OWLET_ENTER);
  scheduleWalkerFromRight(
    SCENE.FINAL_OWLET_ENTER,
    owlet,
    canvas.width - Math.max(owlet.walkFrameWidth, owlet.idleFrameWidth) * owlet.drawScale - 130
  );
}

function enterFinalDialogueScene() {
  setScene(SCENE.FINAL_DIALOGUE);
  setTypingText(finalDialogue, 0);
}

function enterFinalChallengeScene() {
  setScene(SCENE.FINAL_CHALLENGE);
}

function enterFinalMessageScene() {
  setScene(SCENE.FINAL_MESSAGE);
  setTypingText(finalMessage, 0);
  game.autoSceneDelayMs = 0;
}

function enterDecoderScene() {
  setScene(SCENE.DECODER);
  resetDecoder();
  requestAnimationFrame(() => {
    decoderInput.focus();
  });
}

function enterFinaleScene() {
  setScene(SCENE.FINALE);
  stopGameMusic();
  game.showSecretHud = false;
  finale.timer = 0;
  finale.phase = "glide";
  finale.phrase = normalizePhrase(decoderInput.value) || "OUH BARE JEAN";
  finale.phraseY = finale.phraseStartY;
  finale.subjectAlpha = 0;
  finale.vinePlayed = false;
  finale.bopPlayed = false;
  finale.endingMusicStarted = false;
  ghibliGallery.bubbles = [];
  ghibliGallery.spawnTimer = 0;
  ghibliGallery.nextSpawnDelayMs = randomBetween(6000, 8000);
  ghibliGallery.nextImageIndex = 0;
}

function isCategorySolved(name) {
  return connections.solved.some((group) => group.name === name);
}

function resetConnections() {
  connections.deck = shuffleArray(connectionsCategories.flatMap((group) => group.words));
  connections.selected = new Set();
  connections.solved = [];
  connections.mistakesRemaining = 4;
  connections.message = "Pick four words that belong together.";
  connections.gameOver = false;
  connections.completed = false;
  connections.completeBanner = "";
  connections.transitionDelayMs = 0;
  renderConnectionsUI();
}

function enterConnectionsScene() {
  setScene(SCENE.CONNECTIONS);
  game.showSecretHud = true;
  resetConnections();
}

function enterChallengeOneGertrudeScene() {
  setScene(SCENE.CH1_GERTRUDE);
  setTypingText(ch1GertrudeMessage, 0);
  game.autoSceneDelayMs = 0;
}

function enterChallengeOnePaperScene() {
  setScene(SCENE.CH1_PAPER);
}

function enterFinalPaperScene() {
  setScene(SCENE.FINAL_PAPER);
}

function renderConnectionsUI() {
  const solvedMarkup = connections.solved
    .map(
      (group) =>
        `<div class="solved-group" style="background:${group.color};">${group.name}: ${group.words.join(
          ", "
        )}</div>`
    )
    .join("");
  solvedGroups.innerHTML = solvedMarkup;

  const selectedCount = connections.selected.size;
  connectionsStatus.textContent = `${connections.message} Mistakes left: ${connections.mistakesRemaining}. Selected: ${selectedCount}/4.`;
  connectionsComplete.textContent = "";

  wordGrid.innerHTML = "";
  for (const word of connections.deck) {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "word-tile";
    btn.textContent = word;
    if (connections.selected.has(word)) {
      btn.classList.add("selected");
    }
    if (connections.gameOver || connections.completed) {
      btn.disabled = true;
    }
    btn.addEventListener("click", () => {
      if (connections.gameOver || connections.completed) {
        return;
      }
      if (connections.selected.has(word)) {
        connections.selected.delete(word);
      } else if (connections.selected.size < 4) {
        connections.selected.add(word);
        playSfx({ freq: 700, endFreq: 820, duration: 0.05, type: "triangle", volume: 0.03 });
      }
      renderConnectionsUI();
    });
    wordGrid.appendChild(btn);
  }

  submitGroupBtn.disabled = connections.gameOver || connections.completed;
  shuffleWordsBtn.disabled = connections.gameOver || connections.completed;
  clearSelectionBtn.textContent =
    connections.gameOver && !connections.completed ? "Play Again" : "Deselect All";
}

function scoreWordleGuess(guess, target) {
  const states = Array(guess.length).fill("miss");
  const remaining = {};

  for (let i = 0; i < guess.length; i += 1) {
    if (guess[i] === target[i]) {
      states[i] = "hit";
    } else {
      remaining[target[i]] = (remaining[target[i]] || 0) + 1;
    }
  }

  for (let i = 0; i < guess.length; i += 1) {
    if (states[i] === "hit") {
      continue;
    }
    const letter = guess[i];
    if (remaining[letter]) {
      states[i] = "near";
      remaining[letter] -= 1;
    }
  }

  return states;
}

function resetWordle() {
  wordle.guesses = [];
  wordle.currentInput = "";
  wordle.message = "Guess the five-letter word.";
  renderWordleUI();
}

function renderWordleUI() {
  wordleStatus.textContent = wordle.message;
  wordleGrid.innerHTML = "";

  const rows = wordle.maxAttempts;
  for (let row = 0; row < rows; row += 1) {
    const submittedGuess = wordle.guesses[row] || "";
    const isCurrentRow = row === wordle.guesses.length && wordle.guesses.length < wordle.maxAttempts;
    const guess = isCurrentRow ? wordle.currentInput : submittedGuess;
    const states = submittedGuess.length === 5 ? scoreWordleGuess(submittedGuess, wordle.target) : [];
    for (let col = 0; col < 5; col += 1) {
      const cell = document.createElement("div");
      cell.className = "wordle-cell";
      cell.textContent = guess[col] || "";
      if (states[col]) {
        cell.classList.add(states[col]);
      } else if (isCurrentRow && col === wordle.currentInput.length) {
        cell.classList.add("active");
      }
      wordleGrid.appendChild(cell);
    }
  }
}

function submitWordleGuess() {
  ensureAudio();
  const guess = wordle.currentInput;
  if (guess.length !== 5) {
    wordle.message = "Word must be five letters.";
    renderWordleUI();
    return;
  }

  if (wordle.guesses.length >= wordle.maxAttempts) {
    wordle.message = "No tries left. Press Reset to try again.";
    renderWordleUI();
    return;
  }

  wordle.guesses.push(guess);
  wordle.currentInput = "";

  if (guess === wordle.target) {
    wordle.message = "Correct!";
    playSfx({ freq: 590, endFreq: 980, duration: 0.18, type: "triangle", volume: 0.05 });
    renderWordleUI();
    enterChallengeTwoCongratsScene();
    return;
  }

  if (wordle.guesses.length >= wordle.maxAttempts) {
    wordle.message = "Out of tries. Press Reset and try again.";
  } else {
    wordle.message = "Not it yet. Try again.";
  }

  renderWordleUI();
}

function resetDecoder() {
  decoder.triesRemaining = 3;
  decoder.hintIndex = 0;
  decoder.message = "You have 3 tries.";
  decoderInput.value = "";
  renderDecoderUI();
}

function renderDecoderUI() {
  decoderStatus.textContent = decoder.message;
  decoderSubmitBtn.disabled = decoder.triesRemaining <= 0;
  decoderHintBtn.disabled = decoder.hintIndex >= decoder.hints.length;
}

function submitDecoder() {
  if (decoder.triesRemaining <= 0) {
    return;
  }

  const guess = normalizePhrase(decoderInput.value);
  if (!guess) {
    decoder.message = "Type your three-word guess first.";
    renderDecoderUI();
    return;
  }

  if (decoder.acceptedAnswers.has(guess)) {
    decoder.message = "Correct!";
    playSfx({ freq: 660, endFreq: 1040, duration: 0.22, type: "triangle", volume: 0.05 });
    renderDecoderUI();
    enterFinaleScene();
    return;
  }

  decoder.triesRemaining -= 1;
  if (decoder.triesRemaining <= 0) {
    decoder.triesRemaining = 0;
    decoder.message = "No tries left. The secret was OUH BARE JEAN.";
  } else {
    decoder.message = `Nope. Tries left: ${decoder.triesRemaining}.`;
  }
  renderDecoderUI();
}

function revealHint() {
  if (decoder.hintIndex >= decoder.hints.length) {
    return;
  }
  decoder.message = decoder.hints[decoder.hintIndex];
  decoder.hintIndex += 1;
  renderDecoderUI();
}

function updateWalker(walker, dtMs) {
  if (!walker.active) {
    return;
  }

  if (walker.moving) {
    const direction = walker.targetX > walker.x ? 1 : -1;
    walker.x += direction * walker.speed;
    if ((direction > 0 && walker.x >= walker.targetX) || (direction < 0 && walker.x <= walker.targetX)) {
      walker.x = walker.targetX;
      walker.moving = false;
      walker.frameIndex = 0;
      walker.frameTimer = 0;
    } else {
      walker.frameTimer += dtMs;
      if (walker.frameTimer >= walker.walkFrameIntervalMs) {
        walker.frameTimer = 0;
        walker.frameIndex = (walker.frameIndex + 1) % walker.walkFrameCount;
      }
    }
  } else {
    walker.frameTimer += dtMs;
    if (walker.frameTimer >= walker.idleFrameIntervalMs) {
      walker.frameTimer = 0;
      walker.frameIndex = (walker.frameIndex + 1) % walker.idleFrameCount;
    }
  }
}

function drawWalker(walker) {
  if (!walker.active) {
    return;
  }

  const usingWalk = walker.moving;
  const sheet = usingWalk ? walker.walkSheet : walker.idleSheet;
  const frameWidth = usingWalk ? walker.walkFrameWidth : walker.idleFrameWidth;
  const frameHeight = usingWalk ? walker.walkFrameHeight : walker.idleFrameHeight;
  const sx = walker.frameIndex * frameWidth;
  const sy = 0;
  const sw = frameWidth;
  const sh = frameHeight;
  const dw = sw * walker.drawScale;
  const dh = sh * walker.drawScale;

  if (walker.facing === "left") {
    ctx.save();
    ctx.scale(-1, 1);
    ctx.drawImage(sheet, sx, sy, sw, sh, -walker.x - dw, walker.y, dw, dh);
    ctx.restore();
    return;
  }
  ctx.drawImage(sheet, sx, sy, sw, sh, walker.x, walker.y, dw, dh);
}

function updateTyping(dtMs) {
  if (dialogueTyping.done || !dialogueTyping.text) {
    return;
  }
  if (dialogueTyping.startDelayMs > 0) {
    dialogueTyping.startDelayMs -= dtMs;
    return;
  }
  dialogueTyping.timerMs += dtMs;
  while (dialogueTyping.timerMs >= dialogueTyping.speedMs && !dialogueTyping.done) {
    dialogueTyping.timerMs -= dialogueTyping.speedMs;
    dialogueTyping.visibleCount += 1;
    playTypeTick();
    if (dialogueTyping.visibleCount >= dialogueTyping.text.length) {
      dialogueTyping.visibleCount = dialogueTyping.text.length;
      dialogueTyping.done = true;
      break;
    }

    const typedIndex = dialogueTyping.visibleCount - 1;
    const typedChar = dialogueTyping.text[typedIndex];
    const hasRemainingText = /\S/.test(dialogueTyping.text.slice(dialogueTyping.visibleCount));
    const isEllipsisDot =
      typedChar === "." &&
      (dialogueTyping.text[typedIndex - 1] === "." || dialogueTyping.text[typedIndex + 1] === ".");
    if ((typedChar === "!" || typedChar === "?" || (typedChar === "." && !isEllipsisDot)) && hasRemainingText) {
      dialogueTyping.startDelayMs = SENTENCE_PAUSE_MS;
      break;
    }
  }
}

function drawDialogueBox(text, position = "bottom") {
  const boxX = 24;
  const boxY = position === "top" ? 58 : canvas.height - 164;
  const boxW = canvas.width - 48;
  const boxH = 140;

  ctx.fillStyle = "rgba(14, 12, 30, 0.95)";
  ctx.fillRect(boxX, boxY, boxW, boxH);
  ctx.lineWidth = 4;
  ctx.strokeStyle = "#f5f0ff";
  ctx.strokeRect(boxX, boxY, boxW, boxH);

  ctx.fillStyle = "#f5f0ff";
  ctx.font = "26px 'Courier New', monospace";
  const lines = wrapText(text, boxW - 34);
  for (let i = 0; i < lines.length; i += 1) {
    ctx.fillText(lines[i], boxX + 16, boxY + 42 + i * 30);
  }
}

function drawSecretHud() {
  if (!game.showSecretHud) {
    return;
  }

  const formatSlot = (word, len) => {
    if (!word) {
      return "_ ".repeat(len).trim();
    }
    return word
      .slice(0, len)
      .toUpperCase()
      .split("")
      .join(" ");
  };
  const pattern = `${formatSlot(game.secretWords[0], 3)}  ${formatSlot(game.secretWords[1], 4)}   ${formatSlot(
    game.secretWords[2],
    4
  )}`;
  ctx.font = "24px 'Courier New', monospace";
  ctx.fillStyle = "rgba(14, 12, 30, 0.88)";
  const width = Math.max(340, ctx.measureText(pattern).width + 26);
  ctx.fillRect(16, 10, width, 42);
  ctx.strokeStyle = "#f5f0ff";
  ctx.lineWidth = 3;
  ctx.strokeRect(16, 10, width, 42);
  ctx.fillStyle = "#f5f0ff";
  ctx.fillText(pattern, 26, 38);
}

function drawContinuePrompt() {
  syncContinuePrompt();
}

function syncContinuePrompt() {
  const shouldShow =
    canAdvanceWithSpace() &&
    (game.scene === SCENE.CONNECTIONS ||
      game.scene === SCENE.CH1_PAPER ||
      game.scene === SCENE.CH2_PAPER ||
      game.scene === SCENE.FINAL_PAPER);
  continuePrompt.style.display = shouldShow ? "block" : "none";
  continuePrompt.style.fontSize = game.promptPulseBig ? "30px" : "24px";
}

function isAutumnScene() {
  return (
    game.scene === SCENE.AUTUMN_RACHEL_ENTER ||
    game.scene === SCENE.AUTUMN_OWLET_ENTER ||
    game.scene === SCENE.AUTUMN_DIALOGUE ||
    game.scene === SCENE.CONNECTIONS
  );
}

function isChallengeTwoScene() {
  return (
    game.scene === SCENE.CH2_RACHEL_ENTER ||
    game.scene === SCENE.CH2_DUDE_ENTER ||
    game.scene === SCENE.CH2_DIALOGUE ||
    game.scene === SCENE.WORDLE ||
    game.scene === SCENE.CH2_CONGRATS ||
    game.scene === SCENE.CH2_PAPER
  );
}

function isFinalSetScene() {
  return (
    game.scene === SCENE.CH1_GERTRUDE ||
    game.scene === SCENE.CH1_PAPER ||
    game.scene === SCENE.FINAL_RACHEL_ENTER ||
    game.scene === SCENE.FINAL_OWLET_ENTER ||
    game.scene === SCENE.FINAL_DIALOGUE ||
    game.scene === SCENE.FINAL_CHALLENGE ||
    game.scene === SCENE.FINAL_MESSAGE ||
    game.scene === SCENE.FINAL_PAPER ||
    game.scene === SCENE.DECODER ||
    game.scene === SCENE.FINALE
  );
}

function drawPaperWithText(text) {
  ctx.save();
  const maxW = canvas.width * 0.86;
  const maxH = canvas.height * 0.72;
  const scale = Math.min(maxW / assets.paper.width, maxH / assets.paper.height);
  const pw = assets.paper.width * scale;
  const ph = assets.paper.height * scale;
  const x = (canvas.width - pw) / 2;
  const y = (canvas.height - ph) / 2 - 58;
  ctx.drawImage(assets.paper, x, y, pw, ph);

  const paddingX = pw * 0.12;
  const paddingTop = ph * 0.26;
  const maxTextWidth = pw - paddingX * 2;
  const fontSize = Math.max(16, Math.floor(pw / 38));
  const lineHeight = Math.floor(fontSize * 1.34);

  ctx.fillStyle = "#2c1c10";
  ctx.font = `${fontSize}px 'Courier New', monospace`;
  ctx.textAlign = "left";
  ctx.textBaseline = "top";

  const lines = wrapText(text, maxTextWidth);
  const maxLines = Math.floor((ph - paddingTop - 26) / lineHeight);
  for (let i = 0; i < Math.min(lines.length, maxLines); i += 1) {
    ctx.fillText(lines[i], x + paddingX, y + paddingTop + i * lineHeight);
  }
  ctx.restore();
}

function drawEndingPhrase(words, boldCount, y, color) {
  const baseFont = "52px 'Courier New', monospace";
  const boldFont = "bold 56px 'Courier New', monospace";
  ctx.save();
  let totalWidth = 0;
  for (let i = 0; i < words.length; i += 1) {
    ctx.font = i < boldCount ? boldFont : baseFont;
    totalWidth += ctx.measureText(words[i]).width;
    if (i < words.length - 1) {
      totalWidth += ctx.measureText(" ").width;
    }
  }
  let x = (canvas.width - totalWidth) / 2;
  ctx.textBaseline = "middle";
  for (let i = 0; i < words.length; i += 1) {
    ctx.font = i < boldCount ? boldFont : baseFont;
    ctx.fillStyle = color;
    const word = words[i];
    ctx.fillText(word, x, y);
    x += ctx.measureText(word).width;
    if (i < words.length - 1) {
      const sp = ctx.measureText(" ").width;
      ctx.fillText(" ", x, y);
      x += sp;
    }
  }
  ctx.restore();
}

function drawFinaleScene() {
  const t = finale.timer;
  const words = finale.phrase.split(" ");

  if (t < 2000) {
    ctx.drawImage(assets.finalBgA, 0, 0, canvas.width, canvas.height);
    drawEndingPhrase(words, 0, finale.phraseY, "#f5f0ff");
    return;
  }

  ctx.fillStyle = "#F2CBF7";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const phaseElapsed = t - 2000;
  if (phaseElapsed < 6000) {
    const boldCount = phaseElapsed < 2000 ? 1 : phaseElapsed < 4000 ? 2 : 3;
    drawEndingPhrase(words, boldCount, canvas.height * 0.5, "#2b0d37");
    return;
  }

  const pickBearImage = () => {
    if (t < 12000) {
      return assets.bear;
    }
    if (t < 12300) {
      return assets.bear2;
    }
    if (t < 12600) {
      return assets.bear;
    }
    if (t < 12900) {
      return assets.bear2;
    }
    if (t < 14400) {
      return assets.bear;
    }
    return assets.bear2;
  };

  const bearImage = pickBearImage();
  const fit = Math.min((canvas.width * 0.62) / bearImage.width, (canvas.height * 0.8) / bearImage.height);
  const w = bearImage.width * fit;
  const h = bearImage.height * fit;
  const bearX = (canvas.width - w) / 2;
  const bearY = (canvas.height - h) / 2 + 58;

  if (t >= 14400) {
    for (const bubble of ghibliGallery.bubbles) {
      if (!bubble.image || !bubble.image.complete || bubble.image.naturalWidth === 0) {
        continue;
      }
      const bubbleW = bubble.image.width * bubble.scale;
      const bubbleH = bubble.image.height * bubble.scale;
      const topFadeStartY = canvas.height * 0.1;
      const topFadeEndY = -canvas.height * 0.22;
      const bottomFadeStartY = canvas.height * 0.92;
      const bottomFadeEndY = canvas.height + bubbleH * 0.5;
      let alpha = 0.5;
      if (bubble.y >= bottomFadeStartY) {
        alpha = 0.5 * clamp((bottomFadeEndY - bubble.y) / (bottomFadeEndY - bottomFadeStartY), 0, 1);
      }
      if (bubble.y <= topFadeStartY) {
        alpha = 0.5 * clamp((bubble.y - topFadeEndY) / (topFadeStartY - topFadeEndY), 0, 1);
      }
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.drawImage(bubble.image, bubble.x - bubbleW / 2, bubble.y - bubbleH / 2, bubbleW, bubbleH);
      ctx.restore();
    }
  }

  if (t >= 10000 && t < 10500) {
    const fade = clamp((t - 10000) / 500, 0, 1);
    ctx.save();
    ctx.globalAlpha = fade;
    ctx.drawImage(bearImage, bearX, bearY, w, h);
    ctx.restore();
  } else if (t >= 10500) {
    ctx.drawImage(bearImage, bearX, bearY, w, h);
  }

  if (t >= 14400) {
    const textFade = clamp((t - 14400) / 500, 0, 1);
    ctx.save();
    ctx.globalAlpha = textFade;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "#3b1a4d";
    ctx.font = "bold 52px 'Press Start 2P', 'Courier New', monospace";
    ctx.fillText("Will You Be My Valentine?", canvas.width / 2, canvas.height * 0.2);
    ctx.restore();
  }

  if (t >= 15400) {
    const cycle = (t - 15400) % 5000;
    if (cycle < 400) {
      const p = clamp(cycle / 400, 0, 1);
      const heartScale = 0.18 + p * 0.65;
      const heartAlpha = 1 - p;
      const hw = assets.heart.width * heartScale;
      const hh = assets.heart.height * heartScale;
      ctx.save();
      ctx.globalAlpha = heartAlpha;
      ctx.drawImage(assets.heart, canvas.width / 2 - hw / 2, canvas.height * 0.2 - hh / 2, hw, hh);
      ctx.restore();
    }
  }
}

function drawScene() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (game.scene === SCENE.HOME) {
    ctx.drawImage(game.showHomeA ? assets.titleA : assets.titleB, 0, 0, canvas.width, canvas.height);
    return;
  }

  if (game.scene === SCENE.CITY) {
    const cityBackground = game.cityNightMode ? assets.cityNightBg : assets.cityBg;
    ctx.drawImage(cityBackground, 0, 0, canvas.width, canvas.height);
    if (game.cityDialogueVisible) {
      drawDialogueBox(getTypedText(), "bottom");
    }
    drawContinuePrompt();
    return;
  }

  if (game.scene === SCENE.FINALE) {
    drawFinaleScene();
    return;
  }

  if (isAutumnScene()) {
    ctx.drawImage(assets.autumnBg, 0, 0, canvas.width, canvas.height);
  } else if (isChallengeTwoScene()) {
    ctx.drawImage(game.bgSwapToggle ? assets.challengeTwoBgA : assets.challengeTwoBgB, 0, 0, canvas.width, canvas.height);
  } else if (isFinalSetScene()) {
    ctx.drawImage(assets.finalBgA, 0, 0, canvas.width, canvas.height);
  }
  drawFlyingBirds();

  drawWalker(rachel);
  drawWalker(owlet);
  drawWalker(dude);
  drawSecretHud();

  if (game.scene === SCENE.AUTUMN_RACHEL_ENTER) {
    drawDialogueBox(getTypedText(), "top");
  } else if (game.scene === SCENE.AUTUMN_DIALOGUE) {
    drawDialogueBox(getTypedText(), "top");
  } else if (game.scene === SCENE.CH1_GERTRUDE) {
    drawDialogueBox(getTypedText(), "top");
  } else if (game.scene === SCENE.CH1_PAPER) {
    drawPaperWithText(ch1PaperMessage);
  } else if (game.scene === SCENE.CH2_DIALOGUE) {
    drawDialogueBox(getTypedText(), "top");
  } else if (game.scene === SCENE.CH2_CONGRATS) {
    drawDialogueBox(getTypedText(), "top");
  } else if (game.scene === SCENE.CH2_PAPER) {
    drawPaperWithText(ch2PaperMessage);
  } else if (game.scene === SCENE.FINAL_DIALOGUE) {
    drawDialogueBox(getTypedText(), "top");
  } else if (game.scene === SCENE.FINAL_MESSAGE) {
    drawDialogueBox(getTypedText(), "top");
  } else if (game.scene === SCENE.FINAL_PAPER) {
    drawPaperWithText(finalPaperMessage);
  }

  drawContinuePrompt();
}

function updateFinale(dtMs) {
  finale.timer += dtMs;
  const glideProgress = clamp(finale.timer / 2000, 0, 1);
  finale.phraseY = finale.phraseStartY + (finale.phraseTargetY - finale.phraseStartY) * glideProgress;

  if (!finale.vinePlayed && finale.timer >= 10000) {
    finale.vinePlayed = true;
    try {
      vineBoomAudio.currentTime = 0;
      void vineBoomAudio.play();
    } catch {
      // Ignore autoplay failures.
    }
  }

  if (!finale.bopPlayed && finale.timer >= 12000) {
    finale.bopPlayed = true;
    try {
      bopAudio.currentTime = 0;
      void bopAudio.play();
    } catch {
      // Ignore autoplay failures.
    }
  }

  if (finale.timer >= 14400) {
    startEndingMusic();
  }

  if (finale.timer >= 16400 && getLoadedGhibliImages().length > 0) {
    if (ghibliGallery.bubbles.length === 0) {
      // Keep transitions continuous between successive images.
      ghibliGallery.spawnTimer = 0;
      spawnGhibliBubble();
    }
    ghibliGallery.spawnTimer += dtMs;
    if (ghibliGallery.spawnTimer >= ghibliGallery.nextSpawnDelayMs && ghibliGallery.bubbles.length < ghibliGallery.maxBubbles) {
      ghibliGallery.spawnTimer = 0;
      ghibliGallery.nextSpawnDelayMs = randomBetween(6000, 8000);
      spawnGhibliBubble();
    }

    const alive = [];
    for (const bubble of ghibliGallery.bubbles) {
      bubble.age += dtMs;
      const tSec = bubble.age / 1000;
      bubble.x +=
        (bubble.vx * dtMs) / 1000 +
        Math.sin(tSec * 0.7 + bubble.wobbleSeed) * ((bubble.wobbleAmp * dtMs) / 1000);
      bubble.y += (bubble.vy * dtMs) / 1000;
      const bubbleH = bubble.image.height * bubble.scale;
      const removeY = -canvas.height * 0.22 - bubbleH * 0.55;
      if (bubble.y > removeY && bubble.age < 30000) {
        alive.push(bubble);
      }
    }
    ghibliGallery.bubbles = alive;
  }
}

function updateScene(dtMs) {
  game.bgSwapTimer += dtMs;
  if (game.bgSwapTimer >= 400) {
    game.bgSwapTimer = 0;
    game.bgSwapToggle = !game.bgSwapToggle;
  }

  game.promptPulseTimer += dtMs;
  if (game.promptPulseTimer >= 600) {
    game.promptPulseTimer = 0;
    game.promptPulseBig = !game.promptPulseBig;
  }

  if (delayedRightEntry.active) {
    if (game.scene !== delayedRightEntry.scene || !delayedRightEntry.walker) {
      delayedRightEntry.active = false;
    } else {
      delayedRightEntry.waitMs -= dtMs;
      if (delayedRightEntry.waitMs <= 0) {
        placeWalkerFromRight(delayedRightEntry.walker, delayedRightEntry.targetX);
        delayedRightEntry.active = false;
      }
    }
  }

  updateFlyingBirds(dtMs);

  if (game.scene === SCENE.PRELUDE) {
    return;
  }

  if (game.scene === SCENE.HOME) {
    game.homeFrameToggleElapsed += dtMs;
    if (game.homeFrameToggleElapsed >= 400) {
      game.homeFrameToggleElapsed = 0;
      game.showHomeA = !game.showHomeA;
    }
    return;
  }

  if (game.scene === SCENE.AUTUMN_RACHEL_ENTER) {
    updateTyping(dtMs);
    updateWalker(rachel, dtMs);
    return;
  }

  if (game.scene === SCENE.AUTUMN_OWLET_ENTER) {
    updateWalker(rachel, dtMs);
    updateWalker(owlet, dtMs);
    if (owlet.active && !owlet.moving) {
      enterAutumnDialogueScene();
    }
    return;
  }

  if (game.scene === SCENE.CITY) {
    if (!game.cityDialogueVisible && game.cityDialogueDelayMs > 0) {
      game.cityDialogueDelayMs -= dtMs;
      if (game.cityDialogueDelayMs <= 0) {
        game.cityDialogueVisible = true;
      }
    }
    if (game.cityDialogueVisible) {
      updateTyping(dtMs);
    }
    return;
  }

  if (game.scene === SCENE.CH2_RACHEL_ENTER) {
    updateWalker(rachel, dtMs);
    if (!rachel.moving) {
      enterChallengeTwoDudeScene();
    }
    return;
  }

  if (game.scene === SCENE.CH2_DUDE_ENTER) {
    updateWalker(rachel, dtMs);
    updateWalker(dude, dtMs);
    if (dude.active && !dude.moving) {
      enterChallengeTwoDialogueScene();
    }
    return;
  }

  if (game.scene === SCENE.FINAL_RACHEL_ENTER) {
    updateWalker(rachel, dtMs);
    if (!rachel.moving) {
      enterFinalOwletScene();
    }
    return;
  }

  if (game.scene === SCENE.FINAL_OWLET_ENTER) {
    updateWalker(rachel, dtMs);
    updateWalker(owlet, dtMs);
    if (owlet.active && !owlet.moving) {
      enterFinalDialogueScene();
    }
    return;
  }

  if (game.scene === SCENE.FINALE) {
    updateFinale(dtMs);
    return;
  }

  if (game.scene === SCENE.CH1_GERTRUDE) {
    updateTyping(dtMs);
    return;
  }

  if (game.scene === SCENE.CH2_CONGRATS) {
    updateTyping(dtMs);
  }

  if (game.scene === SCENE.FINAL_MESSAGE) {
    updateTyping(dtMs);
  }

  if (
    game.scene === SCENE.AUTUMN_DIALOGUE ||
    game.scene === SCENE.CH2_DIALOGUE ||
    game.scene === SCENE.FINAL_DIALOGUE
  ) {
    updateTyping(dtMs);
  }

  if (isAutumnScene() || isChallengeTwoScene() || isFinalSetScene()) {
    updateWalker(rachel, dtMs);
    updateWalker(owlet, dtMs);
    updateWalker(dude, dtMs);
  }
}

function canAdvanceWithSpace() {
  if (game.scene === SCENE.CITY) {
    return game.cityDialogueVisible && dialogueTyping.done;
  }
  if (game.scene === SCENE.AUTUMN_RACHEL_ENTER) {
    return !rachel.moving && dialogueTyping.done;
  }
  if (game.scene === SCENE.AUTUMN_DIALOGUE) {
    return dialogueTyping.done;
  }
  if (game.scene === SCENE.CONNECTIONS) {
    return connections.completed;
  }
  if (
    game.scene === SCENE.CH1_GERTRUDE ||
    game.scene === SCENE.CH2_DIALOGUE ||
    game.scene === SCENE.CH2_CONGRATS ||
    game.scene === SCENE.FINAL_DIALOGUE ||
    game.scene === SCENE.FINAL_MESSAGE
  ) {
    return dialogueTyping.done;
  }
  if (
    game.scene === SCENE.CH1_PAPER ||
    game.scene === SCENE.CH2_PAPER ||
    game.scene === SCENE.FINAL_PAPER
  ) {
    return true;
  }
  return false;
}

function onSpacePressed() {
  playSfx({ freq: 420, endFreq: 360, duration: 0.05, volume: 0.028 });

  const typingScenes =
    (game.scene === SCENE.CITY && game.cityDialogueVisible) ||
    game.scene === SCENE.AUTUMN_RACHEL_ENTER ||
    game.scene === SCENE.AUTUMN_DIALOGUE ||
    game.scene === SCENE.CH1_GERTRUDE ||
    game.scene === SCENE.CH2_CONGRATS ||
    game.scene === SCENE.CH2_DIALOGUE ||
    game.scene === SCENE.FINAL_DIALOGUE ||
    game.scene === SCENE.FINAL_MESSAGE;

  if (typingScenes && !dialogueTyping.done) {
    finishTyping();
    return;
  }

  if (game.scene === SCENE.CITY) {
    if (!game.cityDialogueVisible) {
      return;
    }
    if (game.cityDialogueIndex === 0) {
      game.cityDialogueIndex = 1;
      setTypingText(cityDialogue[game.cityDialogueIndex]);
      return;
    }
    if (game.cityDialogueIndex === 1) {
      game.cityDialogueIndex = 2;
      setTypingText(cityDialogue[game.cityDialogueIndex]);
      return;
    }
    if (game.cityDialogueIndex === 2) {
      game.cityDialogueIndex = 3;
      game.cityNightMode = true;
      game.cityDialogueVisible = false;
      game.cityDialogueDelayMs = 1000;
      setTypingText(cityDialogue[game.cityDialogueIndex]);
      return;
    }
    enterAutumnRachelScene();
    return;
  }

  if (game.scene === SCENE.AUTUMN_RACHEL_ENTER && !rachel.moving && dialogueTyping.done) {
    enterAutumnOwletScene();
    return;
  }

  if (game.scene === SCENE.AUTUMN_DIALOGUE && dialogueTyping.done) {
    if (game.autumnDialogueIndex < autumnDialogue.length - 1) {
      game.autumnDialogueIndex += 1;
      setTypingText(autumnDialogue[game.autumnDialogueIndex]);
    } else {
      enterConnectionsScene();
    }
    return;
  }

  if (game.scene === SCENE.CONNECTIONS && connections.completed) {
    enterChallengeOneGertrudeScene();
    return;
  }

  if (game.scene === SCENE.CH2_DIALOGUE && dialogueTyping.done) {
    enterWordleScene();
    return;
  }

  if (game.scene === SCENE.CH1_GERTRUDE && dialogueTyping.done) {
    enterChallengeOnePaperScene();
    return;
  }

  if (game.scene === SCENE.CH2_CONGRATS && dialogueTyping.done) {
    enterChallengeTwoPaperScene();
    return;
  }

  if (game.scene === SCENE.CH1_PAPER) {
    revealSecretWord(0, "HUO");
    playSfx({ freq: 640, endFreq: 480, duration: 0.12, volume: 0.04 });
    enterChallengeTwoRachelScene();
    return;
  }

  if (game.scene === SCENE.CH2_PAPER) {
    revealSecretWord(1, "ERAB");
    playSfx({ freq: 640, endFreq: 480, duration: 0.12, volume: 0.04 });
    enterFinalRachelScene();
    return;
  }

  if (game.scene === SCENE.FINAL_DIALOGUE && dialogueTyping.done) {
    enterFinalChallengeScene();
    return;
  }

  if (game.scene === SCENE.FINAL_MESSAGE && dialogueTyping.done) {
    enterFinalPaperScene();
    return;
  }

  if (game.scene === SCENE.FINAL_PAPER) {
    revealSecretWord(2, "NAEJ");
    playSfx({ freq: 640, endFreq: 480, duration: 0.12, volume: 0.04 });
    enterDecoderScene();
    return;
  }

}

function submitConnectionsSelection() {
  ensureAudio();
  if (connections.gameOver || connections.completed) {
    return;
  }

  const selectedWords = [...connections.selected];
  if (selectedWords.length !== 4) {
    connections.message = "Select exactly four words.";
    renderConnectionsUI();
    return;
  }

  const selectedSet = new Set(selectedWords);
  const match = connectionsCategories.find((group) => {
    if (isCategorySolved(group.name)) {
      return false;
    }
    return group.words.every((word) => selectedSet.has(word));
  });

  if (match) {
    connections.solved.push(match);
    connections.deck = connections.deck.filter((word) => !match.words.includes(word));
    connections.selected.clear();
    connections.message = `Correct! ${match.name} solved.`;
    playSfx({ freq: 520, endFreq: 760, duration: 0.12, type: "triangle", volume: 0.04 });
    playSfx({ freq: 880, endFreq: 1220, duration: 0.16, type: "triangle", volume: 0.045 });

    if (connections.solved.length === connectionsCategories.length) {
      connections.completed = true;
      connections.gameOver = true;
      connections.completeBanner = "";
      connections.message = "Challenge solved.";
      connections.transitionDelayMs = 0;
      playSfx({ freq: 560, endFreq: 920, duration: 0.2, type: "triangle", volume: 0.05 });
    }
  } else {
    playSfx({ freq: 230, endFreq: 180, duration: 0.12, type: "sawtooth", volume: 0.03 });
    connections.mistakesRemaining -= 1;
    const oneAway = connectionsCategories.some((group) => {
      if (isCategorySolved(group.name)) {
        return false;
      }
      let overlap = 0;
      for (const word of selectedWords) {
        if (group.words.includes(word)) {
          overlap += 1;
        }
      }
      return overlap === 3;
    });
    connections.selected.clear();
    if (connections.mistakesRemaining <= 0) {
      connections.mistakesRemaining = 0;
      connections.gameOver = true;
      connections.message = "Out of mistakes. Press Play Again to retry this challenge.";
    } else if (oneAway) {
      connections.message = "1 away!";
    } else {
      connections.message = "Not quite. Try another combination.";
    }
  }

  renderConnectionsUI();
}

function onKeyDown(event) {
  if (game.scene === SCENE.WORDLE) {
    if (event.key === "Enter") {
      event.preventDefault();
      submitWordleGuess();
      return;
    }
    if (event.key === "Backspace") {
      event.preventDefault();
      if (wordle.currentInput.length > 0) {
        wordle.currentInput = wordle.currentInput.slice(0, -1);
        renderWordleUI();
      }
      return;
    }
    if (/^[a-zA-Z]$/.test(event.key)) {
      event.preventDefault();
      if (wordle.currentInput.length < 5) {
        wordle.currentInput += event.key.toUpperCase();
        renderWordleUI();
      }
      return;
    }
    return;
  }

  const tag = event.target && event.target.tagName ? event.target.tagName.toUpperCase() : "";
  const isTypingField = tag === "INPUT" || tag === "TEXTAREA";
  if (isTypingField && event.code === "Space") {
    return;
  }

  if (event.code === "Space") {
    ensureAudio();
    event.preventDefault();
    if (!event.repeat) {
      onSpacePressed();
    }
    return;
  }

  if (game.scene === SCENE.DECODER && event.key === "Enter") {
    submitDecoder();
  }
}

function gameLoop(timestamp) {
  const dtMs = clamp(timestamp - game.lastTime, 0, 100);
  game.lastTime = timestamp;
  updateScene(dtMs);
  updateWalkGrassAudio();
  drawScene();
  requestAnimationFrame(gameLoop);
}

function installUIHandlers() {
  preStartBtn.addEventListener("click", () => {
    ensureAudio();
    startGameMusic();
    setScene(SCENE.HOME);
  });
  skipBtn.addEventListener("click", skipStage);

  beginBtn.addEventListener("click", () => {
    ensureAudio();
    playSfx({ freq: 400, endFreq: 520, duration: 0.08, volume: 0.03 });
    enterCityScene();
  });

  submitGroupBtn.addEventListener("click", submitConnectionsSelection);
  clearSelectionBtn.addEventListener("click", () => {
    if (connections.gameOver && !connections.completed) {
      resetConnections();
      return;
    }
    connections.selected.clear();
    connections.message = "Selection cleared.";
    renderConnectionsUI();
  });
  shuffleWordsBtn.addEventListener("click", () => {
    if (connections.completed || connections.gameOver) {
      return;
    }
    connections.deck = shuffleArray(connections.deck);
    connections.message = "Words shuffled.";
    renderConnectionsUI();
  });

  wordleSubmitBtn.addEventListener("click", submitWordleGuess);
  wordleResetBtn.addEventListener("click", () => {
    ensureAudio();
    resetWordle();
  });

  finalYesOneBtn.addEventListener("click", () => {
    ensureAudio();
    playSfx({ freq: 560, endFreq: 760, duration: 0.1, volume: 0.04 });
    enterFinalMessageScene();
  });
  finalYesTwoBtn.addEventListener("click", () => {
    ensureAudio();
    playSfx({ freq: 560, endFreq: 760, duration: 0.1, volume: 0.04 });
    enterFinalMessageScene();
  });

  decoderInput.addEventListener("input", () => {
    decoderInput.value = decoderInput.value.replace(/[^A-Za-z ]/g, "");
  });
  decoderSubmitBtn.addEventListener("click", submitDecoder);
  decoderHintBtn.addEventListener("click", () => {
    ensureAudio();
    playSfx({ freq: 360, endFreq: 420, duration: 0.07, volume: 0.03 });
    revealHint();
  });

  window.addEventListener("keydown", onKeyDown);
}

function startGame() {
  ctx.imageSmoothingEnabled = false;
  setupWalkers();
  installUIHandlers();
  setScene(SCENE.PRELUDE);

  requestAnimationFrame((timestamp) => {
    game.lastTime = timestamp;
    gameLoop(timestamp);
  });
  loadGhibliGallery();
}

gameMusic.addEventListener("ended", () => {
  if (!gameMusicLoopEnabled) {
    return;
  }
  if (gameMusicDelayTimeout) {
    clearTimeout(gameMusicDelayTimeout);
  }
  gameMusicDelayTimeout = setTimeout(() => {
    if (!gameMusicLoopEnabled) {
      return;
    }
    gameMusic.currentTime = 0;
    void gameMusic.play().catch(() => {});
  }, 3000);
});

endingMusic.addEventListener("ended", () => {
  if (!endingMusicLoopEnabled) {
    return;
  }
  if (endingMusicDelayTimeout) {
    clearTimeout(endingMusicDelayTimeout);
  }
  endingMusicDelayTimeout = setTimeout(() => {
    if (!endingMusicLoopEnabled) {
      return;
    }
    endingMusic.currentTime = 18.5;
    void endingMusic.play().catch(() => {});
  }, 3000);
});

function preloadImages() {
  const images = Object.values(assets);
  return Promise.all(
    images.map(
      (img) =>
        new Promise((resolve, reject) => {
          if (img.complete) {
            resolve();
            return;
          }
          img.addEventListener("load", resolve, { once: true });
          img.addEventListener("error", reject, { once: true });
        })
    )
  );
}

preloadImages()
  .then(() => {
    startGame();
  })
  .catch(() => {
    connectionsStatus.textContent = "Could not load game art assets.";
  });
