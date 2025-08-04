"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePracticeSession } from "@/context/practiceSessionsContext";
import { Score } from "@/types/types";

type ScoreCategory = "rhythm" | "pitch" | "bonus";

type ScoreBurst = {
	id: string;
	values: { type: ScoreCategory; value: number }[];
};

export const ScoreBurstManager = () => {
	const [bursts, setBursts] = useState<ScoreBurst[]>([]);

	const { scoreEvents } = usePracticeSession();

	useEffect(() => {
		if (!scoreEvents.length) return;
		const lastEvent = scoreEvents[scoreEvents.length - 1];

		// Only keep entries where value > 0
		const filteredScore = Object.entries(lastEvent)
			.filter(([_, value]) => value != 0)
			.reduce((acc, [key, value]) => {
				acc[key as ScoreCategory] = value;
				return acc;
			}, {} as Score);

		const burstValues = Object.entries(filteredScore).map(([type, value]) => ({
			type: type as ScoreCategory,
			value,
		}));

		addBurst(burstValues);
	}, [scoreEvents]);

	const addBurst = (values: ScoreBurst["values"]) => {
		const id = crypto.randomUUID();
		setBursts((prev) => [...prev, { id, values }]);
		setTimeout(() => {
			setBursts((prev) => prev.filter((b) => b.id !== id));
		}, 2000);
	};

	return (
		<div className="score-burst_ctn absolute inset-0 flex items-center justify-center pointer-events-none z-50">
			{bursts.map((burst) => (
				<ScoreBurst key={burst.id} values={burst.values} />
			))}
		</div>
	);
};

type Props = {
	values: { type: ScoreCategory; value: number }[];
};

const labelMap = {
	rhythm: "Rhythm!",
	pitch: "Pitch!",
	bonus: "BONUS!!",
};

const colorMap = {
	rhythm: "text-yellow-400",
	pitch: "text-blue-400",
	bonus: "text-green-400",
};

const ScoreBurst = ({ values }: Props) => {
	return (
		<div className="relative flex flex-col items-center gap-1">
			<AnimatePresence>
				{values.map((v, index) => (
					<motion.div
						key={v.type}
						initial={{ opacity: 0, y: 10 }}
						animate={{ opacity: 1, y: -30 }}
						exit={{ opacity: 0, y: -50 }}
						transition={{
							delay: index * 0.15,
							duration: 0.6,
						}}
						className={`score_burst ${colorMap[v.type]}`}
					>
						<span
							className={`${v.value > 0 ? "text-green-500" : "text-red-600"}`}
						>
							{v.value > 0 ? "+" : ""}
						</span>
						{Math.round(v.value * 100)} {labelMap[v.type]}
					</motion.div>
				))}
			</AnimatePresence>
		</div>
	);
};
