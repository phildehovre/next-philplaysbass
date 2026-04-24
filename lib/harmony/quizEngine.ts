import { Note } from "@/types/types";
import {
	Answer,
	IntervalAnswer,
	PcSetAnswer,
	ProgressionAnswer,
	Question,
	QuestionKind,
	UserResponse,
} from "./quizTypes";
import {
	normalizePitchClass,
	pcEquals,
	samePcSet,
	semitoneDistance,
	transposePc,
} from "./pitch";
import { HarmonyFlashcardsSettings, DEFAULT_HARMONY_SETTINGS } from "./settings";

function uid() {
	return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

const INTERVALS: IntervalAnswer[] = [
	{ kind: "interval", semitones: 0, label: "P1" },
	{ kind: "interval", semitones: 1, label: "m2" },
	{ kind: "interval", semitones: 2, label: "M2" },
	{ kind: "interval", semitones: 3, label: "m3" },
	{ kind: "interval", semitones: 4, label: "M3" },
	{ kind: "interval", semitones: 5, label: "P4" },
	{ kind: "interval", semitones: 6, label: "TT" },
	{ kind: "interval", semitones: 7, label: "P5" },
	{ kind: "interval", semitones: 8, label: "m6" },
	{ kind: "interval", semitones: 9, label: "M6" },
	{ kind: "interval", semitones: 10, label: "m7" },
	{ kind: "interval", semitones: 11, label: "M7" },
];

function intervalLabelFromSemitones(semitones: number) {
	return INTERVALS.find((i) => i.semitones === semitones)?.label ?? `${semitones}st`;
}

function normalizeIntervalLabel(label: string) {
	const raw = label.trim();
	// Allow common synonyms for tritone naming
	if (raw === "A4" || raw === "d5") return "TT";
	return raw;
}

export type QuizConfig = HarmonyFlashcardsSettings;

export const DEFAULT_QUIZ_CONFIG: QuizConfig = DEFAULT_HARMONY_SETTINGS;

function weightedPick(weights: Record<QuestionKind, number>): QuestionKind {
	const entries = Object.entries(weights) as Array<[QuestionKind, number]>;
	const positive = entries.filter(([, w]) => typeof w === "number" && w > 0);
	if (positive.length === 0) return "fifthOf";
	const total = positive.reduce((acc, [, w]) => acc + w, 0);
	let r = Math.random() * total;
	for (const [k, w] of positive) {
		r -= w;
		if (r <= 0) return k;
	}
	return positive[positive.length - 1][0];
}

function pickKey(settings: QuizConfig, rootPool: Note[]): { key: Note; quality: "major" | "minor" } {
	const key = normalizePitchClass(rootPool[Math.floor(Math.random() * rootPool.length)]) as Note;
	const majors = settings.includeMajorKeys !== false;
	const minors = settings.includeMinorKeys === true;
	const quality: "major" | "minor" =
		majors && minors ? (Math.random() < 0.5 ? "major" : "minor") : minors ? "minor" : "major";
	return { key, quality };
}

function diatonicIiV(key: Note, keyQuality: "major" | "minor", chordMode: "triad" | "seventh") {
	// We compute roots by scale degrees; qualities are pragmatic (functional harmony defaults).
	// Major: ii (min / min7), V (maj / 7)
	// Minor: ii° (dim / ø7), V (maj / 7) using harmonic minor convention for V.
	const iiRoot = transposePc(key, 2);
	const vRoot = transposePc(key, 7);

	if (keyQuality === "major") {
		return {
			numerals: ["ii", "V"],
			chords:
				chordMode === "seventh"
					? [
							{ root: iiRoot, quality: "m7" },
							{ root: vRoot, quality: "7" },
					  ]
					: [
							{ root: iiRoot, quality: "m" },
							{ root: vRoot, quality: "M" },
					  ],
		};
	}

	return {
		numerals: ["ii°", "V"],
		chords:
			chordMode === "seventh"
				? [
						{ root: iiRoot, quality: "ø7" },
						{ root: vRoot, quality: "7" },
				  ]
				: [
						{ root: iiRoot, quality: "dim" },
						{ root: vRoot, quality: "M" },
				  ],
	};
}

export function generateQuestion(kind: QuestionKind, rootPool: Note[], config: QuizConfig): Question {
	const pick = () => rootPool[Math.floor(Math.random() * rootPool.length)];

	if (kind === "fifthOf") {
		const root = normalizePitchClass(pick()) as Note;
		const fifth = transposePc(root, 7);
		return {
			id: uid(),
			kind,
			prompt: `What is the fifth of ${root}?`,
			expected: { kind: "note", value: fifth },
			meta: { root },
		};
	}

	if (kind === "iiVInMajor") {
		const { key, quality } = pickKey(config, rootPool);
		const { numerals, chords } = diatonicIiV(key, quality, config.chordMode);

		const expected: ProgressionAnswer = {
			kind: "progression",
			key,
			quality,
			numerals,
			chords,
		};

		return {
			id: uid(),
			kind,
			prompt: `What is the ii–V chord progression in ${key} ${quality}? (roots)`,
			expected,
			meta: { key, quality, chordMode: config.chordMode },
		};
	}

	if (kind === "intervalBetween") {
		const from = normalizePitchClass(pick()) as Note;
		let to = normalizePitchClass(pick()) as Note;
		let attempts = 0;
		while (pcEquals(from, to) && attempts < 10) {
			to = normalizePitchClass(pick()) as Note;
			attempts++;
		}
		const semitones = semitoneDistance(from, to);
		const label = intervalLabelFromSemitones(semitones);

		return {
			id: uid(),
			kind,
			prompt: `What is ${from} to ${to}? (interval)`,
			expected: { kind: "interval", semitones, label },
			meta: { from, to },
		};
	}

	// spellHalfDim
	{
		const root = normalizePitchClass(pick()) as Note;
		// Half diminished 7 (m7b5): 1 b3 b5 b7
		const notes: Note[] = [
			root,
			transposePc(root, 3),
			transposePc(root, 6),
			transposePc(root, 10),
		];

		const expected: PcSetAnswer = { kind: "pcset", notes };
		return {
			id: uid(),
			kind: "spellHalfDim",
			prompt: `What notes are in an ${root} half diminished chord? (select all)`,
			expected,
			meta: { root },
		};
	}
}

export function nextQuestion(config: QuizConfig, rootPool: Note[]): Question {
	const kind = weightedPick(config.weights);
	return generateQuestion(kind, rootPool, config);
}

export function checkAnswer(question: Question, response: UserResponse): { correct: boolean; correctAnswer: Answer } {
	const expected = question.expected;

	if (expected.kind === "note") {
		if (response.kind !== "note") return { correct: false, correctAnswer: expected };
		return { correct: pcEquals(expected.value, response.value), correctAnswer: expected };
	}

	if (expected.kind === "interval") {
		if (response.kind !== "interval") return { correct: false, correctAnswer: expected };
		const gotLabel = normalizeIntervalLabel(response.label);
		const expectedLabel = normalizeIntervalLabel(expected.label);
		if (gotLabel === expectedLabel) return { correct: true, correctAnswer: expected };
		// If caller supplies semitones, also accept by semitone equivalence.
		if (typeof response.semitones === "number") {
			return {
				correct: response.semitones % 12 === expected.semitones % 12,
				correctAnswer: expected,
			};
		}
		return { correct: false, correctAnswer: expected };
	}

	if (expected.kind === "pcset") {
		if (response.kind !== "pcset") return { correct: false, correctAnswer: expected };
		return { correct: samePcSet(expected.notes, response.notes), correctAnswer: expected };
	}

	// progression
	if (response.kind !== "progression") return { correct: false, correctAnswer: expected };
	const expectedRoots = expected.chords.map((c) => c.root);
	const got = response.chordRoots;
	const correct =
		got.length === expectedRoots.length &&
		got.every((r, i) => pcEquals(r, expectedRoots[i]));
	return { correct, correctAnswer: expected };
}

