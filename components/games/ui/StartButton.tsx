"use client";
import React, { useEffect, useState } from "react";

const StartButton = (props: any) => {
	const { gameOptions, isIdle } = props;

	const [buttonText, setButtonText] = useState<string>();

	useEffect(() => {
		if (isIdle) {
			setButtonText("Ready?");
			setTimeout(() => {
				setButtonText("Set!");
			}, 1000);
		} else {
			setButtonText("Start");
		}
	}, [isIdle]);

	return (
		<div>
			<div className="options_ctn"></div>
			<div className="">{buttonText}</div>
		</div>
	);
};

export default StartButton;
