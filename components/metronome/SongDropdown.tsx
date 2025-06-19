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
import { mapGSBSongToSongInput } from "@/lib/utils/songUtils";

const SongDropdown = ({
	playlists,
	setShowSongPortal,
	song,
}: {
	playlists: any;
	setShowSongPortal: (p: boolean) => void;
	song: GSBSong;
}) => {
	const [showSongDropdown, setShowSongDropdown] = useState(false);
	const [isAdding, setIsAdding] = useState(false);

	const { getCookie } = useCookies();
	const { addSongToPlaylist: ctxAddSongToPlaylist } = usePlaylists();

	const handleAddToPlaylist = async (playlist: Playlist, song: GSBSong) => {
		setIsAdding(true);
		const token = JSON.parse(getCookie("token") || "{}")?.access_token;
		const spotifyTrack = await getSpotifyTrackByArtistAndTitle(
			song.song_title,
			song.artist.name,
			token
		);

		try {
			if (!spotifyTrack) {
				throw new Error("There was an error getting through to Spotify!");
			}

			console.log(song);

			const mapped = mapGSBSongToSongInput(
				song,
				spotifyTrack.uri,
				spotifyTrack.duration
			);
			// Directyl add song for optimistic update
			ctxAddSongToPlaylist(playlist.id, mapped);

			// Create song in db in the background
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
