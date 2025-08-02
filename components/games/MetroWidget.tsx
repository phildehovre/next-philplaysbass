import React, { useCallback, useEffect, useState } from "react";
import PulseVisualisation from "./PulseVisualisation";
import {
	MAX_TEMPO_AS_NUM,
	MAX_TEMPO_AS_STR,
	MIN_TEMPO_AS_NUM,
	MIN_TEMPO_AS_STR,
} from "./GameConstants";

type MetroWidgetPropsType = {
	bpm: number;
	setBpm: (val: number) => void;
	play: boolean;
	gameStarted: boolean;
	lastTickTime: number | null;
	setLastTickTime: (t: number) => void;
};

const MetroWidget = (props: MetroWidgetPropsType) => {
	const { bpm, setBpm, play, gameStarted, lastTickTime, setLastTickTime } =
		props;

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
		<div className="w-full h-full">
			<div className="scoreboard">{displayedBpm}</div>
			<div className="controls flex gap-1">
				<input
					className="w-full"
					type="range"
					min={MIN_TEMPO_AS_STR}
					max={MAX_TEMPO_AS_STR}
					onChange={(e) => setDisplayedBpm(e.target.valueAsNumber)}
					onMouseUp={() => setBpm(displayedBpm)}
				/>
			</div>
			<PulseVisualisation
				lastTickTime={lastTickTime}
				play={play}
				tempoInterval={tempoInterval}
				gameStarted={gameStarted}
			/>
			{/* <PitchyComponent showDevices={false} onNoteDetection={onNoteDetection} /> */}
		</div>
	);
};

export default MetroWidget;
