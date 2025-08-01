import React, { useCallback, useEffect, useState } from "react";
import PitchyComponent from "./PitchyComponent";
import { NoteInfo } from "@/types/types";
import { MinusCircle, PlusCircle } from "lucide-react";

type MetroWidgetPropsType = {
	bpm: number;
	setBpm: (val: number) => void;
	play: boolean;
};

const MetroWidget = (props: MetroWidgetPropsType) => {
	const { bpm, setBpm, play } = props;

	const [tempoInterval, setTempoInterval] = useState<number | undefined>();
	const [soundEffect, setSoundEffect] = useState<any>("sidestick");
	const [sounds, setSounds] = useState<any>();
	const [displayedBpm, setDisplayedBpm] = useState<number>(bpm);
	const [timingStatus, setTimingStatus] = useState<
		"on-time" | "late" | "early" | null
	>(null);
	const [lastTickTime, setLastTickTime] = useState<number | null>(null);

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
		if (bpm <= 40) {
			setBpm(40);
		}
		if (bpm >= 220) {
			setBpm(220);
		}
	}, [bpm]);

	const TOLERANCE = 40; // in ms

	const onNoteDetection = (note: NoteInfo) => {
		const noteTime = performance.now() - 236;

		if (lastTickTime && tempoInterval) {
			const diff = noteTime - lastTickTime;

			// Use modulo to handle notes slightly after or before the beat
			const timeFromBeat = diff % tempoInterval;
			const msFromClick =
				timeFromBeat > tempoInterval / 2
					? timeFromBeat - tempoInterval // negative offset (early)
					: timeFromBeat; // positive offset (late)

			if (Math.abs(msFromClick) <= TOLERANCE) {
				setTimingStatus("on-time");
			} else if (msFromClick < 0) {
				setTimingStatus("early");
			} else {
				setTimingStatus("late");
			}

			console.log(
				`Note played ${msFromClick.toFixed(
					1
				)}ms from the click — ${timingStatus}`
			);
		}
	};

	return (
		<div className="w-full h-full">
			<div className="scoreboard">{displayedBpm}</div>
			<div className="controls flex gap-1">
				{/* <button onClick={decrement}>
					<MinusCircle />
				</button> */}
				<input
					className="w-full"
					type="range"
					min="30"
					max="220"
					onChange={(e) => setDisplayedBpm(e.target.valueAsNumber)}
					onMouseUp={() => setBpm(displayedBpm)}
				/>
				{/* <button onClick={increment}>
					<PlusCircle />
				</button> */}
			</div>
			<div className="scoreboard">{timingStatus || "..."}</div>
			<PitchyComponent showDevices={false} onNoteDetection={onNoteDetection} />
		</div>
	);
};

export default MetroWidget;
