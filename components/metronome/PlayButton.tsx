import { PlayCircleIcon, PlayIcon } from "lucide-react";
import React from "react";

const PlayButton = ({
	isShowing,
	handlePlayButtonClick,
}: {
	isShowing: boolean;
	handlePlayButtonClick: () => void;
}) => {
	return (
		<div
			className={`play-button ${isShowing ? "showing" : ""}`}
			onClick={handlePlayButtonClick}
		>
			<PlayIcon />
		</div>
	);
};

export default PlayButton;
