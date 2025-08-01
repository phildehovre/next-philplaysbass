import React from "react";

type ClockfacePropsType = {
	showPulse: boolean;
	progress: number;
	withTimer: boolean;
	children: React.ReactNode;
};

const CIRCLE_RADIUS = "45";
const CIRCLE_CANVAS = "50";

const Clockface: React.FC<ClockfacePropsType> = ({
	withTimer,
	showPulse,
	progress,
	children,
}) => {
	return (
		<div className="clock-face relative">
			{showPulse && <div className="pulse-ripple" />}
			{showPulse && <div className="pulse-ripple delay" />}

			<svg viewBox="0 0 100 100" className="clock-svg">
				<circle
					className="clock-bg"
					cx={CIRCLE_CANVAS}
					cy={CIRCLE_CANVAS}
					r={CIRCLE_RADIUS}
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
