import React, { useEffect, useState } from "react";

export default function Countdown(props: {
	value?: number;
	onCountdownFinished: () => void;
	bpm: number;
}) {
	const { value = 3, onCountdownFinished, bpm } = props;
	const [countdown, setCountdown] = useState<number | null>(null);

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
				clearInterval(interval);
				onCountdownFinished();
			}
		}, intervalDuration);
	};

	return (
		<div className="flex flex-col items-center gap-4">
			{countdown !== null && (
				<div className="text-4xl font-bold">
					{countdown === 0 ? "Go!" : countdown}
				</div>
			)}
		</div>
	);
}
