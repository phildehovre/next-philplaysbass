import { UserPracticeRoutine } from "@/actions/timerActions";
import Modal from "@/components/Modal";
import { Phase, TimerSet } from "@/lib/generated/prisma";
import { X } from "lucide-react";
import React from "react";

type RoutinesModalProps = {
	show: boolean;
	routines: UserPracticeRoutine[];
	setShow: (b: boolean) => void;
	setTimerArray: (r: Phase[]) => void;
};

const RoutinesModal = (props: RoutinesModalProps) => {
	const { show, routines, setShow, setTimerArray } = props;

	if (!show) return;
	return (
		<Modal onClose={() => setShow(false)}>
			<button className="absolute right-1 top-1" onClick={() => setShow(false)}>
				<X />
			</button>
			<ul>
				{routines.map((r) => {
					return (
						<li
							onClick={() => setTimerArray(r.phases)}
							key={r.id}
							className="hover:bg-gray"
						>
							{r.name}
						</li>
					);
				})}
			</ul>
		</Modal>
	);
};

export default RoutinesModal;
