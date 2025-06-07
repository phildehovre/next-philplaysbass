"use client";
import { PlayerContext } from "@/context/playerContext";
import useCookies from "@/hooks/useCookies";
import { PauseIcon, PlayCircleIcon, PlayIcon } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";

const PlayButton = ({
	isShowing,
	player,
	song,
}: {
	song: {};
	isShowing: boolean;
	player: Spotify.Player;
}) => {
	const { setIsPlaying, isPaused, setIsNextSongLoading, setCurrentTrack } =
		useContext<any>(PlayerContext);

	useEffect(() => {
		player.getCurrentState().then((state) => {});
	}, [player]);

	const handlePlayPause = () => {
		player.getCurrentState().then((state) => {
			if (state?.paused) {
				setCurrentTrack(song);
				setIsPlaying(true);
			} else {
				player.pause();
			}
		});
	};

	return (
		<div
			className={`play-button ${isShowing ? "showing" : ""}`}
			onClick={handlePlayPause}
		>
			{!isPaused ? <PauseIcon /> : <PlayIcon />}
		</div>
	);
};

export default PlayButton;
