"use client";
import React, { useEffect, useState } from "react";
import Modal from "../../Modal";
import { usePracticeSession } from "@/context/practiceSessionsContext";

const ScoreModal = (props: { scoreData: any; scoreEvents: any }) => {
	const { scoreData, scoreEvents } = props;
	const { setShowScore, aggregateScore } = usePracticeSession();

	return (
		<Modal excludeRefs={[]} onClose={() => setShowScore(false)}>
			<div className="modal_ctn flex justify-center w-full">
				<h1 className="text-2xl font-black">Score:</h1>
				<h2>Wins:</h2>
				<div className="score-wins">{scoreData.wins}</div>
				<h2>Losses:</h2>
				<div className="score-wins">{scoreData.losses}</div>
			</div>
			<div className="score_detail">
				<span>{aggregateScore.pitch}% pitch accuracy</span>
				<span>{aggregateScore.rhythm}% rhythm accuracy</span>
				<span>{aggregateScore.bonus} BONUS!</span>
			</div>
		</Modal>
	);
};

export default ScoreModal;
