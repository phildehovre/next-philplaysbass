"use client";
import Metronome from "@/components/metronome/Metronome";
import React, { useState } from "react";
import ChordalPractice from "./games/ChordalPractice";
import Link from "next/link";

const GameSelection = (props: any) => {
	const { playlists } = props;
	const [selectedGame, setSelectedGame] = useState("");

	const renderSelectedGame = () => {
		switch (selectedGame) {
			case "metronome":
				return <Metronome playlists={playlists} />;
			case "chordal":
				return <ChordalPractice />;

			default:
				break;
		}
	};

	return (
		<div className="h-[10em] w-full flex justify-center items-end text-white mt-[60px]">
			<ul className="tabs flex gap-1">
				<li className="tab bg-green-700 rounded w-full p-5">
					<Link href="/games/arpeggio">Arpeggio</Link>
				</li>
				<li className="tab bg-green-700 rounded ">
					<Link href="/games/chords">Chords</Link>
				</li>
				<li className="tab" onClick={() => setSelectedGame("chordal")}></li>
			</ul>
			<div className="game_ctn">{renderSelectedGame()}</div>
		</div>
	);
};

export default GameSelection;
