import { QuestionKind } from "./quizTypes";

export type ChordMode = "triad" | "seventh";

export type HarmonyFlashcardsSettings = {
	weights: Record<QuestionKind, number>;
	includeMajorKeys: boolean;
	includeMinorKeys: boolean;
	chordMode: ChordMode;
};

export const DEFAULT_HARMONY_SETTINGS: HarmonyFlashcardsSettings = {
	weights: {
		fifthOf: 1,
		iiVInMajor: 1,
		intervalBetween: 1,
		spellHalfDim: 1,
	},
	includeMajorKeys: true,
	includeMinorKeys: false,
	chordMode: "seventh",
};

const STORAGE_KEY = "harmonyFlashcardsSettings";

export function loadHarmonySettings(): HarmonyFlashcardsSettings {
	if (typeof window === "undefined") return DEFAULT_HARMONY_SETTINGS;
	const raw = window.localStorage.getItem(STORAGE_KEY);
	if (!raw) return DEFAULT_HARMONY_SETTINGS;
	try {
		const parsed = JSON.parse(raw) as Partial<HarmonyFlashcardsSettings>;
		return {
			...DEFAULT_HARMONY_SETTINGS,
			...parsed,
			weights: {
				...DEFAULT_HARMONY_SETTINGS.weights,
				...(parsed.weights ?? {}),
			},
		};
	} catch {
		return DEFAULT_HARMONY_SETTINGS;
	}
}

export function saveHarmonySettings(next: HarmonyFlashcardsSettings) {
	if (typeof window === "undefined") return;
	window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
}

