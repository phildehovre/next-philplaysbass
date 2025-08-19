"use client";
import { usePracticeSession } from "@/context/practiceSessionsContext";
import React, { useEffect, useState } from "react";

interface MetronomeCircleProps {
	children?: React.ReactNode;
}

export default function MetronomeCircle({ children }: MetronomeCircleProps) {
	const [angle, setAngle] = useState(0);

	const { bpm } = usePracticeSession();
	useEffect(() => {
		if (!bpm) return;

		const beatDuration = (60 / bpm) * 1000; // ms per beat
		const step = 360 / (beatDuration / 16); // update 60fps (16ms)

		let raf: number;
		let lastTime = performance.now();

		const animate = (time: number) => {
			const delta = time - lastTime;
			lastTime = time;

			setAngle((prev) => (prev + (delta / beatDuration) * 360) % 360);

			raf = requestAnimationFrame(animate);
		};

		raf = requestAnimationFrame(animate);

		return () => cancelAnimationFrame(raf);
	}, [bpm]);

	const radius = 80;
	const cx = 100;
	const cy = 100;

	const markerX = cx + radius * Math.cos((angle - 90) * (Math.PI / 180));
	const markerY = cy + radius * Math.sin((angle - 90) * (Math.PI / 180));

	return (
		<svg width={200} height={200}>
			{/* Circle */}
			<circle
				cx={cx}
				cy={cy}
				r={radius}
				stroke="black"
				strokeWidth={3}
				fill="none"
			/>
			{/* Marker */}
			<circle className="pulser" cx={markerX} cy={markerY} r={8} fill="red" />
		</svg>
	);
}
