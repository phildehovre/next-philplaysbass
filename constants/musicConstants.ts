import { InstrumentPreset, Note } from "@/types/types";

export const arrayChromaticScale = [
	["C"],
	["C#", "Db"],
	["D"],
	["D#", "Eb"],
	["E"],
	["F"],
	["F#", "Gb"],
	["G"],
	["G#", "Ab"],
	["A"],
	["A#", "Bb"],
	["B"],
];

export const enharmonics: Record<string, UkeNote> = {
	C: "C",
	"B#": "C",
	"C#": "C#",
	Db: "C#",
	D: "D",
	"D#": "Eb",
	Eb: "Eb",
	E: "E",
	Fb: "E",
	F: "F",
	"E#": "F",
	"F#": "F#",
	Gb: "F#",
	G: "G",
	"G#": "Ab",
	Ab: "Ab",
	A: "A",
	"A#": "Bb",
	Bb: "Bb",
	B: "B",
	Cb: "B",
};

export type ScaleQuality = "major" | "minor" | "diminished" | "augmented";

export const formulae = {
	major: [0, 2, 4, 5, 7, 9, 11],
	minor: [0, 2, 3, 5, 7, 8, 10],
	diminished: [0, 2, 3, 5, 6, 8, 9, 11],
	augmented: [0, 3, 4, 7, 8, 11],
};
export const QUALITY: ScaleQuality[] = [
	"major",
	"minor",
	"diminished",
	"augmented",
];

export const NOTE_LETTER_ORDER = ["C", "D", "E", "F", "G", "A", "B"];

export const INVERSIONS = ["root", "first", "second"];

export const firstInversion = (arpeggio: Note[]): Note[] => {
	const [root, third, fifth] = arpeggio;
	return [third, fifth, root];
};

export const secondInversion = (arpeggio: Note[]): Note[] => {
	const [root, third, fifth] = arpeggio;
	return [fifth, root, third];
};

export const selectRandomInversion = (
	arpeggio: Note[]
): { inversion: string; invertedArpeggio: Note[] } => {
	const inversion = INVERSIONS[Math.floor(Math.random() * INVERSIONS.length)];
	let invertedArpeggio;
	switch (inversion) {
		case "root":
			invertedArpeggio = arpeggio;
			break;
		case "first":
			invertedArpeggio = firstInversion(arpeggio);
			break;
		case "second":
			invertedArpeggio = secondInversion(arpeggio);
			break;
		default:
			invertedArpeggio = arpeggio;
	}
	return { inversion, invertedArpeggio };
};

export const NOTE_FREQUENCIES: Record<Note, number> = {
	C: 261.63,
	"B#": 261.63, // enharmonic of C
	"C#": 277.18,
	Db: 277.18,
	D: 293.66,
	"D#": 311.13,
	Eb: 311.13,
	E: 329.63,
	Fb: 329.63, // enharmonic of E
	F: 349.23,
	"E#": 349.23, // enharmonic of F
	"F#": 369.99,
	Gb: 369.99,
	G: 392.0,
	"G#": 415.3,
	Ab: 415.3,
	A: 440.0,
	"A#": 466.16,
	Bb: 466.16,
	B: 493.88,
	Cb: 493.88, // enharmonic of B
};

export type UkuleleShape = [number, number, number, number];

export type UkeNote =
	| "C"
	| "C#"
	| "D"
	| "Eb"
	| "E"
	| "F"
	| "F#"
	| "G"
	| "Ab"
	| "A"
	| "Bb"
	| "B";

export type ChordType = "major" | "minor" | "diminished" | "augmented";

export const UKE_TUNING = ["G4", "C4", "E4", "A4"];

export const ukuleleChordShapes: Record<
	UkeNote,
	Record<ChordType, UkuleleShape>
> = {
	C: {
		major: [0, 0, 0, 3],
		minor: [0, 3, 3, 3],
		diminished: [2, 3, 2, 3],
		augmented: [1, 0, 0, 3],
	},
	"C#": {
		major: [1, 1, 1, 4],
		minor: [1, 4, 4, 4],
		diminished: [3, 4, 3, 4],
		augmented: [2, 1, 1, 4],
	},
	D: {
		major: [2, 2, 2, 0],
		minor: [2, 2, 1, 0],
		diminished: [1, 2, 1, 2],
		augmented: [3, 2, 2, 0],
	},
	Eb: {
		major: [3, 3, 3, 1],
		minor: [3, 3, 2, 1],
		diminished: [2, 3, 2, 3],
		augmented: [4, 3, 3, 1],
	},
	E: {
		major: [1, 4, 0, 2],
		minor: [0, 4, 3, 2],
		diminished: [3, 4, 3, 4],
		augmented: [2, 1, 1, 0],
	},
	F: {
		major: [2, 0, 1, 0],
		minor: [1, 0, 1, 3],
		diminished: [0, 1, 0, 1],
		augmented: [1, 0, 1, 4],
	},
	"F#": {
		major: [3, 1, 2, 1],
		minor: [2, 1, 2, 0],
		diminished: [1, 2, 1, 2],
		augmented: [2, 1, 2, 3],
	},
	G: {
		major: [0, 2, 3, 2],
		minor: [0, 2, 3, 1],
		diminished: [0, 1, 0, 1],
		augmented: [1, 2, 3, 2],
	},
	Ab: {
		major: [1, 3, 4, 3],
		minor: [1, 3, 4, 2],
		diminished: [1, 2, 1, 2],
		augmented: [2, 3, 4, 3],
	},
	A: {
		major: [2, 1, 0, 0],
		minor: [0, 0, 0, 3],
		diminished: [2, 3, 2, 3],
		augmented: [1, 0, 0, 3],
	},
	Bb: {
		major: [3, 2, 1, 1],
		minor: [1, 1, 1, 3],
		diminished: [1, 2, 1, 2],
		augmented: [2, 1, 1, 4],
	},
	B: {
		major: [4, 3, 2, 2],
		minor: [2, 2, 2, 4],
		diminished: [2, 3, 2, 3],
		augmented: [3, 2, 2, 5],
	},
};
export const guitarFrets: string[][] = [
	// 6th string — E2
	[
		"E2",
		"F2",
		"F#2",
		"G2",
		"G#2",
		"A2",
		"A#2",
		"B2",
		"C3",
		"C#3",
		"D3",
		"D#3",
		"E3",
	],
	// 5th string — A2
	[
		"A2",
		"A#2",
		"B2",
		"C3",
		"C#3",
		"D3",
		"D#3",
		"E3",
		"F3",
		"F#3",
		"G3",
		"G#3",
		"A3",
	],
	// 4th string — D3
	[
		"D3",
		"D#3",
		"E3",
		"F3",
		"F#3",
		"G3",
		"G#3",
		"A3",
		"A#3",
		"B3",
		"C4",
		"C#4",
		"D4",
	],
	// 3rd string — G3
	[
		"G3",
		"G#3",
		"A3",
		"A#3",
		"B3",
		"C4",
		"C#4",
		"D4",
		"D#4",
		"E4",
		"F4",
		"F#4",
		"G4",
	],
	// 2nd string — B3
	[
		"B3",
		"C4",
		"C#4",
		"D4",
		"D#4",
		"E4",
		"F4",
		"F#4",
		"G4",
		"G#4",
		"A4",
		"A#4",
		"B4",
	],
	// 1st string — E4
	[
		"E4",
		"F4",
		"F#4",
		"G4",
		"G#4",
		"A4",
		"A#4",
		"B4",
		"C5",
		"C#5",
		"D5",
		"D#5",
		"E5",
	],
];

export const INSTRUMENTS: Record<string, InstrumentPreset> = {
	guitar6: {
		label: "6-String Guitar (E–E)",
		strings: 6,
		active: [true, true, true, true, true, true],
	},
	bass4: {
		label: "4-String Bass (B–G)",
		strings: 4,
		active: [true, true, true, true],
	},
	bass5: {
		label: "5-String Bass (B–G)",
		strings: 5,
		active: [true, true, true, true, true],
	},
	bass5c: {
		label: "5-String Bass (E-C)",
		strings: 5,
		active: [true, true, true, true, true],
	},
	bass6: {
		label: "6-String Bass (B–C)",
		strings: 6,
		active: [true, true, true, true, true, true],
	},
	guitar7: {
		label: "7-String Guitar (B–E)",
		strings: 7,
		active: [true, true, true, true, true, true, true],
	},
};
