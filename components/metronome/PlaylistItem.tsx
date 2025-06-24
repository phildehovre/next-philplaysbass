import { Prisma } from "@/lib/generated/prisma";
import { formatDuration } from "@/lib/utils/songUtils";
import React, { useContext } from "react";
import "./SongCard.scss";
import PlayButton from "./PlayButton";
import { PlayerContext, usePlayer } from "@/context/playerContext";
import { SpotifyPlayer } from "@/types/types";

const PlaylistItem = ({ song }: { song: Prisma.SongCreateInput }) => {
	if (!song || !song.duration) return;

	const context: any = useContext(PlayerContext);

	const duration = formatDuration(song.duration);
	return (
		<div className="songcard">
			<div className="songcard-left">
				<div className="">
					<p className="songcard-title">{song.title}</p>
					<p className="songcard-artist">{song.artist}</p>
				</div>
			</div>
			<div className="songcard-right">
				{duration.minutes}:{duration.seconds}
				{context && context.player && (
					<PlayButton song={song} player={context.player} isShowing={true} />
				)}
			</div>
		</div>
	);
};

export default PlaylistItem;
