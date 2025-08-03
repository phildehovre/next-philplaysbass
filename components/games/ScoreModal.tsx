"use client";
import React, { useEffect, useState } from "react";
import Modal from "../Modal";
import { usePracticeSession } from "@/context/practiceSessionsContext";
import { processTotalScore } from "@/lib/utils/gameUtils";

const ScoreModal = (props: { scoreData: any; scoreEvents: any }) => {
	const [result, setResult] = useState<{}>();
	const { scoreData, scoreEvents } = props;
	const { setShowScore, showScore } = usePracticeSession();

	useEffect(() => {
		setResult(processTotalScore(scoreEvents));
	}, []);

	console.log(result);

	return (
		<Modal excludeRefs={[]} onClose={() => setShowScore(false)}>
			<div className="modal_ctn flex justify-center w-full">
				{/* <h1 className="text-2xl font-black">Score:</h1>
				<h2>Wins:</h2>
				<div className="score-wins">{scoreData.wins}</div>
				<h2>Losses:</h2>
				<div className="score-wins">{scoreData.losses}</div> */}
			</div>
		</Modal>
	);
};

export default ScoreModal;
