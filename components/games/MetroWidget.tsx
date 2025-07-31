import React, { useCallback, useEffect, useState } from "react";
import AnimatedNumber from "./AnimatedNumber";

type MetroWidgetPropsType = {
	tempo: number;
	setTempo: (val: number) => void;
};

const MetroWidget = (props: MetroWidgetPropsType) => {
	const { tempo, setTempo } = props;

	const [tempoInterval, setTempoInterval] = useState<number | undefined>();
	const [soundEffect, setSoundEffect] = useState<any>();
	const [sounds, setSounds] = useState<any>();
	const [play, setPlay] = useState<boolean>();
	const [bpm, setBpm] = useState<number>(80);
	const [displayedBpm, setDisplayedBpm] = useState<number>(0);
	const [pulse, setPulse] = useState<boolean>(false);

	const [debouncedBpm, setDebouncedBpm] = useState<number>(bpm);

	useEffect(() => {
		const woodblock = new Audio("sounds/Woodblock.mp3");
		const cowbell = new Audio("sounds/Cowbell.mp3");
		const sidestick = new Audio("sounds/Click.wav");
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
			playSound();
		} else {
			return;
		}
	}, [play, playSound]);

	const startClick = () => {
		setPlay(!play);
	};

	// Tempo setter:
	useEffect(() => {
		if (play && tempoInterval) {
			const intervalId = setInterval(() => {
				trigger();
				// setPulse(true);
				// setTimeout(() => {
				// 	setPulse(false);
				// }, tempoInterval - tempoInterval * 0.1);
			}, tempoInterval);
			return () => {
				clearInterval(intervalId);
			};
		}
	}, [play, tempoInterval, soundEffect, trigger]);

	useEffect(() => {
		setTempoInterval((60 / bpm) * 1000);
		if (bpm <= 40) {
			setBpm(40);
		}
		if (bpm >= 220) {
			setBpm(220);
		}
		const intervalId = setTimeout(() => {
			setDebouncedBpm(bpm);
		}, 500);
		return () => {
			clearTimeout(intervalId);
		};
	}, [bpm]);

	const increment = () => {
		setBpm(Number(bpm) + 1);
	};
	const decrement = () => {
		setBpm(Number(bpm) - 1);
	};

	return (
		<div className="w-full h-full">
			<div className="scoreboard">{displayedBpm}</div>
			<input
				className="w-full"
				type="range"
				min="30"
				max="220"
				onChange={(e) => setDisplayedBpm(e.target.valueAsNumber)}
				onMouseUp={() => setBpm(displayedBpm)}
			/>
		</div>
	);
};

export default MetroWidget;
