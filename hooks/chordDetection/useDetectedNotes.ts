import { countNotes } from "@/lib/utils/gameUtils";
import { useCallback, useRef, useState, useEffect, useMemo } from "react";

export const useDetectedNotes = (
	targetNotes: string[],
	onSuccess: () => void,
	onSilence?: () => void
) => {
	const [detected, setDetected] = useState<string[]>([]); // full detection list
	const detectedCountsRef = useRef<Record<string, number>>({});
	const lastNoteRef = useRef<string | null>(null);
	const silenceTimeout = useRef<NodeJS.Timeout | null>(null);

	// Update target counts whenever targetNotes change
	const targetNoteCounts = useMemo(
		() => countNotes(targetNotes),
		[targetNotes]
	);

	const reset = useCallback(() => {
		detectedCountsRef.current = {};
		lastNoteRef.current = null;
		setDetected([]);
	}, []);

	const addNote = useCallback(
		(note: string) => {
			const currentCounts = detectedCountsRef.current;
			const targetCounts = targetNoteCounts;

			// if (note === lastNoteRef.current) return;

			currentCounts[note] = (currentCounts[note] || 0) + 1;
			lastNoteRef.current = note;

			setDetected((prev) => [...prev, note]);

			const allMatched = Object.entries(targetCounts).every(
				([noteName, requiredCount]: any) =>
					(currentCounts[noteName] || 0) >= requiredCount
			);

			if (allMatched) {
				reset();
				onSuccess();
				return;
			}

			if (silenceTimeout.current) clearTimeout(silenceTimeout.current);
			silenceTimeout.current = setTimeout(() => {
				reset();
				if (onSilence) onSilence();
			}, 3000);
		},
		[onSuccess, onSilence, reset, targetNoteCounts]
	);

	// Reset detected notes when targetNotes change to avoid stale state
	useEffect(() => {
		reset();
	}, [targetNotes, reset]);

	return {
		addNote,
		detected,
		reset,
	};
};
