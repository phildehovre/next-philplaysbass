import { useOscillatorGen } from "@/context/oscillatorGenContext";
import React, { useEffect, useState } from "react";

export default function Countdown(props: {
	value?: number;
	onCountdownFinished: () => void;
	bpm: number;
}) {
	const { value = 3, onCountdownFinished, bpm } = props;
	const [countdown, setCountdown] = useState<number | null>(null);

	const { playNote } = useOscillatorGen();

	useEffect(() => {
		startCountdown(value);
	}, []);

	const startCountdown = (initialValue: number) => {
		setCountdown(initialValue);

		const intervalDuration = 60000 / bpm; // in ms

		let currentValue = initialValue;

		const interval = setInterval(() => {
			currentValue -= 1;
			setCountdown(currentValue);

			if (currentValue === 0) {
				playNote("C6");
				clearInterval(interval);
				onCountdownFinished();
				return;
			}
			playNote("C5");
		}, intervalDuration);
	};

	return (
		<div className="flex flex-col items-center gap-4 text-black">
			{countdown !== null && (
				<div className="countdown text-4xl font-bold">
					{countdown === 0 ? "Go!" : countdown}
				</div>
			)}
		</div>
	);
}
