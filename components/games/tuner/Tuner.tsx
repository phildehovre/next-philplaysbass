"use client";
import React, { useState } from "react";
import PitchyComponent from "../PitchyComponent";
import { NoteInfo } from "@/types/types";

const Tuner = () => {
	const [note, setNote] = useState<NoteInfo | null>(null);

	const getCents = (detected: number, target: number): number => {
		if (!detected || !target) return 0;
		return 1200 * Math.log2(detected / target);
	};

	const cents = note ? getCents(note.frequency, note.targetFrequency) : 0;
	const clampedRotation = Math.max(-45, Math.min(45, cents)); // Limit needle to ±45°

	return (
		<div className="flex flex-col items-center justify-center p-8">
			<h2 className="text-xl font-semibold mb-4">Tuner</h2>

			<div className="relative w-64 h-32">
				{/* Semicircle */}
				<div className="w-full h-full border-t-4 border-gray-300 rounded-t-full"></div>

				{/* Needle */}
				<div
					className="absolute bottom-0 left-1/2 w-1 h-32 bg-red-500 origin-bottom"
					style={{ transform: `rotate(${clampedRotation}deg)` }}
				></div>
			</div>

			{/* Note Display */}
			{note && (
				<div className="mt-4 text-center">
					<p className="text-2xl font-bold">{note.note}</p>
					<p className="text-gray-500 text-sm">
						{note.frequency.toFixed(2)} Hz – {cents.toFixed(1)} cents
					</p>
				</div>
			)}

			{/* Pitchy microphone input + selector */}
			<PitchyWithDeviceSelect onNoteDetection={setNote} />
		</div>
	);
};

export default Tuner;
