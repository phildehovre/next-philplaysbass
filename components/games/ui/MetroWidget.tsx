"use client";
import React, { useCallback, useEffect, useState } from "react";
import {
	MAX_TEMPO_AS_NUM,
	MAX_TEMPO_AS_STR,
	MIN_TEMPO_AS_NUM,
	MIN_TEMPO_AS_STR,
} from "../../../constants/GameConstants";
import HorizontalPulseVisualisation from "./HorizontalPulseVisualisation";
import { Pause, Play } from "lucide-react";

type MetroWidgetPropsType = {
	bpm: number;
	setBpm: (val: number) => void;
	play: boolean;
	gameStarted: boolean;
	lastTickTime: number | null;
	setLastTickTime: (t: number) => void;
	controls?: boolean;
	setPlay?: React.Dispatch<React.SetStateAction<boolean>>;
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

	// useEffect(() => {
	// 	const handleKeyDown = (e: KeyboardEvent) => {
	// 		if (e.code === "Space" && setPlay) {
	// 			e.preventDefault();
	// 			setPlay((prev: boolean) => !prev);
	// 		}
	// 	};

	// 	document.addEventListener("keydown", handleKeyDown);

	// 	return () => {
	// 		document.removeEventListener("keydown", handleKeyDown); // cleanup
	// 	};
	// }, [setPlay]); // dependency: setPlay is stable, so this won't cause reruns

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
		<div className="w-full h-full flex flex-col gap-2">
			<div className="flex flex-col items-stretch font-bold">
				<span className="flex justify-center gap-1">
					<div className="scoreboard w-full">{displayedBpm} bpm</div>
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
						defaultValue={bpm}
						onChange={(e) => setDisplayedBpm(e.target.valueAsNumber)}
						onMouseUp={() => setBpm(displayedBpm)}
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
