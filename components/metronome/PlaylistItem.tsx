import { Prisma } from "@/lib/generated/prisma";
import { formatDuration } from "@/lib/utils/songUtils";
import React, { useContext, useState } from "react";
import "./SongCard.scss";
import PlayButton from "./PlayButton";
import { PlayerContext } from "@/context/playerContext";
import { LucideMinusCircle } from "lucide-react";
import { PlaylistWithSongs } from "@/context/playlistContext";

const PlaylistItem = ({
	song,
	handleRemoveFromPlaylist,
	playlist,
}: {
	song: Prisma.SongCreateInput;
	handleRemoveFromPlaylist: (
		id: string,
		song: Prisma.SongCreateInput
	) => Promise<void>;
	playlist: PlaylistWithSongs;
}) => {
	if (!song || !song.duration) return;

	const [isShowing, setIsShowing] = useState(false);
	const context: any = useContext(PlayerContext);

	const duration = formatDuration(song.duration);

	console.log(playlist);
	return (
		<div
			className="songcard"
			onMouseEnter={() => setIsShowing(true)}
			onMouseLeave={() => setIsShowing(false)}
		>
			<div className="songcard-left">
				<div className="">
					<p className="songcard-title">{song.title}</p>
					<p className="songcard-artist">{song.artist}</p>
				</div>
			</div>
			<div className="songcard-right flex items-center">
				{duration.minutes}:{duration.seconds}
				{context && context.player && (
					<PlayButton
						song={song}
						player={context.player}
						isShowing={isShowing}
					/>
				)}
				{isShowing && (
					<LucideMinusCircle
						color={"red"}
						onClick={() => {
							handleRemoveFromPlaylist(playlist.id, song);
						}}
					/>
				)}
			</div>
		</div>
	);
};

export default PlaylistItem;
