"use client";
import "./Sidebar.css";
import React, { useEffect, useState } from "react";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
} from "@/components/ui/sidebar";
import { Playlist } from "@/types/types";
import Spinner from "../Spinner";
import Modal from "../Modal";
import "../Modal.css";
import PlaylistItem from "./PlaylistItem";
import { PlaylistSong } from "@/lib/generated/prisma";
import { Song } from "@/lib/generated/prisma";

type PlaylistWithSongs = Playlist & {
	songs: (PlaylistSong & {
		song: Song;
	})[];
};

const MetroSidebar = ({ playlists }: { playlists: PlaylistWithSongs[] }) => {
	const [componentPlaylists, setComponentPlaylists] = useState<Playlist[]>([]);
	const [selectedPlaylist, setSelectedPlaylist] = useState<Playlist | null>(
		null
	);

	useEffect(() => {
		if (playlists && playlists.length != 0) {
			setComponentPlaylists(playlists);
		}
	}, []);

	useEffect(() => {
		if (selectedPlaylist) {
			renderPlaylistSongs(selectedPlaylist);
		}
	}, [selectedPlaylist]);

	const renderPlaylists = () => {
		return componentPlaylists.map((pl) => {
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

	const renderPlaylistSongs = (pl: Playlist) => {
		if (!pl) return;
		return pl.songs?.map((item: any) => {
			const song = item.song;

			return <PlaylistItem key={song.id} song={song} />;
		});
	};

	return (
		<Sidebar side="right" className="sidebar_main">
			<SidebarHeader title="Playlists" />
			<SidebarContent>
				<h1>Playlists</h1>
				{componentPlaylists ? renderPlaylists() : <Spinner />}
				{selectedPlaylist && (
					<Modal onClose={() => setSelectedPlaylist(null)}>
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
