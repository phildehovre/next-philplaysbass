"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import {
	generateUkeChord,
	selectRandomNote,
	normalizeNote,
	fretsToNotesWithOctaves,
	parseNoteDisplay,
} from "@/lib/utils/gameUtils";
import {
	QUALITY,
	ScaleQuality,
	UkuleleShape,
} from "@/constants/chromaticScale";
import { usePracticeSession } from "@/context/practiceSessionsContext";
import { Note, NoteInfo } from "@/types/types";
import Clockface from "./Clockface";
import Countdown from "./Countdown";
import PitchyComponentRedux from "./PitchyComponentRedux";
import { Square } from "lucide-react";
import AnimatedNumber from "./AnimatedNumber";
import "./GameStylesRedux.css";
import { DetectedNotesDisplay } from "./DetectedNotesDisplay";
import { useGameTimer } from "../Timer";

const ChordDetectionGame = () => {
	const [selectedRoot, setSelectedRoot] = useState("");
	const [questionQuality, setQuestionQuality] = useState<ScaleQuality>();
	const [questionChord, setQuestionChord] = useState<string[]>([]);
	const [questionFormula, setQuestionFormula] = useState<UkuleleShape>();
	const [score, setScore] = useState({ wins: 0 });
	const [selectedQualities, setSelectedQualities] = useState<ScaleQuality[]>([
		"major",
	]);
	const [displayedDuration, setDisplayedDuration] = useState<number>(15000);
	const [duration, setDuration] = useState<number>(displayedDuration);
	const [notesDetected, setNotesDetected] = useState<string[]>([]);
	const [gameStarted, setGameStarted] = useState(false);
	const [countdown, setCountdown] = useState(false);
	const [showPulse, setShowPulse] = useState(false);
	const [timerValue, setTimerValue] = useState(10); // seconds
	const timerInterval = useRef<NodeJS.Timeout | null>(null);
	const silenceTimeout = useRef<NodeJS.Timeout | null>(null);
	const [isVictoryMessageVisible, setIsVictoryMessageVisible] =
		useState<boolean>(false);

	const { sessionId, startSession, finishSession } = usePracticeSession();
	const { elapsed, progress, start, stop, isActive } = useGameTimer({
		duration: timerValue * 1000, // convert seconds → ms
		onComplete: () => {
			init(); // your existing game reset/next-question logic
			start(); // restart timer automatically
		},
	});

	const rafRef = useRef<number | null>(null);

	useEffect(() => {
		const handleVisibilityChange = () => {
			if (document.hidden) finishSession();
		};
		document.addEventListener("visibilitychange", handleVisibilityChange);
		return () => {
			document.removeEventListener("visibilitychange", handleVisibilityChange);
		};
	}, []);

	const init = async () => {
		const quality =
			selectedQualities[Math.floor(Math.random() * selectedQualities.length)];
		setQuestionQuality(quality);

		const rootNote = selectRandomNote();
		setSelectedRoot(rootNote);

		const chord = generateUkeChord(rootNote, quality);
		setQuestionFormula(chord);
		const notes = fretsToNotesWithOctaves(chord);
		console.log("Question NOTES:: ", notes);

		setQuestionChord(notes);
		setNotesDetected([]);
		notesDetectedRef.current = [];
	};

	const recordWin = () => {
		setScore((prev) => ({ ...prev, wins: prev.wins + 1 }));
		setShowPulse(true);
		setGameStarted(false);

		setTimeout(() => {
			setIsVictoryMessageVisible(false); // Hide win screen
			setGameStarted(true); // Re-enable detection
			init(); // Prepare next round
			start(); // Restart timer
		}, 2000);
	};
	const notesDetectedRef = useRef<string[]>([]);
	const evaluateRound = async (note: NoteInfo) => {
		if (!gameStarted || isVictoryMessageVisible) return;

		const { note: parsedNote, octave } = parseNoteDisplay(note.display);
		const normalizedNoteWithOctave = parsedNote + octave;

		// Add to array (do not deduplicate)
		notesDetectedRef.current.push(normalizedNoteWithOctave);
		setNotesDetected([...notesDetectedRef.current]); // trigger re-render

		// Normalize target chord
		const target = questionChord.map((note) => {
			const { note: n, octave: o } = parseNoteDisplay(note);
			return n + o;
		});

		// Match logic: Check if all target notes (including duplicates) exist in detected list
		const isValidMatch = (() => {
			const required = [...target]; // mutable copy
			const detected = [...notesDetectedRef.current];

			for (let i = 0; i < required.length; i++) {
				const targetNote = required[i];

				// Find index in detected with at least 1 non-consecutive note between same ones
				const firstIndex = detected.findIndex((n) => n === targetNote);
				if (firstIndex === -1) return false;

				// Remove that index
				detected.splice(firstIndex, 1);

				// Remove from required
				required.splice(i, 1);
				i = -1; // reset loop
			}
			return true;
		})();

		if (isValidMatch) {
			recordWin();
			notesDetectedRef.current = [];
			start();
		}

		if (silenceTimeout.current) clearTimeout(silenceTimeout.current);
		silenceTimeout.current = setTimeout(() => {
			notesDetectedRef.current = [];
			setNotesDetected([]);
		}, 3000);
	};

	const resetGame = () => {
		// clear timers
		if (rafRef.current) cancelAnimationFrame(rafRef.current);

		// reset state
		setGameStarted(false);
		setCountdown(false);
		setSelectedRoot("");
		setQuestionQuality(undefined);
		setScore({ wins: 0 });
		setShowPulse(false);
	};

	const timerActive = useRef(false);

	const stopGame = () => {
		timerActive.current = false; // tell step() to stop

		if (timerInterval.current) {
			clearInterval(timerInterval.current);
			timerInterval.current = null;
		}
		if (rafRef.current) {
			cancelAnimationFrame(rafRef.current);
			rafRef.current = null;
		}
		resetGame();
		stop();
	};

	const startGame = async () => {
		await init();
		setGameStarted(true);
		start();
		if (!sessionId) await startSession("chord-match");
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
					max="150"
					onChange={(e) => handleOnRangeChange(e)}
					onMouseUp={() => setDuration(displayedDuration)}
				/>
			</div>
			<Clockface showPulse={showPulse} withTimer={true} progress={progress}>
				<div className="game_question inversions">
					{isVictoryMessageVisible ? (
						<div className="text-green-600 text-xl font-bold">You win! 🎉</div>
					) : !gameStarted ? (
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
					) : (
						<>
							<div className="note">{selectedRoot}</div>
							<div className="quality">{questionQuality}</div>
						</>
					)}
				</div>
			</Clockface>
			<DetectedNotesDisplay
				questionNotes={questionChord}
				detectedNotes={notesDetected}
				fretNumbers={questionFormula}
			/>

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
				onNoteDetection={evaluateRound}
			/>
		</div>
	);
};

export default ChordDetectionGame;
