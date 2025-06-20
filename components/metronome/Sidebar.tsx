"use client";
import "./Sidebar.css";
import React, { useEffect, useState } from "react";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
} from "@/components/ui/sidebar";
import Spinner from "../Spinner";
import Modal from "../Modal";
import "../Modal.css";
import PlaylistItem from "./PlaylistItem";
import { PlaylistWithSongs, usePlaylists } from "@/context/playlistContext";

const MetroSidebar = () => {
	const [selectedPlaylist, setSelectedPlaylist] = useState<PlaylistWithSongs>();
	const { playlists: ctxPlaylists, refreshPlaylists } = usePlaylists();

	useEffect(() => {
		refreshPlaylists();
	}, []);

	useEffect(() => {
		if (selectedPlaylist) {
			renderPlaylistSongs(selectedPlaylist);
		}
	}, [selectedPlaylist]);

	const renderPlaylists = () => {
		return ctxPlaylists.map((pl, index) => {
			return (
				<div
					key={pl.id}
					className="playlist-card"
					onClick={() => setSelectedPlaylist(pl)}
				>
					<p className="playlist-card_title">{pl.name}</p>
				</div>
			);
		});
	};

	const renderPlaylistSongs = (pl: PlaylistWithSongs) => {
		if (!pl?.songs) return null;

		return pl.songs.map((song) => {
			return <PlaylistItem key={`${pl.id}-${song.getSongBpmId}`} song={song} />;
		});
	};

	return (
		<Sidebar side="right" className="sidebar_main">
			<SidebarHeader title="Playlists" />
			<SidebarContent>
				<h1>Playlists</h1>
				{ctxPlaylists ? renderPlaylists() : <Spinner />}
				{selectedPlaylist && (
					<Modal onClose={() => setSelectedPlaylist(undefined)}>
						<h1>{selectedPlaylist.name}</h1>
						{renderPlaylistSongs(selectedPlaylist)}
					</Modal>
				)}
			</SidebarContent>
			<SidebarFooter />
		</Sidebar>
	);
};

export default MetroSidebar;
