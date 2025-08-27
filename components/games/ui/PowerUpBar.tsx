import { usePracticeSession } from "@/context/practiceSessionsContext";
import React from "react";
type PowerUpBarPropsType = {
	cx: number;
	cy: number;
	radius: number;
	progress: number;
};
const PowerUpBar = (props: PowerUpBarPropsType) => {
	const { cx, cy, radius, progress } = props;
	const { streak } = usePracticeSession();
	const bonusRadius = radius + 8;
	return (
		<g transform={`rotate(90 ${cx} ${cy})`} className="clock-powerup">
			<path
				d={`M ${cx} ${cy - bonusRadius}
        A ${bonusRadius} ${bonusRadius} 0 0 0 ${cx} ${cy + bonusRadius}`}
				stroke="var(--clr-box-bg)"
				strokeLinecap="round"
				strokeWidth="4"
				fill="none"
			/>
			<path
				d={`M ${cx} ${cy - bonusRadius}
        A ${bonusRadius} ${bonusRadius} 0 0 0 ${cx} ${cy + bonusRadius}`}
				stroke="var(--clr-accent)"
				strokeWidth="4"
				strokeLinecap="round"
				fill="none"
				strokeDasharray={Math.PI * bonusRadius}
				strokeDashoffset={Math.PI * bonusRadius * (1 - (progress ?? 0) / 100)}
			/>
		</g>
	);
};

export default PowerUpBar;
