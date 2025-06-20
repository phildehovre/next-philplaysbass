"use client";
import React, { useState } from "react";
import "./SongDropdown.css";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuPortal,
	DropdownMenuSeparator,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
	DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { EllipsisVertical } from "lucide-react";
import { GSBSong, Playlist } from "@/types/types";
import { getSpotifyTrackByArtistAndTitle } from "@/services/Spotify";
import useCookies from "@/hooks/useCookies";
import { addSongToPlaylist } from "@/actions/playlistActions";
import { usePlaylists } from "@/context/playlistContext";
import {
	mapGSBSongToSongInput,
	mapSpotifyFieldsToSongInput,
} from "@/lib/utils/songUtils";
import { Track } from "spotify-api.js";
import { Prisma } from "@/lib/generated/prisma";

const SongDropdown = ({
	playlists,
	setShowSongPortal,
	song,
}: {
	playlists: any;
	setShowSongPortal: (p: boolean) => void;
	song: Prisma.SongCreateInput;
}) => {
	const [showSongDropdown, setShowSongDropdown] = useState(false);
	const [isAdding, setIsAdding] = useState(false);

	const { getCookie } = useCookies();
	const { addSongToPlaylist: ctxAddSongToPlaylist, playlists: ctxPlaylists } =
		usePlaylists();

	const handleAddToPlaylist = async (
		playlist: Playlist,
		song: Prisma.SongCreateInput
	) => {
		setIsAdding(true);
		const token = JSON.parse(getCookie("token") || "{}")?.access_token;
		const res: any = await getSpotifyTrackByArtistAndTitle(
			song.title,
			song.artist,
			token
		);

		if (!res) return;
		var spotifyTrack: Track & { duration_ms: number } = res[0];

		try {
			if (!spotifyTrack) {
				throw new Error("There was an error getting through to Spotify!");
			}

			const mapped = mapSpotifyFieldsToSongInput(
				song,
				spotifyTrack.uri,
				spotifyTrack.duration_ms
			);
			ctxAddSongToPlaylist(playlist.id, song);

			const result = await addSongToPlaylist(playlist.id, mapped);
			if (!result) {
				console.log("Failed to add song to db");
				return;
			}

			console.log("✅ Song added to playlist!");
		} catch (err) {
			console.error("❌ Error adding song to playlist:", err);
		} finally {
			setIsAdding(false);
		}
	};

	const renderPlaylists = () => {
		return playlists.map((item: any, index: number) => {
			return (
				<DropdownMenuItem
					key={item.name + index}
					onClick={() => handleAddToPlaylist(item, song)}
				>
					{item.name}
				</DropdownMenuItem>
			);
		});
	};
	return (
		<>
			<DropdownMenu>
				<DropdownMenuTrigger className="song-dropdown_trigger">
					<EllipsisVertical
						onClick={() => setShowSongDropdown(!showSongDropdown)}
					/>
				</DropdownMenuTrigger>
				<DropdownMenuContent className="song-dropdown_ctn">
					<DropdownMenuItem className="song-dropdown_item">
						Nothing yet
					</DropdownMenuItem>
					<DropdownMenuSub>
						<DropdownMenuSubTrigger className="song-dropdown_item">
							Add to playlist
						</DropdownMenuSubTrigger>
						<DropdownMenuPortal>
							<DropdownMenuSubContent className="song-dropdown_ctn">
								<DropdownMenuItem
									className="song-dropdown_item"
									onClick={() => setShowSongPortal(true)}
								>
									New...
								</DropdownMenuItem>
								{playlists?.length > 0 && renderPlaylists()}
								<DropdownMenuSeparator />
								<DropdownMenuItem className="song-dropdown_item">
									More...
								</DropdownMenuItem>
							</DropdownMenuSubContent>
						</DropdownMenuPortal>
					</DropdownMenuSub>
					<DropdownMenuItem className="song-dropdown_item">
						More...
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</>
	);
};

export default SongDropdown;
