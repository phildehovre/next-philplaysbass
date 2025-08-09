import { useCallback, useEffect, useRef, useState } from "react";
import { countNotes } from "@/lib/utils/gameUtils";

interface DetectedNoteEvent {
	note: string;
	amplitude: number; // or RMS value from your pitch detection
	time: number; // performance.now() timestamp
}

interface Options {
	snapshotWindow?: number; // ms after peak to capture notes
	chordDebounce?: number; // ms between chord snapshots
	peakThreshold?: number; // amplitude threshold for peak
	silenceTimeout?: number; // ms of silence before reset
}

export function useChordSnapshotDetector(
	targetNotes: string[],
	onSuccess: () => void,
	onSilence?: () => void,
	{
		snapshotWindow = 80,
		chordDebounce = 150,
		peakThreshold = 0.05, // tweak for your mic
		silenceTimeout = 3000,
	}: Options = {}
) {
	const [detectedNotes, setDetectedNotes] = useState<string[]>([]);
	const targetCountsRef = useRef<Record<string, number>>({});
	const noteCountsRef = useRef<Record<string, number>>({});
	const snapshotBufferRef = useRef<Set<string>>(new Set());

	const lastPeakTimeRef = useRef<number>(0);
	const snapshotTimeoutRef = useRef<NodeJS.Timeout | null>(null);
	const silenceTimeoutRef = useRef<NodeJS.Timeout | null>(null);
	const lastAmplitudeRef = useRef<number>(0);

	// Set up target counts
	useEffect(() => {
		targetCountsRef.current = countNotes(targetNotes);
		reset();
	}, [targetNotes]);

	const reset = useCallback(() => {
		setDetectedNotes([]);
		noteCountsRef.current = {};
		snapshotBufferRef.current.clear();
		lastPeakTimeRef.current = 0;
		lastAmplitudeRef.current = 0;
		if (snapshotTimeoutRef.current) clearTimeout(snapshotTimeoutRef.current);
		if (silenceTimeoutRef.current) clearTimeout(silenceTimeoutRef.current);
	}, []);

	const processSnapshot = useCallback(() => {
		const notesThisSnapshot = Array.from(snapshotBufferRef.current);

		// Update running counts
		for (let note of notesThisSnapshot) {
			noteCountsRef.current[note] = (noteCountsRef.current[note] || 0) + 1;
		}

		// Track for UI
		setDetectedNotes((prev) => [...prev, ...notesThisSnapshot]);

		// Check win condition
		const allMatched = Object.entries(targetCountsRef.current).every(
			([note, requiredCount]) =>
				(noteCountsRef.current[note] || 0) >= requiredCount
		);

		if (allMatched) {
			reset();
			onSuccess();
			return;
		}

		// Reset silence timer
		if (silenceTimeoutRef.current) clearTimeout(silenceTimeoutRef.current);
		silenceTimeoutRef.current = setTimeout(() => {
			reset();
			if (onSilence) onSilence();
		}, silenceTimeout);
	}, [onSuccess, onSilence, reset, silenceTimeout]);

	const handlePeak = useCallback(
		(time: number) => {
			if (time - lastPeakTimeRef.current < chordDebounce) return; // debounce
			lastPeakTimeRef.current = time;
			snapshotBufferRef.current.clear();

			if (snapshotTimeoutRef.current) clearTimeout(snapshotTimeoutRef.current);
			snapshotTimeoutRef.current = setTimeout(() => {
				processSnapshot();
			}, snapshotWindow);
		},
		[chordDebounce, snapshotWindow, processSnapshot]
	);

	const registerDetection = useCallback(
		({ note, amplitude, time }: DetectedNoteEvent) => {
			// Detect peak
			if (
				amplitude >= peakThreshold &&
				lastAmplitudeRef.current < peakThreshold
			) {
				handlePeak(time);
			}
			lastAmplitudeRef.current = amplitude;

			// Collect notes if inside snapshot window
			if (time - lastPeakTimeRef.current <= snapshotWindow) {
				snapshotBufferRef.current.add(note);
			}
		},
		[handlePeak, snapshotWindow, peakThreshold]
	);

	return {
		registerDetection, // feed this each note + amplitude
		detectedNotes,
		reset,
	};
}
