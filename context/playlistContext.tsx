"use client";

import React, {
	createContext,
	useContext,
	useState,
	ReactNode,
	useEffect,
} from "react";
import { Prisma, Playlist } from "@/lib/generated/prisma";
import { getUserPlaylistsWithSongs } from "@/actions/playlistActions";
import useCookies from "@/hooks/useCookies";
import { consolidateSongDataWithSpotify } from "@/lib/utils/songUtils";

export type PlaylistWithSongs = Playlist & { songs: Prisma.SongCreateInput[] };

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
	const [token, setToken] = useState<string | null>(null);

	const { getCookie } = useCookies();

	useEffect(() => {
		const token = getCookie("token");
		setToken(token);
	}, []);

	const addPlaylist = (playlist: PlaylistWithSongs) => {
		setPlaylists((prev) => [...prev, playlist]);
	};

	const addSongToPlaylist = async (
		playlistId: string,
		song: Prisma.SongCreateInput
	) => {
		const mapped = await consolidateSongDataWithSpotify(song, token);
		if (!mapped) {
			throw new Error("could not fetch spotify track data for consolidation");
		}
		setPlaylists((prev) =>
			prev.map((p) =>
				p.id === playlistId ? { ...p, songs: [...p.songs, mapped] } : p
			)
		);
	};

	const refreshPlaylists = async () => {
		const fresh: any = await getUserPlaylistsWithSongs();
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
