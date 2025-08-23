"use client";
import { usePracticeSession } from "@/context/practiceSessionsContext";
import { useSoundFX } from "@/context/soundContext";
import { calculateStreakFactor } from "@/lib/utils/scoringUtils";
import React, { useEffect, useRef, useState } from "react";

const StreakManager = () => {
	const [streakFactor, setStreakFactor] = useState<number>(0);
	const prevFactorRef = useRef<number>(0); // 🔑 store previous streakFactor
	const { streak } = usePracticeSession();
	const { playSoundFX } = useSoundFX();

	useEffect(() => {
		const newFactor = calculateStreakFactor(streak);
		const prevFactor = prevFactorRef.current;

		// 🔊 lost streak
		if (prevFactor > newFactor) {
			playSoundFX("lost_streak");
		}

		// 🔊 gained streak (play only when increasing past 1x)
		if (newFactor > 1 && newFactor > prevFactor) {
			playSoundFX("streak");
		}

		setStreakFactor(newFactor);
		prevFactorRef.current = newFactor; // update ref for next comparison
	}, [streak, playSoundFX]);

	return (
		<div className={`streak_ctn absolute left-[-25px] top-0 --${streakFactor}`}>
			{streakFactor > 1 && <div className="streak">{streakFactor}x</div>}
		</div>
	);
};

export default StreakManager;
