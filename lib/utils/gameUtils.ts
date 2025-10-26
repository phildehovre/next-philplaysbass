import { MS_LATENCY_OFFSET } from "@/constants/gameConstants";
import {
	arrayChromaticScale,
	ChordType,
	formulae,
	NOTE_LETTER_ORDER,
	ScaleQuality,
	UkeNote,
	ukuleleChordShapes,
} from "@/constants/chromaticScale";
import { ChordQuality, Note, NoteEvent, Score } from "@/types/types";

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
	// console.log("freq to note:: ", frequency);
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
	const noteTime = performance.now() - MS_LATENCY_OFFSET;
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

export const normalizeNote = (note: string): UkeNote => {
	const enharmonics: Record<string, UkeNote> = {
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

	const normalized = enharmonics[note];
	if (!normalized) {
		throw new Error(`Invalid note: ${note}`);
	}
	return normalized;
};

export const parseNoteDisplay = (
	display: string
): { note: string; octave: string } => {
	const match = display.match(/^([A-Ga-g]{1}[#b]?)(\d)$/);
	if (!match) throw new Error(`Invalid display note: ${display}`);
	const [, rawNote, octave] = match;
	return {
		note: normalizeNote(rawNote),
		octave,
	};
};

export const generateUkeChord = (note: any, quality: ChordQuality) => {
	let normalizedNote = normalizeNote(note);

	return ukuleleChordShapes[`${normalizedNote}`][quality];
};

// G4 C4 E4 A4 tuning — string 4 to string 1
const openStrings: UkeNote[] = ["G", "C", "E", "A"];

// Map each open string to its MIDI number
const ukuleleTuningWithMidi = [
	{ note: "G", midi: 67 }, // G4
	{ note: "C", midi: 60 }, // C4
	{ note: "E", midi: 64 }, // E4
	{ note: "A", midi: 69 }, // A4
];

/**
 * Convert MIDI number to note + octave (e.g., 60 → "C4")
 */
const midiToNoteWithOctave = (midi: number): string => {
	const name = NOTE_NAMES[midi % 12];
	const octave = Math.floor(midi / 12) - 1;
	return `${name}${octave}`;
};

/**
 * Converts ukulele frets to note names with octave (e.g., ['G4', 'C4', 'E4', 'C5'])
 */
export const fretsToNotesWithOctaves = (frets: number[]): string[] => {
	if (frets.length !== 4) {
		throw new Error("Input must be an array of 4 fret numbers.");
	}

	return frets.map((fret, i) => {
		const openMidi = ukuleleTuningWithMidi[i].midi;
		const noteMidi = openMidi + fret;
		return midiToNoteWithOctave(noteMidi);
	});
};

export function uniqueUnlessConsecutive<T>(arr: T[]): T[] {
	const result: T[] = [];
	for (const item of arr) {
		if (result.length === 0 || result[result.length - 1] !== item) {
			result.push(item);
		}
		// else skip because it would be a consecutive duplicate
	}
	return result;
}

export function countNotes(notes: string[]) {
	const counts: Record<string, number> = {};
	for (const note of notes) {
		counts[note] = (counts[note] || 0) + 1;
	}
	return counts;
}
