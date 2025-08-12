type ChordFormula = (number | "x")[];

type Props = {
	chord: ChordFormula;
	numFrets?: number;
	detectedStrings?: number[]; // indexes of strings currently detected
};

const UkeDiagram = ({ chord, numFrets = 5, detectedStrings = [] }: Props) => {
	const stringCount = 4;
	const fretHeight = 30;
	const stringSpacing = 30;
	const dotRadius = 7;
	const startX = 20;
	const startY = 40;

	const diagramWidth = stringSpacing * (stringCount - 1) + startX * 2;
	const diagramHeight = fretHeight * numFrets + startY;

	console.log(detectedStrings);

	return (
		<svg width={diagramWidth} height={diagramHeight}>
			{/* Strings (vertical lines) */}
			{Array.from({ length: stringCount }, (_, i) => (
				<line
					key={`string-${i}`}
					x1={startX + i * stringSpacing}
					y1={startY}
					x2={startX + i * stringSpacing}
					y2={startY + fretHeight * numFrets}
					stroke="#000"
					strokeWidth={2}
				/>
			))}

			{/* Frets (horizontal lines) */}
			{Array.from({ length: numFrets + 1 }, (_, i) => (
				<line
					key={`fret-${i}`}
					x1={startX}
					y1={startY + i * fretHeight}
					x2={startX + stringSpacing * (stringCount - 1)}
					y2={startY + i * fretHeight}
					stroke="#000"
					strokeWidth={i === 0 ? 4 : 2} // Nut is thicker
				/>
			))}

			{/* Dots for fingered notes */}
			{chord.map((fret, stringIndex) => {
				if (typeof fret === "number" && fret > 0) {
					const cx = startX + stringIndex * stringSpacing;
					const cy = startY + fret * fretHeight - fretHeight / 2;
					const isDetected = detectedStrings.includes(stringIndex);
					return (
						<circle
							key={`dot-${stringIndex}`}
							cx={cx}
							cy={cy}
							r={dotRadius}
							fill={isDetected ? "#38a169" /* green */ : "#000" /* black */}
							stroke={isDetected ? "#2f855a" : "none"}
							strokeWidth={isDetected ? 2 : 0}
						/>
					);
				}
				return null;
			})}

			{/* Open string markers (0) */}
			{chord.map((fret, stringIndex) => {
				if (fret === 0) {
					const cx = startX + stringIndex * stringSpacing;
					const cy = startY - 10;
					return (
						<text
							key={`open-${stringIndex}`}
							x={cx}
							y={cy}
							fontSize="14"
							textAnchor="middle"
						>
							○
						</text>
					);
				}
				return null;
			})}

			{/* X for muted */}
			{chord.map((fret, stringIndex) => {
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
	);
};

export default UkeDiagram;
