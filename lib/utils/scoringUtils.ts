import { NoteEvent, Score } from "@/types/types";

export const processRhythmicalAccuracy = (
	offsetMs: number | undefined,
	bpm: number
): number => {
	if (offsetMs === undefined) return 0;

	const absOffset = Math.abs(offsetMs);

	// Wider tolerance at slower BPM (optional)
	const beatWindow = 60000 / bpm / 2; // half-beat duration
	const maxOffset = Math.min(200, beatWindow); // cap at 200ms

	// Perfect / Great / Good thresholds
	const perfect = 30;
	const great = 70;
	const good = 120;

	let score;
	if (absOffset <= perfect) {
		score = 100; // perfect timing
	} else if (absOffset <= great) {
		// decay from 100 → 80
		score = 80 + ((great - absOffset) / (great - perfect)) * 20;
	} else if (absOffset <= good) {
		// decay from 80 → 50
		score = 50 + ((good - absOffset) / (good - great)) * 30;
	} else if (absOffset <= maxOffset) {
		// decay from 50 → 10
		score = 10 + ((maxOffset - absOffset) / (maxOffset - good)) * 40;
	} else {
		score = 0; // too far off
	}

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

	const rhythm = processRhythmicalAccuracy(
		event.metronomeOffsetMs,
		options.bpm
	);
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
