"use client";
import React, { useEffect, useState } from "react";
import { arrayChromaticScale, QUALITY } from "@/constants/chromaticScale";
import { ChordQuality, Note } from "@/types/types";
import {
	buildScale,
	selectRandomNote,
	shuffleArray,
} from "@/lib/utils/gameUtils";
import "./GameStyles.css";
import { MinusIcon, PlusIcon, XIcon } from "lucide-react";
import AnimatedNumber from "./AnimatedNumber";

type GameOptionstype = {
	highlightRoot: boolean;
};

const ArpeggioGame = () => {
	const [question, setQuestion] = useState<string[]>([]);
	const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
	const [gameOptions, setGameOptions] = useState<GameOptionstype>({
		highlightRoot: true,
	});
	const [answer, setAnswer] = useState<{
		root: Note;
		quality: ChordQuality;
		notes?: string[];
	}>();
	const [selectedRoot, setSelectedRoot] = useState<string[]>([]);
	const [selectedQuality, setSelectedQuality] = useState<string>("");
	const [available, setAvailable] = useState(["major"]);
	const [extensions, setExtensions] = useState<Number[]>([]);
	const [animate, setAnimate] = useState("");
	const [score, setScore] = useState({ wins: 0, losses: 0 });

	const EXTENSIONS = [6, 1, 3, 5];

	useEffect(() => {
		init();
	}, []);

	const init = () => {
		setSelectedQuality("");
		setSelectedRoot([]);
		const note = selectRandomNote() as Note;

		if (!note) return;
		const rQuality = available[
			Math.floor(Math.random() * available.length)
		] as ChordQuality;

		const scale = buildScale(note, rQuality);
		const chord = buildChord(scale);

		setQuestion(shuffleArray(chord));
		setAnswer({ root: note, quality: rQuality });
	};

	const buildChord = (scale: Note[]): Note[] => {
		const chord = [scale[0], scale[2], scale[4]];
		// if (extensions) {
		// 	for (let i = 0; i <= extensions.length; i++) {
		// 		chord.push(scale[EXTENSIONS[extensions.length]]);
		// 	}
		// }
		return chord;
	};

	useEffect(() => {
		init();
	}, [extensions, available]);

	useEffect(() => {
		window.addEventListener("mousemove", (e) => {
			setMousePosition({ x: e.clientX, y: e.clientY });
		});
	}, [animate]);

	const renderFilters = () => {
		return QUALITY.map((filter, index) => {
			return (
				<button
					className={`filter_btn ${
						available.indexOf(filter) !== -1 ? "active" : ""
					}`}
					key={filter + index}
					onClick={() =>
						setAvailable((prev) =>
							available.indexOf(filter) !== -1
								? available.filter((f) => f !== filter)
								: [...prev, filter]
						)
					}
				>
					<span className="flex items-center  ">
						<PlusIcon
							size={16}
							className={`filter_icon ${
								available.indexOf(filter) == -1 ? "" : "active"
							}`}
						/>
						{filter.slice(0, 3)}
					</span>
				</button>
			);
		});
	};

	const renderArpeggio = () => {
		return question.map((note, index) => {
			return (
				<div
					key={note + index}
					className={`game_question ${
						gameOptions.highlightRoot && answer?.root === note ? "root" : ""
					}`}
				>
					{note}
				</div>
			);
		});
	};

	const triggerAnimation = (type: "won" | "lost") => {
		setAnimate(type);
		setTimeout(() => {
			setAnimate("");
		}, 1500);
	};

	const evaluate = () => {
		if (
			selectedQuality === answer?.quality &&
			selectedRoot.indexOf(answer.root) !== -1
		) {
			init();
			setScore((prev) => ({ ...prev, wins: prev.wins + 1 }));
			triggerAnimation("won");
		} else {
			setScore((prev) => ({ ...prev, losses: prev.losses + 1 }));
			setSelectedQuality("");
			setSelectedRoot([]);
			triggerAnimation("lost");
		}
	};

	useEffect(() => {
		if (selectedQuality && selectedRoot) {
			evaluate();
		}
	}, [selectedQuality, selectedRoot]);

	const renderNotes = () => {
		return arrayChromaticScale.map((n, i) => {
			return (
				<div
					className={`game_btn note ${selectedRoot === n ? "selected" : ""}`}
					key={n[0]}
					onClick={() => setSelectedRoot((prev) => (prev !== n ? n : prev))}
				>
					{n.length > 1 ? n[0] + " / " + n[1] : n[0]}
				</div>
			);
		});
	};
	const renderQualities = () => {
		return QUALITY.map((q, i) => {
			return (
				<div
					className={`game_btn quality ${
						selectedQuality === q ? "selected" : ""
					}`}
					key={q}
					onClick={() => setSelectedQuality(q)}
				>
					{q}
				</div>
			);
		});
	};

	return (
		<div className="game_ctn p-2">
			<div className="scoreboard text-2xl font-mono">
				<AnimatedNumber number={score.losses} />:
				<AnimatedNumber number={score.wins} />
			</div>
			<div className="options">
				<label htmlFor="highlight-root">
					<input
						type="checkbox"
						name="highlight-root"
						id=""
						checked={gameOptions.highlightRoot}
						onChange={() => {
							setGameOptions((prev) => ({
								highlightRoot: !prev.highlightRoot,
							}));
						}}
					/>
					Highlight root note
				</label>
			</div>
			<div className="filter_ctn">{renderFilters()}</div>
			<div className="question_ctn flex">{renderArpeggio()}</div>
			<div className="notes_ctn flex ">{renderNotes()}</div>
			<div className="qualities_ctn flex ">{renderQualities()}</div>
			<div
				className={`flashing_el ${animate}`}
				style={{ top: `${mousePosition.y}px`, left: `${mousePosition.x}px` }}
			></div>
		</div>
	);
};

export default ArpeggioGame;
