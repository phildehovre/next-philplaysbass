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
