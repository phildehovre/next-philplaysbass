// Metronome vars
export const MIN_TEMPO_AS_STR = "10";
export const MAX_TEMPO_AS_STR = "220";
export const MAX_TEMPO_AS_NUM = Number(MAX_TEMPO_AS_STR);
export const MIN_TEMPO_AS_NUM = Number(MIN_TEMPO_AS_STR);

export const TOLERANCE = 40; // in millisecs
export const MS_LATENCY_OFFSET = 200;

export const COOLDOWN_MS = 250;

// Negative values will increase detection range for low volume inputs;
// The higher this goes, the harder the user has to play
// Recommended: -30
export const MIN_VOLUME_DB = -15;
export const MIN_CLARITY = 0.98;
export const MIN_PITCH_HZ = 40;
export const MAX_PITCH_HZ = 400;
