"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import "./GameStyles.css";
import "../metronome/metronome.scss";
import { calculateMsOffset } from "@/lib/utils/gameUtils";
import PitchyComponent from "./PitchyComponent";
import { GameTypes, NoteEvent, NoteInfo } from "@/types/types";
import AnimatedNumber from "./ui/AnimatedNumber";
import Switch from "../Switch";
import { usePracticeSession } from "@/context/practiceSessionsContext";
import Clockface from "./ui/Clockface";
import Countdown from "./ui/Countdown";
import MetroWidget from "./ui/MetroWidget";
import { COOLDOWN_MS } from "./GameConstants";
import ScoreModal from "./ui/ScoreModal";

const GAME_TYPE = "rhythm-accuracy";

const RhythmAccuracyGame = () => {
	const [gameType, setGameType] = useState<GameTypes>(GAME_TYPE);
	const [score, setScore] = useState({ wins: 0, losses: 0 });
	const [progress, setProgress] = useState(0);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [isTabVisible, setIsTabVisible] = useState<boolean>(true);
	const [gameStarted, setGameStarted] = useState(false);
	const [isPracticeMode, setIsPracticeMode] = useState<boolean>(false);
	const [showPulse, setShowPulse] = useState<boolean>(false);
	const [showShake, setShowShake] = useState(false);
	const [countdown, setCountdown] = useState<boolean>(false);
	const [lastTickTime, setLastTickTime] = useState<number | null>(0);
	const [finalScore, setFinalScore] = useState<{
		wins: number;
		losses: number;
	}>();

	const timeoutRef = useRef<NodeJS.Timeout | null>(null);
	const rafRef = useRef<number | null>(null);
	const evaluateCooldownRef = useRef(false);
	const noteShownAtRef = useRef<number | null>(null);
	const selectedNoteRef = useRef<string>("");

	const {
		events,
		showScore,
		addEvent,
		sessionId,
		startSession,
		finishSession,
		scoreEvents,
		bpm,
		setBpm,
	} = usePracticeSession();

	useEffect(() => {
		const handleVisibilityChange = () => {
			setIsTabVisible(!document.hidden);
			if (document.hidden) finishSession();
		};
		const handleBeforeUnload = () => {
			finishSession();
		};
		document.addEventListener("visibilitychange", handleVisibilityChange);
		window.addEventListener("beforeunload", handleBeforeUnload);
		return () => {
			document.removeEventListener("visibilitychange", handleVisibilityChange);
			window.removeEventListener("beforeunload", handleBeforeUnload);
		};
	}, []);

	useEffect(() => {
		return () => {
			if (timeoutRef.current) clearInterval(timeoutRef.current);
			if (rafRef.current) cancelAnimationFrame(rafRef.current);
		};
	}, []);

	// Practice mode switch
	useEffect(() => {
		setScore({ wins: 0, losses: 0 });
	}, [isPracticeMode]);

	const resetGame = () => {
		// clear timers
		if (rafRef.current) cancelAnimationFrame(rafRef.current);
		if (timeoutRef.current) clearTimeout(timeoutRef.current);

		// reset state
		setGameStarted(false);
		setCountdown(false);
		setProgress(0);
		setScore({ wins: 0, losses: 0 });
		setShowPulse(false);
		setShowShake(false);
	};

	const recordLoss = () => {
		setScore((prev) => ({ ...prev, losses: prev.losses + 1 }));
		setShowShake(true);
		setTimeout(() => setShowShake(false), COOLDOWN_MS);
	};
	const recordWin = () => {
		setScore((prev) => ({ ...prev, wins: prev.wins + 1 }));
		setShowPulse(true);
		setTimeout(() => setShowPulse(false), COOLDOWN_MS);
	};

	const onNoteDetection = useCallback(
		async (note: NoteInfo) => {
			if (!isTabVisible) return;
			if (!gameStarted) return;

			if (!sessionId) {
				await startSession(gameType);
			}

			if (evaluateCooldownRef.current) return;

			const now = Date.now();
			const timeToHitMs = noteShownAtRef.current
				? now - noteShownAtRef.current
				: 0;

			const offset = calculateMsOffset(bpm, lastTickTime) as number;

			const event: NoteEvent = {
				expectedNote: "",
				playedNote: note.noteName,
				isCorrect: offset < 150,
				timeToHitMs,
				metronomeOffsetMs: offset,
				playedAt: new Date(),
			};

			// Only save to DB if not in practice mode?
			if (!isPracticeMode && !evaluateCooldownRef.current) {
				addEvent(event, { bpm });
				if (Math.abs(offset) < 85) {
					recordWin();
				} else {
					recordLoss();
				}
			}
			if (timeoutRef.current) clearTimeout(timeoutRef.current);

			evaluateCooldownRef.current = true;
			setTimeout(() => {
				evaluateCooldownRef.current = false;
			}, COOLDOWN_MS);
		},
		[gameStarted]
	);

	const startGame = async () => {
		resetGame();
		setGameStarted(true);

		if (!sessionId) await startSession(gameType);
	};

	const stopGame = async () => {
		setFinalScore(score);
		resetGame();
		setGameStarted(false);
		if (events) await finishSession();
	};

	return (
		<div className="game_ctn max-w-[24em]">
			<div className="game_header flex flex-col justify-center gap-2 w-full">
				<label
					htmlFor="isPracticeMode"
					className="flex justify-center gap-2 m-auto"
				>
					<Switch
						disabled={gameStarted}
						checked={isPracticeMode}
						onCheckChange={setIsPracticeMode}
					/>
					<p
						style={{
							color: isPracticeMode ? "var(--clr-brand)" : "gray",
						}}
					>
						Practice mode
					</p>
				</label>
			</div>

			<div className="scoreboard text-2xl font-mono">
				<AnimatedNumber number={score.losses} />:
				<AnimatedNumber number={score.wins} />
			</div>

			<Clockface
				showPulse={showPulse}
				progress={progress}
				gameStarted={gameStarted}
			>
				<div className={`game_question inversions `}>
					{!gameStarted ? (
						<button
							onClick={() => setCountdown(true)}
							className="game_btn start-game_btn metro-btn "
						>
							{!countdown ? (
								"Start"
							) : (
								<Countdown
									value={4}
									bpm={bpm}
									onCountdownFinished={startGame}
								/>
							)}
						</button>
					) : (
						<button onClick={stopGame} className="game_btn stop-game_btn">
							Stop
						</button>
					)}
				</div>
			</Clockface>
			<MetroWidget
				gameStarted={gameStarted}
				play={countdown || gameStarted}
				bpm={bpm}
				setBpm={setBpm}
				lastTickTime={lastTickTime}
				setLastTickTime={setLastTickTime}
			/>

			<PitchyComponent showDevices={true} onNoteDetection={onNoteDetection} />
			{!gameStarted && showScore && events.length && (
				<ScoreModal scoreData={finalScore} scoreEvents={scoreEvents} />
			)}
		</div>
	);
};

export default RhythmAccuracyGame;
