import React, { useEffect, useState } from "react";

export default function Countdown(props: {
	value?: number;
	onCountdownFinished: () => void;
}) {
	const { value, onCountdownFinished } = props;
	const [countdown, setCountdown] = useState<number | null>(null);

	useEffect(() => {
		startCountdown(value);
	}, []);

	const startCountdown = (value = 3) => {
		setCountdown(value);

		const interval = setInterval(() => {
			value -= 1;
			setCountdown(value);

			if (value === 0) {
				clearInterval(interval);
				onCountdownFinished();
			}
		}, 1000);
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
