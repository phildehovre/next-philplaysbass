import { MS_LATENCY_OFFSET } from "@/components/games/GameConstants";
import {
	arrayChromaticScale,
	ChordType,
	formulae,
	NOTE_LETTER_ORDER,
	ScaleQuality,
	UkeNote,
	ukuleleChordShapes,
} from "@/constants/chromaticScale";
import { Note, NoteEvent, Score } from "@/types/types";

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

export const processRhythmicalAccuracy = (
	offsetMs: number | undefined
): number => {
	if (offsetMs === undefined) return 0;

	const absOffset = Math.abs(offsetMs);
	const maxOffset = 150; // ms
	const softEdge = maxOffset / 2;
	const x = absOffset - softEdge;

	const steepness = 0.05;
	const sigmoid = 1 / (1 + Math.exp(steepness * x));

	// Normalize and scale to 0–100
	const score = 100 * (2 * (sigmoid - 0.5));

	return Math.round(score);
};

export const processPitchAccuracy = (
	played: string | undefined,
	expected: string | undefined
): number => {
	if (played && expected && played === expected) {
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
		const bonusMultiplier = Math.min(tempo / 120, 2); // up to 2x
		return 100 * bonusMultiplier;
	}
	return 0;
};

export const processEventScore = (
	event: NoteEvent | undefined,
	options: { bpm: number }
): Score => {
	if (!event) return { rhythm: 0, pitch: 0, bonus: 0 };

	const rhythm = processRhythmicalAccuracy(event.metronomeOffsetMs);
	const pitch = processPitchAccuracy(event.playedNote, event.expectedNote);
	let bonus = 0;
	if (options) {
		bonus = processComboBonus(rhythm, pitch, options);
	}

	return { rhythm, pitch, bonus };
};
export const processNormalizedScore = (
	events: NoteEvent[],
	options: { bpm: number }
) => {
	if (events.length === 0) {
		return { rhythm: 0, pitch: 0, bonus: 0 };
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
		bonus: Math.round(total.bonus / count), // optional
	};

	return normalized;
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

export const generateUkeChord = (note: any, quality: any) => {
	let normalizedQuality: ChordType;
	let normalizedNote = normalizeNote(note);

	switch (quality) {
		case "min":
			normalizedQuality = "minor";
			break;
		case "dim":
			normalizedQuality = "diminished";
			break;
		case "aug":
			normalizedQuality = "augmented";
			break;

		default:
			normalizedQuality = "major";
			break;
	}

	return ukuleleChordShapes[`${normalizedNote}`][normalizedQuality];
};

// G4 C4 E4 A4 tuning — string 4 to string 1
const openStrings: UkeNote[] = ["G", "C", "E", "A"];
/**
 * Convert ukulele frets to notes.
 * @param frets - Array of 4 fret numbers from string 4 to 1 (G C E A)
 */
export const fretsToNotes = (frets: number[]): UkeNote[] => {
	if (frets.length !== 4) {
		throw new Error("Input must be an array of 4 fret numbers.");
	}

	return frets.map((fret, stringIndex) => {
		const openNote = openStrings[stringIndex];
		const openNoteIndex = NOTE_NAMES.indexOf(openNote);
		const noteIndex = (openNoteIndex + fret) % 12;
		return NOTE_NAMES[noteIndex];
	}) as UkeNote[];
};
