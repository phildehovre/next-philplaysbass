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
	processNormalizedScore,
	processEventScore,
	GameScoringOptions,
} from "@/lib/utils/scoringUtils";
import { MAX_TEMPO_AS_NUM } from "@/components/games/GameConstants";

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
	bpm: number;
	setBpm: (t: number) => void;
	gameType: GameTypes | undefined;
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
	const [aggregateScore, setAggregateScore] = useState<Score>({
		rhythm: 0,
		pitch: 0,
		bonus: 0,
	});
	const [streak, setStreak] = useState<number>(0);

	useEffect(() => {
		const lastEvent = events.pop();
		if (lastEvent?.isCorrect) {
			setStreak((prev) => (prev += 1));
		}
		if (!lastEvent?.isCorrect) {
			setStreak(0);
		}
	}, [events]);

	const addEvent = useCallback(
		(event: NoteEvent, options?: any) => {
			const newScore = processEventScore(event, options);
			console.log("score::", newScore);
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
					// Automatically set startTime on first event if not already set
					setStartTime(new Date());
				}
				return [...prev, event];
			});
			// TODO: setScore will have to be wrapped in a function
			// that slowly digests the content of scoreEvents
			// in order to display events first and update the score progressively
			// this should make for a better experience.
		},
		[startTime]
	);

	const finishSession = useCallback(async () => {
		const aggregateScore = processNormalizedScore(events, {
			bpm,
			gameType,
		} as GameScoringOptions);
		setAggregateScore(aggregateScore);
		setShowScore(true);
		if (!sessionId || events.length === 0 || !startTime) return;

		const endTime = new Date();
		const durationMs = differenceInMilliseconds(endTime, startTime);
		if (durationMs < 1000) return;

		await fetch(`/api/practice/${sessionId}/events`, {
			method: "POST",
			body: JSON.stringify({ sessionId, events }),
			headers: { "Content-Type": "application/json" },
		});

		await fetch(`/api/practice/${sessionId}/end`, {
			method: "POST",
			body: JSON.stringify({ sessionId, duration: durationMs }),
		});

		resetSession();
	}, [sessionId, events, startTime]);

	const resetSession = () => {
		setSessionId(null);
		setStartTime(null);
		setEvents([]);
		setScoreEvents([]);
	};

	const startSession = async (gameType: GameTypes) => {
		console.log("Starting session");
		setGameType(gameType);
		try {
			const res = await fetch("/api/practice/start", {
				method: "POST",
				body: JSON.stringify({ gameType }),
				headers: { "Content-Type": "application/json" },
			});
			const { sessionId } = await res.json();
			setSessionId(sessionId);
			setStartTime(new Date()); // Set start time immediately
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
