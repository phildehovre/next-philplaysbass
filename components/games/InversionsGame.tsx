"use client";

import React, { useEffect, useRef, useState } from "react";
import "./GameStyles.css";
import { selectRandomNote } from "@/lib/utils/gameUtils";
import { arrayChromaticScale, QUALITY } from "@/constants/chromaticScale";
import { PlusIcon, Timer } from "lucide-react";
import { cn } from "@/lib/utils";
import * as SwitchPrimitive from "@radix-ui/react-switch";
import PitchyComponent from "./PitchyComponent";
import { NoteInfo } from "@/types/types";
import AnimatedNumber from "./AnimatedNumber";

const CIRCLE_RADIUS = "45";
const CIRCLE_CANVAS = "50";

const InversionsGame = () => {
	const [selectedNote, setSelectedNote] = useState("");
	const [questionQuality, setQuestionQuality] = useState("");
	const [displayedDuration, setDisplayedDuration] = useState<number>(5000);
	const [duration, setDuration] = useState<number>(displayedDuration);
	const [withTimer, setWithTimer] = useState(false);
	const [score, setScore] = useState({ wins: 0, losses: 0 });
	const [selectedQualities, setSelectedQualities] = useState<string[]>([
		"major",
	]);
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

	const evaluateNotePlayed = (noteInfo: NoteInfo) => {
		if (evaluateCooldownRef.current) {
			// Still cooling down, ignore this call
			return;
		}

		const notePlayed = noteInfo.noteName;
		const selected = selectedNote;

		const matchSet = arrayChromaticScale.find((group) =>
			group.includes(notePlayed)
		);

		const isMatch = matchSet?.includes(selected);

		if (isMatch) {
			recordWin();
			init();
		} else {
			recordLoss();
		}

		// Enter cooldown
		evaluateCooldownRef.current = true;
		setTimeout(() => {
			evaluateCooldownRef.current = false;
		}, COOLDOWN_MS);
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
			<label htmlFor="withTimer" className="flex items-center gap-2">
				<Timer />
				<SwitchPrimitive.Root
					data-slot="switch"
					className={cn(
						"peer data-[state=checked]:bg-primary data-[state=unchecked]:bg-input focus-visible:border-ring focus-visible:ring-ring/50 dark:data-[state=unchecked]:bg-input/80 inline-flex h-[1.15rem] w-8 shrink-0 items-center rounded-full border border-transparent shadow-xs transition-all outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
						`timer_switch ${withTimer ? "checked" : ""}`
					)}
					onCheckedChange={() => setWithTimer(!withTimer)}
					checked={withTimer}
				>
					<SwitchPrimitive.Thumb
						data-slot="switch-thumb"
						className={cn(
							"bg-background dark:data-[state=unchecked]:bg-foreground dark:data-[state=checked]:bg-primary-foreground shadow-blackj pointer-events-none block size-4 rounded-full ring-0 transition-transform data-[state=checked]:translate-x-[calc(100%-2px)] data-[state=unchecked]:translate-x-0"
						)}
					/>
				</SwitchPrimitive.Root>
			</label>
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
						<div className="quality">{questionQuality}</div>
					</div>
				</div>
			</div>

			<div className="qualities_ctn flex">{renderFilters()}</div>
			<PitchyComponent onNoteDetection={evaluateNotePlayed} />
		</div>
	);
};

export default InversionsGame;
