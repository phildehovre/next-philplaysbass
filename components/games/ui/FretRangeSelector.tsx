"use client";
import React, { useState } from "react";
import { Slider } from "@/components/ui/slider";

const frets = Array.from({ length: 13 }, (_, i) => i); // 0–12 frets
const strings = Array.from({ length: 6 }, (_, i) => i); // 6 strings

export default function FretRangeSelector() {
	const [range, setRange] = useState<[number, number]>([0, 12]);

	return (
		<div className="flex flex-col items-center gap-4 p-4 w-full max-w-3xl mx-auto">
			<h2 className="text-xl font-semibold mb-2">Select Note Range</h2>

			{/* Neck visual */}
			<div className="relative w-full h-20 bg-stone-800 rounded-xl overflow-hidden">
				{strings.map((s) => (
					<div
						key={s}
						className="absolute left-0 right-0 border-t border-stone-600/70"
						style={{ top: `${(s / 5) * 100}%` }}
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
