import { useCallback, useRef, useState } from "react";

interface UseGameTimerOptions {
	duration: number; // total ms for one round
	onComplete?: () => void; // called when timer finishes
}

export function useGameTimer({ duration, onComplete }: UseGameTimerOptions) {
	const [elapsed, setElapsed] = useState(0); // seconds elapsed
	const [progress, setProgress] = useState(0); // 0–100

	const timerActive = useRef(false);
	const rafRef = useRef<number | null>(null);
	const timerInterval = useRef<NodeJS.Timeout | null>(null);
	const timerTimeout = useRef<NodeJS.Timeout | null>(null);

	const clearAll = useCallback(() => {
		if (rafRef.current) {
			cancelAnimationFrame(rafRef.current);
			rafRef.current = null;
		}
		if (timerInterval.current) {
			clearInterval(timerInterval.current);
			timerInterval.current = null;
		}
		if (timerTimeout.current) {
			clearTimeout(timerTimeout.current);
			timerTimeout.current = null;
		}
	}, []);

	const start = useCallback(() => {
		timerActive.current = true;
		setElapsed(0);
		setProgress(0);
		clearAll();

		const startTime = Date.now();

		const step = () => {
			if (!timerActive.current) return;
			const elapsedMs = Date.now() - startTime;
			const percent = Math.min((elapsedMs / duration) * 100, 100);
			setProgress(percent);
			if (elapsedMs < duration) {
				rafRef.current = requestAnimationFrame(step);
			}
		};
		step();

		timerInterval.current = setInterval(() => {
			setElapsed((prev) => {
				const next = prev + 1;
				if (next * 1000 >= duration) {
					clearInterval(timerInterval.current!);
				}
				return next;
			});
		}, 1000);

		timerTimeout.current = setTimeout(() => {
			if (!timerActive.current) return;
			stop();
			onComplete?.();
		}, duration);
	}, [clearAll, duration, onComplete]);

	const stop = useCallback(() => {
		timerActive.current = false;
		clearAll();
	}, [clearAll]);

	return {
		elapsed,
		progress,
		start,
		stop,
		isActive: timerActive.current,
	};
}
