import React, { useEffect, useState } from "react";
import { arrayChromaticScale, QUALITY } from "@/constants/musicConstants";
import { ChordQuality, Note } from "@/types/types";
import {
	buildScale,
	selectRandomNote,
	shuffleArray,
} from "@/lib/utils/gameUtils";
import { usePracticeSession } from "@/context/practiceSessionsContext";

type GameOptionstype = {
	highlightRoot: boolean;
};

export const useFlashcardsGame = () => {
	const [question, setQuestion] = useState<string[]>([]);
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
	const [progress, setProgress] = useState(Number);
	const [questionType, setQuestionType] = useState(String);

	const EXTENSIONS = [6, 1, 3, 5];

	useEffect(() => {
		init();
	}, []);

	const {
		score: totalScore,
		events,
		addEvent,
		sessionId,
		startSession,
		finishSession,
	} = usePracticeSession();

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
		if (extensions) {
			for (let i = 0; i <= extensions.length; i++) {
				chord.push(scale[EXTENSIONS[extensions.length]]);
			}
		}
		return chord;
	};

	useEffect(() => {
		init();
	}, [extensions, available]);

	const evaluate = () => {
		console.log("TODO: EVALUATE FLASHCARDS WIN/LOSS");
	};

	useEffect(() => {
		if (selectedQuality && selectedRoot) {
			evaluate();
		}
	}, [selectedQuality, selectedRoot]);

	return {
		progress,
		state: { question },
		setters: {
			setSelectedQuality,
		},
		actions: {},
	};
};
