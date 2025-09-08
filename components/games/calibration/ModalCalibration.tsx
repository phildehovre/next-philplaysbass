"use client";
import React, { useState } from "react";
import LatencyCalibration from "./LatencyCalibration";
import InputVolumeCalibration from "./InputVolumeCalibration";
import CompletedCalibration from "./CompletedCalibration";
import { usePracticeSession } from "@/context/practiceSessionsContext";
import Modal from "@/components/Modal";

export type CalibrationSettings = {
	latency?: number;
	defaultInputDeviceId?: string;
	completed?: boolean;
};

export type CalibrationSettingKey =
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
	const [calibrationObj, setCalibrationObj] = useState<CalibrationSettings>({});

	const { isFirstTimeUser } = usePracticeSession();

	const STEPS: React.ComponentType<CalibrationPhaseProps>[] = [
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
					setCalibrationObj((prev) => ({ ...prev, [setting]: value }));
					nextStep();
				}}
			/>
		);
	};

	const cacheAndRecordUserSettings = async () => {
		// cache locally as cookies
		Object.entries(calibrationObj).forEach(([key, value]) => {
			localStorage.set(key, String(value), { expires: 365 });
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
