"use client";
import { formatTime } from "@/utils/helpers";
import React, { useEffect, useState } from "react";
import "./TimerStyles.css";
import { Plus, Save, Trash2 } from "lucide-react";
import SaveRoutineModal from "./SaveRoutineModal";
import { PhaseDropdown } from "./PhaseDropdown";
import {
	deleteRoutine,
	saveRoutine,
	updateRoutine,
	UserPracticeRoutine,
} from "@/actions/timerActions";
import { toast } from "sonner";
import { RoutineDropdown } from "./RoutineDropdown";
import { Phase } from "@/lib/generated/prisma";

const TimerPhases = ({
	phases,
	current,
	setShowTimerModal,
	setCurrentTimer,
	selectedRoutine,
	setSelectedRoutine,
	setSelectedPhase,
	setShowRoutinesModal,
	onDelete,
}: {
	phases: any[];
	current: number;
	setShowTimerModal: (b: boolean) => void;
	setCurrentTimer: (index: number) => void;
	selectedRoutine: UserPracticeRoutine | undefined;
	setSelectedRoutine: (r: UserPracticeRoutine | undefined) => void;
	setSelectedPhase: (p: Phase) => void;
	onDelete: (id: string) => void;
	setShowRoutinesModal: (b: boolean) => void;
}) => {
	const [localPhases, setLocalPhases] = useState(phases);
	const [showSaveRoutineModal, setShowSaveRoutineModal] = useState(false);
	const [routineName, setRoutineName] = useState("");
	const [loading, setLoading] = useState(false);
	const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

	useEffect(() => {
		setLocalPhases(phases);
	}, [phases]);

	useEffect(() => {
		if (selectedRoutine) {
			setRoutineName(selectedRoutine.name);
		}
	}, [selectedRoutine]);

	const handleSaveRoutine = async () => {
		let newRoutine: UserPracticeRoutine;
		setLoading(true);
		try {
			if (selectedRoutine) {
				newRoutine = await updateRoutine({
					...selectedRoutine,
					phases: localPhases,
				});
			} else {
				newRoutine = await saveRoutine(routineName, localPhases);
			}
			if (newRoutine) {
				setSelectedRoutine(newRoutine);
			}
		} catch (err: any) {
			throw new Error(err.message);
		} finally {
			setShowSaveRoutineModal(false);
			setLoading(false);
		}
	};

	const handleDeleteRoutine = async (id: string) => {
		setLoading(true);
		try {
			const res = await deleteRoutine(id);
			if (res?.success) {
				onDelete(id);
			}
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	};

	const handleOmitPhase = async (id: string) => {
		setLocalPhases((prev) => {
			return prev.filter((ph) => ph.id != id);
		});
	};

	const handleEditPhase = async (id: string) => {
		setShowTimerModal(true);
		setSelectedPhase(phases.find((p) => p.id === id));
	};

	const handleDragStart = (index: number) => {
		setDraggedIndex(index);
	};

	const handleDragOver = (e: React.DragEvent<HTMLLIElement>) => {
		e.preventDefault();
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
				<div className="flex items-center w-full justify-between mb-2">
					<span className="flex gap-1 items-center">
						<button
							className="ui_btn secondary"
							onClick={() => setShowTimerModal(true)}
						>
							<Plus />
						</button>
					</span>
					{selectedRoutine && (
						<h1 className="text-2xl">{selectedRoutine.name}</h1>
					)}
					<RoutineDropdown
						loading={loading}
						handleDeleteRoutine={handleDeleteRoutine}
						routine={selectedRoutine}
						handleSaveRoutine={handleSaveRoutine}
						setShowSaveRoutineModal={setShowSaveRoutineModal}
						setShowRoutinesModal={setShowRoutinesModal}
					/>
				</div>
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
								handleOmit={handleOmitPhase}
								loading={loading}
								handleEdit={handleEditPhase}
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
