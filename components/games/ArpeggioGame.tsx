"use client";
import React, { useEffect, useState } from "react";
import { arrayChromaticScale, QUALITY } from "@/constants/chromaticScale";
import { ChordQuality, Note } from "@/types/types";
import {
	buildScale,
	selectRandomNote,
	shuffleArray,
} from "@/lib/utils/gameUtils";
import "./ArpeggioGame.css";

const ArpeggioGame = () => {
	const [question, setQuestion] = useState<string[]>([]);
	const [answer, setAnswer] = useState<{
		root: Note;
		quality: ChordQuality;
		notes?: string[];
	}>();
	const [selectedRoot, setSelectedRoot] = useState<string[]>([]);
	const [selectedQuality, setSelectedQuality] = useState<string>("");
	const [available, setAvailable] = useState(["major"]);

	const renderFilters = () => {
		return QUALITY.map((filter, index) => {
			return (
				<button
					key={filter + index}
					onClick={() =>
						setAvailable((prev) =>
							available.indexOf(filter) !== -1
								? available.filter((f) => f !== filter)
								: [...prev, filter]
						)
					}
				>
					{filter}
				</button>
			);
		});
	};

	useEffect(() => {
		init();
	}, []);

	const init = () => {
		setSelectedQuality("");
		setSelectedRoot([]);
		const note = selectRandomNote() as Note;
		if (!note) return;
		const rQuality = QUALITY[
			Math.floor(Math.random() * QUALITY.length)
		] as ChordQuality;
		const majorScale = buildScale(note, rQuality);
		const arpeggio = [majorScale[0], majorScale[2], majorScale[4]];
		setQuestion(shuffleArray(arpeggio));
		setAnswer({ root: note, quality: rQuality });
	};

	const renderArpeggio = () => {
		return question.map((note, index) => {
			return (
				<div key={note + index} className="game_question ">
					{note}
				</div>
			);
		});
	};

	const evaluate = () => {
		console.log(answer);
		if (
			selectedQuality === answer?.quality &&
			selectedRoot.indexOf(answer.root) !== -1
		) {
			console.log("WIN!");
			init();
		} else {
			console.log("Incorrect!");
			setSelectedQuality("");
			setSelectedRoot([]);
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
		<div className="game_ctn">
			<div className="filter_ctn flex gap-1 justify-center">
				{renderFilters()}
			</div>
			<div className="question_ctn flex">{renderArpeggio()}</div>
			<div className="notes_ctn flex ">{renderNotes()}</div>
			<div className="qualities_ctn flex ">{renderQualities()}</div>
		</div>
	);
};

export default ArpeggioGame;
