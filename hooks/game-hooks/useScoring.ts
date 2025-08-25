// hooks/game-hooks/useScoring.ts
import { useState } from "react";
import { COOLDOWN_MS } from "@/constants/GameConstants";

export const useScoring = () => {
	const [score, setScore] = useState({ wins: 0, losses: 0 });
	const [showShake, setShowShake] = useState(false);
	const [showPulse, setShowPulse] = useState(false);

	const recordWin = () => {
		setScore((prev) => ({ ...prev, wins: prev.wins + 1 }));
		setShowPulse(true);
		setTimeout(() => setShowPulse(false), COOLDOWN_MS);
	};

	const recordLoss = () => {
		setScore((prev) => ({ ...prev, losses: prev.losses + 1 }));
		setShowShake(true);
		setTimeout(() => setShowShake(false), COOLDOWN_MS);
	};

	const resetScore = () => {
		setScore({ wins: 0, losses: 0 });
		setShowPulse(false);
		setShowShake(false);
	};

	return {
		score,
		recordWin,
		recordLoss,
		resetScore,
		showShake,
		showPulse,
	};
};
