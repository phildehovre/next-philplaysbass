import {
	NOTE_MATCH_TYPE,
	RHYTHM_ACCURACY_TYPE,
} from "@/constants/GameConstants";
import { GameTypes, NoteEvent, Score } from "@/types/types";

export interface GameScoringOptions {
	bpm: number;
	gameType: GameTypes | undefined;
	streak: number;
}

interface NoteMatchOptions extends GameScoringOptions {
	withTimer: boolean;
	withMetronome: boolean;
}
interface RhythmAccuracyOptions extends GameScoringOptions {}

export const processRhythmicalAccuracy = (
	offsetMs: number | undefined,
	bpm: number
): { accuracyPct: number; score: number } => {
	if (offsetMs === undefined || !bpm) return { accuracyPct: 0, score: 0 };

	const absOffset = Math.abs(offsetMs);

	// Wider tolerance at slower BPM (optional)
	const beatWindow = 60000 / bpm / 2; // half-beat duration
	const maxOffset = Math.min(200, beatWindow); // cap at 200ms

	// Accuracy percentage: 100% on-time → 0% at edge of window
	const accuracyPct = Math.max(
		0,
		Math.min(100, (1 - absOffset / maxOffset) * 100)
	);

	// Score = proportional to accuracy (0 → 100)
	const score = Math.round(accuracyPct);

	console.log(
		`scoringUtils: offset = ${offsetMs}ms, raw accuracy = ${accuracyPct.toFixed(
			1
		)}%, allocated score = ${score}`
	);

	return { accuracyPct, score };
};

export const processPitchAccuracy = (
	played: string | undefined,
	expected: string | undefined
): number => {
	if (played && expected && played === expected) {
		console.log(played, expected);
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
		const bonusMultiplier = Math.min(tempo / 120, 2);
		return 100 * bonusMultiplier;
	}
	return 0;
};

export const processEventScore = (
	event: NoteEvent | undefined,
	options: GameScoringOptions
): Score => {
	if (!event) return { rhythm: 0, pitch: 0, bonus: 0 };
	let score;
	switch (options.gameType) {
		case NOTE_MATCH_TYPE:
			score = processNoteMatchEventScore(event, options as NoteMatchOptions);
			break;
		case RHYTHM_ACCURACY_TYPE:
			score = processRhythmAccuracyEventScore(
				event,
				options as RhythmAccuracyOptions
			);
			break;
		default:
			score = { rhythm: 0, pitch: 0, bonus: 0 };
			break;
	}

	const streakFactor = calculateStreakFactor(options.streak);

	score = {
		rhythm: score.rhythm * streakFactor,
		pitch: score.pitch * streakFactor,
		bonus: score.bonus * streakFactor,
	};

	return score;
};

export const calculateStreakFactor = (streak: number) => {
	let factor = Math.floor(streak / 5);
	if (factor == 0) return 1;
	if (factor > 0) {
		factor += 1;
	}
	return factor;
};

const processNoteMatchEventScore = (
	event: NoteEvent,
	options: NoteMatchOptions
): Score => {
	const { withTimer, withMetronome, bpm } = options;
	let rhythm = 0,
		pitch = 0,
		bonus = 0;

	pitch = event.isCorrect ? 100 : 0;
	if (pitch == 0) {
		return { rhythm: 0, bonus: 0, pitch: 0 };
	}
	if (withMetronome && event.timeToHitMs) {
		const { score } = processRhythmicalAccuracy(event.metronomeOffsetMs, bpm);
		rhythm = score;
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
	const { score: rhythm } = processRhythmicalAccuracy(
		event.metronomeOffsetMs,
		bpm
	);
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
): [number, Score] => {
	if (events.length === 0) {
		return [0, { rhythm: 0, pitch: 0, bonus: 0 }];
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
		bonus: Math.round(total.bonus / count),
	};
	const totalScore = total.rhythm + total.pitch + total.bonus;

	return [totalScore, normalized];
};
