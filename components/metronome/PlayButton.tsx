import { PauseIcon, PlayCircleIcon, PlayIcon } from "lucide-react";
import React from "react";

const PlayButton = ({
	isShowing,
	handlePlayButtonClick,
	isPlaying,
	isPaused,
}: {
	isShowing: boolean;
	handlePlayButtonClick: () => void;
	isPlaying: boolean;
	isPaused: boolean;
}) => {
	return (
		<div
			className={`play-button ${isShowing ? "showing" : ""}`}
			onClick={handlePlayButtonClick}
		>
			{isPlaying ? <PauseIcon /> : <PlayIcon />}
		</div>
	);
};

export default PlayButton;
