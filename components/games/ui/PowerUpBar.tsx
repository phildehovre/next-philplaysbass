import { usePracticeSession } from "@/context/practiceSessionsContext";
import React, { useMemo } from "react";

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

	const bonusRadius = radius + 8;
	const circumference = Math.PI * bonusRadius; // half-circle length

	// --- Calculate fill fraction based on streak ---
	const streakProgress = (streak % 5) / 5;
	const fillFraction = Math.min(1, streakProgress + (progress / 100) * (1 / 5));

	// Memoize style object so transition works
	const dashStyle = useMemo(
		() => ({
			strokeDashoffset: circumference * (1 - fillFraction),
			transition: `stroke-dashoffset ${transitionMs}ms ease-out`,
		}),
		[circumference, fillFraction, transitionMs]
	);

	return (
		<g transform={`rotate(90 ${cx} ${cy})`} className="clock-powerup">
			{/* background arc */}
			<path
				d={`M ${cx} ${
					cy - bonusRadius
				} A ${bonusRadius} ${bonusRadius} 0 0 0 ${cx} ${cy + bonusRadius}`}
				stroke="var(--clr-box-bg)"
				strokeWidth="4"
				strokeLinecap="round"
				fill="none"
			/>
			{/* progress arc with smooth transition */}
			<path
				d={`M ${cx} ${
					cy - bonusRadius
				} A ${bonusRadius} ${bonusRadius} 0 0 0 ${cx} ${cy + bonusRadius}`}
				stroke="var(--clr-cta-accent)"
				strokeWidth="4"
				strokeLinecap="round"
				fill="none"
				strokeDasharray={circumference}
				style={dashStyle}
			/>
		</g>
	);
};

export default PowerUpBar;
