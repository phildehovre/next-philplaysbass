"use client";
import { formatTime } from "@/utils/helpers";
import React, { useEffect, useState } from "react";
import "./TimerStyles.css";
import { Plus } from "lucide-react";
import SaveRoutineModal from "./SaveRoutineModal";
import { PhaseDropdown } from "./PhaseDropdown";
import {
	deleteRoutine,
	saveRoutine,
	updateRoutine,
	UserPracticeRoutine,
} from "@/actions/timerActions";
import { RoutineDropdown } from "./RoutineDropdown";
import { Phase } from "@/lib/generated/prisma";
import { toast } from "sonner";
import { PhaseDraft } from "./Timer";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@radix-ui/react-tooltip";

const TimerPhases = ({
	phases,
	setPhases,
	current,
	handleShowCreatePhaseModal,
	selectedRoutine,
	setSelectedRoutine,
	setSelectedPhase,
	setShowRoutinesModal,
	handleCloseRoutine,
}: {
	phases: any[];
	current: number;
	setPhases: (p: any) => void;
	handleShowCreatePhaseModal: (b: boolean, p?: Phase) => void;
	selectedRoutine: UserPracticeRoutine | undefined;
	setSelectedRoutine: (r: UserPracticeRoutine | undefined) => void;
	setSelectedPhase: (p: Phase) => void;
	handleCloseRoutine: (id?: string) => void;
	setShowRoutinesModal: (b: boolean) => void;
}) => {
	const [showSaveRoutineModal, setShowSaveRoutineModal] = useState(false);
	const [routineName, setRoutineName] = useState("");
	const [loading, setLoading] = useState(false);
	const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

	useEffect(() => {
		if (selectedRoutine) {
			setRoutineName(selectedRoutine.name);
		}
	}, [selectedRoutine]);

	const handleSaveRoutine = async (name: string) => {
		let newRoutine: UserPracticeRoutine;
		setLoading(true);
		try {
			if (selectedRoutine) {
				newRoutine = await updateRoutine({
					...selectedRoutine,
					phases,
					name,
				});
			} else {
				newRoutine = await saveRoutine(name, phases);
			}
			if (newRoutine) {
				setSelectedRoutine(newRoutine);
			}
			toast("Routine saved!");
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
				handleCloseRoutine(id);
			}
			toast("Practice routine deleted successfully");
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	};

	const handleOmitPhase = async (phase: Phase) => {
		setPhases((prev: any) => {
			return prev.filter((ph: PhaseDraft) => ph.id != phase.id);
		});
	};

	const handleOpenEditModal = async (phase: Phase) => {
		handleShowCreatePhaseModal(true, phase);
		setSelectedPhase(phase);
	};

	const handleDragStart = (index: number) => {
		setDraggedIndex(index);
	};

	const handleDragOver = (e: React.DragEvent<HTMLLIElement>) => {
		e.preventDefault();
	};

	const handleDrop = (index: number) => {
		if (draggedIndex === null) return;

		const updated = [...phases];
		const [movedItem] = updated.splice(draggedIndex, 1);
		updated.splice(index, 0, movedItem);

		setPhases(updated.map((p, i) => ({ ...p, order: i })));
		setDraggedIndex(null);
	};

	return (
		<>
			<div className="timer-phases_ctn w-full rounded-sm">
				<div className="flex items-center w-full justify-between mb-2">
					<span className="flex gap-1 items-center">
						<button
							className="ui_btn secondary"
							onClick={() => handleShowCreatePhaseModal(true)}
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
						handleCloseRoutine={handleCloseRoutine}
					/>
				</div>
				<ul className="timer_list flex flex-col gap-1 z-100 mb-5">
					{phases.map((p, i) => (
						<Tooltip>
							<TooltipTrigger>
								<li
									key={i}
									className={`timer_phase ${
										i === current ? "active" : ""
									}  z-50`}
									draggable
									onDragStart={() => handleDragStart(i)}
									onDragOver={handleDragOver}
									onDrop={() => handleDrop(i)}
									onClick={() => setSelectedPhase(p)}
								>
									<p className="phase_index font-light text-xs ">{i + 1}</p>
									<p className="phase_label w-full text-left text-sm truncate">
										{p.label}
									</p>
									<p className="phase_bpm w-1/2">{p.bpm}</p>
									<p className="phase_duration">
										{formatTime(p.initialDuration)}
									</p>
									<PhaseDropdown
										phase={p}
										handleOmit={handleOmitPhase}
										loading={loading}
										handleEdit={handleOpenEditModal}
									/>
								</li>
							</TooltipTrigger>
							<TooltipContent
								className="bg-black/80 p-2 hidden md:block"
								side="right"
							>
								{p.label}
							</TooltipContent>
						</Tooltip>
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
