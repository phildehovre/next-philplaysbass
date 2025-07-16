"use client";
import Metronome from "@/components/metronome/Metronome";
import React, { useState } from "react";
import ChordalPractice from "./games/ChordalPractice";
import Link from "next/link";
import InversionsGame from "./games/InversionsGame";

const GameSelection = (props: any) => {
	const { playlists } = props;
	const [selectedGame, setSelectedGame] = useState("");

	const renderSelectedGame = () => {
		switch (selectedGame) {
			case "metronome":
				return <Metronome playlists={playlists} />;
			case "chordal":
				return <ChordalPractice />;
			case "inversions":
				return <InversionsGame />;

			default:
				break;
		}
	};

	return (
		<div className="h-[10em] w-full flex justify-center items-end text-white mt-[60px]">
			<ul className="tabs flex gap-1 w-full justify-evenly text-2xl ">
				<li className="tab ">
					<Link href="/games/arpeggio">Arpeggio</Link>
				</li>
				<li className="tab ">
					<Link href="/games/chords">Chords</Link>
				</li>
				<li className="tab">
					<Link href="/games/inversions">Inversions</Link>
				</li>
			</ul>
		</div>
	);
};

export default GameSelection;
