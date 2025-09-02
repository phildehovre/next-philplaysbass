"use client";
import "./TunerStyles.css";
import React, { useState } from "react";
import PitchyComponent from "../PitchyComponent";
import { NoteInfo } from "@/types/types";
import { NOTE_FREQUENCIES } from "@/constants/chromaticScale";
import { cn } from "@/lib/utils";
import PitchyStream from "@/components/PitchyStream";

const Tuner = () => {
	const [note, setNote] = useState<NoteInfo | null>(null);

	const getCents = (detected: number, target: number): number => {
		if (!detected || !target) return 0;
		return 1200 * Math.log2(detected / target);
	};

	const clampedRotation = note
		? Math.max(-45, Math.min(45, note?.centsOff))
		: 0;

	const needleColor =
		note && Math.abs(note.centsOff) < 5 ? "bg-green-500" : "bg-red-500";

	return (
		<div className="flex flex-col items-center justify-center p-8">
			<div className="relative w-64 h-32">
				{/* Semicircle */}
				<div className="w-full h-full border-t-4 border-gray-300 rounded-t-full"></div>

				{/* Needle */}
				<div
					className={cn(
						`absolute bottom-0 left-1/2 w-1 h-32 origin-bottom ${needleColor}`,
						"tuner_needle"
					)}
					style={{ transform: `rotate(${clampedRotation}deg)` }}
				></div>
			</div>

			{/* Note Display */}
			{note && (
				<div className="mt-4 text-center">
					<p className="text-2xl font-bold">{note.noteName}</p>
					{/* <p className="text-gray-500 text-sm">
						{note.frequency.toFixed(2)} Hz – {cents.toFixed(1)} cents
					</p> */}
				</div>
			)}

			<PitchyStream onNoteDetection={setNote} />
		</div>
	);
};

export default Tuner;
