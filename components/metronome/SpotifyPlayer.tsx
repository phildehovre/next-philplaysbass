"use client";
import React, { useState, useContext, useEffect } from "react";
import { PlayerContext } from "@/context/playerContext";
import "./SpotifyPlayer.css";
import { Slider } from "../ui/slider";
import PlayButton from "./PlayButton";
import { Glegoo } from "next/font/google";
import { toast } from "sonner";

const SpotifyPlayer = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [position, setPosition] = useState<number>(0);
	const {
		isNextSongLoading,
		player,
		spotifyTrack,
		currentTrack,
		resumePosition,
	} = useContext<any>(PlayerContext);

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

	useEffect(() => {
		setTimeout(() => {
			if (!player || isNextSongLoading) return;
			player.getCurrentState().then((state: any) => {
				if (
					currentTrack.artist.name !==
					state.track_window.current_track.artists[0].name
				) {
					toast(
						`Mismatch: Showing: ${currentTrack.artist.name}, Playing: ${state.track_window.current_track.artists[0].name}`
					);
				}
			});
		}, 2000);
	}, [player, isNextSongLoading, spotifyTrack]);

	return (
		<div className={`player_ctn ${isOpen ? "open" : ""}`}>
			<div className="header">
				<h1>{spotifyTrack?.name}</h1>
				<p>{spotifyTrack?.artists[0].name}</p>
				<p></p>
				<Slider value={[position]} max={100} step={1} />
			</div>
		</div>
	);
};

export default SpotifyPlayer;
