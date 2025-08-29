"use client";
import React, { useState } from "react";
import LatencyCalibration from "./LatencyCalibration";
import InputVolumeCalibration from "./InputVolumeCalibration";
import CompletedCalibration from "./CompletedCalibration";
import { usePracticeSession } from "@/context/practiceSessionsContext";
import Modal from "@/components/Modal";

export type CalibrationSettings = {
	latency?: number | undefined;
	defaultInputDeviceId?: number | string | undefined;
};

export type CalibrationSettingKey = "latency" | "defaultInputDeviceId";

const ModalCalibration = () => {
	const [calibrationStep, setCalibrationStep] = useState<number>(0);
	const [calibrationObj, setCalibrationObj] = useState<CalibrationSettings>();

	const { isFirstTimeUser } = usePracticeSession();

	console.log(calibrationObj);
	const STEPS = [
		InputVolumeCalibration,
		LatencyCalibration,
		CompletedCalibration,
	];
	if (!isFirstTimeUser) return null;

	const nextStep = () =>
		setCalibrationStep((s) => Math.min(s + 1, STEPS.length - 1));

	const renderPhase = () => {
		const CurrentPhase = STEPS[calibrationStep];
		return (
			<CurrentPhase
				onReady={(setting, value) => {
					// Validate conditions
					setCalibrationObj((prev) => ({ ...prev, [setting]: value }));
					nextStep();
				}}
			/>
		);
	};

	return <Modal onClose={() => {}}>{renderPhase()}</Modal>;
};

export default ModalCalibration;
