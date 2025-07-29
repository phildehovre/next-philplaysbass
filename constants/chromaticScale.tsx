import { Note } from "@/types/types";

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
