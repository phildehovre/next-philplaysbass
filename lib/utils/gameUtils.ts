import {
	arrayChromaticScale,
	formulae,
	NOTE_LETTER_ORDER,
	ScaleQuality,
} from "@/constants/chromaticScale";
import { Note } from "@/types/types";

export function shuffleArray(arr: string[]): string[] {
	const result = [...arr]; // Create a copy to avoid mutating the original array
	for (let i = result.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[result[i], result[j]] = [result[j], result[i]];
	}
	return result;
}

export const buildScale = (
	startingNote: string,
	quality: ScaleQuality
): Note[] => {
	const rootIndex = arrayChromaticScale.findIndex((arr) =>
		arr.includes(startingNote)
	);
	if (rootIndex === -1) throw new Error("Invalid starting note");

	// Rotate the chromatic scale so it starts from the root
	const rotatedScale = [
		...arrayChromaticScale.slice(rootIndex),
		...arrayChromaticScale.slice(0, rootIndex),
	];

	const formula = formulae[quality];

	// Determine the expected letter sequence (e.g. for "D" -> D E F G A B C)
	const rootLetter = startingNote[0].toUpperCase();
	const rootLetterIndex = NOTE_LETTER_ORDER.indexOf(rootLetter);
	const expectedLetters = [
		...NOTE_LETTER_ORDER.slice(rootLetterIndex),
		...NOTE_LETTER_ORDER.slice(0, rootLetterIndex),
	];

	// Build the scale by applying the formula and picking correct enharmonics
	const finalScale: string[] = [];

	formula.forEach((step, i) => {
		const options = rotatedScale[step]; // e.g. ["D#", "Eb"]
		const expectedLetter = expectedLetters[i];

		// Find a note option that matches the expected letter
		const match = options.find(
			(note) => note[0].toUpperCase() === expectedLetter
		);
		finalScale.push(match || options[0]); // fallback to first enharmonic if no match
	});

	return finalScale as Note[];
};

export const buildNaturalScale = (startingNote: string) => {
	const startingArray = arrayChromaticScale.find((item, index) => {
		return item.some((i) => i === startingNote);
	});
	if (!startingArray) return;
	const startingIndex = arrayChromaticScale.indexOf(startingArray);
	const scale = [
		...arrayChromaticScale.slice(startingIndex),
		...arrayChromaticScale.slice(0, startingIndex),
	];
	return scale;
};

export const selectRandomNote = () => {
	let rIndex =
		Math.round(Math.random() * arrayChromaticScale.length) %
		arrayChromaticScale.length;
	let selected = arrayChromaticScale[rIndex];
	var accidental = "";
	if (!selected) {
		let i = arrayChromaticScale.indexOf(selected);
		selected = arrayChromaticScale[i];
	}
	if (selected[1]) {
		return Math.random() > 0.5 ? selected[0] : selected[1];
	}
	return selected[0] as Note;
};
