"use client";

import React, {
	createContext,
	useContext,
	useState,
	ReactNode,
	useEffect,
} from "react";
import { Prisma, Playlist, Song } from "@/lib/generated/prisma";
import useCookies from "@/hooks/useCookies";

export type SongListType = {
	songs: Prisma.SongCreateInput[];
	filters: string[];
	searchTerm: string;
};

type SongListContextType = {
	songs: Song[];
	setSongs: (songs: Song[]) => void;
	setIsLoading: (s: boolean) => void;
	setFilters: (filter: string) => void;
	setSearchTerm: (term: string) => void;
	searchTerm: string;
	filters: string[];
	isLoading: boolean;
};

const SongListContext = createContext<SongListContextType | undefined>(
	undefined
);

export const SongListProvider = ({ children }: { children: ReactNode }) => {
	const [songs, setSongs] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [filters, setFilters] = useState<string[]>([]);
	const [searchTerm, setSearchTerm] = useState<string>("");

	useEffect(() => {
		console.log("Songlist context initialized");
	}, []);

	return (
		<SongListContext.Provider
			value={{
				songs,
				isLoading,
				filters,
				searchTerm,
				setSongs,
				setIsLoading,
				setFilters,
				setSearchTerm,
			}}
		>
			{children}
		</SongListContext.Provider>
	);
};

export const useSongList = () => {
	const context = useContext(SongListContext);
	if (!context) {
		throw new Error("usePlaylists must be used within a PlaylistProvider");
	}
	return context;
};
