"use client";

import React from "react";
import { normalizeNote, uniqueUnlessConsecutive } from "@/lib/utils/gameUtils";
import { UkuleleShape } from "@/constants/chromaticScale";

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
	// console.log(questionNotes, uniqueUnlessConsecutive(detectedNotes));
	return (
		<div className="p-4 w-full">
			<ul className="grid grid-cols-4 gap-2">
				{questionNotes.map((note, index) => {
					const isDetected = detectedNotes.includes(note);
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
