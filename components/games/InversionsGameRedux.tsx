"use client";

import React, { useEffect, useRef, useState } from "react";
import "./GameStylesRedux.css";
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
import { PlusIcon, Square } from "lucide-react";
import PitchyComponent from "./PitchyComponent";
import { Note, NoteEvent, NoteInfo } from "@/types/types";
import AnimatedNumber from "./AnimatedNumber";
import { usePracticeSession } from "@/context/practiceSessionsContext";
import Spinner from "../Spinner";
import Clockface from "./Clockface";
import Countdown from "./Countdown";
import { COOLDOWN_MS, MAX_TEMPO_AS_NUM } from "./GameConstants";

const InversionsGame = () => {
	const [selectedNote, setSelectedNote] = useState("");
	const [questionQuality, setQuestionQuality] = useState<ScaleQuality>();
	const [questionArpeggio, setQuestionArpeggio] = useState<Note[]>([]);
	const [questionInversion, setQuestionInversion] = useState<string | "">("");
	const [displayedDuration, setDisplayedDuration] = useState<number>(5000);
	const [duration, setDuration] = useState<number>(displayedDuration);
	const [withTimer, setWithTimer] = useState(true);
	const [withArpeggios, setWithArpeggios] = useState(true);
	const [withInversions, setWithInversions] = useState(true);
	const [score, setScore] = useState({ wins: 0, losses: 0 });
	const [selectedQualities, setSelectedQualities] = useState<ScaleQuality[]>([
		"major",
	]);
	const [arpeggioPlayed, setArpeggioPlayed] = useState<NoteInfo[]>([]);
	const [progress, setProgress] = useState(0);
	const [previousNotes, setPreviousNotes] = useState<string[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [isTabVisible, setIsTabVisible] = useState<boolean>(true);
	const [gameStarted, setGameStarted] = useState(false);
	const [isPracticeMode, setIsPracticeMode] = useState<boolean>(false);
	const [showPulse, setShowPulse] = useState<boolean>(false);
	const [showShake, setShowShake] = useState(false);
	const [countdown, setCountdown] = useState<boolean>(false);
	const [bpm, setBpm] = useState<number>(MAX_TEMPO_AS_NUM / 2);
	const [lastTickTime, setLastTickTime] = useState<number | null>(0);

	const timeoutRef = useRef<NodeJS.Timeout | null>(null);
	const rafRef = useRef<number | null>(null);
	const evaluateCooldownRef = useRef(false);
	const noteShownAtRef = useRef<number | null>(null);
	const selectedNoteRef = useRef<string>("");

	const { events, addEvent, sessionId, startSession, finishSession } =
		usePracticeSession();

	console.log(selectedNote + questionQuality);
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
		setSelectedNote("");
		setQuestionQuality(undefined);
		setQuestionArpeggio([]);
		setQuestionInversion("");
		setScore({ wins: 0, losses: 0 });
		setArpeggioPlayed([]);
		setPreviousNotes([]);
		setShowPulse(false);
		setShowShake(false);
	};

	const init = async () => {
		const notePoolLimit = 3;

		const quality =
			selectedQualities[Math.floor(Math.random() * selectedQualities.length)];
		setQuestionQuality(quality);

		setPreviousNotes((prev) => {
			// This function guarantees that notes rotate fairly evenly
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

	const evaluateNotePlayed = async (noteInfo: NoteInfo) => {
		if (!gameStarted) return;

		const notePlayed = noteInfo.noteName;
		const selected = withArpeggios
			? questionArpeggio[arpeggioPlayed.length]
			: selectedNote;

		const matchSet = arrayChromaticScale.find((group) =>
			group.includes(notePlayed)
		);

		const isMatch = matchSet?.includes(selected);
		return isMatch;
	};

	const evaluateRound = async (note: NoteInfo) => {
		if (!isTabVisible) return;

		if (!sessionId) {
			await startSession("note-match");
		}

		if (evaluateCooldownRef.current) return;

		if (!withArpeggios) {
			const isMatch = await evaluateNotePlayed(note);
			if (isMatch == undefined) return;

			const now = Date.now();
			const timeToHitMs = noteShownAtRef.current
				? now - noteShownAtRef.current
				: 0;

			const event: NoteEvent = {
				expectedNote: selectedNoteRef.current,
				playedNote: note.noteName,
				isCorrect: isMatch,
				timeToHitMs,
				metronomeOffsetMs: calculateMsOffset(bpm, lastTickTime),
				playedAt: new Date(),
			};

			// Only save to DB if not in practice mode?
			if (!isPracticeMode) {
				addEvent(event, { bpm });
			}
			if (timeoutRef.current) clearTimeout(timeoutRef.current);

			if (isMatch) {
				recordWin();
				if (withTimer) startTimer();
				init();
			} else {
				recordLoss();
			}
		}

		if (withArpeggios && questionArpeggio) {
			const isMatch = await evaluateNotePlayed(note);
			if (isMatch) {
				setArpeggioPlayed((prev) => [...prev, note]);
			} else {
				recordLoss();
			}
		}

		evaluateCooldownRef.current = true;
		setTimeout(() => {
			evaluateCooldownRef.current = false;
		}, COOLDOWN_MS);
	};

	useEffect(() => {
		if (arpeggioPlayed.length === 3) {
			recordWin();
			setArpeggioPlayed([]);
			evaluateCooldownRef.current = true;
			init();

			if (withTimer) {
				startTimer();
			}
		}
	}, [arpeggioPlayed]);

	const startGame = async () => {
		resetGame();
		await init(); // ensure new question is ready
		setGameStarted(true);

		if (withTimer) {
			startTimer();
		}
		if (!sessionId) await startSession("note-match");
	};

	const startTimer = () => {
		if (timeoutRef.current) clearTimeout(timeoutRef.current);
		if (rafRef.current) cancelAnimationFrame(rafRef.current);

		let start = Date.now();

		const step = () => {
			const elapsed = Date.now() - start;
			const percent = Math.min((elapsed / duration) * 100, 100);
			setProgress(percent);

			if (elapsed < duration) {
				rafRef.current = requestAnimationFrame(step);
			}
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
			// addEvent(event);
			if (withArpeggios) {
				setArpeggioPlayed([]);
			}
			init();
			startTimer();
		}, duration);
	};

	const stopGame = () => {
		resetGame();
		if (events) finishSession();
	};

	const renderFilters = () =>
		QUALITY.map((filter, index) => (
			<button
				className={`filter_btn ${
					selectedQualities.indexOf(filter) !== -1 ? "active" : ""
				}`}
				key={filter + index}
				onClick={() =>
					setSelectedQualities((prev) =>
						selectedQualities.includes(filter)
							? selectedQualities.filter((f) => f !== filter)
							: [...prev, filter]
					)
				}
			>
				<span className="flex items-center">
					<PlusIcon
						size={16}
						className={`filter_icon ${
							selectedQualities.includes(filter) ? "active" : ""
						}`}
					/>
					{filter.slice(0, 3)}
				</span>
			</button>
		));

	return (
		<div className="game_ctn max-w-[24em]">
			<div className="scoreboard text-2xl font-mono relative">
				<AnimatedNumber number={score.losses} />:
				<AnimatedNumber number={score.wins} />
				{gameStarted && (
					<button onClick={stopGame} className="stop-game_btn">
						<Square />
					</button>
				)}
			</div>

			{withTimer && (
				<div className="flex w-full flex-col">
					<h1 className="scoreboard timer w-12 text-xs flex items-center">
						{displayedDuration / 1000} s
					</h1>
					<input
						className="w-full"
						type="range"
						min="10"
						max="100"
						onChange={(e) => setDisplayedDuration(e.target.valueAsNumber * 100)}
						onMouseUp={() => setDuration(displayedDuration)}
					/>
				</div>
			)}
			<Clockface
				showPulse={showPulse}
				withTimer={withTimer}
				progress={progress}
			>
				<div className={`game_question inversions `}>
					{isLoading ? (
						<Spinner />
					) : (
						<>
							{!gameStarted && (
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
							)}
							<div className={`note ${showShake ? "shake-error" : ""}`}>
								{selectedNote}
							</div>
							{withArpeggios && (
								<div className="quality">{questionQuality}</div>
							)}
							{/* {withInversions && (
								<div className="inversion text-red-600 w-full h-full text-2xl">
									{questionInversion}
								</div>
							)} */}
							{withArpeggios && gameStarted && (
								<div className="arpeggio-progress_ctn flex gap-1 max-w-[50px] w-full justify-between">
									{[0, 1, 2].map((i) => (
										<div
											key={i}
											className={`dot ${
												arpeggioPlayed.length > i ? "checked" : ""
											}`}
										></div>
									))}
								</div>
							)}
						</>
					)}
				</div>
			</Clockface>

			{withArpeggios && (
				<>
					<label htmlFor="scale_types">
						Select scales:
						<div id="scale_types" className="qualities_ctn flex">
							{renderFilters()}
						</div>
					</label>
				</>
			)}
			<PitchyComponent showDevices={true} onNoteDetection={evaluateRound} />
		</div>
	);
};

export default InversionsGame;
