"use client";

import React, { useEffect, useRef, useState } from "react";
import "../games/GameStyles.css";
import { MinusIcon, Pause, PlusIcon, Square, TimerIcon } from "lucide-react";
import { usePracticeSession } from "@/context/practiceSessionsContext";
import GameContainer from "../games/ui/GameContainer";
import AnimatedNumber from "../games/ui/AnimatedNumber";
import MetroWidget from "../games/ui/MetroWidget";
import Clockface from "../games/ui/Clockface";
import PitchyComponent from "../games/PitchyComponent";
import Tuner from "../games/tuner/Tuner";
import { MAX_TEMPO_AS_NUM } from "@/constants/GameConstants";
import Modal from "../Modal";
import { formatTime } from "@/utils/helpers";

export type TimerCfg = {
	initialDuration: number; // ms
	bpm: number;
	label: string;
	postCooldown: number | "pause"; // ms or "pause"
};

const Timer = () => {
	const [initialDuration, setInitialDuration] = useState<number>(0);
	const [displayedDuration, setDisplayedDuration] = useState<number>(60000);
	const [remainingTime, setRemainingTime] = useState<number>(60000);

	const [cooldownDuration, setCooldownDuration] = useState<number>(5000);
	const [label, setLabel] = useState<string>("New Phase");

	const [bpm, setBpm] = useState<number>(MAX_TEMPO_AS_NUM / 2);
	const [started, setStarted] = useState<boolean>(false);
	const [showTimerModal, setShowTimerModal] = useState<boolean>(false);
	const [play, setPlay] = useState<boolean>(false);
	const [paused, setPaused] = useState<boolean>(false);
	const [progress, setProgress] = useState<number>(0);

	const [timerArray, setTimerArray] = useState<TimerCfg[]>([]);
	const [currentIndex, setCurrentIndex] = useState<number>(0);

	const timerRef = useRef<NodeJS.Timeout | null>(null);
	const { finishSession } = usePracticeSession();

	// progress calculation
	useEffect(() => {
		if (!started) {
			setProgress(0);
			return;
		}
		const currentTimer = timerArray[currentIndex];
		if (!currentTimer) return;
		setProgress(
			((currentTimer.initialDuration - remainingTime) /
				currentTimer.initialDuration) *
				100
		);
	}, [remainingTime, started, currentIndex, timerArray]);

	// handle tab close
	useEffect(() => {
		const handleVisibilityChange = () => {
			if (document.hidden) finishSession();
		};
		const handleBeforeUnload = () => finishSession();

		document.addEventListener("visibilitychange", handleVisibilityChange);
		window.addEventListener("beforeunload", handleBeforeUnload);
		return () => {
			document.removeEventListener("visibilitychange", handleVisibilityChange);
			window.removeEventListener("beforeunload", handleBeforeUnload);
		};
	}, [finishSession]);

	// countdown
	useEffect(() => {
		if (started && remainingTime > 0 && !paused) {
			timerRef.current = setTimeout(() => {
				setRemainingTime((prev) => prev - 1000);
			}, 1000);
		} else if (remainingTime <= 0 && started) {
			handlePhaseComplete();
		}
		return () => {
			if (timerRef.current) clearTimeout(timerRef.current);
		};
	}, [started, remainingTime, paused]);

	// handle phase completion
	const handlePhaseComplete = () => {
		const current = timerArray[currentIndex];
		if (!current) return;

		if (current.postCooldown === "pause") {
			setPaused(true);
			setStarted(false);
		} else if (current.postCooldown > 0) {
			// run cooldown as a mini timer
			setRemainingTime(current.postCooldown);
			setInitialDuration(current.postCooldown);
			setStarted(true);
			setPaused(false);

			// after cooldown, move to next timer
			setTimeout(() => {
				setCurrentIndex((i) => i + 1);
				startNextTimer();
			}, current.postCooldown);
		} else {
			setCurrentIndex((i) => i + 1);
			startNextTimer();
		}
	};

	const startNextTimer = () => {
		const next = timerArray[currentIndex + 1];
		if (!next) {
			// session finished
			setStarted(false);
			setPaused(false);
			return;
		}
		setInitialDuration(next.initialDuration);
		setRemainingTime(next.initialDuration);
		setStarted(true);
		setPaused(false);
	};

	const confirmTimer = () => {
		const newTimer: TimerCfg = {
			initialDuration: displayedDuration,
			bpm,
			label,
			postCooldown: cooldownDuration,
		};
		setTimerArray((prev) => [...prev, newTimer]);
		setShowTimerModal(false);
		setLabel("New Phase");
		setDisplayedDuration(60000);
		setCooldownDuration(5000);
	};

	const handleStop = () => {
		setStarted(false);
		setPaused(false);
		setRemainingTime(initialDuration);
	};

	return (
		<GameContainer>
			<div className="scoreboard_ctn flex w-full ">
				<div className="scoreboard text-2xl font-mono w-full">
					<label className="scoreboard_label">Phase</label>
					<AnimatedNumber data={currentIndex + 1} />
				</div>
				<div className="font-mono w-full ui_btn">
					<button
						className="flex gap-1"
						onClick={() => setShowTimerModal(true)}
					>
						<TimerIcon />
						Add
					</button>
				</div>
			</div>

			<div className="flex justify-between">
				<div className="timer-list_ctn w-1/2">
					<ul>
						{timerArray.map((t, i) => (
							<li key={i} className={i === currentIndex ? "font-bold" : ""}>
								{i + 1}. {t.label} ({formatTime(t.initialDuration)})
							</li>
						))}
					</ul>
				</div>

				<Clockface
					showPulse={false}
					withTimer
					progress={progress}
					gameStarted={started}
					showPowerUp={false}
					size={0.8}
				>
					<div className="absolute flex flex-col gap-2 items-center">
						{!started ? (
							<>
								{timerArray.length > 0 && (
									<button
										className="game_btn start-game_btn"
										onClick={() => {
											setCurrentIndex(0);
											setInitialDuration(timerArray[0].initialDuration);
											setRemainingTime(timerArray[0].initialDuration);
											setStarted(true);
										}}
									>
										Start
									</button>
								)}
							</>
						) : (
							<>
								<button onClick={() => setPaused(!paused)}>
									<Pause color={`${!paused ? "white" : "var(--clr-brand"}`} />
								</button>
								<h1
									className={`text-3xl font-bold ${
										paused ? "text-gray-600" : ""
									}`}
								>
									{formatTime(remainingTime)}
								</h1>
								<button onClick={() => handleStop()}>
									<Square color="red" />
								</button>
							</>
						)}
					</div>
				</Clockface>
			</div>

			<MetroWidget
				bpm={bpm}
				setBpm={setBpm}
				play={play}
				setPlay={setPlay}
				gameStarted={play}
				lastTickTime={null}
				setLastTickTime={() => {}}
				controls={true}
			/>
			<Tuner />
			<PitchyComponent showDevices={true} onNoteDetection={() => {}} />

			{showTimerModal && (
				<Modal className="box" onClose={() => setShowTimerModal(false)}>
					<h1 className="text-2xl font-bold ">Add Timer Phase</h1>

					<label className="mt-2">Label</label>
					<input
						className="w-full p-1 border"
						value={label}
						onChange={(e) => setLabel(e.target.value)}
					/>

					<div className="scoreboard box flex flex-col items-center justify-between w-full my-4">
						<div className="box_label text-2xl">Timer duration</div>
						<span className="flex w-2/3">
							<button
								className="ui_btn secondary"
								onClick={() =>
									setDisplayedDuration((prev) => Math.max(60000, prev - 5000))
								}
							>
								<MinusIcon />
							</button>
							<h1 className="scoreboard timer text-xl w-full">
								{formatTime(displayedDuration)}
							</h1>
							<button
								className="ui_btn secondary"
								onClick={() => setDisplayedDuration((prev) => prev + 5000)}
							>
								<PlusIcon />
							</button>
						</span>
						<input
							className="w-full"
							type="range"
							min="60000"
							max="3600000"
							step="60000"
							value={displayedDuration}
							onChange={(e) => setDisplayedDuration(e.target.valueAsNumber)}
						/>
					</div>

					<div className="scoreboard box flex flex-col items-center justify-between w-full my-4">
						<div className="box_label text-2xl">Cooldown duration</div>
						<span className="flex w-2/3">
							<button
								className="ui_btn secondary"
								onClick={() =>
									setCooldownDuration((prev) => Math.max(0, prev - 1000))
								}
							>
								<MinusIcon />
							</button>
							<h1 className="scoreboard timer text-xl w-full">
								{cooldownDuration === 0 ? "None" : formatTime(cooldownDuration)}
							</h1>
							<button
								className="ui_btn secondary"
								onClick={() => setCooldownDuration((prev) => prev + 1000)}
							>
								<PlusIcon />
							</button>
						</span>
						<input
							className="w-full"
							type="range"
							min="0"
							max="60000"
							step="1000"
							value={cooldownDuration}
							onChange={(e) => setCooldownDuration(e.target.valueAsNumber)}
						/>
					</div>

					<span className="flex justify-between mt-4">
						<button
							className="ui_btn secondary"
							onClick={() => setShowTimerModal(false)}
						>
							Cancel
						</button>
						<button className="ui_btn" onClick={confirmTimer}>
							Confirm
						</button>
					</span>
				</Modal>
			)}
		</GameContainer>
	);
};

export default Timer;
