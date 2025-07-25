// context/PracticeSessionContext.tsx

"use client";

import React, {
	createContext,
	useContext,
	useState,
	useCallback,
	useEffect,
} from "react";
import { GameTypes, NoteEvent } from "@/types/types";

interface PracticeSessionContextType {
	sessionId: string | null;
	startTime: Date | null;
	events: NoteEvent[];
	addEvent: (event: NoteEvent) => void;
	finishSession: () => Promise<void>;
	resetSession: () => void;
	startSession: (gameType: GameTypes) => Promise<void>;
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
	const [startTime, setStartTime] = useState<Date | null>(null);
	const [events, setEvents] = useState<NoteEvent[]>([]);

	const addEvent = useCallback((event: NoteEvent) => {
		setEvents((prev) => {
			// Should start practice session on first event being logged?
			if (prev.length == 0) {
				console.log("This logs in the events of first event");
			}
			return [...prev, event];
		});
	}, []);

	const finishSession = useCallback(async () => {
		console.log("Finishing session!");
		if (!sessionId) return;

		// 1. Send events
		await fetch(`/api/practice/${sessionId}/events`, {
			method: "POST",
			body: JSON.stringify({ sessionId, events }),
			headers: { "Content-Type": "application/json" },
		});

		// 2. Trigger scoring
		await fetch(`/api/practice/${sessionId}/end`, {
			method: "POST",
			body: JSON.stringify({ sessionId }),
		});

		// 3. Reset (optional)
		resetSession();
	}, [sessionId, events]);

	const resetSession = () => {
		setSessionId(null);

		setStartTime(null);
		setEvents([]);
	};

	const startSession = async (gameType: GameTypes) => {
		console.log("Starting session");
		try {
			const res = await fetch("/api/practice/start", {
				method: "POST",
				body: JSON.stringify({
					gameType,
				}),
				headers: { "Content-Type": "application/json" },
			});
			const { sessionId } = await res.json();
			setSessionId(sessionId);
			return sessionId;
		} catch (error) {
			console.log(
				"%cerror components/games/GameSession.tsx line:42 ",
				"color: red; display: block; width: 100%;",
				error
			);
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
