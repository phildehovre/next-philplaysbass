"use client";
import React, { useEffect, useRef, useState } from "react";
import {
	MessageCircleQuestionIcon,
	PlayIcon,
	StopCircleIcon,
} from "lucide-react";
import MetroWidget from "../ui/MetroWidget";
import PitchyWithDeviceSelect from "../PitchyComponent";
import Clockface from "../ui/Clockface";
import { CalibrationSettingKey } from "./ModalCalibration";
import { FREE_PRACTICE_TYPE } from "@/constants/GameConstants";

const REQUIRED_SAMPLES = 8; // how many taps before averaging

const LatencyCalibration = (props: {
	onReady: (setting: CalibrationSettingKey, value: any) => void;
}) => {
	const { onReady } = props;

	const [play, setPlay] = useState<boolean>(false);
	const [lastTickTime, setLastTickTime] = useState<number | null>(0);
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

	const submitOnReady = () => {
		if (latencySamples.length >= REQUIRED_SAMPLES) {
			onReady("latency", avgLatency);
		}
	};

	const cooldown = tempoInterval;

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

	const handleResetCalibration = () => {
		setLatencySamples([]);
		setPlay(false);
		setCalibrationComplete(false);
		setAvgLatency(null);
	};

	return (
		<div className="">
			<span className="flex gap-1">
				<h1 className="text-xl font-bold">Let's calibrate the game!</h1>
				<MessageCircleQuestionIcon className="text-gray-500" />
			</span>
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
							onClick={handleResetCalibration}
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
				game={{
					showPulse: false,
					gameStarted: false,
					showProgress: true,
					state: {
						withTimer: false,
						progress: Math.min(
							(latencySamples.length / REQUIRED_SAMPLES) * 100,
							100
						),
					},
				}}
				showSettings={false}
				gameType={FREE_PRACTICE_TYPE}
			>
				<div className="absolute rounded-b-full">
					{latencySamples.length == REQUIRED_SAMPLES ? (
						<button>Continue</button>
					) : (
						<span className="flex flex-col items-center justify-center">
							{play ? (
								<>
									<p>Keep playing...</p>
									<span className="flex justify-center">
										({latencySamples.length}/{REQUIRED_SAMPLES})
									</span>
									<StopCircleIcon
										color="darkRed"
										onClick={handleResetCalibration}
										size={40}
									/>
								</>
							) : (
								<PlayIcon onClick={() => setPlay(true)} />
							)}
						</span>
					)}
				</div>
				{latencySamples.length >= REQUIRED_SAMPLES && (
					<button className="ui_btn circular absolute" onClick={submitOnReady}>
						Complete
					</button>
				)}
			</Clockface>
		</div>
	);
};

export default LatencyCalibration;
