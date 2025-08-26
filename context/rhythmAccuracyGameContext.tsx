// context/noteMatchGameContext.tsx
"use client";

import React, { createContext, useContext } from "react";
import { useNoteMatchGame } from "@/hooks/game-hooks/useNoteMatchGame";
import { GameTypes } from "@/types/types";
import { useRhythmAccuracyGame } from "@/hooks/game-hooks/useRhythmAccuracyGame";

const RhythmAccuracyGameContext = createContext<any>(null);

export const RhythmAccuracyGameProvider = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	const game = useRhythmAccuracyGame();
	return (
		<RhythmAccuracyGameContext.Provider value={game}>
			{children}
		</RhythmAccuracyGameContext.Provider>
	);
};

export const useRhythmAccuracyGameContext = () => {
	let context = useContext(RhythmAccuracyGameContext);
	if (!context)
		throw new Error(
			"useNoteMatchGameContext must be used within a RhythmAccuracyGameProvider"
		);
	return context;
};
