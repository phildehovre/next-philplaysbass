import { ArpeggioMap } from "@/types/types";

export default ["C", "", "D", "", "E", "F", "", "G", "", "A", "", "B"];
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

export const formulae = {
	major: [0, 2, 4, 5, 7, 9, 11],
	minor: [0, 2, 3, 5, 7, 8, 10],
};
export const arpeggios: ArpeggioMap = {
	C: {
		major: ["C", "E", "G"],
		minor: ["C", "Eb", "G"],
		diminished: ["C", "Eb", "Gb"],
		augmented: ["C", "E", "G#"],
	},
	"C#": {
		major: ["C#", "F", "G#"],
		minor: ["C#", "E", "G#"],
		diminished: ["C#", "E", "G"],
		augmented: ["C#", "F", "A"],
	},
	Db: {
		major: ["Db", "F", "Ab"],
		minor: ["Db", "E", "Ab"], // E instead of Fb for clarity
		diminished: ["Db", "E", "G"],
		augmented: ["Db", "F", "A"],
	},
	D: {
		major: ["D", "F#", "A"],
		minor: ["D", "F", "A"],
		diminished: ["D", "F", "Ab"],
		augmented: ["D", "F#", "A#"],
	},
	"D#": {
		major: ["D#", "G", "A#"],
		minor: ["D#", "F#", "A#"],
		diminished: ["D#", "F#", "A"],
		augmented: ["D#", "G", "B"],
	},
	Eb: {
		major: ["Eb", "G", "Bb"],
		minor: ["Eb", "Gb", "Bb"],
		diminished: ["Eb", "Gb", "A"],
		augmented: ["Eb", "G", "B"],
	},
	E: {
		major: ["E", "G#", "B"],
		minor: ["E", "G", "B"],
		diminished: ["E", "G", "Bb"],
		augmented: ["E", "G#", "C"],
	},
	F: {
		major: ["F", "A", "C"],
		minor: ["F", "Ab", "C"],
		diminished: ["F", "Ab", "B"],
		augmented: ["F", "A", "C#"],
	},
	"F#": {
		major: ["F#", "A#", "C#"],
		minor: ["F#", "A", "C#"],
		diminished: ["F#", "A", "C"],
		augmented: ["F#", "A#", "D"],
	},
	Gb: {
		major: ["Gb", "Bb", "Db"],
		minor: ["Gb", "A", "Db"],
		diminished: ["Gb", "A", "C"],
		augmented: ["Gb", "Bb", "D"],
	},
	G: {
		major: ["G", "B", "D"],
		minor: ["G", "Bb", "D"],
		diminished: ["G", "Bb", "Db"],
		augmented: ["G", "B", "D#"],
	},
	"G#": {
		major: ["G#", "C", "D#"],
		minor: ["G#", "B", "D#"],
		diminished: ["G#", "B", "D"],
		augmented: ["G#", "C", "E"],
	},
	Ab: {
		major: ["Ab", "C", "Eb"],
		minor: ["Ab", "B", "Eb"],
		diminished: ["Ab", "B", "D"],
		augmented: ["Ab", "C", "E"],
	},
	A: {
		major: ["A", "C#", "E"],
		minor: ["A", "C", "E"],
		diminished: ["A", "C", "Eb"],
		augmented: ["A", "C#", "F"],
	},
	"A#": {
		major: ["A#", "D", "F"],
		minor: ["A#", "C#", "F"],
		diminished: ["A#", "C#", "E"],
		augmented: ["A#", "D", "F#"],
	},
	Bb: {
		major: ["Bb", "D", "F"],
		minor: ["Bb", "Db", "F"],
		diminished: ["Bb", "Db", "E"],
		augmented: ["Bb", "D", "F#"],
	},
	B: {
		major: ["B", "D#", "F#"],
		minor: ["B", "D", "F#"],
		diminished: ["B", "D", "F"],
		augmented: ["B", "D#", "G"],
	},
	Cb: {
		major: ["Cb", "Eb", "Gb"],
		minor: ["Cb", "D", "Gb"],
		diminished: ["Cb", "D", "F"],
		augmented: ["Cb", "Eb", "G"],
	},
};
