import { useState, useCallback } from "react";
import {
	generateUkeChord,
	selectRandomNote,
	fretsToNotesWithOctaves,
	parseNoteDisplay,
} from "@/lib/utils/gameUtils";
import { ScaleQuality, UkuleleShape } from "@/constants/chromaticScale";

export const useChordQuestion = (selectedQualities: ScaleQuality[]) => {
	const [rootNote, setRootNote] = useState("");
	const [quality, setQuality] = useState<ScaleQuality>();
	const [formula, setFormula] = useState<UkuleleShape>();
	const [notes, setNotes] = useState<string[]>([]); // now preserves duplicates

	const generateQuestion = useCallback(() => {
		const randomQuality =
			selectedQualities[Math.floor(Math.random() * selectedQualities.length)];
		const newRoot = selectRandomNote();
		const chordFormula = generateUkeChord(newRoot, randomQuality);
		const chordNotes = fretsToNotesWithOctaves(chordFormula);

		// Normalize notes WITHOUT deduplication
		const normalized = chordNotes.map((note) => {
			const { note: n, octave: o } = parseNoteDisplay(note);
			return `${n}${o}`;
		});

		setRootNote(newRoot);
		setQuality(randomQuality);
		setFormula(chordFormula);
		setNotes(normalized);
	}, [selectedQualities]);

	return {
		rootNote,
		quality,
		formula,
		notes,
		generateQuestion,
	};
};
