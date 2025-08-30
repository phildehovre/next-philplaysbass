"use client";

import React, { useEffect, useRef, useState } from "react";

export default function VolumeVisualizer({ volume }: { volume: number }) {
	const [level, setLevel] = useState(0); // current displayed level (0–1)
	const velocity = useRef(0); // like momentum
	const animationRef = useRef<number>(null);

	useEffect(() => {
		// "kick" it upwards when new volume is higher
		if (volume > level) {
			setLevel(volume);
			velocity.current = 0; // reset downward speed
		}
	}, [volume]);

	useEffect(() => {
		const gravity = -0.0015; // acceleration per frame
		const frame = (time: number) => {
			velocity.current += gravity; // pull down
			setLevel((prev) => {
				let next = prev + velocity.current;
				if (next < 0) {
					next = 0;
					velocity.current = 0;
				}
				return next;
			});
			animationRef.current = requestAnimationFrame(frame);
		};
		animationRef.current = requestAnimationFrame(frame);
		return () => cancelAnimationFrame(animationRef.current!);
	}, []);

	return (
		<div className="detection_visualisation relative w-[150px] h-[150px] bg-black overflow-hidden">
			<div
				className="volume_visualisation absolute bottom-0 left-0 w-full bg-white"
				style={{
					height: `${level * 100 * 4}%`,
				}}
			/>
			<div className="mic_btn absolute inset-0 flex justify-center items-center mix-blend-lighten">
				<svg
					className="text-white"
					width={50}
					height={50}
					viewBox="0 0 24 24"
					fill="currentColor"
				>
					<path d="M12 14a3 3 0 0 0 3-3V5a3 3 0 1 0-6 0v6a3 3 0 0 0 3 3zm5-3a5 5 0 0 1-10 0H5a7 7 0 0 0 14 0h-2zM11 19h2v4h-2v-4z" />
				</svg>
			</div>
		</div>
	);
}
