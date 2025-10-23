"use client";

import React, { createContext, useContext, useEffect, useRef } from "react";
import { UKE_TUNING, UkuleleShape } from "@/constants/musicConstants";

// Context shape
type OscillatorGenContext = {
	playNote: (noteName: string) => void;
	playChord: (shape: UkuleleShape) => void;
};

const UkulelePlayerContext = createContext<OscillatorGenContext | null>(null);

export const OscillatorGenProvider = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	const audioCtxRef = useRef<AudioContext | null>(null);

	// Initialize AudioContext once
	useEffect(() => {
		if (typeof window !== "undefined" && !audioCtxRef.current) {
			const AudioContextClass =
				window.AudioContext || (window as any).webkitAudioContext;
			audioCtxRef.current = new AudioContextClass();
		}
	}, []);

	// Build note frequency map
	const noteFreqMap = (() => {
		const A4 = 440;
		const notes = [
			"C",
			"C#",
			"D",
			"D#",
			"E",
			"F",
			"F#",
			"G",
			"G#",
			"A",
			"A#",
			"B",
		];
		const map: Record<string, number> = {};
		for (let octave = 0; octave <= 8; octave++) {
			for (let i = 0; i < notes.length; i++) {
				const noteName = `${notes[i]}${octave}`;
				const semitonesFromA4 = i - 9 + (octave - 4) * 12;
				map[noteName] = A4 * Math.pow(2, semitonesFromA4 / 12);
			}
		}
		return map;
	})();

	const normalizeNoteName = (note: string) => {
		const flatsToSharps: Record<string, string> = {
			Db: "C#",
			Eb: "D#",
			Gb: "F#",
			Ab: "G#",
			Bb: "A#",
		};
		const letter = note.slice(0, -1);
		const octave = note.slice(-1);
		return (flatsToSharps[letter] || letter) + octave;
	};

	const chordShapeToFrequencies = (shape: UkuleleShape): number[] => {
		const notes = [
			"C",
			"C#",
			"D",
			"D#",
			"E",
			"F",
			"F#",
			"G",
			"G#",
			"A",
			"A#",
			"B",
		];
		return shape
			.map((fret, stringIndex) => {
				const openNoteRaw = UKE_TUNING[stringIndex];
				if (!openNoteRaw) return null;

				const openNote = normalizeNoteName(openNoteRaw);
				const noteLetter = openNote.slice(0, -1);
				let octave = parseInt(openNote.slice(-1));

				let noteIndex = notes.indexOf(noteLetter);
				if (noteIndex === -1) return null;

				let totalSemis = noteIndex + fret;
				let newOctave = octave + Math.floor(totalSemis / 12);
				let newNoteIndex = ((totalSemis % 12) + 12) % 12;

				const noteName = `${notes[newNoteIndex]}${newOctave}`;
				return noteFreqMap[noteName] || null;
			})
			.filter((f): f is number => f !== null);
	};

	const playFrequencies = (freqs: number[]) => {
		if (!audioCtxRef.current) return;
		const now = audioCtxRef.current.currentTime;

		freqs.forEach((freq, i) => {
			const osc = audioCtxRef.current!.createOscillator();
			const gainNode = audioCtxRef.current!.createGain();

			osc.type = "triangle";
			osc.frequency.setValueAtTime(freq, now);

			gainNode.gain.setValueAtTime(0, now + i * 0.08);
			gainNode.gain.linearRampToValueAtTime(0.4, now + i * 0.08 + 0.02);
			gainNode.gain.exponentialRampToValueAtTime(0.001, now + i * 0.08 + 0.5);

			osc.connect(gainNode);
			gainNode.connect(audioCtxRef.current!.destination);

			osc.start(now + i * 0.08);
			osc.stop(now + i * 0.08 + 0.5);
		});
	};

	const playChord = (shape: UkuleleShape) => {
		const freqs = chordShapeToFrequencies(shape);
		playFrequencies(freqs);
	};

	const playNote = (noteName: string) => {
		if (!audioCtxRef.current) return;
		const normalized = normalizeNoteName(noteName);
		const freq = noteFreqMap[normalized];
		if (!freq) return;
		playFrequencies([freq]);
	};

	return (
		<UkulelePlayerContext.Provider value={{ playNote, playChord }}>
			{children}
		</UkulelePlayerContext.Provider>
	);
};

// Hook to use in components
export const useOscillatorGen = () => {
	const ctx = useContext(UkulelePlayerContext);
	if (!ctx) {
		throw new Error(
			"useOscillatorGen must be used within OscillatorGenProvider"
		);
	}
	return ctx;
};
