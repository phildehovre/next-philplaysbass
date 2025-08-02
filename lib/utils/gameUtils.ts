import {
	arrayChromaticScale,
	formulae,
	NOTE_LETTER_ORDER,
	ScaleQuality,
} from "@/constants/chromaticScale";
import { Note, NoteEvent } from "@/types/types";

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

const NOTE_NAMES = [
	"C",
	"C#",
	"D",
	"D#",
	"E",
	"F",
	"F#",
	"G",
	"G#",
	"A",
	"A#",
	"B",
];

// A4 = 440 Hz, MIDI number 69
export function getNoteFromPitch(frequency: number) {
	const A4 = 440;
	const SEMITONES_PER_OCTAVE = 12;

	const midiNumber = Math.round(
		SEMITONES_PER_OCTAVE * Math.log2(frequency / A4) + 69
	);

	const noteIndex = midiNumber % 12;
	const octave = Math.floor(midiNumber / 12) - 1;
	const noteName = NOTE_NAMES[noteIndex];

	const closestFreq = A4 * Math.pow(2, (midiNumber - 69) / 12);
	const centsOff = 1200 * Math.log2(frequency / closestFreq);

	return {
		noteName,
		octave,
		centsOff,
		display: `${noteName}${octave}`,
	};
}

export const calculateMsOffset = (bpm: number, lastTickTime: number | null) => {
	const noteTime = performance.now() - 236;
	const tempoInterval = (60 / bpm) * 1000;

	if (lastTickTime && tempoInterval) {
		const diff = noteTime - lastTickTime;

		// Use modulo to handle notes slightly after or before the beat
		const timeFromBeat = diff % tempoInterval;
		const msFromClick =
			timeFromBeat > tempoInterval / 2
				? timeFromBeat - tempoInterval
				: timeFromBeat;
		return msFromClick;
	}
};
const processRhythmicalAccuracy = (offsetMs: number | undefined): number => {
	if (offsetMs) {
		const absOffset = Math.abs(offsetMs);

		if (absOffset <= 10) return 1.0; // Bullseye
		if (absOffset <= 50) return 0.75; // very good
		if (absOffset <= 100) return 0.5; // good
		if (absOffset <= 150) return 0.25; // acceptable
	}
	return 0.0;
};

const processPitchAccuracy = (
	played: string | undefined,
	expected: string | undefined
): number => {
	if (played && expected) {
		if (played === expected) return 1.0;
	} else {
		const error = `missing arguments 'played' or 'expected'`;
		console.log(
			"%cerror lib/utils/gameUtils.ts: line:161 ",
			"color: red; display: block; width: 100%;",
			error
		);
	}
	return 0.0;
};

const processComboBonus = (
	rhythmScore: number,
	pitchScore: number,
	tempo: number
): number => {
	if (rhythmScore === 1 && pitchScore === 1) {
		const bonusMultiplier = Math.min(tempo / 120, 2); // scale up to 2x
		return 1.0 * bonusMultiplier;
	}
	return 0;
};

export const processEventScore = (
	event: NoteEvent | undefined,
	options: any
) => {
	const { bpm } = options;
	if (!event) return null;
	const rhythmScore = processRhythmicalAccuracy(event.metronomeOffsetMs);
	const pitchScore = processPitchAccuracy(event.playedNote, event.expectedNote);
	const comboBonus = processComboBonus(rhythmScore, pitchScore, bpm);

	const totalScore = (rhythmScore + pitchScore) * 50 + comboBonus * 100;

	console.log("🎯 Scoring Event:", {
		rhythmScore,
		pitchScore,
		comboBonus,
		totalScore,
	});

	return totalScore;
};
