import { useEffect, useRef, useState, useCallback } from "react";

export const useProgressTimer = (duration: number, onExpire: () => void) => {
	const [progress, setProgress] = useState(0);
	const rafRef = useRef<number | null>(null);
	const startTimeRef = useRef<number | null>(null);

	const start = useCallback(() => {
		startTimeRef.current = Date.now();

		const tick = () => {
			if (!startTimeRef.current) return;

			const elapsed = Date.now() - startTimeRef.current;
			const percent = Math.min((elapsed / duration) * 100, 100);
			setProgress(percent);

			if (elapsed >= duration) {
				onExpire();
				return;
			}

			rafRef.current = requestAnimationFrame(tick);
		};

		rafRef.current = requestAnimationFrame(tick);
	}, [duration, onExpire]);

	const stop = useCallback(() => {
		if (rafRef.current) cancelAnimationFrame(rafRef.current);
		rafRef.current = null;
		startTimeRef.current = null;
		setProgress(0);
	}, []);

	useEffect(() => {
		return () => stop(); // cleanup on unmount
	}, []);

	return { progress, start, stop };
};
