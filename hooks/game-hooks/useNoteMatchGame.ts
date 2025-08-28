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
import useCookies from "../useCookies";

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
	const [displayedDuration, setDisplayedDuration] = useState<number>(5000);
	const [duration, setDuration] = useState<number>(displayedDuration);

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

	// Load game settings on Mount
	useEffect(() => {
		const saved = localStorage.getItem("gameSettings");
		if (saved) {
			try {
				const parsed = JSON.parse(saved);
				if (typeof parsed.withMetronome === "boolean")
					setWithMetronome(parsed.withMetronome);
				if (typeof parsed.withTimer === "boolean")
					setWithTimer(parsed.withTimer);
				if (typeof parsed.withArpeggios === "boolean")
					setWithArpeggios(parsed.withArpeggios);
				if (typeof parsed.withInversions === "boolean")
					setWithInversions(parsed.withInversions);
			} catch (e) {
				console.error("Failed to parse game settings:", e);
			}
		}
	}, []);

	// Save settings on change
	useEffect(() => {
		const settings = {
			withMetronome,
			withTimer,
			withArpeggios,
			withInversions,
		};
		localStorage.setItem("gameSettings", JSON.stringify(settings));
	}, [withMetronome, withTimer, withArpeggios, withInversions]);

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

	// ======== TIMER LOGIC ========
	const startTimer = () => {
		if (timeoutRef.current) clearTimeout(timeoutRef.current);
		if (rafRef.current) cancelAnimationFrame(rafRef.current);

		const start = Date.now();

		const step = () => {
			const elapsed = Date.now() - start;
			const percent = Math.min((elapsed / duration) * 100, 100);
			setProgress(percent);
			if (elapsed < duration) rafRef.current = requestAnimationFrame(step);
		};

		step();

		timeoutRef.current = setTimeout(() => {
			const event: NoteEvent = {
				expectedNote: selectedNoteRef.current,
				playedNote: "",
				isCorrect: false,
				timeToHitMs: 9999,
				metronomeOffsetMs: 0,
				playedAt: new Date(),
			};

			recordLoss();
			addEvent(event, { withTimer });

			if (withArpeggios) setArpeggioPlayed([]);

			init();
			startTimer();
		}, duration);
	};
	useEffect(() => {
		return () => {
			if (timeoutRef.current) clearTimeout(timeoutRef.current);
			if (rafRef.current) cancelAnimationFrame(rafRef.current);
		};
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

			if (!withArpeggios) {
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

				if (isMatch) {
					recordWin();
					if (withTimer) startTimer();
					init();
				} else recordLoss();
			}

			if (withArpeggios && questionArpeggio) {
				const isMatch = await evaluateNotePlayed(note);
				if (isMatch) setArpeggioPlayed((prev) => [...prev, note]);
				else recordLoss();
			}

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
			arpeggioPlayed,
			withArpeggios,
		]
	);

	useEffect(() => {
		if (arpeggioPlayed.length === 3) {
			recordWin();
			setArpeggioPlayed([]);
			evaluateCooldownRef.current = true;
			init();
			if (withTimer) startTimer();
		}
	}, [arpeggioPlayed]);

	const startGame = useCallback(async () => {
		resetGame();
		await init();
		setGameStarted(true);
		if (withTimer) {
			setProgress(0);
			startTimer();
		}
	}, [resetGame, init, withTimer]);

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
			setIsPracticeMode,
			setCountdown,
			setLastTickTime,
			setBpm,
		},
		actions: {
			startGame,
			stopGame,
			onNoteDetection,
		},
	};
};
