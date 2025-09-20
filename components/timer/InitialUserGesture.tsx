import React from "react";
import Modal from "../Modal";
import { CalibrationSettingKey } from "../games/calibration/ModalCalibration";

const InitialUserGesture = (props: {
	onReady: (setting: CalibrationSettingKey, value: any) => void;
}) => {
	const { onReady } = props;
	return (
		<div className="flex flex-col gap-2 p-2">
			<h1 className="text-4xl font-bold text-center">Welcome!</h1>
			<p>
				I am delighted that you have decided to try my practice tools, they
				still need work and I would love to hear your feedback on the discord
				server!
			</p>
			<p className="text-center mt-5">
				Click the button to calibrate your devices and volume!
			</p>
			<button
				onClick={() => onReady("initialUserGesture", true)}
				className="ui_btn"
			>
				Let's go!
			</button>
		</div>
	);
};

export default InitialUserGesture;
