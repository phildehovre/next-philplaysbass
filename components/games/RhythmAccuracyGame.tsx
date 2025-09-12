"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import "./GameStyles.css";
import "../metronome/metronome.scss";
import PitchyComponent from "./PitchyComponent";
import AnimatedNumber from "./ui/AnimatedNumber";
import Switch from "../Switch";
import { usePracticeSession } from "@/context/practiceSessionsContext";
import Clockface from "./ui/Clockface";
import Countdown from "./ui/Countdown";
import MetroWidget from "./ui/MetroWidget";
import ScoreModal from "./ui/ScoreModal";
import { NoteInfo } from "@/types/types";
import GameContainer from "./ui/GameContainer";
import { useRhythmAccuracyGameContext } from "@/context/rhythmAccuracyGameContext";

const RhythmAccuracyGame = () => {
	const [isTabVisible, setIsTabVisible] = useState<boolean>(true);

	const { events, showScore, finishSession, scoreEvents, bpm, setBpm } =
		usePracticeSession();

	const game = useRhythmAccuracyGameContext();
	const { state, setters, actions } = game;

	useEffect(() => {
		const handleVisibilityChange = () => {
			setIsTabVisible(!document.hidden);
			console.log("visibility change");
			if (document.hidden) finishSession();
		};
		const handleBeforeUnload = () => {
			console.log("unloading");
			finishSession();
		};
		document.addEventListener("visibilitychange", handleVisibilityChange);
		window.addEventListener("beforeunload", handleBeforeUnload);
		return () => {
			document.removeEventListener("visibilitychange", handleVisibilityChange);
			window.removeEventListener("beforeunload", handleBeforeUnload);
		};
	}, []);

	const forwardNoteDetection = (note: NoteInfo) => {
		actions.onNoteDetection(note, bpm);
	};

	return (
		<GameContainer>
			<div className="gsap-element game_header flex flex-col justify-center gap-2 w-full">
				<label
					htmlFor="isPracticeMode"
					className="flex justify-center gap-2 m-auto"
				>
					<Switch
						disabled={state.gameStarted}
						checked={state.isPracticeMode}
						onCheckChange={setters.setIsPracticeMode}
					/>
					<p
						style={{
							color: state.isPracticeMode ? "var(--clr-brand)" : "gray",
						}}
					>
						Practice mode
					</p>
				</label>
			</div>

			<div className="gsap-element scoreboard text-2xl font-mono w-full">
				<AnimatedNumber data={state.score.losses} />:
				<AnimatedNumber data={state.score.wins} />
			</div>

			<Clockface
				showPulse={state.showPulse}
				progress={state.progress}
				gameStarted={state.gameStarted}
				className="gsap-element"
			>
				<div className={`game_question inversions `}>
					{!state.gameStarted ? (
						<button
							onClick={() => setters.setCountdown(true)}
							className="game_btn start-game_btn metro-btn "
						>
							{!state.countdown ? (
								"Start"
							) : (
								<Countdown
									value={4}
									bpm={bpm}
									onCountdownFinished={actions.startGame}
								/>
							)}
						</button>
					) : (
						<button
							onClick={actions.stopGame}
							className="game_btn stop-game_btn"
						>
							Stop
						</button>
					)}
				</div>
			</Clockface>
			<div className="gsap-element w-full">
				<MetroWidget
					gameStarted={state.gameStarted}
					play={state.countdown || state.gameStarted}
					bpm={bpm}
					setBpm={setBpm}
					lastTickTime={state.lastTickTime}
					setLastTickTime={setters.setLastTickTime}
				/>
			</div>

			<div className="gsap-element w-full">
				<PitchyComponent
					showDevices={true}
					onNoteDetection={forwardNoteDetection}
				/>
			</div>
			{!state.gameStarted && showScore && events.length && (
				<ScoreModal scoreData={state.finalScore} scoreEvents={scoreEvents} />
			)}
		</GameContainer>
	);
};

export default RhythmAccuracyGame;
