"use client";
import React, { useEffect, useState } from "react";
import { Slider } from "@/components/ui/slider";
import { INSTRUMENTS } from "@/constants/instrumentConstants";

// Instrument presets
const frets = Array.from({ length: 13 }, (_, i) => i); // 0–12 frets

export default function FretRangeSelector(props: { game: any }) {
	const { game } = props;
	const [instrument, setInstrument] =
		useState<keyof typeof INSTRUMENTS>("guitar6");
	const [range, setRange] = useState<[number, number]>([0, 12]);
	const [activeStrings, setActiveStrings] = useState<boolean[]>(
		INSTRUMENTS[instrument].active
	);

	useEffect(() => {
		setters.setInstrumentPreset(INSTRUMENTS["guitar6"]);
	}, []);

	const { setters } = game;

	const currentStrings = INSTRUMENTS[instrument].strings;
	const strings = Array.from({ length: currentStrings }, (_, i) => i);

	const toggleString = (index: number) => {
		setActiveStrings((prev) => {
			const updated = [...prev];
			updated[index] = !updated[index];
			return updated;
		});
	};

	const handleInstrumentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const selected = e.target.value as keyof typeof INSTRUMENTS;
		setInstrument(selected);
		setters.setInstrumentPreset(INSTRUMENTS[selected]);
		setActiveStrings(INSTRUMENTS[selected].active);
	};

	return (
		<div className="flex flex-col items-center gap-4 p-4 w-full max-w-3xl mx-auto">
			{/* Instrument selector */}
			<div className="w-full mb-2">
				<label className="text-sm text-stone-400 mr-2">Instrument:</label>
				<select
					value={instrument}
					onChange={handleInstrumentChange}
					className="bg-stone-800 text-stone-200 rounded-md px-3 py-1 text-sm border border-stone-600 focus:outline-none focus:ring-2 focus:ring-cyan-500"
				>
					{Object.entries(INSTRUMENTS).map(([key, { label }]) => (
						<option key={key} value={key}>
							{label}
						</option>
					))}
				</select>
			</div>

			{/* Neck visual with string selectors */}
			<div className="flex items-center gap-2 w-full">
				{/* String selectors (checkboxes) */}
				<div className="flex flex-col justify-between h-20 py-[2px]">
					{strings.map((s) => (
						<label
							key={s}
							className="flex items-center gap-2 text-xs text-stone-400 cursor-pointer select-none"
							style={{ height: `${100 / strings.length}%` }}
						>
							<input
								type="checkbox"
								checked={activeStrings[s]}
								onChange={() => toggleString(s)}
								className="accent-cyan-500 cursor-pointer"
							/>
							<span className="w-3 text-right">{strings.length - s}</span>
						</label>
					))}
				</div>

				{/* Neck */}
				<div className="relative flex-1 h-20 bg-stone-800 rounded-xl overflow-hidden">
					{/* Strings */}
					{strings.map((s) => (
						<div
							key={s}
							className="absolute left-0 right-0 border-t border-stone-300 transition-all"
							style={{
								top: `${((s + 0.5) / strings.length) * 100}%`,
								opacity: activeStrings[s] ? 1 : 0.25,
								borderWidth: activeStrings[s] ? "2px" : "1px",
							}}
						></div>
					))}

					{/* Frets */}
					{frets.map((fret, i) => (
						<div
							key={i}
							className={`absolute top-0 bottom-0 border-l ${
								i === 0 ? "border-l-4" : "border-l-2"
							} border-stone-600`}
							style={{ left: `${(i / 12) * 100}%` }}
						></div>
					))}

					{/* Selected range highlight */}
					<div
						className="absolute top-0 bottom-0 bg-cyan-500/40 transition-all"
						style={{
							left: `${(range[0] / 12) * 100}%`,
							width: `${((range[1] - range[0]) / 12) * 100}%`,
						}}
					/>

					{/* Fret markers */}
					{[3, 5, 7, 9, 12].map((f) => (
						<div
							key={f}
							className={`absolute top-9 ${
								f === 12 && "flex flex-col gap-7"
							} translate-y-1/2 left-1/2 transform -translate-x-1/2`}
							style={{ left: `${(f / 12) * 100 - 4}%` }}
						>
							<div
								className={`w-2 h-2 ${
									f === 12 && "-my-3"
								} bg-white/70 rounded-full`}
							/>
							{f === 12 && <div className="w-2 h-2 bg-white/70 rounded-full" />}
						</div>
					))}
				</div>
			</div>

			{/* Range slider */}
			<div className="w-full px-4">
				<Slider
					value={range}
					min={0}
					max={12}
					step={1}
					onValueChange={(val) => setRange(val as [number, number])}
					className="w-full"
				/>
				<div className="text-sm text-center mt-2 text-stone-400">
					Selected frets: {range[0]} – {range[1]}
				</div>
			</div>
		</div>
	);
}
