import {
	NOTE_MATCH_TYPE,
	RHYTHM_ACCURACY_TYPE,
} from "@/components/games/GameConstants";
import { GameTypes, NoteEvent, Score } from "@/types/types";

export interface GameScoringOptions {
	bpm: number;
	gameType: GameTypes;
}

interface NoteMatchOptions extends GameScoringOptions {
	withTimer: boolean;
	withMetronome: boolean;
}
interface RhythmAccuracyOptions extends GameScoringOptions {}

export const processRhythmicalAccuracy = (
	offsetMs: number | undefined,
	bpm: number
): number => {
	if (offsetMs === undefined || !bpm) return 0;

	console.log("FX OFFSET:: ", offsetMs);
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
	options: GameScoringOptions
): Score => {
	if (!event) return { rhythm: 0, pitch: 0, bonus: 0 };
	switch (options.gameType) {
		case NOTE_MATCH_TYPE:
			return processNoteMatchEventScore(event, options as NoteMatchOptions);
		case RHYTHM_ACCURACY_TYPE:
			return processRhythmAccuracyEventScore(
				event,
				options as RhythmAccuracyOptions
			);
		default:
			return { rhythm: 0, pitch: 0, bonus: 0 };
	}
};

const processNoteMatchEventScore = (
	event: NoteEvent,
	options: NoteMatchOptions
): Score => {
	const { withTimer, withMetronome, bpm } = options;
	let rhythm = 0,
		pitch = 0,
		bonus = 0;

	pitch = processPitchAccuracy(event.playedNote, event.expectedNote);

	console.log(withMetronome);
	if (withMetronome) {
		console.log("Firing function");
		rhythm = processRhythmicalAccuracy(event.metronomeOffsetMs, bpm);
	}
	if (withTimer && event.timeToHitMs) {
		bonus = processAnswerSpeed(event.timeToHitMs);
	}

	return { rhythm, bonus, pitch };
};

const processRhythmAccuracyEventScore = (
	event: NoteEvent,
	options: RhythmAccuracyOptions
): Score => {
	const { bpm } = options;
	let rhythm = processRhythmicalAccuracy(event.metronomeOffsetMs, bpm);
	return { rhythm, pitch: 0, bonus: 0 };
};

const processAnswerSpeed = (timeToHit: number) => {
	if (timeToHit <= 100) {
		return 200;
	} else if (timeToHit <= 500) {
		return 100;
	} else if (timeToHit <= 1000) {
		return 50;
	} else {
		return 0;
	}
};

export const processNormalizedScore = (
	events: NoteEvent[],
	options: GameScoringOptions
): Score => {
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
