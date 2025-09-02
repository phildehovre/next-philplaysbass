"use client";

import React, { useEffect, useRef, useState } from "react";
import "../games/GameStyles.css";
import {
	MinusIcon,
	Pause,
	PlusIcon,
	Square,
	StopCircle,
	TimerIcon,
} from "lucide-react";
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

const Timer = () => {
	const [initialDuration, setInitialDuration] = useState<number>(0); // ms
	const [displayedDuration, setDisplayedDuration] = useState<number>(60000);
	const [remainingTime, setRemainingTime] = useState<number>(60000);

	const [bpm, setBpm] = useState<number>(MAX_TEMPO_AS_NUM / 2);
	const [started, setStarted] = useState<boolean>(false);
	const [showTimerModal, setShowTimerModal] = useState<boolean>(false);
	const [play, setPlay] = useState<boolean>(false);
	const [paused, setPaused] = useState<boolean>(false);
	const [progress, setProgress] = useState<number>(0);

	const timerRef = useRef<NodeJS.Timeout | null>(null);

	const { finishSession } = usePracticeSession();

	useEffect(() => {
		if (!started) {
			setProgress(0);
			return;
		}
		setProgress(((initialDuration - remainingTime) / initialDuration) * 100);
	}, [initialDuration, remainingTime, started]);

	// Handle tab close
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

	// Timer countdown
	useEffect(() => {
		if (started && remainingTime > 0 && !paused) {
			timerRef.current = setTimeout(() => {
				setRemainingTime((prev) => prev - 1000);
			}, 1000);
		} else if (remainingTime <= 0 && started) {
			setStarted(false);
		}
		return () => {
			if (timerRef.current) {
				clearTimeout(timerRef.current);
			}
		};
	}, [started, remainingTime, paused]);

	// Confirm timer changes from modal
	const confirmTimer = () => {
		setInitialDuration(displayedDuration);
		setRemainingTime(displayedDuration);
		setShowTimerModal(false);
	};

	return (
		<GameContainer>
			<div className="scoreboard_ctn flex w-full ">
				<div className="scoreboard text-2xl font-mono w-full">
					<label className="scoreboard_label">Phase</label>
					<AnimatedNumber data={1} />
				</div>
				<div className="font-mono w-full ui_btn">
					<button
						className="flex gap-1"
						onClick={() => setShowTimerModal(true)}
					>
						<TimerIcon />
						Set
					</button>
				</div>
			</div>

			<Clockface
				showPulse={false}
				withTimer
				progress={progress}
				gameStarted={started}
				showPowerUp={false}
			>
				<div className="absolute flex flex-col gap-2 items-center">
					{!started ? (
						<>
							{initialDuration > 0 && (
								<button
									className="game_btn start-game_btn"
									onClick={() => {
										setRemainingTime(initialDuration);
										setStarted(true);
									}}
								>
									Start
								</button>
							)}
						</>
					) : (
						<>
							<button className="" onClick={() => setPaused(!paused)}>
								<Pause color={`${!paused ? "white" : "var(--clr-brand"}`} />
							</button>
							<h1
								className={`text-3xl font-bold ${
									paused ? "text-gray-600" : ""
								}`}
							>
								{formatTime(remainingTime)}
							</h1>
							<button className="" onClick={() => setStarted(false)}>
								<Square color="red" />
							</button>
						</>
					)}
				</div>
			</Clockface>

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
				<Modal onClose={() => setShowTimerModal(false)}>
					<h1 className="text-2xl font-bold ">Set Timer</h1>

					<div className="flex items-center justify-between w-full my-4">
						<button
							className="ui_btn secondary"
							onClick={() =>
								setDisplayedDuration((prev) => Math.max(60000, prev - 5000))
							}
						>
							<MinusIcon />
						</button>
						<h1 className="scoreboard timer text-xl">
							{formatTime(displayedDuration)}
						</h1>
						<button
							className="ui_btn secondary"
							onClick={() => setDisplayedDuration((prev) => prev + 5000)}
						>
							<PlusIcon />
						</button>
					</div>

					<input
						className="w-full"
						type="range"
						min="60000"
						max="3600000"
						step="60000"
						value={displayedDuration}
						onChange={(e) => setDisplayedDuration(e.target.valueAsNumber)}
					/>

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
