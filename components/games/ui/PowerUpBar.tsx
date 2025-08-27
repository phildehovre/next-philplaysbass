import { useNoteMatchGameContext } from "@/context/noteMatchGameContext";
import { usePracticeSession } from "@/context/practiceSessionsContext";
import { useNoteMatchGame } from "@/hooks/game-hooks/useNoteMatchGame";
import { calculateStreakFactor } from "@/lib/utils/scoringUtils";
import React, { useEffect, useMemo, useState } from "react";

type PowerUpBarPropsType = {
	cx: number;
	cy: number;
	radius: number;
	progress?: number; // optional base progress (0 → 100)
	transitionMs?: number; // optional transition duration in ms
};

const PowerUpBar = ({
	cx,
	cy,
	radius,
	progress = 0,
	transitionMs = 300,
}: PowerUpBarPropsType) => {
	const { streak } = usePracticeSession();

	const [factor, setFactor] = useState<number>(0);

	useEffect(() => {
		if (streak >= 1) {
			setFactor(calculateStreakFactor(streak));
		} else {
			setFactor(0);
		}
	}, [streak]);

	const bonusRadius = radius + 8;
	const circumference = Math.PI * bonusRadius; // half-circle length

	// --- Bottom progress arc (streak-based) ---
	const streakProgress = (streak % 5) / 5;
	const fillFraction = Math.min(1, streakProgress + (progress / 100) * (1 / 5));

	const dashStyle = useMemo(
		() => ({
			strokeDashoffset: circumference * (1 - fillFraction),
			transition: `stroke-dashoffset ${transitionMs}ms ease-out`,
		}),
		[circumference, fillFraction, transitionMs]
	);

	// --- Bonus arcs (top half) ---
	const totalArcAngle = Math.PI - 0.12; // 180° for top half
	const arcPerBonus = totalArcAngle / 5; // 5 arcs
	const arcGap = 0.9; // shorten arcs to leave gaps (0.85 = 85% of slice)

	return (
		<>
			<g transform={`rotate(-90 ${cx} ${cy})`} className="clock-powerup">
				{/* background arc (right gauge) */}
				<path
					d={`M ${cx} ${cy - bonusRadius}
          A ${bonusRadius} ${bonusRadius} 0 0 0 ${cx} ${cy + bonusRadius}`}
					stroke="var(--clr-box-bg)"
					strokeWidth="4"
					strokeLinecap="round"
					fill="none"
				/>

				{/* progress arc (right gauge) */}
				<path
					d={`M ${cx} ${cy - bonusRadius}
          A ${bonusRadius} ${bonusRadius} 0 0 0 ${cx} ${cy + bonusRadius}`}
					stroke="var(--clr-cta-accent)"
					strokeWidth="4"
					strokeLinecap="round"
					fill="none"
					strokeDasharray={circumference}
					style={dashStyle}
				/>
			</g>
			<g transform={`rotate(95 ${cx} ${cy})`}>
				{/* bonus arcs (left gauge) */}
				{[...Array(5)].map((_, i) => {
					const margin = 0.03;
					const startAngle = Math.PI / 2 + i * arcPerBonus + margin;
					const endAngle = Math.PI / 2 + (i + arcGap) * arcPerBonus - margin;

					const x1 = cx + bonusRadius * Math.cos(startAngle);
					const y1 = cy + bonusRadius * Math.sin(startAngle);
					const x2 = cx + bonusRadius * Math.cos(endAngle);
					const y2 = cy + bonusRadius * Math.sin(endAngle);

					const isActive = i + 1 < factor;

					return (
						<path
							key={i}
							d={`M ${x1} ${y1} A ${bonusRadius} ${bonusRadius} 0 0 1 ${x2} ${y2}`}
							stroke={isActive ? "var(--clr-cta-accent)" : "var(--clr-box-bg)"}
							strokeWidth="4"
							strokeLinecap="round"
							fill="none"
						/>
					);
				})}
			</g>
		</>
	);
};

export default PowerUpBar;
