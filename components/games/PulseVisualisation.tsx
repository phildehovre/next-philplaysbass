import React, { useEffect, useRef, useState } from "react";
import PitchyComponent from "./PitchyComponent";
import { NoteInfo } from "@/types/types";

const PulseVisualisation = ({
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
	const [msOffset, setMsOffset] = useState<number>();
	const [showMarker, setShowMarker] = useState<boolean>(false);
	const lastDetectionTimeRef = useRef<number>(0);

	const cooldown = tempoInterval;

	useEffect(() => {
		if (!gameStarted || !play || !tempoInterval) return;

		const interval = setInterval(() => {
			setPulse(true);

			// force re-render of animated line
			setAnimationKey((prev) => prev + 1);

			// hide center blip after short time
			setTimeout(() => setPulse(false), tempoInterval * 0.8);
		}, tempoInterval);

		return () => clearInterval(interval);
	}, [play, tempoInterval, gameStarted]);

	useEffect(() => {
		if (msOffset === null) return;
		setShowMarker(true);
		// bar disappears after 300ms
		const timer = setTimeout(() => setShowMarker(false), 300);
		return () => clearTimeout(timer);
	}, [msOffset]);

	const onNoteDetection = (note: NoteInfo) => {
		const now = performance.now();

		if (!cooldown || now - lastDetectionTimeRef.current < cooldown) return;

		lastDetectionTimeRef.current = now;

		const noteTime = now - 236;

		if (lastTickTime && tempoInterval) {
			const diff = noteTime - lastTickTime;

			const timeFromBeat = diff % tempoInterval;
			const msFromClick =
				timeFromBeat > tempoInterval / 2
					? timeFromBeat - tempoInterval
					: timeFromBeat;

			setMsOffset(msFromClick);
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
					showMarker &&
					typeof msOffset === "number" &&
					tempoInterval && (
						<div
							key={`offset-marker-${animationKey}`}
							className="msoffset_marker absolute top-0 h-full w-[1px] bg-red-500"
							style={{
								left: `calc(50% + ${(msOffset / tempoInterval) * 50}%)`,
								transform: "translateX(-50%)",
								animation: `fadeOut ${tempoInterval}ms ease-out forwards`,
							}}
						/>
					)}
				<div className="centerline  bg-white w-[2px] absolute left-1/2 transform -translate-x-1/2"></div>
			</div>
			<PitchyComponent showDevices={false} onNoteDetection={onNoteDetection} />
		</div>
	);
};

export default PulseVisualisation;
