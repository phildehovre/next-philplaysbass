// components/GameOptionsSwitches.tsx
"use client";

import React from "react";
import {
	Drum,
	Piano,
	Timer,
	ArrowUpDown,
	RulerDimensionLine,
} from "lucide-react";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import Switch from "@/components/Switch";

type GameOptionsSwitchesProps = {
	state: {
		gameStarted: boolean;
		withMetronome: boolean;
		withTimer: boolean;
		withArpeggios: boolean;
		withInversions: boolean;
		withFretboard: boolean;
	};
	setters: {
		setWithMetronome: (val: boolean) => void;
		setWithTimer: (val: boolean) => void;
		setWithArpeggios: (val: boolean) => void;
		setWithInversions: (val: boolean) => void;
		setWithFretboard: (val: boolean) => void;
	};
};

const NoteMatchOptionsSwitches: React.FC<GameOptionsSwitchesProps> = ({
	state,
	setters,
}) => {
	return (
		<div className="flex flex-col gap-3 m-3">
			<Tooltip>
				<TooltipTrigger asChild>
					<label className="flex items-center gap-2 justify-between  w-full">
						<Drum size={18} color={"lightGray"} />
						<Switch
							disabled={state.gameStarted || state.withTimer}
							checked={state.withMetronome}
							onCheckChange={setters.setWithMetronome}
						/>
					</label>
				</TooltipTrigger>
				<TooltipContent side="right">Practice with a metronome</TooltipContent>
			</Tooltip>

			<Tooltip>
				<TooltipTrigger asChild>
					<label className="flex items-center gap-2 justify-between">
						<Timer size={18} color={"lightGray"} />
						<Switch
							disabled={state.gameStarted || state.withMetronome}
							checked={state.withTimer}
							onCheckChange={setters.setWithTimer}
						/>
					</label>
				</TooltipTrigger>
				<TooltipContent side="right">Practice with a time limit</TooltipContent>
			</Tooltip>

			<Tooltip>
				<TooltipTrigger asChild>
					<label className="flex items-center gap-2 justify-between">
						<Piano size={18} color={"lightGray"} />
						<Switch
							disabled={state.gameStarted}
							checked={state.withArpeggios}
							onCheckChange={setters.setWithArpeggios}
						/>
					</label>
				</TooltipTrigger>
				<TooltipContent side="right">
					Practice with single notes or arpeggios
				</TooltipContent>
			</Tooltip>

			<Tooltip>
				<TooltipTrigger asChild>
					<label className="flex items-center gap-2 justify-between">
						<ArrowUpDown size={18} color={"lightGray"} />
						<Switch
							disabled={state.gameStarted}
							checked={state.withInversions}
							onCheckChange={setters.setWithInversions}
						/>
					</label>
				</TooltipTrigger>
				<TooltipContent side="right">Practice with inversions</TooltipContent>
				<Tooltip>
					<TooltipTrigger asChild>
						<label className="flex items-center gap-2 justify-between">
							<RulerDimensionLine size={18} color={"lightGray"} />
							<Switch
								disabled={state.gameStarted}
								checked={state.withFretboard}
								onCheckChange={setters.setWithFretboard}
							/>
						</label>
					</TooltipTrigger>
					<TooltipContent side="right">
						Select a range on the instrument, you must play the same octave!
					</TooltipContent>
				</Tooltip>{" "}
			</Tooltip>
		</div>
	);
};

export default NoteMatchOptionsSwitches;
