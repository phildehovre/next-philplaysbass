"use client";
import "./Sidebar.css";
import React, { useEffect, useRef, useState } from "react";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
} from "@/components/ui/sidebar";
import Spinner from "../Spinner";
import Modal from "../Modal";
import "../Modal.css";
import { PlaylistWithSongs, usePlaylists } from "@/context/playlistContext";
import { exportPlaylistToSpotify } from "@/services/Spotify";
import useCookies from "@/hooks/useCookies";
import PlaylistItem from "./PlaylistItem";
import { Trash, Trash2 } from "lucide-react";

const MetroSidebar = () => {
	const [selectedPlaylist, setSelectedPlaylist] = useState<PlaylistWithSongs>();
	const [playlistUris, setPlaylistUris] = useState<string[]>([]);
	const [token, setToken] = useState<string>("");
	const [confirmDelete, setConfirmDelete] = useState(false);

	const {
		playlists: ctxPlaylists,
		refreshPlaylists,
		removeFromPlaylist,
	} = usePlaylists();
	const dropdownRefs = useRef<Array<React.RefObject<HTMLDivElement>>>([]);
	const { getCookie } = useCookies();

	useEffect(() => {
		refreshPlaylists();
		const res = getCookie("token");
		if (!res) return;

		const { access_token } = JSON.parse(res);
		setToken(access_token);
	}, []);

	useEffect(() => {
		if (selectedPlaylist) {
			renderPlaylistSongs(selectedPlaylist);
		}
	}, [selectedPlaylist]);

	useEffect(() => {
		setSelectedPlaylist((prev) =>
			ctxPlaylists.find((pl) => pl.id === prev?.id)
		);
	}, [ctxPlaylists]);

	useEffect(() => {
		let array: string[] = [];
		if (selectedPlaylist) {
			selectedPlaylist.songs.forEach((item) => array.push(item.spotifyUri));
		}
		setPlaylistUris(array);
	}, [selectedPlaylist]);

	const renderPlaylists = () => {
		return ctxPlaylists.map((pl, index) => {
			return (
				<div
					key={`${pl.id}-${pl.createdAt}-${index}`}
					className="playlist-card hover:opacity-45 cursor-pointer"
					onClick={() => setSelectedPlaylist(pl)}
				>
					<p className="playlist-card_title">{pl.name}</p>
				</div>
			);
		});
	};

	const renderPlaylistSongs = (pl: PlaylistWithSongs) => {
		if (!pl?.songs) return null;

		return pl.songs.map((song, index) => {
			return (
				<PlaylistItem
					key={`${pl.id}-${song.getSongBpmId}`}
					song={song}
					playlist={pl}
					handleRemoveFromPlaylist={removeFromPlaylist}
				/>
			);
		});
	};

	return (
		<Sidebar side="right" className="sidebar_main">
			<SidebarHeader title="Playlists" />
			<SidebarContent>
				<h1 className="text-3xl">Playlists</h1>
				{ctxPlaylists ? renderPlaylists() : <Spinner />}
				{selectedPlaylist && (
					<Modal
						onClose={() => setSelectedPlaylist(undefined)}
						excludeRefs={dropdownRefs.current}
					>
						<div className="modal_header flex gap-1">
							<h1 className="text-3xl w-50">{selectedPlaylist.name}</h1>
							<div className="btn_ctn flex gap-2 w-50">
								{!confirmDelete ? (
									<>
										<button
											className="submit_btn"
											onClick={() =>
												exportPlaylistToSpotify(
													selectedPlaylist.name,
													playlistUris,
													token
												)
											}
										>
											Export
										</button>
										<button
											onClick={() => setConfirmDelete(true)}
											className="submit_btn"
										>
											<Trash2 color="black" />
										</button>
									</>
								) : (
									<>
										<button onClick={() => console.log("hello")}>yes</button>
										<button onClick={() => setConfirmDelete(false)}>no</button>
									</>
								)}
							</div>
						</div>
						<div className="playlist_list flex flex-col justify-start overflow-y-scroll max-h-[70svh] ">
							{renderPlaylistSongs(selectedPlaylist)}
						</div>
					</Modal>
				)}
			</SidebarContent>
			<SidebarFooter />
		</Sidebar>
	);
};

export default MetroSidebar;
