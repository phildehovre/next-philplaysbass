import React from "react";
import Modal from "../Modal";
import { Save } from "lucide-react";
import Spinner from "../Spinner";

type SaveRoutineModalProps = {
	handleSaveRoutine: () => {};
	show: boolean;
	setRoutineName: (n: string) => void;
	loading: boolean;
	routineName: string;
};

const SaveRoutineModal = (props: SaveRoutineModalProps) => {
	const { show, routineName, loading, handleSaveRoutine, setRoutineName } =
		props;
	if (!show) return null;
	return (
		<Modal onClose={function (): void {}}>
			<label htmlFor="routine-name">Name the practice routine</label>
			<input
				type="text"
				name="routine-name"
				id=""
				onChange={(e) => setRoutineName(e.target.value)}
			/>
			<button
				disabled={loading || routineName.length < 3}
				className={`ui_btn ${loading ? "disabled" : ""}`}
				onClick={() => handleSaveRoutine()}
			>
				{loading ? <Spinner /> : <Save />}
				Confirm
			</button>
		</Modal>
	);
};

export default SaveRoutineModal;
