"use client";
import "./TunerStyles.css";
import React, { useState, useEffect, useRef } from "react";
import { NoteInfo } from "@/types/types";
import { cn } from "@/lib/utils";
import PitchyStream from "@/components/PitchyStream";

const Tuner = () => {
	const [note, setNote] = useState<NoteInfo | null>(null);
	const [smoothedPercent, setSmoothedPercent] = useState(50);
	const animationRef = useRef<number | null>(null);

	// clamp to ±50 cents so indicator doesn’t fly off screen
	const clampedOffset = note ? Math.max(-50, Math.min(50, note.centsOff)) : 0;

	// normalize to percentage (-50 → 0%, 0 → 50%, +50 → 100%)
	const targetPercent = ((clampedOffset + 50) / 100) * 100;

	useEffect(() => {
		const animate = () => {
			setSmoothedPercent((prev) => {
				const next = prev + (targetPercent - prev) * 0.15;
				return next;
			});
			animationRef.current = requestAnimationFrame(animate);
		};

		animationRef.current = requestAnimationFrame(animate);
		return () => {
			if (animationRef.current) cancelAnimationFrame(animationRef.current);
		};
	}, [targetPercent]);

	const indicatorColor =
		note && Math.abs(note.centsOff) < 5 ? "bg-green-500" : "bg-red-500";

	return (
		<div className="flex flex-col items-center justify-center p-8">
			<div className="scoreboard relative w-80 h-6 rounded-full overflow-hidden">
				<div className="absolute left-1/2 top-0 bottom-0 w-0.5 "></div>

				<div
					className={cn(
						"absolute top-0 h-full w-2 rounded-full",
						indicatorColor
					)}
					style={{
						left: `${smoothedPercent}%`,
						transform: "translateX(-50%)",
					}}
				></div>
			</div>
			{note && (
				<div className="mt-4 text-center">
					<p className="text-2xl font-bold">{note.noteName}</p>
					<p className="text-sm text-gray-600">{note.centsOff.toFixed(1)}¢</p>
				</div>
			)}

			<PitchyStream onNoteDetection={setNote} threshold={3} />
		</div>
	);
};

export default Tuner;
