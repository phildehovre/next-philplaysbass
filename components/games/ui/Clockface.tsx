"use client";
import React, { useEffect, useState, useRef } from "react";
import { ScoreBurstManager } from "./ScoreBurstManager";
import { usePracticeSession } from "@/context/practiceSessionsContext";
import Blip from "./Blip";
import { RHYTHM_ACCURACY_TYPE } from "../../../constants/GameConstants";
import PowerUpBar from "./PowerUpBar";

type ClockfacePropsType = {
	showPulse: boolean;
	progress: number;
	withTimer?: boolean;
	children: React.ReactNode;
	size?: number;
	gameStarted: boolean;
	className?: string;
	showProgress?: boolean;
};

const CIRCLE_RADIUS = 38;
const CIRCLE_CANVAS = 50;
const TAIL_LENGTH = 25;
const radius = CIRCLE_RADIUS;
const bonusRadius = radius + 8;
const cx = CIRCLE_CANVAS;
const cy = CIRCLE_CANVAS;

const Clockface: React.FC<ClockfacePropsType> = ({
	withTimer = false,
	showPulse,
	progress,
	children,
	size,
	gameStarted,
	className,
	showProgress,
}) => {
	const [angle, setAngle] = useState(0);
	const [tail, setTail] = useState<{ x: number; y: number }[]>([]);

	const { bpm, gameType } = usePracticeSession();
	const lastAngleRef = useRef(0);

	const [blipActive, setBlipActive] = useState(false);

	useEffect(() => {
		if (!bpm || !gameStarted) return;

		const beatDuration = (60 / bpm) * 1000;
		let raf: number;
		const startTime = performance.now();

		const animate = (time: number) => {
			const elapsed = (time - startTime) % beatDuration;
			const progress = elapsed / beatDuration;
			const newAngle = progress * 360;

			// Trigger blip at top of each beat
			if (progress < 0.05 && lastAngleRef.current > 350) {
				setBlipActive(true);
				requestAnimationFrame(() => setBlipActive(false));
			}

			lastAngleRef.current = newAngle;
			setAngle(newAngle);

			raf = requestAnimationFrame(animate);
		};

		raf = requestAnimationFrame(animate);
		return () => cancelAnimationFrame(raf);
	}, [bpm, gameStarted]);

	// Marker coordinates
	const markerX = cx + radius * Math.cos(angle * (Math.PI / 180));
	const markerY = cy + radius * Math.sin(angle * (Math.PI / 180));

	// Update tail
	useEffect(() => {
		if (gameStarted) {
			setTail((prev) => {
				const newTail = [...prev, { x: markerX, y: markerY }];
				if (newTail.length > TAIL_LENGTH) newTail.shift();
				return newTail;
			});
		}
	}, [markerX, markerY, gameStarted, gameType]);

	return (
		<div
			className={`${
				className ? className : ""
			} clock-face relative flex items-center justify-center`}
		>
			{gameStarted && <Blip bpm={bpm} />}
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
				{(withTimer || showProgress) && (
					<circle
						className="clock-progress"
						cx={cx}
						cy={cy}
						strokeLinecap="round"
						r={radius}
						strokeDasharray={2 * Math.PI * radius}
						strokeDashoffset={(1 - progress / 100) * 2 * Math.PI * radius}
						style={{
							transition: "stroke-dashoffset 0.3s ease-out",
						}}
					/>
				)}
				...
			</svg>

			{/* Children */}
			{children}
		</div>
	);
};

export default Clockface;
