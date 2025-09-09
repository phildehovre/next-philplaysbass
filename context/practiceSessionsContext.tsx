"use client";

import React, {
	createContext,
	useContext,
	useState,
	useCallback,
	useEffect,
} from "react";
import { GameTypes, Note, NoteEvent, Score } from "@/types/types";
import { differenceInMilliseconds } from "date-fns";
import {
	processEventScore,
	processNormalizedScore,
} from "@/lib/utils/scoringUtils";
import { MAX_TEMPO_AS_NUM } from "@/constants/GameConstants";

interface PracticeSessionContextType {
	sessionId: string | null;
	startTime: Date | null;
	events: NoteEvent[];
	addEvent: (event: NoteEvent, options?: any) => void;
	finishSession: () => Promise<void>;
	resetSession: () => void;
	startSession: (gameType: GameTypes) => Promise<void>;
	score: Score;
	scoreEvents: Score[];
	showScore: boolean;
	setShowScore: (bool: boolean) => void;
	aggregateScore: Score;
	totalScore: number;
	bpm: number;
	setBpm: (t: number) => void;
	gameType: GameTypes | undefined;
	streak: number;
	isFirstTimeUser: boolean;
	setIsFirstTimeUser: (b: boolean) => void;
}

const PracticeSessionContext = createContext<
	PracticeSessionContextType | undefined
>(undefined);

export const PracticeSessionProvider = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	const [sessionId, setSessionId] = useState<string | null>(null);
	const [isFirstTimeUser, setIsFirstTimeUser] = useState<boolean>(true);
	const [gameType, setGameType] = useState<GameTypes>();
	const [bpm, setBpm] = useState<number>(MAX_TEMPO_AS_NUM / 2 - 30);
	const [startTime, setStartTime] = useState<Date | null>(null);
	const [events, setEvents] = useState<NoteEvent[]>([]);
	const [score, setScore] = useState<Score>({
		rhythm: 0,
		pitch: 0,
		bonus: 0,
	});
	const [scoreEvents, setScoreEvents] = useState<Score[]>([]);
	const [showScore, setShowScore] = useState<boolean>(false);
	const [totalScore, setTotalScore] = useState<number>(0);
	const [aggregateScore, setAggregateScore] = useState<Score>({
		rhythm: 0,
		pitch: 0,
		bonus: 0,
	});
	const [streak, setStreak] = useState<number>(0);

	useEffect(() => {
		const stored = localStorage.getItem("isFirstTimeUser");

		if (stored === null) {
			// first ever visit
			setIsFirstTimeUser(true);
			localStorage.setItem("isFirstTimeUser", "true");
		} else {
			setIsFirstTimeUser(stored === "true");
		}
	}, []);

	useEffect(() => {
		localStorage.setItem("isFirstTimeUser", String(isFirstTimeUser));
	}, [isFirstTimeUser]);

	useEffect(() => {
		const lastEvent = events[events.length - 1];
		if (lastEvent?.isCorrect) {
			setStreak((prev) => (prev += 1));
		}
		if (!lastEvent?.isCorrect) {
			setStreak(0);
		}
	}, [events]);

	const addEvent = useCallback(
		(event: NoteEvent, options?: any) => {
			let newScore = processEventScore(event, {
				...options,
				streak,
				gameType,
			});

			if (newScore) {
				setScore((prev) => ({
					rhythm: prev.rhythm + newScore.rhythm,
					pitch: prev.pitch + newScore.pitch,
					bonus: prev.bonus + newScore.bonus,
				}));
				setScoreEvents((prev) => [...prev, newScore]);
			}
			setEvents((prev) => {
				if (prev.length === 0 && !startTime) {
					setStartTime(new Date());
				}
				return [...prev, event];
			});
		},
		[startTime, streak]
	);

	const finishSession = useCallback(async () => {
		const [totalScore, aggregateScore] = processNormalizedScore(events, {
			bpm,
			gameType,
			streak,
		});
		setAggregateScore(aggregateScore);
		setTotalScore(totalScore);
		setShowScore(true);
		if (!sessionId || events.length === 0 || !startTime) return;

		const endTime = new Date();

		const durationMs = differenceInMilliseconds(endTime, startTime);

		if (durationMs < 1000) return;
		await fetch(`/api/practice/${sessionId}/events`, {
			method: "POST",
			body: JSON.stringify({ sessionId, events, durationMs }),
			headers: { "Content-Type": "application/json" },
		});

		await fetch(`/api/practice/${sessionId}/end`, {
			method: "POST",
			body: JSON.stringify({
				sessionId,
				durationMs,
				totalScore,
				aggregateScore,
			}),
		});

		resetSession();
	}, [sessionId, events, startTime]);

	const resetSession = () => {
		setSessionId(null);
		setStartTime(null);
		setEvents([]);
		setScoreEvents([]);
		setScore({ rhythm: 0, pitch: 0, bonus: 0 });
		setTotalScore(0);
	};

	const startSession = async (gameType: GameTypes) => {
		setGameType(gameType);
		try {
			const res = await fetch("/api/practice/start", {
				method: "POST",
				body: JSON.stringify({ gameType }),
				headers: { "Content-Type": "application/json" },
			});
			const { sessionId } = await res.json();
			setSessionId(sessionId);
			setStartTime(new Date());
			return sessionId;
		} catch (error) {
			console.error("Error starting session:", error);
		}
	};

	const contextValue: PracticeSessionContextType = {
		sessionId,
		startTime,
		events,
		addEvent,
		finishSession,
		startSession,
		resetSession,
		score,
		scoreEvents,
		showScore,
		setShowScore,
		aggregateScore,
		bpm,
		setBpm,
		gameType,
		streak,
		totalScore,
		isFirstTimeUser,
		setIsFirstTimeUser,
	};

	return (
		<PracticeSessionContext.Provider value={contextValue}>
			{children}
		</PracticeSessionContext.Provider>
	);
};

export const usePracticeSession = () => {
	const context = useContext(PracticeSessionContext);
	if (!context)
		throw new Error(
			"usePracticeSession must be used inside a PracticeSessionProvider"
		);
	return context;
};
