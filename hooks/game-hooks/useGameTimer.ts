import { useEffect, useRef, useState } from "react";
import { NoteEvent } from "@/types/types";

type UseGameTimerProps = {
	duration: number;
	withTimer: boolean;
	gameStarted: boolean;
	selectedNoteRef: React.MutableRefObject<string>;
	withArpeggios: boolean;
	recordLoss: () => void;
	init: () => void;
	addEvent: (event: NoteEvent, options?: { withTimer?: boolean }) => void;
	resetArpeggioProgress?: () => void; // optional callback for arpeggio mode
};

export const useGameTimer = ({
	duration,
	withTimer,
	gameStarted,
	selectedNoteRef,
	withArpeggios,
	recordLoss,
	init,
	addEvent,
	resetArpeggioProgress,
}: UseGameTimerProps) => {
	const [progress, setProgress] = useState(0);
	const timeoutRef = useRef<NodeJS.Timeout | null>(null);
	const rafRef = useRef<number | null>(null);

	const startTimer = () => {
		if (!withTimer || !gameStarted) return;

		if (timeoutRef.current) clearTimeout(timeoutRef.current);
		if (rafRef.current) cancelAnimationFrame(rafRef.current);

		const start = Date.now();

		const step = () => {
			const elapsed = Date.now() - start;
			const percent = Math.min((elapsed / duration) * 100, 100);
			setProgress(percent);
			if (elapsed < duration) {
				rafRef.current = requestAnimationFrame(step);
			}
		};

		step();

		timeoutRef.current = setTimeout(() => {
			// Timeout reached → record loss & re-init
			const event: NoteEvent = {
				expectedNote: selectedNoteRef.current,
				playedNote: "",
				isCorrect: false,
				timeToHitMs: 9999,
				metronomeOffsetMs: 0,
				playedAt: new Date(),
			};

			recordLoss();
			addEvent(event, { withTimer });

			if (withArpeggios && resetArpeggioProgress) {
				resetArpeggioProgress(); // reset arpeggio state in parent
			}

			init();
			startTimer();
		}, duration);
	};

	useEffect(() => {
		if (withTimer && gameStarted) startTimer();
		return () => {
			if (timeoutRef.current) clearTimeout(timeoutRef.current);
			if (rafRef.current) cancelAnimationFrame(rafRef.current);
			setProgress(0);
		};
	}, [withTimer, gameStarted, duration]);

	return { progress, startTimer };
};
