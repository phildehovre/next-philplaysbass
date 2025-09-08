"use client";
import React, { useState } from "react";
import PitchyWithDeviceSelect from "../PitchyComponent";
import { NoteInfo } from "@/types/types";
import { Check, ChevronRight, MicIcon } from "lucide-react";
import VolumeVisualizer from "../ui/VolumeVisualiser";
import PitchyStream from "@/components/PitchyStream";
import { CalibrationPhaseProps } from "./ModalCalibration";

const PULSE_DURATION = 1200;

const InputVolumeCalibration: React.FC<CalibrationPhaseProps> = ({
	onReady,
}) => {
	const [playedNote, setPlayedNote] = useState<NoteInfo>();
	const [ripples, setRipples] = useState<{ id: number; volume: number }[]>([]);
	const [volume, setVolume] = useState<number>(0);
	const [detectedUserInput, setDetectedUserinput] = useState<boolean>(false);
	const [deviceId, setDeviceId] = useState<string>("");

	const onNoteDetection = (note: NoteInfo) => {
		setPlayedNote(note);
		if (note.noteName && note.volume > 0.04) setDetectedUserinput(true);

		const id = Date.now();
		const volume = note.volume ?? 1; // assuming your NoteInfo has volume (0–1 or 0–100)

		setRipples((prev) => [...prev, { id, volume }]);

		setTimeout(() => {
			setRipples((prev) => prev.filter((r) => r.id !== id));
		}, PULSE_DURATION);
	};

	return (
		<div className="flex flex-col gap-2 min-h-[350px] items-center justify-center ">
			<h1 className="font-bold text-2xl">Select audio input source:</h1>
			<PitchyWithDeviceSelect
				onNoteDetection={onNoteDetection}
				showDevices={true}
				deviceIdHandle={setDeviceId}
			/>
			<PitchyStream
				showDevices={false}
				onNoteDetection={(note: NoteInfo) => setVolume(note.volume)}
			/>

			{detectedUserInput && (
				<p className="flex text-sm text-cyan-300">
					Sound was detected, you're good to go! <Check />
				</p>
			)}
			<div className="volume-visualiser_ctn">
				{ripples.map((r) => (
					<div key={r.id} className="pulse-ripple absolute inset-0" />
				))}
				<VolumeVisualizer volume={volume} />
			</div>
			<button
				onClick={() => onReady("defaultInputDeviceId", deviceId)}
				className={`ui_btn ${detectedUserInput ? "" : "disabled"}`}
				disabled={!detectedUserInput}
			>
				Next
				<ChevronRight size={12} />
			</button>
		</div>
	);
};

export default InputVolumeCalibration;
