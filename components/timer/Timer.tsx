"use client";

import React, { useEffect, useRef, useState } from "react";
import "../games/GameStyles.css";
import { Drum, FolderUp, Pause, Plus, Square, TimerIcon } from "lucide-react";
import { usePracticeSession } from "@/context/practiceSessionsContext";
import GameContainer from "../games/ui/GameContainer";
import MetroWidget from "../games/ui/MetroWidget";
import Clockface from "../games/ui/Clockface";
import PitchyComponent from "../games/PitchyComponent";
import Tuner from "../games/tuner/Tuner";
import {
	FREE_PRACTICE_TYPE,
	MAX_TEMPO_AS_NUM,
} from "@/constants/gameConfigConstants";
import { formatTime } from "@/utils/helpers";
import AnimatedGridRow from "../games/ui/AnimatedGridRow";
import Switch from "../Switch";
import TuningFork from "../games/tuner/TuningFork";
import PhaseModal from "./PhaseModal";
import TimerPhases from "./TimerPhases";
import { Phase, Prisma, TimerSet } from "@/lib/generated/prisma";
import { handleTabClose } from "@/lib/utils";
import RoutinesModal from "@/prisma/RoutinesModal";
import { UserPracticeRoutine } from "@/actions/timerActions";
import SemiCircleTuner from "../games/tuner/SemiCircleTuner";

export type TimerCfg = {
	initialDuration: number; // ms
	bpm: number;
	label: string;
	postCooldown: number; // ms or "pause"
};

type TimerComponentProps = {
	routines: UserPracticeRoutine[];
};

export type PhaseDraft = {
	id?: string; // optional when creating
	initialDuration: number;
	bpm: number;
	label: string;
	postCooldown: number;
	order: number;
	timerSetId?: string; // optional when creating
	autoStart?: boolean;
};

const Timer = (props: TimerComponentProps) => {
	const { routines } = props;

	const [initialDuration, setInitialDuration] = useState<number>(0);
	const [remainingTime, setRemainingTime] = useState<number>(60000);
	const [bpm, setBpm] = useState<number>(MAX_TEMPO_AS_NUM / 2);
	const [started, setStarted] = useState<boolean>(false);
	const [play, setPlay] = useState<boolean>(false);
	const [paused, setPaused] = useState<boolean>(false);
	const [progress, setProgress] = useState<number>(0);
	const [timerArray, setTimerArray] = useState<PhaseDraft[]>([]);
	const [selectedRoutine, setSelectedRoutine] = useState<UserPracticeRoutine>();
	const [currentIndex, setCurrentIndex] = useState<number>(0);
	const [selectedPhase, setSelectedPhase] = useState<Phase>();
	const [localRoutines, setLocalRoutines] = useState<UserPracticeRoutine[]>([]);

	const [showTimerModal, setShowTimerModal] = useState<boolean>(false);
	const [showTuner, setShowTuner] = useState<boolean>(false);
	const [showMetronome, setShowMetronome] = useState<boolean>(false);
	const [showRoutinesModal, setShowRoutinesModal] = useState<boolean>(false);

	const timerRef = useRef<NodeJS.Timeout | null>(null);
	const { finishSession, startSession } = usePracticeSession();

	useEffect(() => {
		setLocalRoutines(routines);
	}, []);

	useEffect(() => {
		if (!selectedPhase) return;

		const idx = timerArray.findIndex((p) => p.id === selectedPhase.id);

		if (idx === -1) return;

		setCurrentIndex(idx);
		setBpm(selectedPhase.bpm);
		setInitialDuration(selectedPhase.initialDuration);
		setRemainingTime(selectedPhase.initialDuration);

		setPlay(false);

		if (started) {
			setPaused(false);
			if (selectedPhase.autoStart) {
				setPlay(true);
				setShowMetronome(true);
			}
		}
	}, [selectedPhase]);

	// progress calculation
	useEffect(() => {
		if (!started) {
			setProgress(0);
			return;
		}

		const currentTimer = timerArray[currentIndex];
		if (!currentTimer || !currentTimer.initialDuration) return;

		const elapsed =
			currentTimer.initialDuration -
			(remainingTime ?? currentTimer.initialDuration);
		const rawProgress = (elapsed / currentTimer.initialDuration) * 100;
		const clampedProgress = Math.min(Math.max(rawProgress, 0), 100);

		setProgress(clampedProgress);
	}, [remainingTime, started, currentIndex, timerArray]);

	// handle tab close
	useEffect(() => {
		handleTabClose(finishSession);
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
		if (!current) {
			return;
		}

		if (current.postCooldown === 0) {
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
			finishSession();
			setStarted(false);
			setPaused(false);
			return;
		}
		setBpm(next.bpm);
		if (next.autoStart) setPlay(true);
		setInitialDuration(next.initialDuration);
		setRemainingTime(next.initialDuration);
		setStarted(true);
		setPaused(false);
	};

	const confirmTimer = (options: Partial<PhaseDraft>) => {
		if (selectedPhase) {
			setTimerArray((prev) =>
				prev.map((phase) =>
					phase.id === selectedPhase.id ? { ...phase, ...options } : phase
				)
			);
		} else {
			const newPhase: PhaseDraft = {
				initialDuration: options.initialDuration ?? 0,
				bpm: options.bpm ?? bpm,
				label: options.label ?? "Untitled",
				postCooldown: options.postCooldown ?? 0,
				order: timerArray.length,
				autoStart: options.autoStart ?? false,
			};
			setTimerArray((prev) => [...prev, newPhase]);
		}

		setShowTimerModal(false);
		setSelectedPhase(undefined);
	};

	const handleStop = () => {
		setStarted(false);
		setPaused(false);
		setPlay(false);
		setRemainingTime(initialDuration);
		finishSession();
	};

	const handleStart = (i: number) => {
		const firstPhase = timerArray[i];
		setCurrentIndex(0);
		setInitialDuration(firstPhase.initialDuration);
		setRemainingTime(firstPhase.initialDuration);
		setStarted(true);
		startSession(FREE_PRACTICE_TYPE);
		// set up and trigger metronome if autoStart
		setBpm(firstPhase.bpm);
		if (firstPhase.autoStart) {
			setPlay(true);
		}
	};

	const handleCloseRoutine = (id?: string) => {
		setSelectedPhase(undefined);
		setSelectedRoutine(undefined);
		setTimerArray([]);
		if (id) {
			setLocalRoutines((prev) => prev.filter((r) => r.id != id));
		}
	};

	return (
		<GameContainer>
			<div className="flex w-full justify-between">
				<span className="flex w-full justify-center gap-1 ">
					<Switch
						checked={showTuner}
						onCheckChange={() => setShowTuner(!showTuner)}
						disabled={false}
					/>
					<label htmlFor="showTuner">
						<TuningFork />
					</label>
				</span>
				<span className="flex w-full justify-center gap-1">
					<Switch
						checked={showMetronome}
						onCheckChange={() => setShowMetronome(!showMetronome)}
						disabled={false}
					/>
					<label htmlFor="showTuner">
						<Drum color={"var(--clr-brand)"} size={20} />
					</label>
				</span>
			</div>
			<AnimatedGridRow active={showMetronome}>
				<MetroWidget
					bpm={bpm}
					setBpm={setBpm}
					play={play}
					setPlay={setPlay}
					gameStarted={play}
					lastTickTime={null}
					setLastTickTime={() => {}}
					controls={true}
					withMetronome={showMetronome}
				/>
			</AnimatedGridRow>

			<div className="flex justify-between">
				<Clockface
					showPowerUp={false}
					gameType={FREE_PRACTICE_TYPE}
					showSettings={false}
					size={0.8}
					game={{
						state: {
							showPulse: false,
							withTimer: true,
							gameStarted: started,
						},
					}}
					progress={progress}
				>
					{showTuner && <SemiCircleTuner />}
					{timerArray.length == 0 && !showTuner && (
						<>
							<button
								className="ui_btn absolute top-27 "
								onClick={() => setShowTimerModal(true)}
							>
								<p className="flex justify-start w-full gap-1 min-w-[125px]">
									<Plus />
									New timer
								</p>
							</button>
							<button className="ui_btn absolute bottom-27 min-w-[125px]">
								<p
									className="flex justify-start gap-1"
									onClick={() => setShowRoutinesModal(true)}
								>
									<FolderUp />
									Open routine
								</p>
							</button>
						</>
					)}
					<div className="absolute flex flex-col gap-2 items-center">
						{!started && !showTuner ? (
							<>
								{timerArray.length > 0 && (
									<button
										className="game_btn start-game_btn"
										onClick={() => handleStart(0)}
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

			<TimerPhases
				setShowTimerModal={setShowTimerModal}
				current={currentIndex}
				phases={timerArray}
				selectedRoutine={selectedRoutine}
				setSelectedRoutine={setSelectedRoutine}
				setSelectedPhase={setSelectedPhase}
				setShowRoutinesModal={setShowRoutinesModal}
				handleCloseRoutine={handleCloseRoutine}
				setPhases={setTimerArray}
			/>
			<PitchyComponent showDevices={true} onNoteDetection={() => {}} />
			<PhaseModal
				show={showTimerModal}
				setShow={setShowTimerModal}
				onClose={confirmTimer}
				initialValues={selectedPhase}
			/>
			<RoutinesModal
				setShow={setShowRoutinesModal}
				show={showRoutinesModal}
				routines={localRoutines}
				setTimerArray={setTimerArray}
				setSelectedRoutine={setSelectedRoutine}
			/>
		</GameContainer>
	);
};

export default Timer;
