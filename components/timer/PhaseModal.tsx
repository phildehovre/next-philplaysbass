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
		displayedDuration,
		cooldownDuration,
	}: {
		label: string;
		displayedDuration: number;
		cooldownDuration: number;
	}) => void;
};
const PhaseModal = (props: PhaseModalProps) => {
	const { onClose, show, setShow, initialValues } = props;
	const [label, setLabel] = useState<string>("");
	const [displayedDuration, setDisplayedDuration] = useState<number>(0);
	const [cooldownDuration, setCooldownDuration] = useState<number>(0);

	useEffect(() => {
		if (initialValues) {
			setLabel(initialValues.label);
			setDisplayedDuration(initialValues.initialDuration);
			setCooldownDuration(initialValues.postCooldown);
		}
	}, [initialValues]);

	if (!show) return;

	return (
		<Modal className="box" onClose={() => {}}>
			<h1 className="text-2xl font-bold ">Add Timer Phase</h1>

			<label className="mt-2">Label</label>
			<input
				className="w-full border"
				value={label}
				onChange={(e) => setLabel(e.target.value)}
			/>

			<div className="scoreboard box flex flex-col items-center justify-between w-full my-4">
				<div className="box_label text-2xl">Timer duration</div>
				<span className="flex w-2/3">
					<button
						className="ui_btn secondary"
						onClick={() =>
							setDisplayedDuration((prev) => Math.max(60000, prev - 5000))
						}
					>
						<MinusIcon />
					</button>
					<h1 className="scoreboard timer text-xl w-full">
						{formatTime(displayedDuration)}
					</h1>
					<button
						className="ui_btn secondary"
						onClick={() => setDisplayedDuration((prev) => prev + 5000)}
					>
						<PlusIcon />
					</button>
				</span>
				<input
					className="w-full"
					type="range"
					min="60000"
					max="3600000"
					step="60000"
					value={displayedDuration}
					onChange={(e) => setDisplayedDuration(e.target.valueAsNumber)}
				/>
			</div>

			<div className="scoreboard box flex flex-col items-center justify-between w-full my-4">
				<div className="box_label text-2xl">Cooldown duration</div>
				<span className="flex w-2/3">
					<button
						className="ui_btn secondary"
						onClick={() =>
							setCooldownDuration((prev) => Math.max(0, prev - 1000))
						}
					>
						<MinusIcon />
					</button>
					<h1 className="scoreboard timer text-xl w-full">
						{cooldownDuration === 0 ? "None" : formatTime(cooldownDuration)}
					</h1>
					<button
						className="ui_btn secondary"
						onClick={() => setCooldownDuration((prev) => prev + 1000)}
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
					value={cooldownDuration}
					onChange={(e) => setCooldownDuration(e.target.valueAsNumber)}
				/>
			</div>

			<span className="flex justify-between mt-4">
				<button className="ui_btn secondary" onClick={() => setShow(false)}>
					Cancel
				</button>
				<button
					className={`ui_btn ${
						!label || displayedDuration == 0 ? "disabled" : ""
					}`}
					onClick={() =>
						onClose({ label, displayedDuration, cooldownDuration })
					}
					disabled={!label || displayedDuration == 0}
				>
					Confirm
				</button>
			</span>
		</Modal>
	);
};

export default PhaseModal;
