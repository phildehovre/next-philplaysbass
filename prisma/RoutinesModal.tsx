import { UserPracticeRoutine } from "@/actions/timerActions";
import "./RoutinesModalStyles.css";
import Modal from "@/components/Modal";
import { Phase } from "@/lib/generated/prisma";
import { formatTime } from "@/utils/helpers";
import { X } from "lucide-react";
import React from "react";

type RoutinesModalProps = {
	show: boolean;
	routines: UserPracticeRoutine[];
	setShow: (b: boolean) => void;
	setTimerArray: (r: Phase[]) => void;
	setSelectedRoutine: (r: UserPracticeRoutine) => void;
};

const RoutinesModal = (props: RoutinesModalProps) => {
	const { show, routines, setSelectedRoutine, setShow, setTimerArray } = props;

	const handleSelectRoutine = (r: UserPracticeRoutine) => {
		console.log(r);
		setSelectedRoutine(r);
		setTimerArray(r.phases);
		setShow(false);
	};

	const calculateRoutineDuration = (phases: Phase[]) => {
		return phases.reduce((total, phase) => {
			return total + phase.initialDuration + phase.postCooldown;
		}, 0);
	};

	if (!show) return;
	return (
		<Modal onClose={() => setShow(false)}>
			<div className="routines-modal_ctn relative w-full p-4">
				<button
					className="absolute right-2 top-2"
					onClick={() => setShow(false)}
				>
					<X />
				</button>

				<table className="w-full border-collapse text-left">
					<thead>
						<tr className="border-b">
							<th className="py-2 px-3">Name</th>
							<th className="py-2 px-3">Phases</th>
							<th className="py-2 px-3">Duration</th>
						</tr>
					</thead>
					<tbody>
						{routines.map((r) => (
							<tr
								key={r.id}
								className="cursor-pointer"
								onClick={() => handleSelectRoutine(r)}
							>
								<td className="py-2 px-3">{r.name}</td>
								<td className="py-2 px-3">{r.phases.length}</td>
								<td className="py-2 px-3">
									{formatTime(calculateRoutineDuration(r.phases))}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</Modal>
	);
};

export default RoutinesModal;
