import ModalCalibration from "@/components/games/calibration/ModalCalibration";
import RhythmAccuracyGame from "@/components/games/RhythmAccuracyGame";
import { RhythmAccuracyGameProvider } from "@/context/rhythmAccuracyGameContext";
import React from "react";

const page = () => (
	<div>
		<RhythmAccuracyGameProvider>
			<ModalCalibration />
			<RhythmAccuracyGame />
		</RhythmAccuracyGameProvider>
	</div>
);

export default page;
