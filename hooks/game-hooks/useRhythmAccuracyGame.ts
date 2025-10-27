// hooks/useRhythmAccuracyGame.ts
"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { calculateMsOffset } from "@/lib/utils/gameUtils";
import {
	COOLDOWN_MS,
	RHYTHM_ACCURACY_TYPE,
} from "@/constants/gameConfigConstants";
import { NoteEvent, NoteInfo } from "@/types/types";
import { usePracticeSession } from "@/context/practiceSessionsContext";

export const useRhythmAccuracyGame = () => {
	// --- Game state ---
	const [score, setScore] = useState({ wins: 0, losses: 0 });
	const [progress, setProgress] = useState(0);
	const [gameStarted, setGameStarted] = useState(false);
	const [isPracticeMode, setIsPracticeMode] = useState(false);
	const [showPulse, setShowPulse] = useState(false);
	const [showShake, setShowShake] = useState(false);
	const [countdown, setCountdown] = useState(false);
	const [lastTickTime, setLastTickTime] = useState<number | null>(0);

	const [finalScore, setFinalScore] = useState<{
		wins: number;
		losses: number;
	}>();

	// --- Refs ---
	const timeoutRef = useRef<NodeJS.Timeout | null>(null);
	const rafRef = useRef<number | null>(null);
	const evaluateCooldownRef = useRef(false);
	const noteShownAtRef = useRef<number | null>(null);

	const {
		events,
		showScore,
		addEvent,
		sessionId,
		startSession,
		finishSession,
		scoreEvents,
	} = usePracticeSession();

	// --- Cleanup ---
	useEffect(() => {
		return () => {
			if (timeoutRef.current) clearTimeout(timeoutRef.current);
			if (rafRef.current) cancelAnimationFrame(rafRef.current);
		};
	}, []);

	// --- Helpers ---
	const resetGame = useCallback(() => {
		if (rafRef.current) cancelAnimationFrame(rafRef.current);
		if (timeoutRef.current) clearTimeout(timeoutRef.current);

		setGameStarted(false);
		setCountdown(false);
		setProgress(0);
		setScore({ wins: 0, losses: 0 });
		setShowPulse(false);
		setShowShake(false);
	}, []);

	const recordLoss = useCallback(() => {
		setScore((prev) => ({ ...prev, losses: prev.losses + 1 }));
		setShowShake(true);
		setTimeout(() => setShowShake(false), COOLDOWN_MS);
	}, []);

	const recordWin = useCallback(() => {
		setScore((prev) => ({ ...prev, wins: prev.wins + 1 }));
		setShowPulse(true);
		setTimeout(() => setShowPulse(false), COOLDOWN_MS);
	}, []);

	// --- Detection ---
	const onNoteDetection = useCallback(
		async (note: NoteInfo, bpm: number) => {
			const offset = calculateMsOffset(bpm, lastTickTime) as number;
			if (!gameStarted) return;

			if (!sessionId) {
				await startSession(RHYTHM_ACCURACY_TYPE);
			}
			if (evaluateCooldownRef.current) return;

			const now = Date.now();
			const timeToHitMs = noteShownAtRef.current
				? now - noteShownAtRef.current
				: 0;

			const event: NoteEvent = {
				expectedNote: "", // not relevant for rhythm game
				playedNote: note.noteName,
				isCorrect: Math.abs(offset) < 85,
				timeToHitMs,
				metronomeOffsetMs: offset,
				playedAt: new Date(),
			};

			if (!isPracticeMode) {
				addEvent(event, { bpm });
				if (event.isCorrect) recordWin();
				else recordLoss();
			}

			if (timeoutRef.current) clearTimeout(timeoutRef.current);

			evaluateCooldownRef.current = true;
			setTimeout(() => {
				evaluateCooldownRef.current = false;
			}, COOLDOWN_MS);
		},
		[
			lastTickTime,
			gameStarted,
			sessionId,
			startSession,
			isPracticeMode,
			addEvent,
			recordWin,
			recordLoss,
		]
	);

	// --- Game lifecycle ---
	const startGame = useCallback(async () => {
		resetGame();
		setGameStarted(true);

		if (!sessionId) await startSession(RHYTHM_ACCURACY_TYPE);
	}, [resetGame, sessionId, startSession]);

	const stopGame = useCallback(async () => {
		setFinalScore(score);
		resetGame();
		setGameStarted(false);
		if (events) await finishSession();
	}, [score, resetGame, events, finishSession]);

	return {
		state: {
			score,
			progress,
			gameStarted,
			isPracticeMode,
			showPulse,
			showShake,
			countdown,
			lastTickTime,
			finalScore,
			showScore,
			events,
			scoreEvents,
		},
		setters: {
			setIsPracticeMode,
			setCountdown,
			setLastTickTime,
		},
		actions: {
			startGame,
			stopGame,
			onNoteDetection,
		},
	};
};
