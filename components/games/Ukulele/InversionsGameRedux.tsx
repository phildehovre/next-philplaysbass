"use client";

import React from "react";
import { Square } from "lucide-react";
import Clockface from "../ui/Clockface";
import Countdown from "../ui/Countdown";
import AnimatedNumber from "../ui/AnimatedNumber";
import PitchyComponentRedux from "./PitchyComponentRedux";
import UkeDiagramWithNotes from "./DetectedNotesDisplay";
import { QUALITY } from "@/constants/musicConstants";
import "./GameStylesRedux.css";
import { useNoteMatchGame } from "@/hooks/game-hooks/useNoteMatchGame";
import { NOTE_MATCH_TYPE } from "@/constants/gameConfigConstants";

const ChordDetectionGame = () => {
	const game = useNoteMatchGame();
	const {
		state: {
			selectedNote,
			questionQuality,
			questionArpeggio,
			withTimer,
			score,
			selectedQualities,
			gameStarted,
			showPulse,
			countdown,
		},
		setters: { setSelectedQualities, setCountdown },
		actions: { startGame, stopGame, onNoteDetection },
		progress,
	} = game;

	return (
		<div className="game_ctn max-w-[24em]">
			{/* === Scoreboard === */}
			<div className="scoreboard text-2xl font-mono relative">
				<AnimatedNumber data={score.wins} />
				{gameStarted && (
					<button onClick={stopGame} className="stop-game_btn">
						<Square />
					</button>
				)}
			</div>

			{/* === Clockface and main game area === */}
			<Clockface game={game} gameType={NOTE_MATCH_TYPE} progress={progress}>
				<div className="game_question inversions">
					{(() => {
						if (!gameStarted) {
							return (
								<button
									onClick={() => setCountdown(true)}
									className="game_btn start-game_btn text-yellow-600"
								>
									{!countdown ? (
										"start"
									) : (
										<Countdown
											value={4}
											bpm={60}
											onCountdownFinished={startGame}
										/>
									)}
								</button>
							);
						}

						// Game running
						return (
							<>
								<div className="note">{selectedNote}</div>
								<div className="quality">{questionQuality}</div>
							</>
						);
					})()}
				</div>
			</Clockface>

			{/* === Ukulele Diagram === */}
			<UkeDiagramWithNotes
				questionNotes={questionArpeggio}
				chord={undefined}
				detectedNotes={[]}
			/>

			{/* === Scale Quality Filters === */}
			<label htmlFor="scale_types">
				Select qualities:
				<div id="scale_types" className="qualities_ctn flex">
					{QUALITY.map((filter, i) => (
						<button
							key={filter + i}
							className={`filter_btn ${
								selectedQualities.includes(filter) ? "active" : ""
							}`}
							onClick={() =>
								setSelectedQualities((prev) =>
									prev.includes(filter)
										? prev.filter((f) => f !== filter)
										: [...prev, filter]
								)
							}
						>
							{filter}
						</button>
					))}
				</div>
			</label>

			{/* === Pitch Detection === */}
			<PitchyComponentRedux
				showDevices={true}
				onNoteDetection={onNoteDetection}
			/>
		</div>
	);
};

export default ChordDetectionGame;
