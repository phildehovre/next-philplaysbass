"use client";
import React, { useEffect, useRef } from "react";
import { ScoreBurstManager } from "./ScoreBurstManager";
import PowerUpBar from "./PowerUpBar";
import { CLOCKFACE_DIMENSIONS } from "@/constants/clockFaceConstants";
import { GameTypes } from "@/types/types";
import GameSettings from "../GameSettings";
import Spinner from "@/components/Spinner";

type ClockfacePropsType = {
	children: React.ReactNode;
	ringStroke?: number;
	className?: string;
	showProgress?: boolean;
	showPowerUp?: boolean;
	size?: number;
	game?: any | undefined;
	gameType: GameTypes;
	showSettings?: boolean;
	progress: number; // from hook
};

const { radius, cx, cy, TAIL_LENGTH } = CLOCKFACE_DIMENSIONS;

const Clockface: React.FC<ClockfacePropsType> = ({
	game,
	showPowerUp = true,
	children,
	ringStroke,
	className,
	gameType,
	showSettings = true,
	progress,
}) => {
	if (!game) return <Spinner />;

	const { state } = game;
	const { withTimer, gameStarted, bpm } = state;

	const progressRef = useRef<SVGCircleElement>(null);
	const lastAngleRef = useRef(0);

	// Smoothly update the stroke of the progress circle
	useEffect(() => {
		if (!withTimer || !progressRef.current) return;

		const circle = progressRef.current;
		const circumference = 2 * Math.PI * radius;
		let rafId: number;
		let mounted = true;

		const update = () => {
			if (!mounted || !circle) return;
			const offset = (1 - progress / 100) * circumference;
			circle.style.strokeDashoffset = `${offset}`;
			rafId = requestAnimationFrame(update);
		};

		update();

		return () => {
			mounted = false;
			cancelAnimationFrame(rafId);
		};
	}, [withTimer, progress]);

	// Optional: you can also smooth the angle for the marker
	const angle = (progress / 100) * 360;
	const markerX = cx + radius * Math.cos((angle * Math.PI) / 180);
	const markerY = cy + radius * Math.sin((angle * Math.PI) / 180);

	return (
		<div
			className={`${
				className ?? ""
			} clock-face relative flex items-center justify-center`}
		>
			{showSettings && <GameSettings gameType={gameType} game={game} />}
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

				{withTimer && (
					<circle
						ref={progressRef}
						className="clock-progress"
						cx={cx}
						cy={cy}
						r={radius}
						strokeDasharray={2 * Math.PI * radius}
						strokeLinecap="round"
						style={{ transition: "none" }}
					/>
				)}
			</svg>

			{/* Children */}
			{children}
		</div>
	);
};

export default Clockface;
