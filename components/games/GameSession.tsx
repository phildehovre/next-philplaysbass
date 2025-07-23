"use client";
import { usePracticeSession } from "@/context/practiceSessionsContext";
import { useUser } from "@/context/userContext";
import { Prisma } from "@/lib/generated/prisma";
import { cn } from "@/lib/utils";
import { ensureUserInDb } from "@/services/userService";
import { GameTypes, NoteMatchParams } from "@/types/types";
import React, { useEffect, useState } from "react";

type GameSessionProps = {
	setIsLoading: (bool: boolean) => void;
	onGameSessionsStart: () => void;
	gameType: GameTypes;
	// TODO: refine game options type, union type of different types?
	gameParams: NoteMatchParams;
};

const GameSession = (props: GameSessionProps) => {
	const { gameType, gameParams, setIsLoading, onGameSessionsStart } = props;

	const [componentSessionId, setComponentSessionId] = useState(null);
	const [currentUser, setCurrentUser] = useState<any>();

	const startSession = async (
		gameType: GameTypes,
		gameParams: NoteMatchParams
	) => {
		const { scaleType, key, withTimer, duration } = gameParams;
		try {
			const res = await fetch("/api/practice/start", {
				method: "POST",
				body: JSON.stringify({
					gameType: gameType,
					scaleType: "major",
					key: "C",
					bpm: 80,
					withTimer: true,
					duration: 90,
				}),
				headers: { "Content-Type": "application/json" },
			});
			const { sessionId } = await res.json();
			return sessionId;
		} catch (error) {
			console.log(
				"%cerror components/games/GameSession.tsx line:42 ",
				"color: red; display: block; width: 100%;",
				error
			);
		} finally {
			setIsLoading(false);
		}
	};
	return (
		<button className={cn("rounded bg-white ")}>
			{componentSessionId ? (
				<a href={`/api/practice/${componentSessionId}`}>Test session route</a>
			) : (
				<p>No session id</p>
			)}
		</button>
	);
};

export default GameSession;
