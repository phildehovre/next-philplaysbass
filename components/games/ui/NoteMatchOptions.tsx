import Switch from "@/components/Switch";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { useGameOptions } from "@/hooks/game-hooks/useGameOptions";
import { ArrowUpDown, Drum, Piano, Timer } from "lucide-react";
import React from "react";

type NoteMatchOptionsType = {
	gameStarted: boolean;
	options: any;
	setWithArpeggios: (bool: boolean) => void;
	setWithMetronome: (bool: boolean) => void;
	setWithTimer: (bool: boolean) => void;
	setWithInversions: (bool: boolean) => void;
	setIsPracticeMode: (bool: boolean) => void;
};
const NoteMatchOptions = (props: NoteMatchOptionsType) => {
	const {
		gameStarted,
		options,
		setIsPracticeMode,
		setWithArpeggios,
		setWithInversions,
		setWithMetronome,
		setWithTimer,
	} = props;

	return (
		<div className="switch_ctn grid grid-cols-2 gap-7">
			<div className="game_header flex flex-col justify-center gap-2 w-full">
				<label
					htmlFor="isPracticeMode"
					className="flex justify-center gap-2 m-auto"
				>
					<Switch
						disabled={gameStarted}
						checked={options.isPracticeMode}
						onCheckChange={setIsPracticeMode}
					/>
					<p
						style={{
							color: options.isPracticeMode ? "var(--clr-brand)" : "gray",
						}}
					>
						Practice mode
					</p>
				</label>
			</div>
			<Tooltip>
				<TooltipTrigger asChild={true}>
					<label htmlFor="withMetronome" className="flex items-center gap-2">
						<Drum />
						<Switch
							disabled={gameStarted || options.withTimer}
							checked={options.withMetronome}
							onCheckChange={setWithMetronome}
						/>
					</label>
				</TooltipTrigger>
				<TooltipContent>Practice with a metronome</TooltipContent>
			</Tooltip>
			<Tooltip>
				<TooltipTrigger asChild={true}>
					<label htmlFor="withTimer" className="flex items-center gap-2">
						<Timer />
						<Switch
							disabled={gameStarted || options.withMetronome}
							checked={options.withTimer}
							onCheckChange={setWithTimer}
						/>
					</label>
				</TooltipTrigger>
				<TooltipContent>Practice with a time limit</TooltipContent>
			</Tooltip>

			<Tooltip>
				<TooltipTrigger asChild={true}>
					<label htmlFor="withArpeggios" className="flex items-center gap-2">
						<Piano />
						<Switch
							disabled={gameStarted}
							checked={options.withArpeggios}
							onCheckChange={setWithArpeggios}
						/>
					</label>
				</TooltipTrigger>
				<TooltipContent>Practice with single notes or arpeggios</TooltipContent>
			</Tooltip>
			<Tooltip>
				<TooltipTrigger asChild={true}>
					<label
						htmlFor="options.withInversions"
						className="flex items-center gap-2"
					>
						<ArrowUpDown />
						<Switch
							disabled={gameStarted}
							checked={options.withInversions}
							onCheckChange={setWithInversions}
						/>
					</label>
				</TooltipTrigger>
				<TooltipContent>Practice with inversions</TooltipContent>
			</Tooltip>
		</div>
	);
};

export default NoteMatchOptions;
