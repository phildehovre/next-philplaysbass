import { Song } from "@/lib/generated/prisma";
import React from "react";

const PlaylistItem = ({ song }: { song: Song }) => {
	return (
		<div className="playlist-item_ctn flex justify-between w-full p-2">
			<div className="playlist-item_left">
				<p className="text-l">{song.title}</p>
				<p className="text-sm">{song.artist}</p>
			</div>
			<p>{song.duration || "0:00"}</p>
		</div>
	);
};

export default PlaylistItem;
