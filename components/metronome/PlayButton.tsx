"use client";

import { PlayerContext } from "@/context/playerContext";
import { PauseIcon, PlayIcon } from "lucide-react";
import { useContext } from "react";
import { SongData } from "@/types/types";

const PlayButton = ({
	isShowing,
	song,
}: {
	isShowing: boolean;
	song: SongData;
}) => {
	const { isPaused, playSong, currentTrack, pause, spotifyTrack } =
		useContext(PlayerContext);

	const isCurrentSong = currentTrack?.song_title === song.song_title;

	const handleClick = async () => {
		if (!isCurrentSong) {
			await playSong(song); // ✅ New logic: set song, wait for fetch, then play
		} else {
			isPaused ? await playSong(song) : await pause();
		}
	};

	return (
		<div
			className={`play-button ${isShowing ? "showing" : ""}`}
			onClick={handleClick}
		>
			{isPaused || !isCurrentSong ? <PlayIcon /> : <PauseIcon />}
		</div>
	);
};

export default PlayButton;
