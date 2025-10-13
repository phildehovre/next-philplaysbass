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
import GameOptionsSwitches from "./ui/NoteMatchOptionsSwitches";
import Spinner from "../Spinner";

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
			<DropdownMenuTrigger asChild>
				<Button variant="outline" className="rounded-full w-[1.5em] h-[1.5em]">
					<Settings />
				</Button>
			</DropdownMenuTrigger>
			<Portal>
				<DropdownMenuContent align="start" sideOffset={0}>
					<DropdownMenuLabel color="gray">Settings</DropdownMenuLabel>
					<DropdownMenuSeparator />
					<GameOptionsSwitches state={state} setters={setters} />
				</DropdownMenuContent>
			</Portal>
		</DropdownMenu>
	);
};

export default GameSettings;
