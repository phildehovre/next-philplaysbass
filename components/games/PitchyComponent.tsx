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
} from "../../constants/GameConstants";

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

	const audioContextRef = useRef<AudioContext | null>(null);
	const analyserRef = useRef<AnalyserNode | null>(null);
	const detectorRef = useRef<any>(null);
	const inputArrayRef = useRef<Float32Array | null>(null);
	const streamRef = useRef<MediaStream | null>(null);
	const timeoutRef = useRef<number>(null);

	const stableNoteRef = useRef<{ pitch: number; count: number } | null>(null);
	const historyRef = useRef<{ pitch: number; rms: number; t: number }[]>([]);
	const lastDetectionTime = useRef<number>(0);

	// Detection tuning constants
	const RMS_WINDOW = 15; // for baseline
	const REFRACTORY_MS = 200; // cooldown after detection
	const STABILITY_THRESHOLD = 2; // was 4
	const RMS_SPIKE_FACTOR = 1.5; // was 1.8
	const MIN_RMS_ABS = 0.01; // was 0.02
	const TRANSIENT_FACTOR = 1.15; // was 1.3

	const { setCookie, getCookie } = useCookies();
	const COOLDOWN_MS = cooldown;

	useEffect(() => {
		if (!selectedDeviceId) {
			const deviceId = getCookie("device-id");
			if (deviceId) setSelectedDeviceId(deviceId);
		}
	}, []);

	useEffect(() => {
		if (selectedDeviceId) setCookie("device-id", selectedDeviceId);
	}, [selectedDeviceId]);

	useEffect(() => {
		(async () => {
			try {
				const inputs = await getAudioInputs();
				if (inputs) setDevices(inputs);
			} catch (err) {
				console.log(err);
			}
		})();
	}, []);

	const getAudioInputs = async () => {
		try {
			await navigator.mediaDevices.getUserMedia({ audio: true });
			const devices = await navigator.mediaDevices.enumerateDevices();
			return devices.filter((d) => d.kind === "audioinput");
		} catch (err) {
			console.error("Error accessing audio devices:", err);
		}
	};

	useEffect(() => {
		if (!pitch) return;
		const evaluatedPitch = getNoteFromPitch(pitch);
		onNoteDetection(evaluatedPitch);
	}, [pitch]);

	useEffect(() => {
		if (!selectedDeviceId) return;

		const startDetection = async () => {
			if (timeoutRef.current) clearTimeout(timeoutRef.current);

			if (streamRef.current) {
				streamRef.current.getTracks().forEach((t) => t.stop());
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
				)
					return;

				// @ts-ignore
				analyserRef.current.getFloatTimeDomainData(inputArrayRef.current);

				const [detectedPitch, detectedClarity] = detectorRef.current.findPitch(
					inputArrayRef.current,
					audioContextRef.current!.sampleRate
				);

				const rms = getRMS(inputArrayRef.current);
				const now = performance.now();

				// update RMS history
				historyRef.current.push({ pitch: detectedPitch, rms, t: now });
				if (historyRef.current.length > RMS_WINDOW) historyRef.current.shift();

				const avgRMS =
					historyRef.current.reduce((a, b) => a + b.rms, 0) /
					historyRef.current.length;
				const lastRMS = historyRef.current.length
					? historyRef.current[historyRef.current.length - 1].rms
					: 0;

				const isSpike = rms > avgRMS * RMS_SPIKE_FACTOR && rms > MIN_RMS_ABS;
				const isTransient = rms > lastRMS * TRANSIENT_FACTOR;

				// stability tracking
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
				} else {
					stableNoteRef.current = null;
				}

				if (
					stableNoteRef.current &&
					stableNoteRef.current.count >= STABILITY_THRESHOLD &&
					isSpike &&
					!isTransient &&
					now - lastDetectionTime.current > REFRACTORY_MS
				) {
					setPitch(stableNoteRef.current.pitch);
					// console.log(
					// 	"✅ Passing all gates, emitting note:",
					// 	stableNoteRef.current
					// );
					historyRef.current = [];
					lastDetectionTime.current = now;
				}

				timeoutRef.current = window.setTimeout(update, COOLDOWN_MS);
			};

			update();
		};

		startDetection();

		return () => {
			if (timeoutRef.current) clearTimeout(timeoutRef.current);
			if (streamRef.current)
				streamRef.current.getTracks().forEach((t) => t.stop());
			if (audioContextRef.current) audioContextRef.current.close();
		};
	}, [selectedDeviceId]);

	return (
		<div className="p-4 space-y-4">
			{showDevices && (
				<div className="flex flex-col">
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
				</div>
			)}
		</div>
	);
}
