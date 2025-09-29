"use client";
import React, { useEffect, useState } from "react";
import Modal from "../Modal";
import { MinusIcon, PlusIcon } from "lucide-react";
import { formatTime } from "@/utils/helpers";
import { Phase } from "@/lib/generated/prisma";

type PhaseModalProps = {
	show: boolean;
	setShow: (b: boolean) => void;
	initialValues?: Phase;
	onClose: ({
		label,
		initialDuration,
		postCooldown,
	}: {
		label: string;
		initialDuration: number;
		postCooldown: number;
	}) => void;
};
const PhaseModal = (props: PhaseModalProps) => {
	const { onClose, show, setShow, initialValues } = props;
	const [label, setLabel] = useState<string>("");
	const [initialDuration, setInitialDuration] = useState<number>(0);
	const [postCooldown, setPostCooldown] = useState<number>(0);

	useEffect(() => {
		if (initialValues) {
			setLabel(initialValues.label);
			setInitialDuration(initialValues.initialDuration);
			setPostCooldown(initialValues.postCooldown);
		}
	}, [initialValues]);

	if (!show) return;

	return (
		<Modal className="box" onClose={() => {}}>
			<h1 className="text-2xl font-bold ">Add Timer Phase</h1>
			<div className="scoreboard box flex flex-col items-center justify-between">
				<label htmlFor="phase-name" className="box_label">
					Phase name:
				</label>
				<input
					className="w-full border p-2 bg-black mt-1"
					value={label}
					onChange={(e) => setLabel(e.target.value)}
					autoFocus
					name="phase-name"
				/>
			</div>

			<div className="scoreboard box flex flex-col items-center justify-between w-full my-4">
				<div className="box_label text-2xl">Timer duration</div>
				<span className="flex w-2/3">
					<button
						className="ui_btn secondary"
						onClick={() =>
							setInitialDuration((prev) => Math.max(1000, prev - 1000))
						}
					>
						<MinusIcon />
					</button>
					<h1 className="scoreboard timer text-xl w-full">
						{formatTime(initialDuration)}
					</h1>
					<button
						className="ui_btn secondary"
						onClick={() => setInitialDuration((prev) => prev + 1000)}
					>
						<PlusIcon />
					</button>
				</span>
				<input
					className="w-full"
					type="range"
					min="60"
					max="3600000"
					step="6000"
					value={initialDuration}
					onChange={(e) => setInitialDuration(e.target.valueAsNumber)}
				/>
			</div>

			<div className="scoreboard box flex flex-col items-center justify-between w-full my-4">
				<div className="box_label text-2xl">Cooldown duration</div>
				<span className="flex w-2/3">
					<button
						className="ui_btn secondary"
						onClick={() => setPostCooldown((prev) => Math.max(0, prev - 1000))}
					>
						<MinusIcon />
					</button>
					<h1 className="scoreboard timer text-xl w-full">
						{postCooldown === 0 ? "None" : formatTime(postCooldown)}
					</h1>
					<button
						className="ui_btn secondary"
						onClick={() => setPostCooldown((prev) => prev + 1000)}
					>
						<PlusIcon />
					</button>
				</span>
				<input
					className="w-full"
					type="range"
					min="0"
					max="60000"
					step="1000"
					value={postCooldown}
					onChange={(e) => setPostCooldown(e.target.valueAsNumber)}
				/>
			</div>

			<span className="flex justify-between mt-4">
				<button className="ui_btn secondary" onClick={() => setShow(false)}>
					Cancel
				</button>
				<button
					className={`ui_btn ${
						!label || initialDuration == 0 ? "disabled" : ""
					}`}
					onClick={() => onClose({ label, initialDuration, postCooldown })}
					disabled={!label || initialDuration == 0}
				>
					Confirm
				</button>
			</span>
		</Modal>
	);
};

export default PhaseModal;
