// TimerContext.tsx
"use client";
import React, {
	createContext,
	useContext,
	useState,
	useRef,
	useEffect,
} from "react";
import { UserPracticeRoutine } from "@/actions/timerActions";
import { Phase } from "@/lib/generated/prisma";

type TimerContextType = {
	started: boolean;
	paused: boolean;
	remainingTime: number;
	progress: number;
	timerArray: Phase[];
	selectedRoutine?: UserPracticeRoutine;
	selectedPhase?: Phase;
	startTimer: () => void;
	pauseTimer: () => void;
	stopTimer: () => void;
	nextPhase: () => void;
	setTimerArray: React.Dispatch<React.SetStateAction<Phase[]>>;
	setSelectedRoutine: React.Dispatch<
		React.SetStateAction<UserPracticeRoutine | undefined>
	>;
	setSelectedPhase: React.Dispatch<React.SetStateAction<Phase | undefined>>;
};

const TimerContext = createContext<TimerContextType | null>(null);

export const TimerProvider = ({ children }: { children: React.ReactNode }) => {
	const [started, setStarted] = useState(false);
	const [paused, setPaused] = useState(false);
	const [remainingTime, setRemainingTime] = useState(0);
	const [progress, setProgress] = useState(0);
	const [timerArray, setTimerArray] = useState<Phase[]>([]);
	const [selectedRoutine, setSelectedRoutine] = useState<UserPracticeRoutine>();
	const [selectedPhase, setSelectedPhase] = useState<Phase>();

	const timerRef = useRef<NodeJS.Timeout | null>(null);

	const startTimer = () => setStarted(true);
	const pauseTimer = () => setPaused((p) => !p);
	const stopTimer = () => {
		setStarted(false);
		setPaused(false);
		setRemainingTime(0);
	};
	const nextPhase = () => {
		// your logic for advancing timers
	};

	useEffect(() => {
		if (started && !paused) {
			timerRef.current = setTimeout(() => {
				setRemainingTime((t) => Math.max(0, t - 1000));
			}, 1000);
		}
		return () => {
			if (timerRef.current) clearTimeout(timerRef.current);
		};
	}, [started, paused, remainingTime]);

	return (
		<TimerContext.Provider
			value={{
				started,
				paused,
				remainingTime,
				progress,
				timerArray,
				selectedRoutine,
				selectedPhase,
				startTimer,
				pauseTimer,
				stopTimer,
				nextPhase,
				setTimerArray,
				setSelectedRoutine,
				setSelectedPhase,
			}}
		>
			{children}
		</TimerContext.Provider>
	);
};

export const useTimerContext = () => {
	const ctx = useContext(TimerContext);
	if (!ctx)
		throw new Error("useTimerContext must be used within TimerProvider");
	return ctx;
};
