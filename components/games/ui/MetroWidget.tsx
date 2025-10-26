"use client";
import React, { useCallback, useEffect, useState } from "react";
import {
	MAX_TEMPO_AS_NUM,
	MAX_TEMPO_AS_STR,
	MIN_TEMPO_AS_NUM,
	MIN_TEMPO_AS_STR,
<<<<<<< HEAD
} from "../../../constants/gameConstants";
=======
} from "@/constants/gameConstants";
>>>>>>> 97f16d1 (fix gameConstants.ts filename change)
import HorizontalPulseVisualisation from "./HorizontalPulseVisualisation";
import { CookingPot, Minus, Pause, Play, Plus } from "lucide-react";

type MetroWidgetPropsType = {
	bpm: number;
	setBpm: (val: number) => void;
	play: boolean;
	gameStarted: boolean;
	lastTickTime: number | null;
	setLastTickTime: (t: number) => void;
	controls?: boolean;
	setPlay: React.Dispatch<React.SetStateAction<boolean>>;
	withMetronome: boolean;
};

const MetroWidget = (props: MetroWidgetPropsType) => {
	const {
		controls,
		bpm,
		setBpm,
		play,
		gameStarted,
		lastTickTime,
		setLastTickTime,
		setPlay,
		withMetronome,
	} = props;

	const [tempoInterval, setTempoInterval] = useState<number | undefined>();
	const [soundEffect, setSoundEffect] = useState<any>("sidestick");
	const [sounds, setSounds] = useState<any>();
	const [displayedBpm, setDisplayedBpm] = useState<number>(bpm);

	useEffect(() => {
		const woodblock = new Audio("/sounds/Woodblock.mp3");
		const cowbell = new Audio("/sounds/Cowbell.mp3");
		const sidestick = new Audio("/sounds/Click.wav");
		setSounds({ woodblock, cowbell, sidestick });
	}, []);

	useEffect(() => {
		setDisplayedBpm(bpm);
	}, [bpm]);

	useEffect(() => {
		if (gameStarted && withMetronome) {
			setPlay(true);
		}
		if (!gameStarted || !withMetronome) {
			setPlay(false);
		}
	}, [gameStarted]);

	const playSound = useCallback(() => {
		if (soundEffect === "cowbell") {
			sounds?.cowbell?.play();
		} else if (sounds && soundEffect === "woodblock") {
			sounds?.woodblock?.play();
		} else {
			sounds?.sidestick?.play();
		}
	}, [soundEffect, sounds]);

	// Sound and Visual:
	const trigger = useCallback(() => {
		if (play) {
			setLastTickTime(performance.now());
			playSound();
		} else {
			return;
		}
	}, [play, playSound]);

	// Tempo setter:
	useEffect(() => {
		if (play && tempoInterval) {
			playSound();
			const intervalId = setInterval(() => {
				trigger();
			}, tempoInterval);
			return () => {
				clearInterval(intervalId);
			};
		}
	}, [play, tempoInterval, soundEffect, trigger]);

	// Prevent out of bound tempo setting
	useEffect(() => {
		setTempoInterval((60 / bpm) * 1000);
		if (bpm <= MIN_TEMPO_AS_NUM) {
			setBpm(MIN_TEMPO_AS_NUM);
		}
		if (bpm >= MAX_TEMPO_AS_NUM) {
			setBpm(MAX_TEMPO_AS_NUM);
		}
	}, [bpm]);

	return (
		<div className="w-full flex flex-col gap-2">
			<div className="flex w-full flex-col font-bold">
				<span className="flex justify-center gap-1 w-full">
					<div className="w-full flex items-center justify-between bg-teal-900 p-1 rounded-sm">
						<button className="ui_btn" onClick={() => setBpm(bpm - 1)}>
							<Minus />
						</button>
						{displayedBpm} bpm
						<button className="ui_btn" onClick={() => setBpm(bpm + 1)}>
							<Plus />
						</button>
					</div>
					{controls && setPlay && (
						<button className="ui_btn" onClick={() => setPlay(!play)}>
							{!play ? <Play /> : <Pause />}
						</button>
					)}
				</span>
				<div className="controls flex gap-1 w-full">
					<input
						className="w-full"
						type="range"
						min={MIN_TEMPO_AS_STR}
						max={MAX_TEMPO_AS_STR}
						value={displayedBpm}
						onChange={(e) => {
							const val = e.target.valueAsNumber;
							setDisplayedBpm(val);
							setBpm(val);
						}}
					/>
				</div>
			</div>
			<HorizontalPulseVisualisation
				lastTickTime={lastTickTime}
				play={play}
				tempoInterval={tempoInterval}
				gameStarted={gameStarted}
			/>
		</div>
	);
};

export default MetroWidget;
