"use client";

import React, { useEffect, useRef, useState } from "react";
import "./GameStyles.css";
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
import { ArrowUpDown, Drum, Piano, PlusIcon, Timer } from "lucide-react";
import PitchyComponent from "./PitchyComponent";
import { Note, NoteEvent, NoteInfo } from "@/types/types";
import AnimatedNumber from "./ui/AnimatedNumber";
import Switch from "../Switch";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { usePracticeSession } from "@/context/practiceSessionsContext";
import Spinner from "../Spinner";
import Clockface from "./ui/Clockface";
import Countdown from "./ui/Countdown";
import MetroWidget from "./ui/MetroWidget";
import {
	COOLDOWN_MS,
	MAX_TEMPO_AS_NUM,
	NOTE_MATCH_TYPE,
} from "../../constants/GameConstants";
import StreakManager from "./ui/StreakManager";
import BackToButton from "./ui/BackToButton";
import { useGameOptions } from "@/hooks/game-hooks/useGameOptions";
import { useScoring } from "@/hooks/game-hooks/useScoring";
import NoteMatchOptions from "./ui/NoteMatchOptions";

const NoteMatchGame = () => {
	const [selectedNote, setSelectedNote] = useState("");
	const [previousNotes, setPreviousNotes] = useState<string[]>([]);
	const [questionQuality, setQuestionQuality] = useState<ScaleQuality>();
	const [questionArpeggio, setQuestionArpeggio] = useState<Note[]>([]);
	const [questionInversion, setQuestionInversion] = useState<string | "">("");
	const [displayedDuration, setDisplayedDuration] = useState<number>(5000);
	const [bpm, setBpm] = useState<number>(MAX_TEMPO_AS_NUM / 2);

	const [duration, setDuration] = useState<number>(displayedDuration);
	const [progress, setProgress] = useState(0);
	const [lastTickTime, setLastTickTime] = useState<number | null>(0);

	const [gameStarted, setGameStarted] = useState(false);
	const [arpeggioPlayed, setArpeggioPlayed] = useState<NoteInfo[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [isTabVisible, setIsTabVisible] = useState<boolean>(true);
	const [countdown, setCountdown] = useState<boolean>(false);

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

	const {
		options,
		setWithTimer,
		setWithMetronome,
		setWithArpeggios,
		setWithInversions,
		setSelectedQualities,
		setIsPracticeMode,
	} = useGameOptions();

	const { score, recordWin, recordLoss, resetScore, showShake, showPulse } =
		useScoring();
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
		resetScore();
	}, [options.isPracticeMode]);

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
		setArpeggioPlayed([]);
		setPreviousNotes([]);
	};

	const init = async () => {
		const notePoolLimit = 3;

		const quality =
			options.selectedQualities[
				Math.floor(Math.random() * options.selectedQualities.length)
			];
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
			if (options.withInversions) {
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

	const evaluateNotePlayed = async (noteInfo: NoteInfo) => {
		if (!gameStarted) return;

		const notePlayed = noteInfo.noteName;
		const selected = options.withArpeggios
			? questionArpeggio[arpeggioPlayed.length]
			: selectedNote;

		const matchSet = arrayChromaticScale.find((group) =>
			group.includes(notePlayed)
		);

		const isMatch = matchSet?.includes(selected);
		return isMatch;
	};

	const onNoteDetection = async (note: NoteInfo) => {
		const offset = calculateMsOffset(bpm, lastTickTime);
		if (!isTabVisible) return;

		if (!sessionId) {
			await startSession(NOTE_MATCH_TYPE);
		}

		if (evaluateCooldownRef.current) return;

		if (!options.withArpeggios) {
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
				metronomeOffsetMs: offset,
				playedAt: new Date(),
			};

			// Only save to DB if not in practice mode?
			if (!options.isPracticeMode) {
				addEvent(event, {
					bpm,
					withTimer: options.withTimer,
					withMetronome: options.withMetronome,
				});
			}
			if (timeoutRef.current) clearTimeout(timeoutRef.current);

			if (isMatch) {
				recordWin();
				if (options.withTimer) startTimer();
				init();
			} else {
				recordLoss();
			}
		}

		if (options.withArpeggios && questionArpeggio) {
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

			if (options.withTimer) {
				startTimer();
			}
		}
	}, [arpeggioPlayed]);

	const startGame = async () => {
		resetGame();
		await init(); // ensure new question is ready
		setGameStarted(true);

		if (options.withTimer) {
			startTimer();
		}
		if (!sessionId) await startSession(NOTE_MATCH_TYPE);
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
			addEvent(event, {
				withMetronome: options.withMetronome,
				withTimer: options.withTimer,
			});
			if (options.withArpeggios) {
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
					options.selectedQualities.indexOf(filter) !== -1 ? "active" : ""
				}`}
				key={filter + index}
				onClick={() =>
					setSelectedQualities((prev: ScaleQuality[]) =>
						options.selectedQualities.includes(filter)
							? options.selectedQualities.filter(
									(f: ScaleQuality) => f !== filter
							  )
							: [...prev, filter]
					)
				}
			>
				<span className="flex items-center">
					<PlusIcon
						size={16}
						className={`filter_icon ${
							options.selectedQualities.includes(filter) ? "active" : ""
						}`}
					/>
					{filter.slice(0, 3)}
				</span>
			</button>
		));

	return (
		<div className="game_ctn max-w-[24em] ">
			<BackToButton label="To dashboard" url={"/dashboard"} />

			<div className="scoreboard_ctn flex w-full ">
				<div className="scoreboard text-2xl font-mono w-full">
					<label className="scoreboard_label">Session score</label>
					<AnimatedNumber
						number={totalScore.bonus + totalScore.pitch + totalScore.rhythm}
					/>
				</div>
				<div className="scoreboard text-2xl font-mono w-full">
					<label className="scoreboard_label">Tally</label>
					<AnimatedNumber number={score.losses} />:
					<AnimatedNumber number={score.wins} />
				</div>
			</div>

			<NoteMatchOptions
				gameStarted={gameStarted}
				options={options}
				setIsPracticeMode={setIsPracticeMode}
				setWithArpeggios={setWithArpeggios}
				setWithInversions={setWithInversions}
				setWithMetronome={setWithMetronome}
				setWithTimer={setWithTimer}
			/>

			<MetroWidget
				gameStarted={gameStarted}
				play={countdown || gameStarted}
				bpm={bpm}
				setBpm={setBpm}
				lastTickTime={lastTickTime}
				setLastTickTime={setLastTickTime}
				display={options.withMetronome}
			/>
			{options.withTimer && (
				<div className="flex w-full">
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
				withTimer={options.withTimer}
				progress={progress}
				gameStarted={gameStarted}
			>
				<StreakManager />
				<div className={`game_question inversions `}>
					{isLoading ? (
						<Spinner />
					) : (
						<>
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
								<button
									onClick={stopGame}
									className="game_btn stop-game_btn inversions"
								>
									Stop
								</button>
							)}
							<div className={`note ${showShake ? "shake-error" : ""}`}>
								{selectedNote}
							</div>
							{options.withArpeggios && (
								<div className="quality">{questionQuality}</div>
							)}
							{options.withInversions && (
								<div className="inversion text-red-600 w-full h-full text-2xl">
									{questionInversion}
								</div>
							)}
							{options.withArpeggios && gameStarted && (
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

			{options.withArpeggios && (
				<>
					<label htmlFor="scale_types">
						Select scales:
						<div id="scale_types" className="qualities_ctn flex">
							{renderFilters()}
						</div>
					</label>
				</>
			)}
			<PitchyComponent showDevices={true} onNoteDetection={onNoteDetection} />
		</div>
	);
};

export default NoteMatchGame;
