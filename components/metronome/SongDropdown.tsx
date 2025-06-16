import React, { useState } from "react";
import "./SongDropdown.css";
import { v4 as uuidv4 } from "uuid";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuPortal,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
	DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { EllipsisVertical } from "lucide-react";
import { Playlist, Song, SongData } from "@/types/types";
import { getSpotifyTrackByArtistAndTitle } from "@/services/Spotify";
import useCookies from "@/hooks/useCookies";
import { useAddSongToPlaylist, useCreatePlaylist } from "@/hooks/usePlaylist";

const SongDropdown = ({
	playlists,
	setShowSongPortal,
	song,
}: {
	playlists: any;
	setShowSongPortal: (p: boolean) => void;
	song: Song;
}) => {
	const [showSongDropdown, setShowSongDropdown] = useState(false);
	const [isAdding, setIsAdding] = useState(false);

	const { getCookie } = useCookies();
	const addSongMutation = useAddSongToPlaylist();

	const handleAddToPlaylist = async (playlist: Playlist, song: Song) => {
		setIsAdding(true);
		const token = JSON.parse(getCookie("token") || "{}")?.access_token;
		const spotifyUri = await getSpotifyTrackByArtistAndTitle(
			song.song_title,
			song.artist.name,
			token
		);

		try {
			if (!spotifyUri) {
				throw new Error("There was an error getting through to Spotify!");
			}
			await addSongMutation.mutateAsync({
				playlistId: playlist.id,
				song: {
					externalId: song.song_id,
					title: song.song_title,
					artist: song.artist.name,
					uri: song.song_uri,
					tempo: parseInt(song.tempo),
					// spotify_uri: spotifyUri.,
				},
			});

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
