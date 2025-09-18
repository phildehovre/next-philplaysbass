"use client";
import { formatTime } from "@/utils/helpers";
import React, { useEffect, useState } from "react";
import "./TimerStyles.css";
import { Plus, Save, Trash2 } from "lucide-react";
import SaveRoutineModal from "./SaveRoutineModal";

const TimerPhases = ({
	phases,
	current,
	setShowTimerModal,
}: {
	phases: any[];
	current: number;
	setShowTimerModal: (b: boolean) => void;
}) => {
	const [localPhases, setLocalPhases] = useState(phases);
	const [showSaveRoutineModal, setShowSaveRoutineModal] = useState(false);
	const [routineName, setRoutineName] = useState("");
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		setLocalPhases(phases);
	}, [phases]);

	const handleSaveRoutine = async () => {
		setLoading(true);
		try {
			const res = await fetch("/api/timer-sets", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					name: routineName,
					phases,
				}),
			});

			const data = await res.json();
			console.log("Saved:", data);
		} catch (error) {
			console.error(error);
		} finally {
			setShowSaveRoutineModal(false);
			setLoading(false);
		}
	};

	const handleDeletePhases = async () => {};

	// Drag logic
	const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

	const handleDragStart = (index: number) => {
		setDraggedIndex(index);
	};

	const handleDragOver = (e: React.DragEvent<HTMLLIElement>) => {
		e.preventDefault(); // Required to allow dropping
	};

	const handleDrop = (index: number) => {
		if (draggedIndex === null) return;

		const updated = [...localPhases];
		const [movedItem] = updated.splice(draggedIndex, 1);
		updated.splice(index, 0, movedItem);

		setLocalPhases(updated);
		setDraggedIndex(null);
	};

	return (
		<>
			<div className="timer-phases_ctn w-full rounded-sm">
				{phases.length > 0 && (
					<>
						<button onClick={() => setShowSaveRoutineModal(true)}>
							<Save color="white" />
						</button>
						<button onClick={() => console.log(`Deleting ${phases}`)}>
							<Trash2 color="darkRed" />
						</button>
						<button onClick={() => setShowTimerModal(true)}>
							<Plus />
						</button>
					</>
				)}
				<ul className="timer_list flex flex-col gap-1">
					{localPhases.map((t, i) => (
						<li
							key={i}
							className={`timer_phase ${
								i === current ? "font-bold active" : ""
							}`}
							draggable
							onDragStart={() => handleDragStart(i)}
							onDragOver={handleDragOver}
							onDrop={() => handleDrop(i)}
						>
							{i + 1}. {t.label} ({formatTime(t.initialDuration)})
						</li>
					))}
				</ul>
			</div>
			<SaveRoutineModal
				show={showSaveRoutineModal}
				handleSaveRoutine={handleSaveRoutine}
				setRoutineName={setRoutineName}
				loading={loading}
				routineName={routineName}
			/>
		</>
	);
};

export default TimerPhases;
