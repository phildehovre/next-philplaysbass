"use client";
import React, { useEffect, useState, useRef } from "react";
import { ScoreBurstManager } from "./ScoreBurstManager";
import { usePracticeSession } from "@/context/practiceSessionsContext";

type ClockfacePropsType = {
	showPulse: boolean;
	progress: number;
	withTimer?: boolean;
	children: React.ReactNode;
	size?: number;
	gameStarted: boolean;
};

const CIRCLE_RADIUS = 45;
const CIRCLE_CANVAS = 50;
const TAIL_LENGTH = 50;

const Clockface: React.FC<ClockfacePropsType> = ({
	withTimer = false,
	showPulse,
	progress,
	children,
	size,
	gameStarted,
}) => {
	const [angle, setAngle] = useState(0);
	const [blips, setBlips] = useState<{ id: number }[]>([]);
	const [tail, setTail] = useState<{ x: number; y: number }[]>([]);

	const { bpm, gameType } = usePracticeSession();
	const lastAngleRef = useRef(0);

	useEffect(() => {
		if (!bpm) return;

		const beatDuration = (60 / bpm) * 1000;
		let raf: number;
		let lastTime = performance.now();

		const animate = (time: number) => {
			const delta = time - lastTime;
			lastTime = time;

			setAngle((prev) => {
				const newAngle = (prev + (delta / beatDuration) * 360) % 360;

				// Leave a blip if we cross the top
				if (lastAngleRef.current < 360 && newAngle >= 0 && newAngle < 5) {
					const id = performance.now();
					setBlips((prev) => [...prev, { id }]);
					setTimeout(
						() => setBlips((prev) => prev.filter((b) => b.id !== id)),
						400
					);
				}

				lastAngleRef.current = newAngle;
				return newAngle;
			});

			raf = requestAnimationFrame(animate);
		};

		raf = requestAnimationFrame(animate);
		return () => cancelAnimationFrame(raf);
	}, [bpm]);

	// Marker coordinates
	const radius = CIRCLE_RADIUS;
	const cx = CIRCLE_CANVAS;
	const cy = CIRCLE_CANVAS;

	const markerX = cx + radius * Math.cos(angle * (Math.PI / 180));
	const markerY = cy + radius * Math.sin(angle * (Math.PI / 180));

	const renderBlips = () => {
		return blips.map((blip, i) => (
			<circle
				key={blip.id + i}
				cx={cx + 45}
				cy={cy - radius + 45}
				r={4}
				fill="var(--clr-brand)"
				style={{ opacity: 0.7 }}
			/>
		));
	};
	const renderTail = () => {
		return tail.map((pos, i) => (
			<circle
				key={i}
				cx={pos.x}
				cy={pos.y}
				r={2}
				fill="var(--clr-brand)"
				style={{ opacity: (i + 1) / tail.length / 2 }} // fading effect
			/>
		));
	};
	// Update tail
	useEffect(() => {
		if (gameStarted && gameType === "rhythm-accuracy") {
			setTail((prev) => {
				const newTail = [...prev, { x: markerX, y: markerY }];
				if (newTail.length > TAIL_LENGTH) newTail.shift();
				return newTail;
			});
		}
	}, [markerX, markerY, gameStarted, gameType]);

	return (
		<div className="clock-face relative flex items-center justify-center">
			{showPulse && <div className="pulse-ripple" />}
			{showPulse && <div className="pulse-ripple delay" />}
			<ScoreBurstManager />

			<svg viewBox="0 0 100 100" className="clock-svg">
				{/* Base circle */}
				<circle
					className="clock-bg"
					cx={cx}
					cy={cy}
					r={radius}
					style={{ strokeWidth: `${size ? size / 2 : 10}` }}
				/>

				{/* Timer progress */}
				{withTimer && (
					<circle
						className="clock-progress"
						cx={cx}
						cy={cy}
						r={radius}
						strokeDasharray={2 * Math.PI * radius}
						strokeDashoffset={(1 - progress / 100) * 2 * Math.PI * radius}
					/>
				)}

				{/* Blips at top */}

				{/* Tail */}

				{/* Rotating marker */}
				{gameStarted && gameType === "rhythm-accuracy" && (
					<>
						<circle cx={markerX} cy={markerY} r={3} fill="var(--clr-brand)" />
						{renderBlips()}
						{renderTail()}
					</>
				)}
			</svg>

			{/* Render children on top */}
			{children}
		</div>
	);
};

export default Clockface;
