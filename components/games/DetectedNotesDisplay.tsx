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
	const [normalizedDetected, setNormalizeDetected] = useState<string[]>();
	const [normalizedQuestion, setNormalizeQuestion] = useState<string[]>();

	useEffect(() => {
		setNormalizeDetected(
			detectedNotes.map((n) => {
				const { note, octave } = parseNoteDisplay(n);
				return note + octave;
			})
		);
		setNormalizeQuestion(
			questionNotes.map((n) => {
				const { note, octave } = parseNoteDisplay(n);
				return note + octave;
			})
		);
	}, [detectedNotes]);

	if (!normalizedQuestion) return;

	return (
		<div className="p-4 w-full">
			<ul className="grid grid-cols-4 gap-2">
				{normalizedQuestion.map((note, index) => {
					const isDetected = normalizedDetected?.includes(note);
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
