"use client";
import React, { useEffect, useState } from "react";
import Modal from "../Modal";
import { MinusIcon, PlusIcon } from "lucide-react";
import { formatTime } from "@/utils/helpers";
import { Phase } from "@/lib/generated/prisma";
import { PhaseDraft } from "./Timer";
import Switch from "../Switch";

type PhaseModalProps = {
	show: boolean;
	setShow: (b: boolean) => void;
	initialValues?: Phase;
	onClose: (options: Partial<PhaseDraft>) => void;
};

const PhaseModal = ({
	onClose,
	show,
	setShow,
	initialValues,
}: PhaseModalProps) => {
	const [label, setLabel] = useState("");
	const [initialDuration, setInitialDuration] = useState(0);
	const [postCooldown, setPostCooldown] = useState(0);
	const [autoStart, setAutoStart] = useState(false);
	const [bpm, setBpm] = useState(110);

	useEffect(() => {
		if (initialValues) {
			setLabel(initialValues.label);
			setInitialDuration(initialValues.initialDuration);
			setPostCooldown(initialValues.postCooldown);
		}
	}, [initialValues]);

	if (!show) return null;

	return (
		<Modal onClose={() => {}}>
			<div className="text-white text-sm flex flex-col mx-auto md:w-2/3 min-w-[300px] p-4 ">
				<h1 className="text-lg font-semibold mb-2 text-gray-100">
					Add Timer Phase
				</h1>

				{/* Phase name */}
				<div className="flex flex-col mb-2">
					<label htmlFor="phase-name" className="text-xs text-gray-400 mb-1">
						Phase name
					</label>
					<input
						id="phase-name"
						className="border border-gray-500 rounded p-1 text-sm text-gray-200 focus:outline-none focus:border-gray-300"
						value={label}
						onChange={(e) => setLabel(e.target.value)}
						autoFocus
					/>
				</div>

				{/* Timer duration */}
				<div className="flex flex-col mb-2">
					<label className="text-xs text-gray-400 mb-1">Timer duration</label>
					<div className="flex items-center w-full">
						<button
							className="p-1 border border-gray-500 rounded"
							onClick={() =>
								setInitialDuration((p) => Math.max(1000, p - 1000))
							}
						>
							<MinusIcon size={14} />
						</button>
						<h1 className="scoreboard flex-1 text-center text-sm">
							{formatTime(initialDuration)}
						</h1>
						<button
							className="p-1 border border-gray-500 rounded"
							onClick={() => setInitialDuration((p) => p + 1000)}
						>
							<PlusIcon size={14} />
						</button>
					</div>
					<input
						className="w-full mt-1"
						type="range"
						min="60"
						max="600000"
						step="5000"
						value={initialDuration}
						onChange={(e) => setInitialDuration(e.target.valueAsNumber)}
					/>
				</div>

				{/* Cooldown */}
				<div className="flex flex-col mb-2">
					<label className="text-xs text-gray-400 mb-1">
						Cooldown duration
					</label>
					<div className="flex items-center w-full">
						<button
							className="p-1 border border-gray-500 rounded"
							onClick={() => setPostCooldown((p) => Math.max(0, p - 1000))}
						>
							<MinusIcon size={14} />
						</button>
						<h1 className="scoreboard flex-1 text-center text-sm">
							{postCooldown === 0 ? "None" : formatTime(postCooldown)}
						</h1>
						<button
							className="p-1 border border-gray-500 rounded"
							onClick={() => setPostCooldown((p) => p + 1000)}
						>
							<PlusIcon size={14} />
						</button>
					</div>
					<input
						className="w-full mt-1"
						type="range"
						min="0"
						max="60000"
						step="1000"
						value={postCooldown}
						onChange={(e) => setPostCooldown(e.target.valueAsNumber)}
					/>
				</div>

				{/* Metronome */}
				<div className="flex flex-col mb-2 ">
					<label className="text-xs text-gray-400 mb-1">Metronome</label>
					<div className="flex items-center gap-2 mb-1">
						<Switch
							checked={autoStart}
							onCheckChange={() => setAutoStart(!autoStart)}
							disabled={false}
						/>
						<span className="text-xs text-gray-300">Auto-start</span>
					</div>
					<div className="flex items-center ">
						<button
							className="p-1 border border-gray-500 rounded"
							onClick={() => setBpm((p) => p - 1)}
						>
							<MinusIcon size={14} />
						</button>
						<h1 className="scoreboard flex-1 text-center text-sm">{bpm}</h1>
						<button
							className="p-1 border border-gray-500 rounded"
							onClick={() => setBpm((p) => p + 1)}
						>
							<PlusIcon size={14} />
						</button>
					</div>
					<input
						className="w-full mt-1"
						type="range"
						min="40"
						max="240"
						step="1"
						value={bpm}
						onChange={(e) => setBpm(Number(e.target.value))}
					/>
				</div>

				{/* Buttons */}
				<div className="flex justify-between mt-3 w-full">
					<button
						className="border border-gray-500 rounded px-3 py-1 text-sm text-gray-300"
						onClick={() => setShow(false)}
					>
						Cancel
					</button>
					<button
						className={`rounded px-3 py-1 text-sm border ${
							!label || initialDuration === 0
								? "border-gray-700 text-gray-500 cursor-not-allowed"
								: "border-gray-400 text-gray-100"
						}`}
						onClick={() =>
							onClose({ label, initialDuration, postCooldown, autoStart, bpm })
						}
						disabled={!label || initialDuration === 0}
					>
						Confirm
					</button>
				</div>
			</div>
		</Modal>
	);
};

export default PhaseModal;
