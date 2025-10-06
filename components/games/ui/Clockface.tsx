"use client";
import React, { useEffect, useState, useRef } from "react";
import { ScoreBurstManager } from "./ScoreBurstManager";
import { usePracticeSession } from "@/context/practiceSessionsContext";
import Blip from "./Blip";
import PowerUpBar from "./PowerUpBar";
import { CLOCKFACE_DIMENSIONS } from "@/constants/clockFaceConstants";

type ClockfacePropsType = {
	showPulse: boolean;
	progress: number;
	withTimer?: boolean;
	children: React.ReactNode;
	ringStroke?: number;
	gameStarted: boolean;
	className?: string;
	showProgress?: boolean;
	showPowerUp?: boolean;
	size?: number;
};

const { TAIL_LENGTH, radius, cx, cy } = CLOCKFACE_DIMENSIONS;

const Clockface: React.FC<ClockfacePropsType> = ({
	withTimer = false,
	showPowerUp = true,
	showPulse,
	progress,
	children,
	ringStroke,
	gameStarted,
	className,
	showProgress,
	size = 1,
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
					style={{ strokeWidth: `${ringStroke ? ringStroke / 2 : 10}` }}
				/>
				{showPowerUp && (
					<PowerUpBar cx={cx} cy={cy} radius={radius} progress={progress} />
				)}
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
