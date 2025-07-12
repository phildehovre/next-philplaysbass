"use client";
import React, { useEffect, useState } from "react";
import {
	arrayChromaticScale,
	formulae,
	QUALITY,
	ScaleQuality,
} from "@/constants/chromaticScale";
import { ChordQuality, Note } from "@/types/types";
import {
	buildScale,
	selectRandomNote,
	shuffleArray,
} from "@/lib/utils/gameUtils";

const ArpeggioGame = () => {
	const [question, setQuestion] = useState<string[]>([]);
	const [answer, setAnswer] = useState<{
		root?: Note;
		quality?: ChordQuality;
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
		const note = selectRandomNote() as Note;
		if (!note) return;
		const rQuality = QUALITY[
			Math.floor(Math.random() * QUALITY.length)
		] as ChordQuality;
		const majorScale = buildScale(note, rQuality);
		const arpeggio = [majorScale[0], majorScale[2], majorScale[4]];
		setQuestion(shuffleArray(arpeggio));
		setAnswer({ root: note, quality: rQuality });
	}, []);

	const renderArpeggio = () => {
		return question.map((note, index) => {
			return (
				<div key={note + index} className="arpeggio-note">
					{note}
				</div>
			);
		});
	};

	console.log(question, answer);

	const renderNotes = () => {
		return arrayChromaticScale.map((n, i) => {
			return (
				<div className="note" key={n[0]} onClick={() => setSelectedRoot(n)}>
					{...n}
				</div>
			);
		});
	};
	const renderQualities = () => {
		return QUALITY.map((q, i) => {
			return (
				<div className="note" key={q[0]} onClick={() => setSelectedQuality(q)}>
					{q}
				</div>
			);
		});
	};

	console.log(selectedRoot, selectedQuality);

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
