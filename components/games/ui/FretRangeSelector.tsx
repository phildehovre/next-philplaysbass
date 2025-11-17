"use client";
import React, { useEffect, useRef, useState } from "react";
import { Slider } from "@/components/ui/slider";
import { INSTRUMENTS } from "@/constants/instrumentConstants";
import { getLS, setLS } from "@/utils/helpers";

const FRET_RANGE = 24;

export default function FretRangeSelector({ game }: { game: any }) {
	const { setters, state } = game;

	const [range, setRange] = useState<[number, number]>([0, 12]);
	const [activeStrings, setActiveStrings] = useState<boolean[]>(
		state.instrumentPreset.active
	);
	const [hydrated, setHydrated] = useState(false);

	const frets = Array.from({ length: FRET_RANGE }, (_, i) => i);
	const currentStrings = state.instrumentPreset.strings;
	const strings = Array.from({ length: currentStrings }, (_, i) => i);

	const originalFretsRef = useRef<string[][]>(state.instrumentPreset.frets);

	useEffect(() => {
		const savedRange = getLS("fretRange");
		if (savedRange) {
			try {
				const parsed = JSON.parse(savedRange);
				if (
					Array.isArray(parsed) &&
					parsed.length === 2 &&
					parsed.every((n) => !isNaN(Number(n)))
				) {
					setRange(parsed as [number, number]);
					setters.setFretRange(parsed);
				}
			} catch {}
		}

		// Active strings
		const savedStrings = getLS("activeStrings");
		if (savedStrings) {
			try {
				const parsed = JSON.parse(savedStrings);
				if (
					Array.isArray(parsed) &&
					parsed.every((v) => typeof v === "boolean")
				) {
					setActiveStrings(parsed);
				}
			} catch {}
		}

		// Instrument preset
		const savedInstrument = getLS("instrumentPresetKey");
		if (savedInstrument && INSTRUMENTS[savedInstrument]) {
			setters.setInstrumentPreset({
				...INSTRUMENTS[savedInstrument],
				key: savedInstrument,
			});
			setActiveStrings(INSTRUMENTS[savedInstrument].active);
		}

		setHydrated(true); // mark hydration complete
	}, []);

	// Persist state
	useEffect(() => setLS("fretRange", range), [range]);
	useEffect(() => setLS("activeStrings", activeStrings), [activeStrings]);

	const toggleString = (index: number) => {
		setActiveStrings((prev) => {
			const updated = [...prev];
			updated[index] = !updated[index];
			return updated;
		});
	};

	const handleInstrumentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const selected = e.target.value as keyof typeof INSTRUMENTS;
		setters.setInstrumentPreset({
			...INSTRUMENTS[selected],
			key: selected,
		});
		setActiveStrings(INSTRUMENTS[selected].active);
		setLS("instrumentPresetKey", selected);
	};

	const handleSetRange = (val: number[]) => {
		let [start, end] = val as [number, number];
		if (start >= end) {
			if (range[0] !== start) {
				end = start + 1;
			} else {
				start = end - 1;
			}
		}
		setRange([Math.max(0, start), Math.max(1, end)]);
	};

	if (!hydrated) return null;

	return (
		<div className="flex flex-col items-center gap-4 p-4 w-full max-w-3xl mx-auto">
			{/* Instrument selector */}
			<div className="w-full mb-2">
				<label className="text-sm text-stone-400 mr-2">Instrument:</label>
				<select
					value={state.instrumentPreset.key}
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
						/>
					))}

					{/* Frets */}
					{frets.map((fret, i) => (
						<div
							key={i}
							className={`absolute top-0 bottom-0 border-l ${
								i === 0 ? "border-l-10" : "border-l-2"
							} border-stone-600`}
							style={{ left: `${(i / frets.length) * 100}%` }}
						/>
					))}

					{/* Selected range highlight */}
					<div
						className="absolute top-0 bottom-0 bg-cyan-500/40 transition-all"
						style={{
							left: `${(range[0] / frets.length) * 100}%`,
							width: `${((range[1] - range[0]) / frets.length) * 100}%`,
						}}
					/>

					{/* Fret markers */}
					{[3, 5, 7, 9, 12, 15, 17, 19, 21, 24].map((f) => (
						<div
							key={f}
							className={`absolute top-[47%] ${
								f % 12 === 0 ? "flex flex-col gap-5" : ""
							} left-1/2 transform -translate-x-1/2`}
							style={{ left: `${(f / frets.length) * 100 + 3}%` }}
						>
							<div
								className={`w-2 h-2 ${
									f % 12 === 0 ? "-my-3" : ""
								} bg-white/70 rounded-full`}
							/>
							{f % 12 === 0 && (
								<div className="w-2 h-2 bg-white/70 rounded-full" />
							)}
						</div>
					))}
				</div>
			</div>

			{/* Range slider */}
			<div className="w-full px-4">
				<Slider
					value={range}
					min={0}
					max={24}
					step={1}
					onValueChange={handleSetRange}
					className="w-full"
				/>
				<div className="text-sm text-center mt-2 text-stone-400">
					Selected frets: {range[0]} – {range[1] > 0 ? range[1] - 1 : 0}
				</div>
			</div>
		</div>
	);
}
