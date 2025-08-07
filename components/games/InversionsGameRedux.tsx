"use client";

import React, { useState, useEffect } from "react";
import { QUALITY, ScaleQuality } from "@/constants/chromaticScale";
import { usePracticeSession } from "@/context/practiceSessionsContext";
import { parseNoteDisplay } from "@/lib/utils/gameUtils";
import Clockface from "./Clockface";
import Countdown from "./Countdown";
import PitchyComponentRedux from "./PitchyComponentRedux";
import { Square } from "lucide-react";
import AnimatedNumber from "./AnimatedNumber";
import "./GameStylesRedux.css";

import { useChordQuestion } from "@/hooks/chordDetection/useChordQuestion";
import { useDetectedNotes } from "@/hooks/chordDetection/useDetectedNotes";
import { useProgressTimer } from "@/hooks/chordDetection/useProgressTimer";

const ChordDetectionGame = () => {
	// UI / Game config
	const [selectedQualities, setSelectedQualities] = useState<ScaleQuality[]>([
		"major",
	]);
	const [displayedDuration, setDisplayedDuration] = useState<number>(5000);
	const [duration, setDuration] = useState<number>(5000);
	const [timerValue, setTimerValue] = useState(10);

	// Game state
	const [gameStarted, setGameStarted] = useState(false);
	const [countdown, setCountdown] = useState(false);
	const [score, setScore] = useState({ wins: 0 });
	const [showPulse, setShowPulse] = useState(false);

	const { sessionId, startSession, finishSession } = usePracticeSession();

	// Core game hooks
	const {
		rootNote,
		quality,
		formula,
		notes: targetNotes,
		generateQuestion,
	} = useChordQuestion(selectedQualities);

	const {
		progress,
		start: startTimer,
		stop: stopTimer,
	} = useProgressTimer(duration, () => {
		handleNextRound();
	});

	const {
		detected: notesDetected,
		addNote,
		reset: resetDetectedNotes,
	} = useDetectedNotes(targetNotes, () => {
		handleWin();
	});

	// Visibility handling
	useEffect(() => {
		const handleVisibilityChange = () => {
			if (document.hidden) finishSession();
		};
		document.addEventListener("visibilitychange", handleVisibilityChange);
		return () => {
			document.removeEventListener("visibilitychange", handleVisibilityChange);
		};
	}, []);

	// Start / stop handlers
	const handleWin = () => {
		console.log("Chord matched! Increasing score and starting new round.");
		setScore((prev) => ({ wins: prev.wins + 1 }));
		setShowPulse(true);
		setTimeout(() => setShowPulse(false), 1000);
		handleNextRound();
	};

	const handleNextRound = async () => {
		resetDetectedNotes();
		await generateQuestion();
		startTimer();
	};

	const startGame = async () => {
		await generateQuestion();
		setGameStarted(true);
		startTimer();
		if (!sessionId) await startSession("chord-match");
	};

	const stopGame = () => {
		setGameStarted(false);
		stopTimer();
		resetDetectedNotes();
		setCountdown(false);
		setScore({ wins: 0 });
	};
	const handleNoteDetection = (note: { display: string }) => {
		if (!gameStarted) return;
		const { note: parsed, octave } = parseNoteDisplay(note.display);
		const noteString = `${parsed}${octave}`;
		console.log("Detected note:", noteString);
		addNote(noteString);
	};

	const handleOnRangeChange = (e: any) => {
		setDisplayedDuration(e.target.valueAsNumber * 100);
	};

	return (
		<div className="game_ctn max-w-[24em]">
			<div className="scoreboard text-2xl font-mono relative">
				<AnimatedNumber number={score.wins} />
				{gameStarted && (
					<button onClick={stopGame} className="stop-game_btn">
						<Square />
					</button>
				)}
			</div>

			<div className="flex flex-col w-full relative">
				<h1
					className={`range_thumb w-full text-xs flex items-center `}
					style={{ left: `${displayedDuration / 110}%` }}
				>
					{displayedDuration / 1000} s
				</h1>
				<input
					className="w-full"
					type="range"
					min="1"
					max="100"
					onChange={handleOnRangeChange}
					onMouseUp={() => setDuration(displayedDuration)}
				/>
			</div>

			<Clockface showPulse={showPulse} withTimer={true} progress={progress}>
				<div className="game_question inversions">
					{!gameStarted && (
						<button
							onClick={() => setCountdown(true)}
							className="game_btn start-game_btn metro-btn"
						>
							{!countdown ? (
								"Start"
							) : (
								<Countdown value={4} bpm={60} onCountdownFinished={startGame} />
							)}
						</button>
					)}
					<div className="note">{rootNote}</div>
					<div className="quality">{quality}</div>
				</div>
			</Clockface>

			{formula && <h1>{formula}</h1>}
			{formula && <h1>{targetNotes.join(", ")}</h1>}

			<label htmlFor="scale_types">
				Select qualities:
				<div id="scale_types" className="qualities_ctn flex">
					{QUALITY.map((filter, i) => (
						<button
							className={`filter_btn ${
								selectedQualities.includes(filter) ? "active" : ""
							}`}
							key={filter + i}
							onClick={() =>
								setSelectedQualities((prev) =>
									prev.includes(filter)
										? prev.filter((f) => f !== filter)
										: [...prev, filter]
								)
							}
						>
							{filter}
						</button>
					))}
				</div>
			</label>

			<PitchyComponentRedux
				showDevices={true}
				onNoteDetection={handleNoteDetection}
			/>
		</div>
	);
};

export default ChordDetectionGame;
