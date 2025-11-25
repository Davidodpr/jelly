// Mascot oneliners for different states and contexts

export const MASCOT_LOADING = [
  "Grabbing my magnifying glass...",
  "Digging through the data...",
  "Crunching numbers like a protein bar...",
  "Reading between the lines...",
  "Warming up my neurons...",
  "Checking under the hood...",
  "This might get spicy...",
  "Hold my coffee...",
];

export const MASCOT_ERROR = [
  "Even legends fumble sometimes. Try again?",
  "Oops. My bad. Let's pretend that didn't happen.",
  "Technical difficulties. I blame the intern.",
  "Houston, we have a problem. But we'll fix it.",
  "That didn't go as planned. Round two?",
];

export const MASCOT_SCORE_REACTIONS: Record<string, string[]> = {
  asleep: [
    "Ouch. But hey, nowhere to go but up!",
    "This is... an opportunity. A big one.",
    "I've seen worse. Actually no, this is pretty rough.",
    "Time to wake up and smell the revenue.",
  ],
  awake: [
    "You're stirring. Now let's get moving.",
    "Signs of life detected. Good start.",
    "Not bad, not great. Classic middle child energy.",
    "You're in the game, just not winning yet.",
  ],
  ready: [
    "Now we're cooking. Almost there.",
    "Solid foundation. Time to build.",
    "You've got the pieces, let's connect them.",
    "Ready for takeoff. Just need the fuel.",
  ],
  scaling: [
    "Oh, you're serious serious. Nice.",
    "This is giving... potential unicorn.",
    "Minor tweaks, major results incoming.",
    "You're playing chess while others play checkers.",
  ],
  exponential: [
    "Well well, look at you 👀",
    "Stop. You're making me blush.",
    "Is this even legal? This is too good.",
    "Someone's been doing their homework.",
    "I need to sit down. This is impressive.",
  ],
};

export const MASCOT_VERDICT_INTROS = [
  "Here's the truth bomb:",
  "Real talk:",
  "No sugarcoating:",
  "The diagnosis is in:",
  "Bottom line:",
];

// Get a random item from an array
export function getRandomItem<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

// Get mascot reaction based on score
export function getMascotReaction(score: number): string {
  if (score < 20) return getRandomItem(MASCOT_SCORE_REACTIONS.asleep);
  if (score < 40) return getRandomItem(MASCOT_SCORE_REACTIONS.awake);
  if (score < 60) return getRandomItem(MASCOT_SCORE_REACTIONS.ready);
  if (score < 80) return getRandomItem(MASCOT_SCORE_REACTIONS.scaling);
  return getRandomItem(MASCOT_SCORE_REACTIONS.exponential);
}

// Get random loading message
export function getMascotLoading(): string {
  return getRandomItem(MASCOT_LOADING);
}

// Get random error message
export function getMascotError(): string {
  return getRandomItem(MASCOT_ERROR);
}

// Get random verdict intro
export function getMascotVerdictIntro(): string {
  return getRandomItem(MASCOT_VERDICT_INTROS);
}
