import { usePracticeSession } from "@/context/practiceSessionsContext";
import { PartyPopper } from "lucide-react";
import React from "react";
import { CalibrationSettingKey, CalibrationSettings } from "./ModalCalibration";

const CompletedCalibration = (props: {
	onReady: (k: CalibrationSettingKey, s: any) => void;
}) => {
	const { onReady } = props;
	return (
		<div className="flex  flex-col min-h-[20svh] items-center gap-5">
			<h1 className="flex justify-evenly text-2xl font-black">
				You're good to go!
				<PartyPopper />
			</h1>
			<p className="h-full my-auto">
				Remember you can change the latency at anytime to adapt to your
				machine's processing capability.
			</p>
			<button className="ui_btn" onClick={() => onReady("completed", true)}>
				Got it!
			</button>
		</div>
	);
};

export default CompletedCalibration;
