// components/GameOptionsSwitches.tsx
"use client";

import React from "react";
import { Drum, Piano, Timer, ArrowUpDown } from "lucide-react";
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
	};
	setters: {
		setWithMetronome: (val: boolean) => void;
		setWithTimer: (val: boolean) => void;
		setWithArpeggios: (val: boolean) => void;
		setWithInversions: (val: boolean) => void;
	};
};

const GameOptionsSwitches: React.FC<GameOptionsSwitchesProps> = ({
	state,
	setters,
}) => {
	return (
		<div className="switch_ctn grid grid-cols-2 gap-7">
			<Tooltip>
				<TooltipTrigger asChild>
					<label className="flex items-center gap-2">
						<Drum />
						<Switch
							disabled={state.gameStarted || state.withTimer}
							checked={state.withMetronome}
							onCheckChange={setters.setWithMetronome}
						/>
					</label>
				</TooltipTrigger>
				<TooltipContent>[coming soon] Practice with a metronome</TooltipContent>
			</Tooltip>

			<Tooltip>
				<TooltipTrigger asChild>
					<label className="flex items-center gap-2">
						<Timer />
						<Switch
							disabled={state.gameStarted || state.withMetronome}
							checked={state.withTimer}
							onCheckChange={setters.setWithTimer}
						/>
					</label>
				</TooltipTrigger>
				<TooltipContent>Practice with a time limit</TooltipContent>
			</Tooltip>

			<Tooltip>
				<TooltipTrigger asChild>
					<label className="flex items-center gap-2">
						<Piano />
						<Switch
							disabled={state.gameStarted}
							checked={state.withArpeggios}
							onCheckChange={setters.setWithArpeggios}
						/>
					</label>
				</TooltipTrigger>
				<TooltipContent>Practice with single notes or arpeggios</TooltipContent>
			</Tooltip>

			<Tooltip>
				<TooltipTrigger asChild>
					<label className="flex items-center gap-2">
						<ArrowUpDown />
						<Switch
							disabled={state.gameStarted}
							checked={state.withInversions}
							onCheckChange={setters.setWithInversions}
						/>
					</label>
				</TooltipTrigger>
				<TooltipContent>Practice with inversions</TooltipContent>
			</Tooltip>
		</div>
	);
};

export default GameOptionsSwitches;
