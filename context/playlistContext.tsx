// context/playlistContext.tsx
"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { Playlist, Prisma, Song } from "@prisma/client";
import { GSBSong } from "@/types/types";

type PlaylistWithSongs = Playlist & { songs: Prisma.SongCreateInput[] };

type PlaylistContextType = {
	playlists: PlaylistWithSongs[];
	setPlaylists: (p: PlaylistWithSongs[]) => void;
	addPlaylist: (p: PlaylistWithSongs) => void;
	addSongToPlaylist: (playlistId: string, song: Prisma.SongCreateInput) => void;
	refreshPlaylists: () => Promise<void>;
};

const PlaylistContext = createContext<PlaylistContextType | undefined>(
	undefined
);

export const PlaylistProvider = ({ children }: { children: ReactNode }) => {
	const [playlists, setPlaylists] = useState<PlaylistWithSongs[]>([]);

	const addPlaylist = (playlist: PlaylistWithSongs) => {
		setPlaylists((prev) => [...prev, playlist]);
	};

	const addSongToPlaylist = (
		playlistId: string,
		song: Prisma.SongCreateInput
	) => {
		setPlaylists((prev) =>
			prev.map((p) =>
				p.id === playlistId ? { ...p, songs: [...p.songs, song] } : p
			)
		);
	};

	const refreshPlaylists = async () => {
		const res = await fetch("/api/playlists"); // set up a route that returns fresh playlists
		const fresh = await res.json();
		setPlaylists(fresh);
	};

	return (
		<PlaylistContext.Provider
			value={{
				playlists,
				setPlaylists,
				addPlaylist,
				addSongToPlaylist,
				refreshPlaylists,
			}}
		>
			{children}
		</PlaylistContext.Provider>
	);
};

export const usePlaylists = () => {
	const context = useContext(PlaylistContext);
	if (!context) {
		throw new Error("usePlaylists must be used within a PlaylistProvider");
	}
	return context;
};
