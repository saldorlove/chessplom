const SOUND_ENABLED_KEY = "zugzwang_sound_enabled_v1";

export type ChessSoundName =
  | "move"
  | "capture"
  | "check"
  | "checkmate"
  | "gameEnd"
  | "game-end"
  | "win"
  | "lose"
  | "draw"
  | "error"
  | "success"
  | "toggle";

type SoundSubscriber = (enabled: boolean) => void;

const subscribers = new Set<SoundSubscriber>();

const SOUND_FILES: Record<ChessSoundName, string> = {
  move: "/sounds/move.mp3",
  capture: "/sounds/capture.mp3",
  check: "/sounds/check.wav",
  checkmate: "/sounds/checkmate.wav",
  gameEnd: "/sounds/game-end.wav",
  "game-end": "/sounds/game-end.wav",
  win: "/sounds/win.wav",
  lose: "/sounds/lose.wav",
  draw: "/sounds/draw.wav",
  error: "/sounds/error.wav",
  success: "/sounds/success.wav",
  toggle: "/sounds/toggle.wav",
};

const audioCache = new Map<string, HTMLAudioElement>();

function getAudio(sound: ChessSoundName) {
  if (typeof window === "undefined") return null;

  const src = SOUND_FILES[sound];

  if (!audioCache.has(src)) {
    const audio = new Audio(src);
    audio.preload = "auto";
    audio.volume = 0.65;
    audioCache.set(src, audio);
  }

  return audioCache.get(src) ?? null;
}

function readSoundEnabled() {
  try {
    const storedValue = localStorage.getItem(SOUND_ENABLED_KEY);
    if (storedValue === null) return true;
    return storedValue === "true";
  } catch {
    return true;
  }
}

function writeSoundEnabled(enabled: boolean) {
  try {
    localStorage.setItem(SOUND_ENABLED_KEY, String(enabled));
  } catch {
    // ignore
  }
}

function notifySoundSubscribers(enabled: boolean) {
  subscribers.forEach((subscriber) => subscriber(enabled));
}

export function isSoundEnabled() {
  return readSoundEnabled();
}

export function getSoundEnabled() {
  return readSoundEnabled();
}

export function setSoundEnabled(enabled: boolean, playPreview = false) {
  writeSoundEnabled(enabled);
  notifySoundSubscribers(enabled);

  if (enabled && playPreview) {
    window.setTimeout(() => {
      playChessSound("toggle");
    }, 0);
  }
}

export function toggleSoundEnabled(playPreview = true) {
  const nextEnabled = !readSoundEnabled();
  setSoundEnabled(nextEnabled, playPreview);
  return nextEnabled;
}

export function subscribeSoundEnabled(subscriber: SoundSubscriber) {
  subscribers.add(subscriber);
  return () => subscribers.delete(subscriber);
}

export function subscribeToSoundSettings(subscriber: SoundSubscriber) {
  return subscribeSoundEnabled(subscriber);
}

export function preloadChessSounds() {
  Object.keys(SOUND_FILES).forEach((soundName) => {
    getAudio(soundName as ChessSoundName);
  });
}

export function playChessSound(sound: ChessSoundName) {
  if (!readSoundEnabled()) return;

  const audio = getAudio(sound);
  if (!audio) return;

  const instance = audio.cloneNode(true) as HTMLAudioElement;
  instance.volume = audio.volume;

  instance.play().catch(() => {
    // Браузер может блокировать звук до первого клика по странице.
  });
}

export function playSound(sound: ChessSoundName) {
  playChessSound(sound);
}

export function playTestSound() {
  playChessSound("toggle");
}

preloadChessSounds();
