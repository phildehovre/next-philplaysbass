"use client";

import React, { useEffect, useState } from "react";
import {
	normalizeNote,
	parseNoteDisplay,
	uniqueUnlessConsecutive,
} from "@/lib/utils/gameUtils";
import { UkuleleShape } from "@/constants/chromaticScale";
import { Note } from "@/types/types";

type DetectedNotesDisplayProps = {
	questionNotes: string[];
	detectedNotes: string[];
	fretNumbers?: UkuleleShape;
};

export const DetectedNotesDisplay: React.FC<DetectedNotesDisplayProps> = ({
	questionNotes,
	detectedNotes,
	fretNumbers,
}) => {
	const [normalizedDetected, setNormalizedDetected] = useState<string[]>([]);
	const [normalizedQuestion, setNormalizedQuestion] = useState<string[]>([]);
	const [detectedFlags, setDetectedFlags] = useState<boolean[]>([]);

	// Normalize detected and question notes whenever they change
	useEffect(() => {
		const normDetected = detectedNotes.map((n) => {
			const { note, octave } = parseNoteDisplay(n);
			return note + octave;
		});
		setNormalizedDetected(normDetected);

		const normQuestion = questionNotes.map((n) => {
			const { note, octave } = parseNoteDisplay(n);
			return note + octave;
		});
		setNormalizedQuestion(normQuestion);
	}, [detectedNotes, questionNotes]);

	// Update detectedFlags to mark the correct strings detected in order
	useEffect(() => {
		if (!normalizedQuestion.length) {
			setDetectedFlags([]);
			return;
		}

		const flags = new Array(normalizedQuestion.length).fill(false);

		// For each detected note, mark the first unmatched string with that note
		for (const note of normalizedDetected) {
			const idx = normalizedQuestion.findIndex(
				(n, i) => n === note && flags[i] === false
			);
			if (idx !== -1) {
				flags[idx] = true;
			}
		}

		setDetectedFlags(flags);
	}, [normalizedDetected, normalizedQuestion]);

	if (!normalizedQuestion.length) return null;

	return (
		<div className="p-4 w-full">
			<ul className="grid grid-cols-4 gap-2">
				{normalizedQuestion.map((note, index) => {
					const isDetected = detectedFlags[index];
					return (
						<li
							key={index}
							className={`w-[4em] px-3 py-2 rounded-4xl h-[4em] flex flex-col justify-center items-center text-center font-medium ${
								isDetected
									? "bg-green-200 text-green-900"
									: "bg-gray-200 text-gray-900"
							}`}
						>
							{fretNumbers && <h1>{fretNumbers[index]}</h1>}
							{note}
						</li>
					);
				})}
			</ul>
		</div>
	);
};
