"use client";

import React, { useEffect, useState } from "react";
import { parseNoteDisplay } from "@/lib/utils/gameUtils";
import { UkuleleShape } from "@/constants/musicConstants";

type Props = {
	chord?: UkuleleShape; // fret numbers: (number | "x")[]
	numFrets?: number;
	questionNotes: string[]; // Notes for each string, e.g. ["G4","C4","E4","A4"]
	detectedNotes: string[]; // Notes currently played
};

const UkeDiagramWithNotes = ({
	chord,
	numFrets = 5,
	questionNotes,
	detectedNotes,
}: Props) => {
	const stringCount = 4;
	const fretHeight = 30;
	const stringSpacing = 30;
	const dotRadius = 14; // Bigger for text inside
	const startX = 20;
	const startY = 40;

	const diagramWidth = stringSpacing * (stringCount - 1) + startX * 2;
	const diagramHeight = fretHeight * numFrets + startY;

	const [normalizedDetected, setNormalizedDetected] = useState<string[]>([]);
	const [normalizedQuestion, setNormalizedQuestion] = useState<string[]>([]);
	const [detectedFlags, setDetectedFlags] = useState<boolean[]>([]);

	// Normalize detected and question notes
	useEffect(() => {
		setNormalizedDetected(
			detectedNotes.map((n) => {
				const { note, octave } = parseNoteDisplay(n);
				return note + octave;
			})
		);
		setNormalizedQuestion(
			questionNotes.map((n) => {
				const { note, octave } = parseNoteDisplay(n);
				return note + octave;
			})
		);
	}, [detectedNotes, questionNotes]);

	// Mark correct notes detected (lower strings first when duplicates exist)
	useEffect(() => {
		const flags = new Array(normalizedQuestion.length).fill(false);
		const remainingDetected = [...normalizedDetected];

		// Loop from lower string index (0) to higher string index
		for (let i = 0; i < normalizedQuestion.length; i++) {
			const note = normalizedQuestion[i];
			const idx = remainingDetected.indexOf(note);
			if (idx !== -1) {
				flags[i] = true;
				remainingDetected.splice(idx, 1);
			}
		}

		setDetectedFlags(flags);
	}, [normalizedDetected, normalizedQuestion]);

	return (
		<div className="diagram_ctn flex justify-center	">
			<svg width={diagramWidth} height={diagramHeight}>
				{/* Strings */}
				{Array.from({ length: stringCount }, (_, i) => (
					<line
						key={`string-${i}`}
						x1={startX + i * stringSpacing}
						y1={startY}
						x2={startX + i * stringSpacing}
						y2={startY + fretHeight * numFrets}
						stroke="#000"
						strokeWidth={2}
						style={{ opacity: 0.2 }}
					/>
				))}

				{/* Frets */}
				{Array.from({ length: numFrets + 1 }, (_, i) => (
					<line
						key={`fret-${i}`}
						x1={startX}
						y1={startY + i * fretHeight}
						x2={startX + stringSpacing * (stringCount - 1)}
						y2={startY + i * fretHeight}
						stroke="#000"
						strokeWidth={i === 0 ? 4 : 2}
						style={{ opacity: 0.2 }}
					/>
				))}

				{/* Dots with note names */}
				{chord?.map((fret, stringIndex) => {
					if (typeof fret === "number" && fret >= 0) {
						const cx = startX + stringIndex * stringSpacing;
						const cy =
							fret === 0
								? startY - 20 // open string marker position
								: startY + fret * fretHeight - fretHeight / 2;

						const noteLabel = normalizedQuestion[stringIndex];
						const isDetected = detectedFlags[stringIndex];

						return (
							<g key={`dot-${stringIndex}`}>
								{fret === 0 ? (
									// Open string style: transparent fill, outline only
									<circle
										cx={cx}
										cy={cy}
										r={dotRadius}
										fill="transparent"
										stroke={isDetected ? "#38a169" : "#000"}
										strokeWidth={2}
									/>
								) : (
									// Fretted note style: solid fill
									<circle
										cx={cx}
										cy={cy}
										r={dotRadius}
										fill={isDetected ? "#38a169" : "#000"}
										stroke={isDetected ? "#2f855a" : "none"}
										strokeWidth={isDetected ? 2 : 0}
									/>
								)}

								<text
									x={cx}
									y={cy + 5} // vertical centering
									fontSize="10"
									fontWeight="bold"
									textAnchor="middle"
									fill={fret === 0 ? "#000" : isDetected ? "#000" : "#fff"}
								>
									{noteLabel}
								</text>
							</g>
						);
					}
					return null;
				})}

				{/* Muted markers */}
				{chord?.map((fret: number | string, stringIndex) => {
					if (fret === "x") {
						const cx = startX + stringIndex * stringSpacing;
						const cy = startY - 10;
						return (
							<text
								key={`mute-${stringIndex}`}
								x={cx}
								y={cy}
								fontSize="14"
								textAnchor="middle"
							>
								×
							</text>
						);
					}
					return null;
				})}
			</svg>
		</div>
	);
};

export default UkeDiagramWithNotes;
