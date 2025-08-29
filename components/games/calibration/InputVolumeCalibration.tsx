"use client";
import React, { useState } from "react";
import PitchyWithDeviceSelect from "../PitchyComponent";
import { NoteInfo } from "@/types/types";
import { MicIcon } from "lucide-react";

const PULSE_DURATION = 1200;

const InputVolumeCalibration = (props: {
	onReady: (setting: string, value: any) => void;
}) => {
	const { onReady } = props;

	const [playedNote, setPlayedNote] = useState<NoteInfo>();
	const [ripples, setRipples] = useState<{ id: number; volume: number }[]>([]);

	const onNoteDetection = (note: NoteInfo) => {
		setPlayedNote(note);

		console.log(note);
		const id = Date.now();
		const volume = note.volume ?? 1; // assuming your NoteInfo has volume (0–1 or 0–100)

		setRipples((prev) => [...prev, { id, volume }]);

		setTimeout(() => {
			setRipples((prev) => prev.filter((r) => r.id !== id));
		}, PULSE_DURATION);
	};

	return (
		<div className="flex flex-col gap-2 min-h-[350px]">
			<h1 className="font-bold text-2xl">Select audio input sources:</h1>
			<PitchyWithDeviceSelect
				onNoteDetection={onNoteDetection}
				showDevices={true}
			/>

			<div className="detection_visualisation relative">
				{/* render all active ripples */}
				{ripples.map((r) => (
					<div key={r.id} className="pulse-ripple absolute inset-0" />
				))}

				<div className="mic_btn relative z-10">
					<MicIcon />
				</div>
			</div>
		</div>
	);
};

export default InputVolumeCalibration;
