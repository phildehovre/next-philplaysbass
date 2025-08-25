// hooks/useNoteMatchGame.ts
"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import {
	buildScale,
	calculateMsOffset,
	selectRandomNote,
} from "@/lib/utils/gameUtils";
import {
	arrayChromaticScale,
	QUALITY,
	ScaleQuality,
	selectRandomInversion,
} from "@/constants/chromaticScale";
import {
	COOLDOWN_MS,
	MAX_TEMPO_AS_NUM,
	NOTE_MATCH_TYPE,
} from "@/constants/GameConstants";
import { Note, NoteEvent, NoteInfo } from "@/types/types";
import { usePracticeSession } from "@/context/practiceSessionsContext";

export const useNoteMatchGame = () => {
	// --- Game state ---
	const [selectedNote, setSelectedNote] = useState("");
	const [questionQuality, setQuestionQuality] = useState<ScaleQuality>();
	const [questionArpeggio, setQuestionArpeggio] = useState<Note[]>([]);
	const [questionInversion, setQuestionInversion] = useState<string | "">("");
	const [withTimer, setWithTimer] = useState(false);
	const [withMetronome, setWithMetronome] = useState(false);
	const [withArpeggios, setWithArpeggios] = useState(false);
	const [withInversions, setWithInversions] = useState(false);
	const [score, setScore] = useState({ wins: 0, losses: 0 });
	const [selectedQualities, setSelectedQualities] = useState<ScaleQuality[]>([
		"major",
	]);
	const [arpeggioPlayed, setArpeggioPlayed] = useState<NoteInfo[]>([]);
	const [progress, setProgress] = useState(0);
	const [previousNotes, setPreviousNotes] = useState<string[]>([]);
	const [gameStarted, setGameStarted] = useState(false);
	const [isPracticeMode, setIsPracticeMode] = useState(false);
	const [showPulse, setShowPulse] = useState(false);
	const [showShake, setShowShake] = useState(false);
	const [countdown, setCountdown] = useState(false);
	const [bpm, setBpm] = useState(MAX_TEMPO_AS_NUM / 2);
	const [lastTickTime, setLastTickTime] = useState<number | null>(0);

	// --- Refs ---
	const timeoutRef = useRef<NodeJS.Timeout | null>(null);
	const rafRef = useRef<number | null>(null);
	const evaluateCooldownRef = useRef(false);
	const noteShownAtRef = useRef<number | null>(null);
	const selectedNoteRef = useRef<string>("");

	const {
		score: totalScore,
		events,
		addEvent,
		sessionId,
		startSession,
		finishSession,
	} = usePracticeSession();

	// --- Helpers ---
	const resetGame = useCallback(() => {
		if (rafRef.current) cancelAnimationFrame(rafRef.current);
		if (timeoutRef.current) clearTimeout(timeoutRef.current);

		setGameStarted(false);
		setCountdown(false);
		setProgress(0);
		setSelectedNote("");
		setQuestionQuality(undefined);
		setQuestionArpeggio([]);
		setQuestionInversion("");
		setScore({ wins: 0, losses: 0 });
		setArpeggioPlayed([]);
		setPreviousNotes([]);
		setShowPulse(false);
		setShowShake(false);
	}, []);

	const init = useCallback(async () => {
		const notePoolLimit = 3;

		const quality =
			selectedQualities[Math.floor(Math.random() * selectedQualities.length)];
		setQuestionQuality(quality);

		setPreviousNotes((prev) => {
			let note = selectRandomNote();
			let attempts = 0;
			while (prev.includes(note) && attempts < 10) {
				note = selectRandomNote();
				attempts++;
			}

			const newHistory =
				prev.length >= notePoolLimit
					? [...prev.slice(1), note]
					: [...prev, note];

			setSelectedNote(note);
			selectedNoteRef.current = note;
			const scale = buildScale(note, quality);
			let arpeggio = [scale[0], scale[2], scale[4]];
			if (withInversions) {
				const { inversion, invertedArpeggio } = selectRandomInversion(arpeggio);
				setQuestionInversion(inversion);
				setQuestionArpeggio(invertedArpeggio);
			} else {
				setQuestionArpeggio(arpeggio);
			}
			noteShownAtRef.current = Date.now();

			return newHistory;
		});
	}, [selectedQualities, withInversions]);

	const recordWin = useCallback(() => {
		setScore((prev) => ({ ...prev, wins: prev.wins + 1 }));
		setShowPulse(true);
		setTimeout(() => setShowPulse(false), COOLDOWN_MS);
	}, []);

	const recordLoss = useCallback(() => {
		setScore((prev) => ({ ...prev, losses: prev.losses + 1 }));
		setShowShake(true);
		setTimeout(() => setShowShake(false), COOLDOWN_MS);
	}, []);

	const evaluateNotePlayed = useCallback(
		async (noteInfo: NoteInfo) => {
			if (!gameStarted) return;
			const notePlayed = noteInfo.noteName;
			const selected = withArpeggios
				? questionArpeggio[arpeggioPlayed.length]
				: selectedNote;
			const matchSet = arrayChromaticScale.find((group) =>
				group.includes(notePlayed)
			);
			return matchSet?.includes(selected);
		},
		[gameStarted, questionArpeggio, arpeggioPlayed, selectedNote, withArpeggios]
	);

	const onNoteDetection = useCallback(
		async (note: NoteInfo) => {
			if (!gameStarted) return;
			const offset = calculateMsOffset(bpm, lastTickTime);
			if (!sessionId) await startSession(NOTE_MATCH_TYPE);
			if (evaluateCooldownRef.current) return;

			const isMatch = await evaluateNotePlayed(note);
			if (isMatch === undefined) return;

			const event: NoteEvent = {
				expectedNote: selectedNoteRef.current,
				playedNote: note.noteName,
				isCorrect: isMatch,
				timeToHitMs: noteShownAtRef.current
					? Date.now() - noteShownAtRef.current
					: 0,
				metronomeOffsetMs: offset,
				playedAt: new Date(),
			};

			if (!isPracticeMode) addEvent(event, { bpm, withTimer, withMetronome });

			if (isMatch) recordWin();
			else recordLoss();

			evaluateCooldownRef.current = true;
			setTimeout(() => {
				evaluateCooldownRef.current = false;
			}, COOLDOWN_MS);
		},
		[
			gameStarted,
			bpm,
			lastTickTime,
			startSession,
			sessionId,
			addEvent,
			withTimer,
			withMetronome,
			evaluateNotePlayed,
			isPracticeMode,
			recordWin,
			recordLoss,
		]
	);

	const startGame = useCallback(async () => {
		resetGame();
		await init();
		setGameStarted(true);
	}, [resetGame, init]);

	const stopGame = useCallback(() => {
		resetGame();
		if (events) finishSession();
	}, [resetGame, finishSession, events]);

	return {
		state: {
			selectedNote,
			questionQuality,
			questionArpeggio,
			questionInversion,
			withTimer,
			withMetronome,
			withArpeggios,
			withInversions,
			score,
			selectedQualities,
			arpeggioPlayed,
			progress,
			previousNotes,
			gameStarted,
			isPracticeMode,
			showPulse,
			showShake,
			countdown,
			bpm,
			lastTickTime,
		},
		setters: {
			setWithTimer,
			setWithMetronome,
			setWithArpeggios,
			setWithInversions,
			setSelectedQualities,
			setBpm,
		},
		actions: {
			startGame,
			stopGame,
			onNoteDetection,
		},
	};
};
