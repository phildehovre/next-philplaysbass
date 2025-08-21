"use client";
import { useOscillatorGen } from "@/context/oscillatorGenContext";
import { usePracticeSession } from "@/context/practiceSessionsContext";
import { useSoundFX } from "@/context/soundContext";
import React, { useEffect, useState } from "react";

const StreakManager = () => {
	const [streakFactor, setStreakFactor] = useState(0);
	const { streak } = usePracticeSession();

	const { playSoundFX } = useSoundFX();

	useEffect(() => {
		const factor = Math.floor(streak / 5);
		setStreakFactor(factor);
		return () => {
			setStreakFactor(0);
		};
	}, [streak]);

	useEffect(() => {
		if (streakFactor >= 1) {
			playSoundFX("streak");
		}
	}, [streakFactor]);

	return (
		<div className={`streak_ctn absolute left-[-25px] top-0 --${streakFactor}`}>
			{streakFactor > 1 && <div className="streak">{streakFactor}x</div>}
		</div>
	);
};

export default StreakManager;
