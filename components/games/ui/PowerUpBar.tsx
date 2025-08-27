import React from "react";
type PowerUpBarPropsType = {
	cx: number;
	cy: number;
	radius: number;
	progress: number;
};
const PowerUpBar = (props: PowerUpBarPropsType) => {
	const { cx, cy, radius, progress } = props;
	return (
		<div className="powerup_ctn">
			<svg>
				<path
					d={`M ${cx} ${cy - radius}
      A ${radius} ${radius} 0 0 0 ${cx} ${cy + radius}`}
					stroke="gray"
					strokeWidth="6"
					fill="none"
				/>

				<path
					d={`M ${cx} ${cy - radius}
      A ${radius} ${radius} 0 0 1 ${cx} ${cy - radius}`}
					stroke="var(--clr-accent)"
					strokeWidth="6"
					fill="none"
					strokeDasharray={Math.PI * radius}
					strokeDashoffset={Math.PI * radius * (1 - (progress ?? 0) / 100)}
				/>
			</svg>
		</div>
	);
};

export default PowerUpBar;
