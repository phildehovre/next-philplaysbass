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

const ChordDetectionGame = () => {
	const [selectedRoot, setSelectedRoot] = useState("");
	const [questionQuality, setQuestionQuality] = useState<ScaleQuality>();
	const [questionChord, setQuestionChord] = useState<string[]>([]);
	const [questionFormula, setQuestionFormula] = useState<UkuleleShape>();
	const [score, setScore] = useState({ wins: 0 });
	const [selectedQualities, setSelectedQualities] = useState<ScaleQuality[]>([
		"major",
	]);
	const [progress, setProgress] = useState<number>(0);
	const [displayedDuration, setDisplayedDuration] = useState<number>(5000);
	const [duration, setDuration] = useState<number>(displayedDuration);
	const [notesDetected, setNotesDetected] = useState<Set<string>>(new Set());
	const [gameStarted, setGameStarted] = useState(false);
	const [countdown, setCountdown] = useState(false);
	const [showPulse, setShowPulse] = useState(false);
	const [timerValue, setTimerValue] = useState(10); // seconds
	const [elapsed, setElapsed] = useState(0);
	const timerInterval = useRef<NodeJS.Timeout | null>(null);
	const silenceTimeout = useRef<NodeJS.Timeout | null>(null);

	const { sessionId, startSession, finishSession } = usePracticeSession();

	const timeoutRef = useRef<NodeJS.Timeout | null>(null);
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
	useEffect(() => {
		return () => {
			if (timeoutRef.current) clearInterval(timeoutRef.current);
			if (rafRef.current) cancelAnimationFrame(rafRef.current);
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
		console.log("NOTES:: ", notes);

		setQuestionChord(Array.from(new Set(notes)));
		setNotesDetected(new Set());
		setElapsed(0);
	};

	const recordWin = () => {
		setScore((prev) => ({ ...prev, wins: prev.wins + 1 }));
		setShowPulse(true);
		setTimeout(() => setShowPulse(false), 1000);
		init();
	};

	const notesDetectedRef = useRef<Set<string>>(new Set());

	const evaluateRound = async (note: NoteInfo) => {
		if (!gameStarted) return;

		// Parse and normalize the played note
		const { note: parsedNote, octave } = parseNoteDisplay(note.display);
		const normalizedNoteWithOctave = parsedNote + octave;

		// Add to set
		notesDetectedRef.current.add(normalizedNoteWithOctave);
		setNotesDetected(new Set(notesDetectedRef.current)); // sync state

		// Normalize the question chord too
		const questionNoteSet = new Set(
			questionChord.map((note) => {
				const { note: n, octave: o } = parseNoteDisplay(note);
				return n + o;
			})
		);

		// Check for success
		const allPresent = [...questionNoteSet].every((note) =>
			notesDetectedRef.current.has(note)
		);

		if (allPresent) {
			recordWin();
			notesDetectedRef.current.clear();
			startTimer();
		}

		// Reset if user stops playing
		if (silenceTimeout.current) clearTimeout(silenceTimeout.current);
		silenceTimeout.current = setTimeout(() => {
			notesDetectedRef.current.clear();
			setNotesDetected(new Set());
		}, 3000);
	};

	const resetGame = () => {
		// clear timers
		if (rafRef.current) cancelAnimationFrame(rafRef.current);
		if (timeoutRef.current) clearTimeout(timeoutRef.current);

		// reset state
		setGameStarted(false);
		setCountdown(false);
		setProgress(0);
		setSelectedRoot("");
		setQuestionQuality(undefined);
		setScore({ wins: 0 });
		setShowPulse(false);
	};

	const startTimer = () => {
		if (timerInterval.current) clearInterval(timerInterval.current);
		if (timeoutRef.current) clearTimeout(timeoutRef.current);

		let start = Date.now();

		// Progress animation
		const step = () => {
			const elapsedMs = Date.now() - start;
			const percent = Math.min((elapsedMs / duration) * 100, 100);
			setProgress(percent);

			if (elapsedMs < duration) {
				rafRef.current = requestAnimationFrame(step);
			}
		};
		step();

		// Timer interval to track seconds elapsed (optional)
		timerInterval.current = setInterval(() => {
			setElapsed((prev) => {
				if (prev >= timerValue) {
					clearInterval(timerInterval.current!);
					return 0;
				}
				return prev + 1;
			});
		}, 1000);

		// When timer ends, reset game and start next chord
		timeoutRef.current = setTimeout(() => {
			init(); // pick next chord/reset detected notes
			startTimer(); // restart timer for next round
		}, duration);
	};

	const startGame = async () => {
		await init();
		setGameStarted(true);
		startTimer();
		if (!sessionId) await startSession("chord-match");
	};

	const stopGame = () => {
		setGameStarted(false);

		if (timerInterval.current) {
			clearInterval(timerInterval.current);
			timerInterval.current = null;
		}
		if (timeoutRef.current) {
			clearTimeout(timeoutRef.current);
			timeoutRef.current = null;
		}
		if (rafRef.current) {
			cancelAnimationFrame(rafRef.current);
			rafRef.current = null;
		}
		resetGame();
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
					onChange={(e) => handleOnRangeChange(e)}
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
					<div className="note">{selectedRoot}</div>
					<div className="quality">{questionQuality}</div>
				</div>
			</Clockface>
			{questionFormula && <h1>{questionFormula}</h1>}
			{questionFormula && <h1>{questionChord}</h1>}

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
