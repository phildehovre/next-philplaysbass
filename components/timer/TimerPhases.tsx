"use client";
import { formatTime } from "@/utils/helpers";
import React from "react";
import "./TimerStyles.css";
import { Plus, Save, TimerIcon, Trash2 } from "lucide-react";
import AnimatedNumber from "../games/ui/AnimatedNumber";

const TimerPhases = ({
	phases,
	current,
	setShowTimerModal,
}: {
	phases: any[];
	current: number;
	setShowTimerModal: (b: boolean) => void;
}) => {
	const handleSavePhases = async () => {
		try {
			const res = await fetch("/api/timer-sets", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					name: "My Training Routine",
					phases,
				}),
			});

			const data = await res.json();
			console.log("Saved:", data);
		} catch (error) {
			console.error(error);
		}
	};

	const handleDeletePhases = async () => {};

	return (
		<div className="timer-phases_ctn w-full rounded-sm">
			{phases.length > 0 && (
				<>
					<button onClick={handleSavePhases}>
						<Save color="white" />
					</button>
					<button onClick={() => console.log(`Deleting ${phases}`)}>
						<Trash2 color="darkRed" />
					</button>
				</>
			)}
			<button className="" onClick={() => setShowTimerModal(true)}>
				<Plus color="var(--clr-brand)" />
			</button>
			<ul className="timer_list flex flex-col gap-1">
				{phases.map((t, i) => (
					<li
						key={i}
						className={`timer_phase ${i === current ? "font-bold active" : ""}`}
					>
						{i + 1}. {t.label} ({formatTime(t.initialDuration)})
					</li>
				))}
			</ul>
		</div>
	);
};

export default TimerPhases;
