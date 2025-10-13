import { GameTypes } from "@/types/types";
import { Settings } from "lucide-react";
import React, { useState } from "react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuTrigger,
	DropdownMenuSeparator,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { DropdownMenuLabel, Portal } from "@radix-ui/react-dropdown-menu";
import GameOptionsSwitches from "./GameSettings";
import Spinner from "../Spinner";
import {
	FREE_PRACTICE_TYPE,
	NOTE_MATCH_TYPE,
	RHYTHM_ACCURACY_TYPE,
} from "@/constants/GameConstants";
import NoteMatchOptionsSwitches from "./GameSettings";

type GameSettingsPropsType = {
	gameType: GameTypes;
	game: any | undefined;
};
const GameSettings = (props: GameSettingsPropsType) => {
	const { game, gameType } = props;
	const { state, setters } = game;

	if (!game) return <Spinner />;

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild className="absolute bottom-58 left-58 z-0">
				<Button variant="outline" className="rounded-full w-[1.5em] h-[1.5em]">
					<img src="/tab.png" className="absolute scale-200 rotate-45" />
					<Settings className="absolute top-1 left-0.5" color="black" />
				</Button>
			</DropdownMenuTrigger>
			<Portal>
				<DropdownMenuContent align="start" sideOffset={0}>
					<DropdownMenuLabel color="gray">Settings</DropdownMenuLabel>
					<DropdownMenuSeparator />
					{gameType == NOTE_MATCH_TYPE && (
						<NoteMatchOptionsSwitches state={state} setters={setters} />
					)}
					{gameType == RHYTHM_ACCURACY_TYPE && "Under construction!"}
					{gameType == FREE_PRACTICE_TYPE && "hello"}
				</DropdownMenuContent>
			</Portal>
		</DropdownMenu>
	);
};

export default GameSettings;
