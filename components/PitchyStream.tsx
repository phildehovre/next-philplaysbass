"use client";

import React, { useEffect, useRef, useState } from "react";
import { PitchDetector } from "pitchy";
import { getNoteFromPitch } from "@/lib/utils/gameUtils";
import { NoteInfo } from "@/types/types";
import useCookies from "@/hooks/useCookies";
import {
	MAX_PITCH_HZ,
	MIN_CLARITY,
	MIN_PITCH_HZ,
} from "@/constants/gameConfigConstants";

type PitchyStreamProps = {
	onNoteDetection: (note: NoteInfo) => void;
	showDevices?: boolean;
	threshold: number; // base RMS threshold
};

export default function PitchyStream(props: PitchyStreamProps) {
	const { onNoteDetection, threshold, showDevices } = props;

	const [devices, setDevices] = useState<MediaDeviceInfo[]>([]);
	const [selectedDeviceId, setSelectedDeviceId] = useState<string | null>(null);

	const audioContextRef = useRef<AudioContext | null>(null);
	const analyserRef = useRef<AnalyserNode | null>(null);
	const detectorRef = useRef<any>(null);
	const inputArrayRef = useRef<Float32Array | null>(null);
	const streamRef = useRef<MediaStream | null>(null);
	const rafRef = useRef<number | null>(null);

	const { setCookie, getCookie } = useCookies();

	// threshold lock state
	const [thresholdDisabled, setThresholdDisabled] = useState(false);
	const resetTimerRef = useRef<NodeJS.Timeout | null>(null);

	// Restore deviceId from cookies
	useEffect(() => {
		if (!selectedDeviceId) {
			const deviceId = getCookie("device-id");
			if (deviceId) setSelectedDeviceId(deviceId);
		}
	}, []);

	// Save deviceId to cookies
	useEffect(() => {
		if (selectedDeviceId) setCookie("device-id", selectedDeviceId);
	}, [selectedDeviceId]);

	// Load available audio devices
	useEffect(() => {
		(async () => {
			try {
				await navigator.mediaDevices.getUserMedia({ audio: true });
				const devices = await navigator.mediaDevices.enumerateDevices();
				setDevices(devices.filter((d) => d.kind === "audioinput"));
			} catch (err) {
				console.error("Error accessing audio devices:", err);
			}
		})();
	}, []);

	useEffect(() => {
		if (!selectedDeviceId) return;

		const startDetection = async () => {
			if (streamRef.current) {
				streamRef.current.getTracks().forEach((t) => t.stop());
			}
			if (audioContextRef.current) {
				audioContextRef.current.close();
			}
			if (rafRef.current) cancelAnimationFrame(rafRef.current);

			const stream = await navigator.mediaDevices.getUserMedia({
				audio: { deviceId: { exact: selectedDeviceId } },
			});

			const audioContext = new AudioContext();
			const analyser = audioContext.createAnalyser();
			analyser.fftSize = 2048;

			const source = audioContext.createMediaStreamSource(stream);
			source.connect(analyser);

			const detector = PitchDetector.forFloat32Array(analyser.fftSize);
			const input = new Float32Array(detector.inputLength);

			audioContextRef.current = audioContext;
			analyserRef.current = analyser;
			detectorRef.current = detector;
			inputArrayRef.current = input;
			streamRef.current = stream;

			const getRMS = (buffer: Float32Array) => {
				let sum = 0;
				for (let i = 0; i < buffer.length; i++) sum += buffer[i] * buffer[i];
				return Math.sqrt(sum / buffer.length);
			};

			const update = () => {
				if (
					!analyserRef.current ||
					!detectorRef.current ||
					!inputArrayRef.current
				) {
					return;
				}

				// @ts-ignore
				analyserRef.current.getFloatTimeDomainData(inputArrayRef.current);

				const [detectedPitch, clarity] = detectorRef.current.findPitch(
					inputArrayRef.current,
					audioContextRef.current!.sampleRate
				);

				const rms = getRMS(inputArrayRef.current);

				if (
					detectedPitch > MIN_PITCH_HZ &&
					detectedPitch < MAX_PITCH_HZ &&
					clarity > MIN_CLARITY
				) {
					// apply threshold only if it's active
					if (!thresholdDisabled && rms < threshold) {
						rafRef.current = requestAnimationFrame(update);
						return;
					}

					const note = getNoteFromPitch(detectedPitch);
					onNoteDetection({ ...note, volume: rms });

					// once a valid note passes → disable threshold temporarily
					if (!thresholdDisabled) {
						setThresholdDisabled(true);
					}

					// reset the threshold after 6s
					if (resetTimerRef.current) clearTimeout(resetTimerRef.current);
					resetTimerRef.current = setTimeout(() => {
						setThresholdDisabled(false);
					}, 6000);
				}

				rafRef.current = requestAnimationFrame(update);
			};

			update();
		};

		startDetection();

		return () => {
			if (rafRef.current) cancelAnimationFrame(rafRef.current);
			if (streamRef.current)
				streamRef.current.getTracks().forEach((t) => t.stop());
			if (audioContextRef.current) audioContextRef.current.close();
			if (resetTimerRef.current) clearTimeout(resetTimerRef.current);
		};
	}, [selectedDeviceId, threshold]);

	return (
		<div className="space-y-4">
			{showDevices && (
				<div className="flex flex-col">
					<label htmlFor="device" className="mr-2 font-regular">
						Input device:
					</label>
					<select
						id="device"
						value={selectedDeviceId ?? ""}
						onChange={(e) => setSelectedDeviceId(e.target.value)}
						className="border px-2 py-1 rounded"
					>
						{devices.map((device) => (
							<option key={device.deviceId} value={device.deviceId}>
								{device.label || `Input ${device.deviceId.slice(0, 5)}`}
							</option>
						))}
					</select>
				</div>
			)}
		</div>
	);
}
