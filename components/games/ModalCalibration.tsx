"use client";
import { usePracticeSession } from "@/context/practiceSessionsContext";
import React, { useEffect, useRef, useState } from "react";
import Modal from "../Modal";
import {
	MessageCircleQuestionIcon,
	PlayIcon,
	StopCircleIcon,
} from "lucide-react";
import MetroWidget from "./ui/MetroWidget";
import PitchyWithDeviceSelect from "./PitchyComponent";
import Clockface from "./ui/Clockface";

const REQUIRED_SAMPLES = 8; // how many taps before averaging

const ModalCalibration = () => {
	const [play, setPlay] = useState<boolean>(false);
	const [lastTickTime, setLastTickTime] = useState<number | null>(0);
	const { isFirstTimeUser } = usePracticeSession();
	const [bpm, setBpm] = useState<number>(40);
	const [tempoInterval, setTempoInterval] = useState<number>();
	const lastDetectionTimeRef = useRef<number>(0);

	// store calibration samples
	const [latencySamples, setLatencySamples] = useState<number[]>([]);
	const [calibrationComplete, setCalibrationComplete] = useState(false);
	const [avgLatency, setAvgLatency] = useState<number | null>(null);

	useEffect(() => {
		setTempoInterval((60 / bpm) * 1000);
	}, [bpm]);
	const cooldown = tempoInterval;

	if (!isFirstTimeUser) return null;

	const onNoteDetection = () => {
		const noteTime = performance.now();

		if (!cooldown || noteTime - lastDetectionTimeRef.current < cooldown) return;
		lastDetectionTimeRef.current = noteTime;

		if (lastTickTime && tempoInterval) {
			const diff = noteTime - lastTickTime;

			const timeFromBeat = diff % tempoInterval;
			const msFromClick =
				timeFromBeat > tempoInterval / 2
					? timeFromBeat - tempoInterval
					: timeFromBeat;

			// store this sample
			setLatencySamples((prev) => {
				const updated = [...prev, msFromClick];

				// when we have enough, calculate average
				if (updated.length >= REQUIRED_SAMPLES) {
					const avg = updated.reduce((sum, v) => sum + v, 0) / updated.length;
					setAvgLatency(avg);
					setCalibrationComplete(true);

					// persist it for future sessions
					localStorage.setItem("calibrationOffset", avg.toString());
				}

				return updated;
			});
		}
	};

	return (
		<Modal onClose={function (): void {}}>
			<span className="flex gap-1">
				<h1 className="text-xl font-bold">Let's calibrate the game!</h1>
				<MessageCircleQuestionIcon className="text-gray-500" />
			</span>
			<button
				className="hover:text-yellow-300 flex items-center"
				onClick={() => {
					setPlay(!play);
					setLatencySamples([]);
					setCalibrationComplete(false);
					setAvgLatency(null);
				}}
			>
				{play ? <StopCircleIcon /> : <PlayIcon />}
			</button>
			<MetroWidget
				bpm={bpm}
				setBpm={setBpm}
				play={play}
				gameStarted={play}
				lastTickTime={lastTickTime}
				setLastTickTime={setLastTickTime}
			/>
			<PitchyWithDeviceSelect onNoteDetection={onNoteDetection} />

			{/* feedback UI */}
			<div className="mt-4">
				{!calibrationComplete && (
					<p>
						Play along with the clicks as best as you can! You can try as many
						times as needed, just click{" "}
						<button
							className="underline"
							style={{ color: "var(--clr-cta-accent)" }}
						>
							restart
						</button>{" "}
					</p>
				)}
				{calibrationComplete && avgLatency !== null && (
					<p className="font-bold text-green-600">
						Calibration complete! Your average latency is{" "}
						{avgLatency.toFixed(1)} ms
					</p>
				)}
			</div>
			<Clockface
				progress={Math.min(
					(latencySamples.length / REQUIRED_SAMPLES) * 100,
					100
				)}
				showPulse={false}
				gameStarted={false}
				showProgress={true}
			>
				<div className="absolute rounded-b-full">
					{latencySamples.length == REQUIRED_SAMPLES ? (
						<button>Continue</button>
					) : (
						<span className="flex-col">
							<p>Keep playing...</p>
							<span className="flex justify-center">
								({latencySamples.length}/{REQUIRED_SAMPLES})
							</span>
						</span>
					)}
				</div>
			</Clockface>
		</Modal>
	);
};

export default ModalCalibration;
