"use client";

import React, { useEffect, useRef, useState } from "react";
import "./GameStyles.css";
import { QUALITY, ScaleQuality } from "@/constants/chromaticScale";
import { PlusIcon } from "lucide-react";
import PitchyComponent from "./PitchyComponent";
import AnimatedNumber from "./ui/AnimatedNumber";
import Switch from "../Switch";
import { usePracticeSession } from "@/context/practiceSessionsContext";
import Spinner from "../Spinner";
import Clockface from "./ui/Clockface";
import Countdown from "./ui/Countdown";
import MetroWidget from "./ui/MetroWidget";
import StreakManager from "./ui/StreakManager";
import GameOptionsSwitches from "./ui/NoteMatchOptionsSwitches";
import { useNoteMatchGameContext } from "@/context/noteMatchGameContext";
import GameContainer from "./ui/GameContainer";
import { handleTabClose } from "@/lib/utils";

const NoteMatchGame = () => {
	const [displayedDuration, setDisplayedDuration] = useState<number>(5000);
	const [duration, setDuration] = useState<number>(displayedDuration);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const {
		score: totalScore,
		finishSession,
		isFirstTimeUser,
	} = usePracticeSession();

	const game = useNoteMatchGameContext();
	const { state, setters, actions } = game;

	useEffect(() => {
		handleTabClose(finishSession);
	}, [finishSession]);

	const renderFilters = () =>
		QUALITY.map((filter, index) => (
			<button
				className={`filter_btn ${
					state.selectedQualities.indexOf(filter) !== -1 ? "active" : ""
				}`}
				key={filter + index}
				onClick={() =>
					setters.setSelectedQualities((prev: ScaleQuality[]) =>
						state.selectedQualities.includes(filter)
							? state.selectedQualities.filter(
									(f: ScaleQuality) => f !== filter
							  )
							: [...prev, filter]
					)
				}
			>
				<span className="flex items-center">
					<PlusIcon
						size={16}
						className={`filter_icon ${
							state.selectedQualities.includes(filter) ? "active" : ""
						}`}
					/>
					{filter.slice(0, 3)}
				</span>
			</button>
		));

	return (
		<GameContainer>
			<div className="game_header flex flex-col justify-center gap-2 w-full">
				<label
					htmlFor="state.isPracticeMode"
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

			<div className="scoreboard_ctn flex w-full ">
				<div className="scoreboard flex items-center font-mono w-full">
					<label className="text-sm">Session score</label>
					<AnimatedNumber
						data={totalScore.bonus + totalScore.pitch + totalScore.rhythm}
					/>
				</div>
				<div className="scoreboard flex items-center font-mono w-full">
					<label className="text-sm">Tally</label>
					<AnimatedNumber data={state.score.losses} />:
					<AnimatedNumber data={state.score.wins} />
				</div>
			</div>
			<GameOptionsSwitches state={state} setters={setters} />
			{state.withMetronome && (
				<MetroWidget
					gameStarted={state.gameStarted}
					play={state.countdown || state.gameStarted}
					bpm={state.bpm}
					setBpm={setters.setBpm}
					lastTickTime={state.lastTickTime}
					setLastTickTime={setters.setLastTickTime}
				/>
			)}
			{state.withTimer && (
				<div className="flex w-full">
					<h1 className="scoreboard timer w-12 text-xs flex items-center">
						{displayedDuration / 1000} s
					</h1>
					<input
						className="w-full"
						type="range"
						min="10"
						max="100"
						onChange={(e) => setDisplayedDuration(e.target.valueAsNumber * 100)}
						onMouseUp={() => setDuration(displayedDuration)}
					/>
				</div>
			)}
			<Clockface
				showPulse={state.showPulse}
				withTimer={state.withTimer}
				progress={state.progress}
				gameStarted={state.gameStarted}
			>
				<StreakManager />
				<div className={`game_question inversions `}>
					{isLoading ? (
						<Spinner />
					) : (
						<>
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
											bpm={state.bpm}
											onCountdownFinished={actions.startGame}
										/>
									)}
								</button>
							) : (
								<button
									onClick={actions.stopGame}
									className="game_btn stop-game_btn inversions"
								>
									Stop
								</button>
							)}
							<div className={`note ${state.showShake ? "shake-error" : ""}`}>
								{state.selectedNote}
							</div>
							{state.withArpeggios && (
								<div className="quality">{state.questionQuality}</div>
							)}
							{state.withInversions && (
								<div className="inversion text-red-600 w-full h-full text-2xl">
									{state.questionInversion}
								</div>
							)}
							{state.withArpeggios && state.gameStarted && (
								<div className="arpeggio-progress_ctn flex gap-1 max-w-[50px] w-full justify-between">
									{[0, 1, 2].map((i) => (
										<div
											key={i}
											className={`dot ${
												state.arpeggioPlayed.length > i ? "checked" : ""
											}`}
										></div>
									))}
								</div>
							)}
						</>
					)}
				</div>
			</Clockface>

			{state.withArpeggios && (
				<>
					<label htmlFor="scale_types">
						Select scales:
						<div id="scale_types" className="qualities_ctn flex">
							{renderFilters()}
						</div>
					</label>
				</>
			)}
			<PitchyComponent
				showDevices={true}
				onNoteDetection={actions.onNoteDetection}
			/>
		</GameContainer>
	);
};

export default NoteMatchGame;
