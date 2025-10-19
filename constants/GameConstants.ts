export const NOTE_MATCH_TYPE = "note-match" as const;
export const RHYTHM_ACCURACY_TYPE = "rhythm-accuracy" as const;
export const FREE_PRACTICE_TYPE = "free-practice" as const;

export type GameType =
	| typeof NOTE_MATCH_TYPE
	| typeof RHYTHM_ACCURACY_TYPE
	| typeof FREE_PRACTICE_TYPE;

export const GAME_LABELS: Record<GameType, string> = {
	[NOTE_MATCH_TYPE]: "Note Match",
	[RHYTHM_ACCURACY_TYPE]: "Rhythm Game",
	[FREE_PRACTICE_TYPE]: "Free Practice",
};

// Metronome vars
export const MIN_TEMPO_AS_STR = "10";
export const MAX_TEMPO_AS_STR = "220";
export const MAX_TEMPO_AS_NUM = Number(MAX_TEMPO_AS_STR);
export const MIN_TEMPO_AS_NUM = Number(MIN_TEMPO_AS_STR);

export const TOLERANCE = 100; // in millisecs
export const MS_LATENCY_OFFSET = 175;

export const COOLDOWN_MS = 250;

// Negative values will increase detection range for low volume inputs;
// The higher this goes, the harder the user has to play
// Recommended: -30
export const MIN_VOLUME_DB = -15;
export const MIN_CLARITY = 0.8;
export const MIN_PITCH_HZ = 40;
export const MAX_PITCH_HZ = 1500;

export const LINIENCY_COEFFICIENT = 1.5;
