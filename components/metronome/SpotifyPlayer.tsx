"use client";
import React, { useState, useContext, useEffect } from "react";
import { PlayerContext } from "@/context/playerContext";
import "./SpotifyPlayer.css";
import { Slider } from "../ui/slider";
import PlayButton from "./PlayButton";

const SpotifyPlayer = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [position, setPosition] = useState<number>(0);
	const { player, spotifyTrack, currentTrack, resumePosition } =
		useContext<any>(PlayerContext);

	useEffect(() => {
		if (currentTrack) {
			setIsOpen(true);
		} else {
			return;
		}
	}, [currentTrack]);

	useEffect(() => {
		const interval = setInterval(() => {
			player?.getCurrentState().then((state: any) => {
				if (state && state.duration > 0) {
					const percent = (state.position / state.duration) * 100;
					setPosition(percent);
				}
			});
		}, 250);

		return () => clearInterval(interval); // clean up
	}, [player]);

	return (
		<div className={`player_ctn ${isOpen ? "open" : ""}`}>
			<div className="header">
				<h1>{currentTrack?.song_title}</h1>
				<p>{currentTrack?.artist.name}</p>
				<Slider value={[position]} max={100} step={1} />
			</div>
		</div>
	);
};

export default SpotifyPlayer;
