"use client";
import React, { useEffect, useState } from "react";
import chromaticScale, {
	arrayChromaticScale,
	formulae,
} from "@/constants/chromaticScale";
import { arpeggios } from "@/constants/chromaticScale";
import { ArpeggioMap, ChordQuality, Note } from "@/types/types";

const ArpeggioGame = () => {
	const [question, setQuestion] = useState("");
	const [answer, setAnswer] = useState<{
		root: Note;
		quality: ChordQuality;
		notes: string[];
	}>();
	const [available, setAvailable] = useState(["major"]);

	const selectRandomNote = () => {
		let rIndex =
			Math.round(Math.random() * arrayChromaticScale.length) %
			arrayChromaticScale.length;
		let selected = arrayChromaticScale[rIndex];
		var accidental = "";
		if (!selected) {
			let i = arrayChromaticScale.indexOf(selected);
			selected = arrayChromaticScale[i];
		}
		if (selected.length > 1) {
			return Math.round(Math.random() * selected.length) > 0.5
				? selected[0]
				: selected[1];
		}
		return selected[0];
	};

	const buildNaturalScale = (startingNote: string) => {
		const startingArray = arrayChromaticScale.find((item, index) => {
			return item.some((i) => i === startingNote);
		});
		if (!startingArray) return;
		const startingIndex = arrayChromaticScale.indexOf(startingArray);
		const scale = [
			...arrayChromaticScale.slice(startingIndex),
			...arrayChromaticScale.slice(0, startingIndex),
		];
		return scale;
	};

	const buildMajArpeggio = (scale: string[][], quality: string): string[] => {
		const filtered = scale.map((item, index) => {
			if (formulae.major.indexOf(index) == -1) {
				return "";
			}
			return item;
		});
		console.log(filtered);

		// S'assurer que toutes les lettres soient toujours consecutives!
		const flattened = scale.filter(Boolean);
		const adjustedScale: string[] = [];

		flattened.forEach((note, i) => {
			const noteIndex = scale.indexOf(note);
			const targetIndex = formulae.major[i];

			// if (noteIndex === targetIndex) {
			// 	adjustedScale[targetIndex] = note;
			// } else if (noteIndex < targetIndex) {
			// 	adjustedScale[targetIndex - 1] = "";
			// 	adjustedScale[targetIndex] = note + "#";
			// } else {
			// 	adjustedScale[targetIndex] = note + "b";
			// }
		});

		// Fill any undefined gaps with empty strings
		for (let i = 0; i < 12; i++) {
			if (!adjustedScale[i]) adjustedScale[i] = "";
		}

		return [...filtered.map((item) => item[0] || "")];
	};

	const filters = ["minor", "diminished", "augmented"];

	const renderFilters = () => {
		return filters.map((filter, index) => {
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
	useEffect(() => {}, [available]);

	useEffect(() => {
		const note = selectRandomNote();
		console.log("gen'd note: ", note);
		const scale = buildNaturalScale(note);
		// console.log("gen'd scale: ", scale);
		if (!scale) return;
		const majorScale = buildMajArpeggio(scale, "major");
		console.log("gen'd maj scale: ", majorScale);
	});

	return (
		<div className="game_ctn">
			<h1>{question}</h1>
			<div className="filter_ctn flex gap-1 justify-center">
				{renderFilters()}
			</div>
		</div>
	);
};

export default ArpeggioGame;
