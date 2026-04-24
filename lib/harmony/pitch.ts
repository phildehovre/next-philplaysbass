import { arrayChromaticScale, enharmonics } from "@/constants/musicConstants";
import { Note } from "@/types/types";

export const PITCH_CLASS_OPTIONS = arrayChromaticScale.map((row) => row[0]) as Note[];

// Normalize to a single canonical spelling used throughout the app.
// We reuse the project's enharmonic map, but fall back to the raw input if needed.
export function normalizePitchClass(note: string): Note {
	const trimmed = note.trim();
	const mapped = (enharmonics as Record<string, string | undefined>)[trimmed];
	return (mapped ?? trimmed) as Note;
}

export function pcEquals(a: string, b: string) {
	return normalizePitchClass(a) === normalizePitchClass(b);
}

export function uniquePcs(notes: string[]): Note[] {
	const out: Note[] = [];
	for (const n of notes) {
		const norm = normalizePitchClass(n);
		if (!out.some((x) => x === norm)) out.push(norm);
	}
	return out;
}

export function samePcSet(a: string[], b: string[]) {
	const aa = uniquePcs(a).slice().sort();
	const bb = uniquePcs(b).slice().sort();
	if (aa.length !== bb.length) return false;
	for (let i = 0; i < aa.length; i++) if (aa[i] !== bb[i]) return false;
	return true;
}

function pcIndex(note: Note): number {
	const norm = normalizePitchClass(note);
	for (let i = 0; i < arrayChromaticScale.length; i++) {
		if (arrayChromaticScale[i].includes(norm)) return i;
	}
	return -1;
}

export function transposePc(root: Note, semitones: number): Note {
	const idx = pcIndex(root);
	if (idx === -1) return normalizePitchClass(root);
	const next = (idx + semitones) % 12;
	const canonical = arrayChromaticScale[(next + 12) % 12][0];
	return normalizePitchClass(canonical) as Note;
}

export function semitoneDistance(from: Note, to: Note): number {
	const a = pcIndex(from);
	const b = pcIndex(to);
	if (a === -1 || b === -1) return 0;
	return (b - a + 12) % 12;
}

