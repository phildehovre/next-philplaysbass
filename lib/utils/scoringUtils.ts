import { NoteEvent, Score } from "@/types/types";

export const processRhythmicalAccuracy = (
	offsetMs: number | undefined
): number => {
	if (offsetMs === undefined) return 0;

	const absOffset = Math.abs(offsetMs);
	const maxOffset = 150; // ms
	const softEdge = maxOffset / 2;
	const x = absOffset - softEdge;

	const steepness = 0.05;
	const sigmoid = 1 / (1 + Math.exp(steepness * x));

	// Normalize and scale to 0–100
	const score = 100 * (2 * (sigmoid - 0.5));

	return Math.round(score);
};

export const processPitchAccuracy = (
	played: string | undefined,
	expected: string | undefined
): number => {
	if (played && expected && played === expected) {
		return 100;
	}
	return 0;
};

export const processComboBonus = (
	rhythmScore: number,
	pitchScore: number,
	options: any
): number => {
	const { bpm: tempo } = options;
	if (rhythmScore === 100 && pitchScore === 100) {
		const bonusMultiplier = Math.min(tempo / 120, 2); // up to 2x
		return 100 * bonusMultiplier;
	}
	return 0;
};

export const processEventScore = (
	event: NoteEvent | undefined,
	options: { bpm: number }
): Score => {
	if (!event) return { rhythm: 0, pitch: 0, bonus: 0 };

	const rhythm = processRhythmicalAccuracy(event.metronomeOffsetMs);
	const pitch = processPitchAccuracy(event.playedNote, event.expectedNote);
	let bonus = 0;
	if (options) {
		bonus = processComboBonus(rhythm, pitch, options);
	}

	return { rhythm, pitch, bonus };
};
export const processNormalizedScore = (
	events: NoteEvent[],
	options: { bpm: number }
) => {
	if (events.length === 0) {
		return { rhythm: 0, pitch: 0, bonus: 0 };
	}

	const total = { rhythm: 0, pitch: 0, bonus: 0 };

	events.forEach((event) => {
		const result = processEventScore(event, options);
		total.rhythm += result.rhythm;
		total.pitch += result.pitch;
		total.bonus += result.bonus;
	});

	const count = events.length;

	const normalized = {
		rhythm: Math.round(total.rhythm / count),
		pitch: Math.round(total.pitch / count),
		bonus: Math.round(total.bonus / count), // optional
	};

	return normalized;
};
