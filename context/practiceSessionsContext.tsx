// context/PracticeSessionContext.tsx

"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { NoteEvent } from "@/types/types";

interface PracticeSessionContextType {
	sessionId: string | null;
	startTime: Date | null;
	events: NoteEvent[];
	addEvent: (event: NoteEvent) => void;
	finishSession: () => Promise<void>;
	resetSession: () => void;
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
		setEvents((prev) => [...prev, event]);
	}, []);

	const finishSession = useCallback(async () => {
		if (!sessionId) return;

		// 1. Send events
		await fetch(`/api/practice/${sessionId}/events`, {
			method: "POST",
			body: JSON.stringify({ events }),
			headers: { "Content-Type": "application/json" },
		});

		// 2. Trigger scoring
		await fetch(`/api/practice/${sessionId}/end`, {
			method: "POST",
		});

		// 3. Reset (optional)
		resetSession();
	}, [sessionId, events]);

	const resetSession = () => {
		setSessionId(null);

		setStartTime(null);
		setEvents([]);
	};

	const contextValue: PracticeSessionContextType = {
		sessionId,
		startTime,
		events,
		addEvent,
		finishSession,
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
