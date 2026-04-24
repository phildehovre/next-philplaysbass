import { Note } from "@/types/types";

export type IntervalAnswer = {
	kind: "interval";
	semitones: number;
	label: string;
};

export type NoteAnswer = {
	kind: "note";
	value: Note;
};

export type PcSetAnswer = {
	kind: "pcset";
	notes: Note[];
};

export type ProgressionAnswer = {
	kind: "progression";
	key: Note;
	quality: "major" | "minor";
	numerals: string[];
	chords: { root: Note; quality: string }[];
};

export type Answer = NoteAnswer | IntervalAnswer | PcSetAnswer | ProgressionAnswer;

export type QuestionKind = "fifthOf" | "iiVInMajor" | "intervalBetween" | "spellHalfDim";

export type Question = {
	id: string;
	kind: QuestionKind;
	prompt: string;
	expected: Answer;
	// Optional UI hints (helps render step-based answering)
	meta?: Record<string, unknown>;
};

export type UserResponse =
	| { kind: "note"; value: Note }
	| { kind: "interval"; label: string; semitones?: number }
	| { kind: "pcset"; notes: Note[] }
	| { kind: "progression"; chordRoots: Note[] };

