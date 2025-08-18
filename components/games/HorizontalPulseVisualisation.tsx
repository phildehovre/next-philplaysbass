import React, { useEffect, useRef, useState } from "react";
import PitchyComponent from "./PitchyComponent";
import { NoteInfo } from "@/types/types";
import { MS_LATENCY_OFFSET } from "./GameConstants";

const HorizontalPulseVisualisation = ({
	play,
	tempoInterval,
	lastTickTime,
	gameStarted,
}: {
	play: boolean;
	tempoInterval: number | undefined;
	lastTickTime: number | null;
	gameStarted: boolean;
}) => {
	const [pulse, setPulse] = useState(false);
	const [animationKey, setAnimationKey] = useState(0);
	const [markers, setMarkers] = useState<{ id: number; msOffset: number }[]>(
		[]
	);

	const [showMarker, setShowMarker] = useState<boolean>(false);
	const lastDetectionTimeRef = useRef<number>(0);

	const cooldown = tempoInterval;

	useEffect(() => {
		if (!gameStarted || !play || !tempoInterval) return;

		const interval = setInterval(() => {
			setPulse(true);

			// force re-render of animated line
			setAnimationKey((prev) => prev + 1);

			// Timer to hide center blip
			setTimeout(() => setPulse(false), tempoInterval * 0.8);
		}, tempoInterval);

		return () => clearInterval(interval);
	}, [play, tempoInterval, gameStarted]);

	const onNoteDetection = (note: NoteInfo) => {
		const now = performance.now();

		if (!cooldown || now - lastDetectionTimeRef.current < cooldown) return;
		lastDetectionTimeRef.current = now;

		const noteTime = now - MS_LATENCY_OFFSET;

		if (lastTickTime && tempoInterval) {
			const diff = noteTime - lastTickTime;

			const timeFromBeat = diff % tempoInterval;
			const msFromClick =
				timeFromBeat > tempoInterval / 2
					? timeFromBeat - tempoInterval
					: timeFromBeat;

			const id = now;

			setMarkers((prev) => [...prev, { id, msOffset: msFromClick }]);

			setTimeout(() => {
				setMarkers((prev) => prev.filter((marker) => marker.id !== id));
			}, 400);
		}
	};

	return (
		<div>
			<div className="scoreboard flex justify-center h-5 p-0 relative overflow-hidden">
				{pulse && <div className={`center-blip`} />}
				{gameStarted && tempoInterval && (
					<>
						<div
							key={`barA-${animationKey}`}
							className="pulse-bar"
							style={{
								left: "50%",
								animation: `moveRight ${tempoInterval}ms linear`,
							}}
						/>
						<div
							key={`barB-${animationKey}`}
							className="pulse-bar"
							style={{
								left: "0%",
								animation: `moveCenter ${tempoInterval}ms linear`,
							}}
						/>
					</>
				)}
				{gameStarted &&
					tempoInterval &&
					markers.map((marker) => (
						<div
							key={marker.id}
							className="msoffset_marker absolute top-0 h-full w-[1px] bg-red-500"
							style={{
								left: `calc(50% + ${(marker.msOffset / tempoInterval) * 50}%)`,
								transform: "translateX(-50%)",
								animation: `fadeOut ${tempoInterval}ms ease-out forwards`,
							}}
						/>
					))}

				<div className="centerline  bg-white w-[2px] absolute left-1/2 transform -translate-x-1/2"></div>
			</div>
			<PitchyComponent showDevices={false} onNoteDetection={onNoteDetection} />
		</div>
	);
};

export default HorizontalPulseVisualisation;
