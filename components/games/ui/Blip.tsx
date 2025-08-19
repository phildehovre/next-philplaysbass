"use client";
import React, { useEffect, useState } from "react";
import "./Blip.css";

type BlipProps = {
	bpm: number;
};

export default function Blip({ bpm }: BlipProps) {
	const [blipKey, setBlipKey] = useState(0);
	const [visible, setVisible] = useState(false);

	useEffect(() => {
		// interval duration = one beat
		const interval = (60 / bpm) * 1000;

		const tick = () => {
			setBlipKey((k) => k + 1); // force new render each beat
			setVisible(true);
			setTimeout(() => setVisible(false), interval * 0.4); // fade out before next beat
		};

		tick(); // fire immediately
		const timer = setInterval(tick, interval);

		return () => clearInterval(timer);
	}, [bpm]);

	return (
		<div className="blip-wrapper">
			{visible && (
				<div
					key={blipKey} // new key resets CSS animation
					className="blip"
					style={
						{
							"--blip-lifetime": `${(60 / bpm) * 1000 * 0.4}ms`,
						} as React.CSSProperties
					}
				/>
			)}
		</div>
	);
}
