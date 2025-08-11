"use client";

import { UkuleleShape } from "@/constants/chromaticScale";
import React from "react";

interface UkuleleChordDiagramProps {
	chordFormula: UkuleleShape | undefined; // e.g. [0, 0, 0, 3]
	correctNotes: string[]; // e.g. ["G4", "C4"]
	stringNotes: string[]; // Notes for each string open, e.g. ["G4", "C4", "E4", "A4"]
}

export default function UkuleleChordDiagram({
	chordFormula,
	correctNotes,
	stringNotes,
}: UkuleleChordDiagramProps) {
	const fretCount = 5;
	const stringCount = 4;
	const fretSpacing = 30;
	const stringSpacing = 30;
	const width = (stringCount - 1) * stringSpacing + 40;
	const height = fretCount * fretSpacing + 40;

	const getFrettedNote = (stringIndex: number) => {
		if (!chordFormula) return "";
		const openNote = stringNotes[stringIndex];
		const fret = chordFormula[stringIndex];
		// For now, just return openNote — in real use, you'd calculate the pitch by semitone steps
		return openNote;
	};

	return (
		<div className="diagram_ctn flex justify-center">
			<svg
				width={width}
				height={height}
				style={{ background: "transparent", borderRadius: "8px" }}
			>
				{[...Array(fretCount + 1)].map((_, i) => (
					<line
						key={`fret-${i}`}
						x1={20}
						y1={20 + i * fretSpacing}
						x2={20 + (stringCount - 1) * stringSpacing}
						y2={20 + i * fretSpacing}
						stroke={i === 0 ? "black" : "#888"}
						strokeWidth={i === 0 ? 4 : 2}
					/>
				))}

				{/* Draw strings */}
				{[...Array(stringCount)].map((_, i) => (
					<line
						key={`string-${i}`}
						x1={20 + i * stringSpacing}
						y1={20}
						x2={20 + i * stringSpacing}
						y2={20 + fretCount * fretSpacing}
						stroke="#888"
						strokeWidth={2}
					/>
				))}

				{chordFormula?.map((fret, stringIndex) => {
					if (fret === 0) {
						// Open string marker above nut
						return (
							<circle
								key={`open-${stringIndex}`}
								cx={20 + stringIndex * stringSpacing}
								cy={10}
								r={6}
								fill={
									correctNotes.includes(getFrettedNote(stringIndex))
										? "green"
										: "white"
								}
								stroke="black"
							/>
						);
					}

					const note = getFrettedNote(stringIndex);
					const isCorrect = correctNotes.includes(note);

					return (
						<circle
							key={`dot-${stringIndex}`}
							cx={20 + stringIndex * stringSpacing}
							cy={20 + fretSpacing * (fret - 0.5)}
							r={8}
							fill={isCorrect ? "green" : "black"}
						/>
					);
				})}
			</svg>
		</div>
	);
}
