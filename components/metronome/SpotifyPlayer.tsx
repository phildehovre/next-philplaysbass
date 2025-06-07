"use client";
import React, { useState, useContext, useEffect } from "react";
import { PlayerContext } from "@/context/playerContext";
import "./SpotifyPlayer.css";
import { Slider } from "../ui/slider";
import { toast } from "sonner";

const SpotifyPlayer = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [position, setPosition] = useState<number[]>();
	const [sliderValue, setSliderValue] = useState<number | undefined>();
	const { isNextSongLoading, player, spotifyTrack, currentTrack, play } =
		useContext<any>(PlayerContext);

	useEffect(() => {
		if (currentTrack) {
			setIsOpen(true);
		} else {
			return;
		}
	}, [currentTrack]);

	useEffect(() => {
		if (!player) return;

		let interval: NodeJS.Timeout;

		const pollPosition = async () => {
			const state = await player.getCurrentState();
			if (!state || state.paused || !state.duration) {
				return; // Don't poll if not playing
			}

			interval = setInterval(async () => {
				const currentState = await player.getCurrentState();
				if (!currentState || currentState.paused) {
					clearInterval(interval); // stop polling if paused
					return;
				}

				const { position, duration } = currentState;
				const percent = (position / duration) * 100;

				setSliderValue(percent);
				setPosition(position);
			}, 500);
		};

		pollPosition();

		return () => clearInterval(interval);
	}, [player]);

	useEffect(() => {
		setTimeout(() => {
			if (!player || isNextSongLoading) return;
			player.getCurrentState().then((state: any) => {
				if (
					currentTrack?.artist.name !==
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
				<Slider
					value={[sliderValue]}
					max={100}
					step={1}
					onValueChange={(value) => setSliderValue(value[0])}
					onValueCommit={(value) => {
						// Seek on release
						const newPosition = (value[0] / 100) * duration;
						player.seek(newPosition);
						setPosition(newPosition);
					}}
				/>
			</div>
		</div>
	);
};

export default SpotifyPlayer;
