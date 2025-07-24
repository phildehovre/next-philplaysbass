"use client";

import React, { useEffect, useRef, useState } from "react";
import "./GameStyles.css";
import { buildScale, selectRandomNote } from "@/lib/utils/gameUtils";
import {
	arrayChromaticScale,
	QUALITY,
	ScaleQuality,
} from "@/constants/chromaticScale";
import { Drum, Piano, PlusIcon, Timer } from "lucide-react";
import PitchyComponent from "./PitchyComponent";
import { Note, NoteEvent, NoteInfo } from "@/types/types";
import AnimatedNumber from "./AnimatedNumber";
import Switch from "../Switch";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { usePracticeSession } from "@/context/practiceSessionsContext";
import Spinner from "../Spinner";

const CIRCLE_RADIUS = "45";
const CIRCLE_CANVAS = "50";

const InversionsGame = () => {
	const [selectedNote, setSelectedNote] = useState("");
	const [questionQuality, setQuestionQuality] = useState<ScaleQuality>();
	const [questionArpeggio, setQuestionArpeggio] = useState<Note[]>([]);
	const [displayedDuration, setDisplayedDuration] = useState<number>(5000);
	const [duration, setDuration] = useState<number>(displayedDuration);
	const [withTimer, setWithTimer] = useState(false);
	const [withMetronome, setWithMetronome] = useState(false);
	const [withArpeggios, setWithArpeggios] = useState(false);
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

	const timeoutRef = useRef<NodeJS.Timeout | null>(null);
	const rafRef = useRef<number | null>(null);
	const evaluateCooldownRef = useRef(false);
	const noteShownAtRef = useRef<number | null>(null);

	const { addEvent, sessionId, startSession, finishSession } =
		usePracticeSession();
	const COOLDOWN_MS = 250;

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

	useEffect(() => {
		setScore({ wins: 0, losses: 0 });
	}, [isPracticeMode]);

	const init = async () => {
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
			const scale = buildScale(note, quality);
			const arpeggio = [scale[0], scale[2], scale[4]];
			setQuestionArpeggio(arpeggio);
			noteShownAtRef.current = Date.now();

			return newHistory;
		});
	};

	const recordLoss = () => {
		setScore((prev) => ({ ...prev, losses: prev.losses + 1 }));
	};
	const recordWin = () => {
		setScore((prev) => ({ ...prev, wins: prev.wins + 1 }));
	};

	const evaluateNotePlayed = async (noteInfo: NoteInfo) => {
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
				expectedNote: selectedNote,
				playedNote: note.noteName,
				isCorrect: isMatch,
				timeToHitMs,
				metronomeOffsetMs: 0,
				playedAt: new Date(),
			};

			// Only save to DB if not in practice mode?
			if (!isPracticeMode) {
				addEvent(event);
			}

			isMatch ? recordWin() : recordLoss();
			if (isMatch) init();
		}

		if (withArpeggios && questionArpeggio) {
			const isMatch = await evaluateNotePlayed(note);
			isMatch ? setArpeggioPlayed((prev) => [...prev, note]) : recordLoss();
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
			init();
		}
	}, [arpeggioPlayed]);

	const startGame = async () => {
		init();
		const params: any = {
			scaleType: questionQuality,
			key: selectedNote,
			bpm: 80,
			withTimer,
			duration,
		};

		if (!sessionId) {
			await startSession("note-match");
		}

		setGameStarted(true);

		if (withTimer) {
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

			timeoutRef.current = setInterval(() => {
				recordLoss();
				init();
				start = Date.now();
				setProgress(0);
				step();
			}, duration);
		}
	};

	const stopGame = () => {
		if (timeoutRef.current) clearInterval(timeoutRef.current);
		if (rafRef.current) cancelAnimationFrame(rafRef.current);
		setGameStarted(false);
		finishSession();
	};

	const handlePracticeMode = () => {
		setIsPracticeMode(!isPracticeMode);
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
		<div className="game_ctn">
			<p className="game_instructions w-50">
				Change <span className="highlight-white">note</span> and{" "}
				<span className="highlight-white">quality</span> by pressing the{" "}
				<span className="highlight">spacebar</span> or start the{" "}
				<span className="highlight">timer</span>!
			</p>
			<div className="game_header flex flex-col justify-center gap-2 w-full">
				<label
					htmlFor="isPracticeMode"
					className="flex justify-center gap-2 m-auto"
				>
					<Switch checked={isPracticeMode} onCheckChange={setIsPracticeMode} />
					<p
						style={{
							color: isPracticeMode ? "var(--clr-cta-primary)" : "gray",
						}}
					>
						Practice mode
					</p>
				</label>
				{!gameStarted ? (
					<button onClick={startGame} className="game_btn start-game_btn">
						Start Game
					</button>
				) : (
					<button onClick={stopGame} className="game_btn stop-game_btn">
						Stop Game
					</button>
				)}
			</div>

			<div className="scoreboard text-2xl font-mono">
				<AnimatedNumber number={score.losses} />:
				<AnimatedNumber number={score.wins} />
			</div>

			{/* FILTER CONTROLS */}
			<Tooltip>
				<TooltipTrigger asChild={true}>
					<label htmlFor="withMetronome" className="flex items-center gap-2">
						<Drum />
						<Switch checked={withMetronome} onCheckChange={setWithMetronome} />
					</label>
				</TooltipTrigger>
				<TooltipContent>[coming soon] Practice with a metronome</TooltipContent>
			</Tooltip>

			<Tooltip>
				<TooltipTrigger asChild={true}>
					<label htmlFor="withArpeggios" className="flex items-center gap-2">
						<Piano />
						<Switch checked={withArpeggios} onCheckChange={setWithArpeggios} />
					</label>
				</TooltipTrigger>
				<TooltipContent>Practice with single notes or arpeggios</TooltipContent>
			</Tooltip>

			<Tooltip>
				<TooltipTrigger asChild={true}>
					<label htmlFor="withTimer" className="flex items-center gap-2">
						<Timer />
						<Switch checked={withTimer} onCheckChange={setWithTimer} />
					</label>
				</TooltipTrigger>
				<TooltipContent>Practice with a time limit</TooltipContent>
			</Tooltip>

			<div>
				<h1 className="scoreboard timer">{displayedDuration / 1000} sec</h1>
				<input
					type="range"
					min="10"
					max="100"
					onChange={(e) => setDisplayedDuration(e.target.valueAsNumber * 100)}
					onMouseUp={() => setDuration(displayedDuration)}
				/>

				<div className="clock-face">
					<svg viewBox="0 0 100 100" className="clock-svg">
						<circle
							className="clock-bg"
							cx={CIRCLE_CANVAS}
							cy={CIRCLE_CANVAS}
							r={CIRCLE_RADIUS}
						/>
						{withTimer && (
							<circle
								className="clock-progress"
								cx={CIRCLE_CANVAS}
								cy={CIRCLE_CANVAS}
								r={CIRCLE_RADIUS}
								strokeDasharray={2 * Math.PI * 45}
								strokeDashoffset={(1 - progress / 100) * 2 * Math.PI * 45}
							/>
						)}
					</svg>
					<div className="game_question inversions">
						{isLoading ? (
							<Spinner />
						) : (
							<>
								<div className="note">{selectedNote}</div>
								{withArpeggios && (
									<div className="quality">{questionQuality}</div>
								)}
								{withArpeggios && (
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
				</div>
			</div>

			<div className="qualities_ctn flex">{renderFilters()}</div>

			{gameStarted && <PitchyComponent onNoteDetection={evaluateRound} />}
		</div>
	);
};

export default InversionsGame;
