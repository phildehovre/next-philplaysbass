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
	MIN_VOLUME_DB,
} from "./GameConstants";

type PitchyComponentProps = {
	onNoteDetection: (notes: NoteInfo) => void;
	showDevices?: boolean;
	cooldown?: number;
};

export default function PitchyWithDeviceSelect(props: PitchyComponentProps) {
	const { onNoteDetection, showDevices, cooldown } = props;
	const [devices, setDevices] = useState<MediaDeviceInfo[]>([]);
	const [selectedDeviceId, setSelectedDeviceId] = useState<string | null>(null);
	const [pitch, setPitch] = useState<number | null>(null);
	const [clarity, setClarity] = useState<number | null>(null);

	const audioContextRef = useRef<AudioContext | null>(null);
	const analyserRef = useRef<AnalyserNode | null>(null);
	const detectorRef = useRef<any>(null);
	const inputArrayRef = useRef<Float32Array | null>(null);
	const streamRef = useRef<MediaStream | null>(null);
	const timeoutRef = useRef<number>(null);

	const { setCookie, getCookie } = useCookies();

	useEffect(() => {
		if (!selectedDeviceId) {
			const deviceId = getCookie("device-id");
			if (deviceId) {
				setSelectedDeviceId(deviceId);
			}
		}
	}, []);
	useEffect(() => {
		if (selectedDeviceId) {
			setCookie("device-id", selectedDeviceId);
		}
	}, [selectedDeviceId]);

	useEffect(() => {
		(async () => {
			try {
				const inputs = await getAudioInputs();
				if (inputs) {
					setDevices(inputs);
				}
			} catch (err) {
				console.log(err);
			}
		})();
	}, []);

	const getAudioInputs = async () => {
		try {
			// Ask for permission first
			await navigator.mediaDevices.getUserMedia({ audio: true });

			// Then enumerate devices
			const devices = await navigator.mediaDevices.enumerateDevices();
			const inputs = devices.filter((d) => d.kind === "audioinput");
			return inputs;
		} catch (err) {
			console.error("Error accessing audio devices:", err);
		}
	};

	const COOLDOWN_MS = cooldown;

	const cooldownRef = useRef(false);
	const timeoutIdRef = useRef<number | null>(null);
	const stableNoteRef = useRef<{ pitch: number; count: number } | null>(null);
	const STABILITY_THRESHOLD = 2;

	useEffect(() => {
		if (!pitch) {
			return;
		}

		// if (cooldownRef.current) {
		// 	// Still cooling down, ignore new pitches
		// 	return;
		// }

		// Process pitch immediately
		const evaluatedPitch = getNoteFromPitch(pitch);
		onNoteDetection(evaluatedPitch);

		// Set timeout to reset cooldown
		// timeoutIdRef.current = window.setTimeout(() => {
		// 	cooldownRef.current = false;
		// 	timeoutIdRef.current = null;
		// }, COOLDOWN_MS);

		// Cleanup timeout only on unmount
		// return () => {
		// 	if (timeoutIdRef.current !== null) {
		// 		clearTimeout(timeoutIdRef.current);
		// 		timeoutIdRef.current = null;
		// 	}
		// };
	}, [pitch]);

	// Initialize pitch detection when a device is selected
	useEffect(() => {
		if (!selectedDeviceId) return;

		const startDetection = async () => {
			// Stop old stream if needed
			if (streamRef.current) {
				streamRef.current.getTracks().forEach((track) => track.stop());
			}
			if (audioContextRef.current) {
				audioContextRef.current.close();
			}

			const stream = await navigator.mediaDevices.getUserMedia({
				audio: { deviceId: { exact: selectedDeviceId } },
			});

			const audioContext = new AudioContext();
			const analyser = audioContext.createAnalyser();
			analyser.fftSize = 2048;

			const source = audioContext.createMediaStreamSource(stream);
			source.connect(analyser);

			const detector = PitchDetector.forFloat32Array(analyser.fftSize);
			detector.minVolumeDecibels = MIN_VOLUME_DB;
			const input = new Float32Array(
				new ArrayBuffer(detector.inputLength * Float32Array.BYTES_PER_ELEMENT)
			) as Float32Array & { buffer: ArrayBuffer };

			audioContextRef.current = audioContext;
			analyserRef.current = analyser;
			detectorRef.current = detector;
			inputArrayRef.current = input;
			streamRef.current = stream;

			const update = () => {
				if (
					!analyserRef.current ||
					!detectorRef.current ||
					!inputArrayRef.current
				)
					return;

				// @ts-ignore
				analyserRef.current.getFloatTimeDomainData(inputArrayRef.current);
				const [detectedPitch, detectedClarity] = detectorRef.current.findPitch(
					inputArrayRef.current,
					audioContext.sampleRate
				);

				if (
					detectedPitch > MIN_PITCH_HZ &&
					detectedPitch < MAX_PITCH_HZ &&
					detectedClarity > MIN_CLARITY
				) {
					const prev = stableNoteRef.current;
					if (prev && Math.abs(prev.pitch - detectedPitch) < 1) {
						stableNoteRef.current = {
							pitch: detectedPitch,
							count: prev.count + 1,
						};
					} else {
						stableNoteRef.current = { pitch: detectedPitch, count: 1 };
					}

					if (stableNoteRef.current.count >= STABILITY_THRESHOLD) {
						setPitch(detectedPitch);
						setClarity(detectedClarity);
					}
				} else {
					stableNoteRef.current = null;
					setPitch(null);
					setClarity(null);
				}

				timeoutRef.current = window.setTimeout(update, COOLDOWN_MS);
			};

			update();
		};

		startDetection();

		return () => {
			if (timeoutRef.current) clearTimeout(timeoutRef.current);
			if (streamRef.current) {
				streamRef.current.getTracks().forEach((track) => track.stop());
			}
			if (audioContextRef.current) {
				audioContextRef.current.close();
			}
		};
	}, [selectedDeviceId]);

	return (
		<div className="p-4 space-y-4">
			<div className="flex flex-col">
				{showDevices && (
					<>
						<label htmlFor="device" className="mr-2 font-semibold">
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
					</>
				)}
			</div>
		</div>
	);
}
