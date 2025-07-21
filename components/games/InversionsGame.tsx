"use client";

import React, { useEffect, useRef, useState } from "react";
import "./GameStyles.css";
import { selectRandomNote } from "@/lib/utils/gameUtils";
import { arrayChromaticScale, QUALITY } from "@/constants/chromaticScale";
import { Key, Piano, PlusIcon, Timer } from "lucide-react";
import { cn } from "@/lib/utils";
import * as SwitchPrimitive from "@radix-ui/react-switch";
import PitchyComponent from "./PitchyComponent";
import { NoteInfo } from "@/types/types";
import AnimatedNumber from "./AnimatedNumber";
import Switch from "../Switch";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

const CIRCLE_RADIUS = "45";
const CIRCLE_CANVAS = "50";

const InversionsGame = () => {
	const [selectedNote, setSelectedNote] = useState("");
	const [questionQuality, setQuestionQuality] = useState("");
	const [displayedDuration, setDisplayedDuration] = useState<number>(5000);
	const [duration, setDuration] = useState<number>(displayedDuration);
	const [withTimer, setWithTimer] = useState(false);
	const [withMetronome, setWithMetronome] = useState(false);
	const [withArpeggios, setWithArpeggios] = useState(false);
	const [score, setScore] = useState({ wins: 0, losses: 0 });
	const [selectedQualities, setSelectedQualities] = useState<string[]>([
		"major",
	]);
	const [arpeggioPlayed, setArpeggioPlayed] = useState<NoteInfo[]>([]);
	const [progress, setProgress] = useState(0);
	const [previousNotes, setPreviousNotes] = useState<string[]>([]);

	const evaluateCooldownRef = useRef(false);
	const COOLDOWN_MS = 500; // 1 second cooldown, adjust as needed

	const init = () => {
		const notePoolLimit = 3;

		const quality =
			selectedQualities[Math.floor(Math.random() * selectedQualities.length)];
		setQuestionQuality(quality);

		setPreviousNotes((prev) => {
			let note = selectRandomNote();
			let attempts = 0;

			// Avoid repeating any of the last `notePoolLimit` notes
			while (prev.includes(note) && attempts < 10) {
				note = selectRandomNote();
				attempts++;
			}

			const newHistory =
				prev.length >= notePoolLimit
					? [...prev.slice(1), note]
					: [...prev, note];

			// Only set note after final value is chosen
			setSelectedNote(note);
			return newHistory;
		});
	};

	const recordLoss = () => {
		setScore((prev) => ({ ...prev, losses: prev.losses + 1 }));
	};
	const recordWin = () => {
		setScore((prev) => ({ ...prev, wins: prev.wins + 1 }));
	};

	const evaluateRound = (note: NoteInfo) => {
		if (evaluateCooldownRef.current) return;
		if (!withArpeggios) {
			const isMatch = evaluateNotePlayed(note);
			if (isMatch) {
				recordWin();
				init();
			} else {
				recordLoss();
			}
		}

		if (withArpeggios) {
			const isMatch = evaluateNotePlayed(note);
			if (isMatch) {
				setArpeggioPlayed((prev) => [...prev, note]);
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
			init();
		}
	}, [arpeggioPlayed]);

	const evaluateNotePlayed = (noteInfo: NoteInfo) => {
		const notePlayed = noteInfo.noteName;
		const selected = selectedNote;

		console.log("Selected:", selectedNote, "| Played:", noteInfo.noteName);
		// Find group that contains the played note
		const matchSet = arrayChromaticScale.find((group) =>
			group.includes(notePlayed)
		);

		// ✅ FIX: Check if selectedNote is in the same group
		const isMatch = matchSet?.includes(selected);
		return isMatch;
	};

	useEffect(() => {
		if (progress == 100) {
		}
	}, [progress]);

	useEffect(() => {
		init();
		if (withTimer) {
			let start = Date.now();
			let raf: number;
			let timeoutId: NodeJS.Timeout;

			const step = () => {
				const elapsed = Date.now() - start;
				const percent = Math.min((elapsed / duration) * 100, 100);
				setProgress(percent);

				if (elapsed < duration) {
					raf = requestAnimationFrame(step);
				}
			};

			init();
			step();

			timeoutId = setInterval(() => {
				recordLoss();
				start = Date.now();
				setProgress(0);
				init();
				step(); // restart animation each round
			}, duration);

			return () => {
				clearInterval(timeoutId);
				cancelAnimationFrame(raf);
			};
		}
	}, [duration, selectedQualities, withTimer]);

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.code === "Space" && !withTimer) {
				init();
			}
		};

		window.addEventListener("keydown", handleKeyDown);

		return () => {
			window.removeEventListener("keydown", handleKeyDown);
		};
	}, [withTimer]);

	const renderFilters = () => {
		return QUALITY.map((filter, index) => {
			return (
				<button
					className={`filter_btn ${
						selectedQualities.indexOf(filter) !== -1 ? "active" : ""
					}`}
					key={filter + index}
					onClick={() =>
						setSelectedQualities((prev) =>
							selectedQualities.indexOf(filter) !== -1
								? selectedQualities.filter((f) => f !== filter)
								: [...prev, filter]
						)
					}
				>
					<span className="flex items-center  ">
						<PlusIcon
							size={16}
							className={`filter_icon ${
								selectedQualities.indexOf(filter) == -1 ? "" : "active"
							}`}
						/>
						{filter.slice(0, 3)}
					</span>
				</button>
			);
		});
	};

	return (
		<div className="game_ctn">
			<p className="game_instructions w-50">
				Change <span className="highlight-white">note</span> and{" "}
				<span className="highlight-white">quality</span> by pressing the{" "}
				<span className="highlight">spacebar</span> or start the{" "}
				<span className="highlight">timer</span>!
			</p>
			<div className="scoreboard text-2xl font-mono">
				<AnimatedNumber number={score.losses} />:
				<AnimatedNumber number={score.wins} />
			</div>
			<Tooltip>
				<TooltipTrigger asChild={true}>
					<label htmlFor="withTimer" className="flex items-center gap-2">
						<Timer />
						<Switch checked={withTimer} onCheckChange={setWithTimer} />
					</label>
				</TooltipTrigger>
				<TooltipContent>Practice with a time limit</TooltipContent>
			</Tooltip>
			<Tooltip>
				<TooltipTrigger asChild={true}>
					<label htmlFor="withMetronome" className="flex items-center gap-2">
						<img src="assets/metronome-icon.svg" />
						<Switch checked={withMetronome} onCheckChange={setWithMetronome} />
					</label>
				</TooltipTrigger>
				<TooltipContent>Practice with a metronome</TooltipContent>
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
			<div>
				<h1 className="scoreboard timer">{displayedDuration / 1000} sec</h1>
				<input
					type="range"
					name=""
					id=""
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
						<div className="note">{selectedNote}</div>
						{withArpeggios && <div className="quality">{questionQuality}</div>}
					</div>
				</div>
			</div>
			<div className="qualities_ctn flex">{renderFilters()}</div>
			<PitchyComponent onNoteDetection={evaluateRound} />
		</div>
	);
};

export default InversionsGame;
