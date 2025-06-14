"use client";

import { PlayerContext } from "@/context/playerContext";
import { Song, SongData } from "@/types/types";
import { PauseIcon, PlayIcon } from "lucide-react";
import React, { useContext } from "react";

const PlayButton = ({
	isShowing,
	player,
	song,
}: {
	song: Song;
	isShowing: boolean;
	player: Spotify.Player;
}) => {
	const {
		setResumePosition,
		resumePosition,
		currentTrack,
		setIsPlaying,
		isPaused,
		setCurrentTrack,
		play,
	} = useContext<any>(PlayerContext);

	const handlePlayClick = async () => {
		const state = await player.getCurrentState();
		const isDifferentTrack = currentTrack?.song_title !== song.song_title;

		if (!isDifferentTrack && state?.paused) {
			play(resumePosition);
		}

		if (isDifferentTrack) {
			setCurrentTrack(song);
			setIsPlaying(true);
			setResumePosition(0);
			return;
		}

		if (state?.paused) {
			play(resumePosition);
			setIsPlaying(true);
		}
	};

	const handlePauseClick = async () => {
		const state = await player.getCurrentState();
		await player.pause();
		setIsPlaying(false);
		setResumePosition(state?.position);
	};

	const isCurrentSong = currentTrack?.song_title === song.song_title;
	const showPause = isCurrentSong && !isPaused;

	return (
		<div className={`play-button ${isShowing ? "showing" : ""}`}>
			{showPause ? (
				<button onClick={handlePauseClick}>
					<PauseIcon />
				</button>
			) : (
				<button onClick={handlePlayClick}>
					<PlayIcon />
				</button>
			)}
		</div>
	);
};

export default PlayButton;
