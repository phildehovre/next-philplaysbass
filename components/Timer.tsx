import { useCallback, useEffect, useRef, useState } from "react";

interface UseTimerOptions {
	duration: number;
	onComplete?: () => void;
	idleDelay?: number;
}

export function useGameTimer({
	duration,
	onComplete,
	idleDelay = 2000,
}: UseTimerOptions) {
	const [progress, setProgress] = useState(0);
	const [isRunning, setIsRunning] = useState(false);
	const [isIdle, setIsIdle] = useState(false);

	const rafRef = useRef<number | null>(null);
	const timerRef = useRef<NodeJS.Timeout | null>(null);
	const idleRef = useRef<NodeJS.Timeout | null>(null);
	const startTimestamp = useRef<number>(0);

	const step = useCallback(() => {
		const elapsed = Date.now() - startTimestamp.current;
		const percent = Math.min((elapsed / duration) * 100, 100);
		setProgress(percent);

		if (elapsed < duration) {
			rafRef.current = requestAnimationFrame(step);
		} else {
			setIsRunning(false);
			if (onComplete) {
				setIsIdle(true);
				idleRef.current = setTimeout(() => {
					setIsIdle(false);
					onComplete();
				}, idleDelay);
			}
		}
	}, [duration, onComplete, idleDelay]);

	const start = useCallback(() => {
		console.log("Start being called");
		clearTimeouts();
		setIsIdle(false);
		setProgress(0);
		setIsRunning(true);
		startTimestamp.current = Date.now();
		step();
	}, [step]);

	const stop = useCallback(() => {
		clearTimeouts();
		setIsRunning(false);
		setIsIdle(false);
		setProgress(0);
	}, []);

	const clearTimeouts = () => {
		if (rafRef.current) cancelAnimationFrame(rafRef.current);
		if (timerRef.current) clearTimeout(timerRef.current);
		if (idleRef.current) clearTimeout(idleRef.current);
	};

	useEffect(() => {
		return () => clearTimeouts();
	}, []);

	return {
		progress,
		isRunning,
		isIdle,
		start,
		stop,
		setIdle: setIsIdle,
	};
}
