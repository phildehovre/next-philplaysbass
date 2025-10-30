"use client";
import "./TunerStyles.css";
import React, { useState, useEffect, useRef } from "react";
import { NoteInfo } from "@/types/types";
import { cn } from "@/lib/utils";
import PitchyStream from "@/components/PitchyStream";
import Spinner from "@/components/Spinner";
import { CLOCKFACE_DIMENSIONS } from "@/constants/clockFaceConstants";
import { X } from "lucide-react";

const { CIRCLE_RADIUS, radius, bonusRadius } = CLOCKFACE_DIMENSIONS;

const Tuner = (props: { onClose: () => void }) => {
	const { onClose } = props;
	const [note, setNote] = useState<NoteInfo | null>(null);
	const [smoothedPercent, setSmoothedPercent] = useState(50);
	const animationRef = useRef<number | null>(null);

	const clampedOffset = note ? Math.max(-50, Math.min(50, note.centsOff)) : 0;
	const targetPercent = ((clampedOffset + 50) / 100) * 100;

	useEffect(() => {
		const animate = () => {
			setSmoothedPercent((prev) => prev + (targetPercent - prev) * 0.15);
			animationRef.current = requestAnimationFrame(animate);
		};
		animationRef.current = requestAnimationFrame(animate);
		return () => {
			if (animationRef.current) cancelAnimationFrame(animationRef.current);
		};
	}, [targetPercent]);

	const indicatorColor =
		note && Math.abs(note.centsOff) < 5 ? "bg-green-500" : "bg-red-500";

	// Convert smoothed percent (0–100) to semicircle angle (-90° to +90°)
	const angle = (smoothedPercent / 100) * 180 - 90;

	return (
		<div className="absolute bottom-[50%] flex flex-col items-center justify-center w-full">
			{/* Semicircle visual */}
			<div
				className="relative flex items-end justify-center"
				style={{
					width: `${radius * 4}px`, // scales with tuner size
					height: `${radius * 2}px`,
				}}
			>
				{/* Semicircle base */}
				<div
					className="absolute bottom-0 w-full h-full rounded-t-full  overflow-hidden z-0"
					style={{
						borderWidth: 2,
						borderColor: "#333",
					}}
				/>

				{/* Needle */}
				<div
					className={cn(
						"absolute bottom-0 left-1/2 w-[3px] origin-bottom transition-transform duration-75 ease-out",
						indicatorColor
					)}
					style={{
						height: `${radius * 3.5}px`,
						transform: `translateX(-50%) rotate(${angle}deg)`,
					}}
				/>
				<div
					className={cn(
						"absolute bottom-0 left-1/2 w-[3px] origin-bottom transition-transform duration-100 ease-out opacity-30",
						indicatorColor
					)}
					style={{
						height: `${radius * 3.5}px`,
						transform: `translateX(-50%) rotate(0deg)`,
					}}
				/>

				{/* Center mask */}
				<div
					className="absolute bottom-0 left-1/2 rounded-t-full bg-black transform -translate-x-1/2 z-50"
					style={{
						width: `${radius * 5}px`,
						height: `${radius * 2.5}px`,
					}}
				/>
			</div>

			{/* Note display */}
			<div
				className="absolute top-[60%] w-[30%] text-center bg-black pb-4 z-50 rounded-lg"
				style={{
					minWidth: `${CIRCLE_RADIUS * 2}px`,
				}}
			>
				<X
					color="var(--clr-brand)"
					onClick={onClose}
					className="absolute -top-1/2 right-1/2 translate-1/2"
				/>
				<>
					<p className="text-4xl font-bold">{note?.noteName || "Play!"}</p>
					<p className="text-sm text-gray-500">
						{note ? note.centsOff.toFixed(1) : 0}¢
					</p>
				</>
			</div>

			{/* Audio stream */}
			<PitchyStream onNoteDetection={setNote} threshold={0} />
		</div>
	);
};

export default Tuner;
