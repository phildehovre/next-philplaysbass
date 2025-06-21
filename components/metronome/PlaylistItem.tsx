import { Prisma } from "@/lib/generated/prisma";
import { formatDuration } from "@/lib/utils/songUtils";
import React from "react";

const PlaylistItem = ({ song }: { song: Prisma.SongCreateInput }) => {
	if (!song || !song.duration) return;

	const duration = formatDuration(song.duration);
	return (
		<div className="playlist-item_ctn flex justify-between w-full p-2">
			<div className="playlist-item_left">
				<p className="text-l">{song.title}</p>
				<p className="text-sm">{song.artist}</p>
			</div>
			<p>
				{duration.minutes}:{duration.seconds}
			</p>
		</div>
	);
};

export default PlaylistItem;
