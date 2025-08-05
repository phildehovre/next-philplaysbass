import React from "react";
import { ScoreBurstManager } from "./ScoreBurstManager";

type ClockfacePropsType = {
	showPulse: boolean;
	progress: number;
	withTimer?: boolean;
	children: React.ReactNode;
	size?: number;
};

const CIRCLE_RADIUS = "45";
const CIRCLE_CANVAS = "50";

const Clockface: React.FC<ClockfacePropsType> = ({
	withTimer = false,
	showPulse,
	progress,
	children,
	size,
}) => {
	return (
		<div className="clock-face relative flex items-center justify-center">
			{showPulse && <div className="pulse-ripple" />}
			{showPulse && <div className="pulse-ripple delay" />}
			<ScoreBurstManager />

			<svg viewBox="0 0 100 100" className="clock-svg">
				<circle
					className="clock-bg"
					cx={CIRCLE_CANVAS}
					cy={CIRCLE_CANVAS}
					r={CIRCLE_RADIUS}
					style={{ strokeWidth: `${size ? size / 2 : 10}` }}
				/>
				{withTimer && (
					<circle
						className="clock-progress"
						cx={CIRCLE_CANVAS}
						cy={CIRCLE_CANVAS}
						r={CIRCLE_RADIUS}
						strokeDasharray={2 * Math.PI * 45}
						strokeDashoffset={(1 - progress / 100) * 2 * Math.PI * 45}
					/>
				)}
			</svg>
			{children}
		</div>
	);
};

export default Clockface;
