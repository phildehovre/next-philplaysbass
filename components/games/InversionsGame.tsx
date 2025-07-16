"use client";

import React, { useEffect, useState } from "react";
import "./GameStyles.css";
import { selectRandomNote } from "@/lib/utils/gameUtils";
import { QUALITY } from "@/constants/chromaticScale";
import { Slider } from "@radix-ui/react-slider";
import { CookingPot, PlusIcon } from "lucide-react";

const CIRCLE_RADIUS = "45";
const CIRCLE_CANVAS = "50";

const InversionsGame = () => {
	const [selectedNote, setSelectedNote] = useState("");
	const [questionQuality, setQuestionQuality] = useState("");
	const [duration, setDuration] = useState(5000);
	const [withTimer, setWithTimer] = useState(false);
	const [selectedQualities, setSelectedQualities] = useState<string[]>([
		"major",
	]);
	const [progress, setProgress] = useState(0);
	const [previousNotes, setPreviousNotes] = useState<string[]>([]);

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

			setSelectedNote(note); // Only set note after final value is chosen
			return newHistory;
		});
	};

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

			init(); // initialize the first round
			step(); // start tracking progress

			timeoutId = setInterval(() => {
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

	useEffect(() => {
		console.log(previousNotes);
	}, [previousNotes]);
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
			<label htmlFor="withTimer">
				<input
					type="checkbox"
					name="withTimer"
					id=""
					onChange={() => setWithTimer(!withTimer)}
					checked={withTimer}
				/>
				Timer
			</label>
			<div>
				<h1 className="scoreboard timer">{duration / 1000} sec</h1>
				<input
					type="range"
					name=""
					id=""
					min="10"
					max="100"
					onChange={(e) => setDuration(e.target.valueAsNumber * 100)}
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
						<text
							x="50%"
							y="50%"
							dominantBaseline="middle"
							textAnchor="middle"
							className="clock-text"
						>
							{Math.ceil((duration / 1000) * (1 - progress / 100))}
						</text>
					</svg>
					<div className="game_question inversions">
						<div className="note">{selectedNote}</div>
						<div className="quality">{questionQuality}</div>
					</div>
				</div>
			</div>

			<div className="qualities_ctn flex">{renderFilters()}</div>
		</div>
	);
};

export default InversionsGame;
