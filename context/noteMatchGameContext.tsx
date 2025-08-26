// context/noteMatchGameContext.tsx
"use client";

import React, { createContext, useContext } from "react";
import { useNoteMatchGame } from "@/hooks/game-hooks/useNoteMatchGame";
import { GameTypes } from "@/types/types";

const NoteMatchGameContext = createContext<any>(null);

export const NoteMatchGameProvider = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	const game = useNoteMatchGame();
	return (
		<NoteMatchGameContext.Provider value={game}>
			{children}
		</NoteMatchGameContext.Provider>
	);
};

export const useNoteMatchGameContext = () => {
	let context = useContext(NoteMatchGameContext);
	if (!context)
		throw new Error(
			"useNoteMatchGameContext must be used within a NoteMatchGameProvider"
		);
	return context;
};
