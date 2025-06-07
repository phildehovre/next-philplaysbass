"use client";
import { PlayerContext } from "@/context/playerContext";
import { SongData } from "@/types/types";
import { PauseIcon, PlayCircleIcon, PlayIcon } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";

const PlayButton = ({
	isShowing,
	player,
	song,
}: {
	song: SongData;
	isShowing: boolean;
	player: Spotify.Player;
}) => {
	const {
		currentTrack,
		setIsPlaying,
		isPaused,
		setIsNextSongLoading,
		setCurrentTrack,
		spotifyTrack,
		play,
	} = useContext<any>(PlayerContext);

	useEffect(() => {
		player.getCurrentState().then((state) => {});
	}, [player]);

	const handlePlayPause = () => {
		player.getCurrentState().then((state) => {
			if (
				!state?.paused &&
				currentTrack &&
				currentTrack.song_title !== song.song_title
			) {
				setCurrentTrack(song);
				setIsPlaying(true);
			}
			if (state?.paused) {
				if (currentTrack && currentTrack.song_title === song.song_title) {
					play(state?.position);
					return;
				}
				setCurrentTrack(song);
				setIsPlaying(true);
			} else {
				player.pause();
				setIsPlaying(false);
			}
		});
	};

	return (
		<div
			className={`play-button ${isShowing ? "showing" : ""}`}
			onClick={handlePlayPause}
		>
			{!isPaused && currentTrack.song_title == song.song_title ? (
				<PauseIcon />
			) : (
				<PlayIcon />
			)}
		</div>
	);
};

export default PlayButton;
