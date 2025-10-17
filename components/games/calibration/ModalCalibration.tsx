"use client";
import React, { useEffect, useState } from "react";
import LatencyCalibration from "./LatencyCalibration";
import InputVolumeCalibration from "./InputVolumeCalibration";
import CompletedCalibration from "./CompletedCalibration";
import { usePracticeSession } from "@/context/practiceSessionsContext";
import Modal from "@/components/Modal";
import InitialUserGesture from "@/components/timer/InitialUserGesture";

export type CalibrationSettings = {
	initialUserGesture: boolean;
	latency?: number;
	defaultInputDeviceId?: string;
	completed?: boolean;
};

export type CalibrationSettingKey =
	| "initialUserGesture"
	| "latency"
	| "defaultInputDeviceId"
	| "completed";

// Define a common prop type for calibration phases
export interface CalibrationPhaseProps {
	onReady: (
		setting: CalibrationSettingKey,
		value: CalibrationSettings[CalibrationSettingKey]
	) => void;
}

const ModalCalibration = () => {
	const [calibrationStep, setCalibrationStep] = useState<number>(0);
	const [calibrationObj, setCalibrationObj] = useState<CalibrationSettings>({
		initialUserGesture: false,
	});

	const { isFirstTimeUser, setIsFirstTimeUser } = usePracticeSession();

	const STEPS: React.ComponentType<CalibrationPhaseProps>[] = [
		InitialUserGesture,
		InputVolumeCalibration,
		LatencyCalibration,
		CompletedCalibration,
	];

	useEffect(() => {
		if (calibrationObj.defaultInputDeviceId && calibrationObj.latency) {
			setIsFirstTimeUser(false);
		}
	}, [calibrationObj]);

	if (!isFirstTimeUser) return null;

	const nextStep = () =>
		setCalibrationStep((s) => Math.min(s + 1, STEPS.length - 1));

	const renderPhase = () => {
		const CurrentPhase = STEPS[calibrationStep];
		return (
			<CurrentPhase
				onReady={(setting, value) => {
					setCalibrationObj((prev) => ({ ...prev, [setting]: value }));
					nextStep();
				}}
			/>
		);
	};

	const cacheAndRecordUserSettings = async () => {
		// cache locally as cookies
		Object.entries(calibrationObj).forEach(([key, value]) => {
			localStorage.setItem(key, String(value));
		});

		// persist in DB via API
		try {
			await fetch("/api/user-settings", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(calibrationObj),
			});
		} catch (err) {
			console.error("Failed to save calibration settings:", err);
		}
	};

	return (
		<Modal
			onClose={() => {
				cacheAndRecordUserSettings();
			}}
		>
			{/* Once steps are completed, hide modal */}
			{calibrationStep < STEPS.length ? renderPhase() : null}
		</Modal>
	);
};

export default ModalCalibration;
