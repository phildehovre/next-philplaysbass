"use client";
import { formatTime } from "@/utils/helpers";
import React, { useEffect, useState } from "react";
import "./TimerStyles.css";
import { Plus, Save, Trash2 } from "lucide-react";
import SaveRoutineModal from "./SaveRoutineModal";
import { PhaseDropdown } from "./PhaseDropdown";
import { deletePhase, UserPracticeRoutine } from "@/actions/timerActions";
import { toast } from "sonner";
import { RoutineDropdown } from "./RoutineDropdown";

const TimerPhases = ({
	phases,
	current,
	setShowTimerModal,
	setCurrentTimer,
	selectedRoutine,
	setSelectedRoutine,
}: {
	phases: any[];
	current: number;
	setShowTimerModal: (b: boolean) => void;
	setCurrentTimer: (index: number) => void;
	selectedRoutine: UserPracticeRoutine | undefined;
	setSelectedRoutine: (r: UserPracticeRoutine) => void;
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

	const handleDeletePhase = async (id: string) => {
		setLoading(true);
		try {
			const res = await deletePhase(id);
			if (res?.success) {
				handleOmitPhase(id);
				toast(`Phase successfully deleted`);
			}
		} catch (error) {
			toast(`Error: phase was not removed`);
		} finally {
			setLoading(false);
		}
	};

	const handleDeleteRoutine = async (id: string) => {
		setLoading(true);
		try {
			const res = await handleDeleteRoutine(id);
		} catch (error) {}
	};

	const handleOmitPhase = async (id: string) => {
		setLocalPhases((prev) => {
			return prev.filter((ph) => ph.id != id);
		});
	};

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
				{selectedRoutine && (
					<div className="flex items-center w-full justify-between mb-2">
						<span className="flex gap-1 items-center">
							<button
								className="ui_btn secondary"
								onClick={() => setShowTimerModal(true)}
							>
								<Plus />
							</button>
							<h1 className="text-2xl">{selectedRoutine.name}</h1>
						</span>
						<RoutineDropdown
							loading={loading}
							handleDeleteRoutine={handleDeleteRoutine}
							routine={selectedRoutine}
						/>
					</div>
				)}
				<ul className="timer_list flex flex-col gap-1">
					{localPhases.map((t, i) => (
						<li
							key={i}
							className={`timer_phase ${i === current ? "active" : ""}`}
							draggable
							onDragStart={() => handleDragStart(i)}
							onDragOver={handleDragOver}
							onDrop={() => handleDrop(i)}
							onClick={() => setCurrentTimer(i)}
						>
							<p className="phase_index font-light text-xs ">{i + 1}</p>
							<p className="phase_label w-full">{t.label}</p>
							<p className="phase_duration">{formatTime(t.initialDuration)}</p>
							<PhaseDropdown
								phase={t}
								handleDelete={handleDeletePhase}
								handleOmit={handleOmitPhase}
								loading={loading}
							/>
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
