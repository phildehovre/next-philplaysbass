"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import {
	generateUkeChord,
	selectRandomNote,
	fretsToNotesWithOctaves,
	parseNoteDisplay,
} from "@/lib/utils/gameUtils";
import {
	QUALITY,
	ScaleQuality,
	UkuleleShape,
} from "@/constants/chromaticScale";
import { usePracticeSession } from "@/context/practiceSessionsContext";
import { NoteInfo } from "@/types/types";
import Clockface from "../Clockface";
import Countdown from "../Countdown";
import PitchyComponentRedux from "./PitchyComponentRedux";
import { Square } from "lucide-react";
import AnimatedNumber from "../AnimatedNumber";
import "./GameStylesRedux.css";
import { useGameTimer } from "../../Timer";
import UkulelePlayer from "./UkulelePlayer";
import UkeDiagramWithNotes from "./DetectedNotesDisplay";

const IDLE_DURATION = 2000;

type GameOptions = {
	diagram: boolean;
};
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
	const [gameOptions, setGameOptions] = useState<GameOptions>({
		diagram: true,
	});
	const [duration, setDuration] = useState<number>(displayedDuration);
	const [notesDetected, setNotesDetected] = useState<string[]>([]);
	const [gameStarted, setGameStarted] = useState(false);
	const [countdown, setCountdown] = useState(false);
	const [showPulse, setShowPulse] = useState(false);
	const [isVictoryMessageVisible, setIsVictoryMessageVisible] =
		useState<boolean>(false);

	const { finishSession } = usePracticeSession();

	const { setIdle, progress, start, stop, isIdle } = useGameTimer({
		duration: duration,
		idleDelay: IDLE_DURATION,
		onComplete: () => {
			init();
			start();
		},
	});

	const timerInterval = useRef<NodeJS.Timeout | null>(null);
	const silenceTimeout = useRef<NodeJS.Timeout | null>(null);
	const rafRef = useRef<number | null>(null);
	const ukePlayerRef = useRef<{ playChord: (shape: UkuleleShape) => void }>(
		null
	);

	useEffect(() => {
		const handleVisibilityChange = () => {
			if (document.hidden) finishSession();
		};
		document.addEventListener("visibilitychange", handleVisibilityChange);
		return () => {
			document.removeEventListener("visibilitychange", handleVisibilityChange);
		};
	}, []);

	const onPlayChord = () => {
		if (!ukePlayerRef.current || !questionFormula) return;

		ukePlayerRef.current.playChord(questionFormula);
	};

	const init = async () => {
		setIsVictoryMessageVisible(false);

		const quality =
			selectedQualities[Math.floor(Math.random() * selectedQualities.length)];
		setQuestionQuality(quality);

		const rootNote = selectRandomNote();
		setSelectedRoot(rootNote);

		const chord = generateUkeChord(rootNote, quality);
		setQuestionFormula(chord);
		const notes = fretsToNotesWithOctaves(chord);

		setQuestionChord(notes);
		setNotesDetected([]);
		notesDetectedRef.current = [];
	};

	const recordWin = () => {
		setScore((prev) => ({ ...prev, wins: prev.wins + 1 }));
		setShowPulse(true);
		setTimeout(() => setShowPulse(false), 100);
		setGameStarted(false);
		setIsVictoryMessageVisible(true);
		onPlayChord();

		stop();

		setIdle(true);

		setTimeout(() => {
			setIsVictoryMessageVisible(false);
			init();
			setGameStarted(true);
			start();
		}, IDLE_DURATION);
	};

	const notesDetectedRef = useRef<string[]>([]);
	const lastNoteTimestampsRef = useRef<{ [note: string]: number }>({});

	const evaluateRound = useCallback(
		async (note: NoteInfo) => {
			if (!gameStarted) return;

			const { note: parsedNote, octave } = parseNoteDisplay(note.display);
			const normalizedNoteWithOctave = parsedNote + octave;
			console.log(parsedNote, octave);

			const now = Date.now();
			const lastTime =
				lastNoteTimestampsRef.current[normalizedNoteWithOctave] || 0;

			if (now - lastTime < 75) return;

			lastNoteTimestampsRef.current[normalizedNoteWithOctave] = now;

			notesDetectedRef.current.push(normalizedNoteWithOctave);
			setNotesDetected([...notesDetectedRef.current]);

			const target = questionChord.map((n) => {
				const { note: nn, octave: o } = parseNoteDisplay(n);
				return nn + o;
			});

			const isValidMatch = (() => {
				const required = [...target];
				const detected = [...notesDetectedRef.current];

				for (let i = 0; i < required.length; i++) {
					const targetNote = required[i];
					const firstIndex = detected.findIndex((d) => d === targetNote);
					if (firstIndex === -1) return false;

					detected.splice(firstIndex, 1);
					required.splice(i, 1);
					i = -1;
				}
				return true;
			})();

			if (isValidMatch) {
				recordWin();
				notesDetectedRef.current = [];
			}

			// reset on user note playing (silence)
			if (silenceTimeout.current) clearTimeout(silenceTimeout.current);
			silenceTimeout.current = setTimeout(() => {
				notesDetectedRef.current = [];
				setNotesDetected([]);
			}, 3000);
		},
		[gameStarted, isVictoryMessageVisible]
	);

	const resetGame = () => {
		if (rafRef.current) cancelAnimationFrame(rafRef.current);

		setGameStarted(false);
		setCountdown(false);
		setSelectedRoot("");
		setQuestionQuality(undefined);
		setScore({ wins: 0 });
		setShowPulse(false);
		setIsVictoryMessageVisible(false);
	};

	const timerActive = useRef(false);

	const stopGame = () => {
		timerActive.current = false;

		if (timerInterval.current) {
			clearInterval(timerInterval.current);
			timerInterval.current = null;
		}
		if (rafRef.current) {
			cancelAnimationFrame(rafRef.current);
			rafRef.current = null;
		}

		stop();

		// full UI/state reset
		resetGame();

		notesDetectedRef.current = [];
		setNotesDetected([]);
	};

	const startGame = async () => {
		await init();
		setIsVictoryMessageVisible(false);
		setGameStarted((prev) => (prev == false ? true : true));
		start();
	};

	const handleOnRangeChange = (e: any) => {
		setDisplayedDuration(e.target.valueAsNumber * 100);
		setDuration(e.target.valueAsNumber * 100);
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
					style={{ left: `${displayedDuration / 165}%` }}
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
					defaultValue={displayedDuration}
				/>
			</div>
			<Clockface showPulse={showPulse} withTimer={true} progress={progress}>
				<div className="game_question inversions">
					{(() => {
						if (isVictoryMessageVisible) {
							return (
								<div className="text-green-600 text-xl font-bold">
									Well done!
								</div>
							);
						}

						if (!gameStarted) {
							return (
								<button
									onClick={() => setCountdown(true)}
									className="game_btn start-game_btn  text-yellow-600"
								>
									{!countdown ? (
										"start"
									) : (
										<Countdown
											value={4}
											bpm={60}
											onCountdownFinished={startGame}
										/>
									)}
								</button>
							);
						}

						// Game started, but may be between questions
						return (
							<>
								{isIdle ? (
									<div className="font-bold text-6xl">Ready?</div>
								) : (
									<>
										<div className="note">{selectedRoot}</div>
										<div className="quality">{questionQuality}</div>
									</>
								)}
							</>
						);
					})()}
				</div>
			</Clockface>
			<UkeDiagramWithNotes
				questionNotes={questionChord}
				chord={questionFormula}
				detectedNotes={notesDetected}
			/>
			{questionFormula && (
				<UkulelePlayer shape={questionFormula} ref={ukePlayerRef} />
			)}

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
