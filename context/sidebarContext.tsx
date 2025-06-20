"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

// Types for normalized state
type Song = {
	id: string;
	title: string;
	// Add other song fields
};

type Playlist = {
	id: string;
	name: string;
	songIds: string[];
};

type SidebarState = {
	playlists: Record<string, Playlist>;
	songs: Record<string, Song>;
};

type SidebarContextType = {
	state: SidebarState;
	setState: React.Dispatch<React.SetStateAction<SidebarState>>;
	// Add your own methods like addPlaylist, addSongToPlaylist, etc.
};

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export const SidebarProvider = ({ children }: { children: ReactNode }) => {
	const [state, setState] = useState<SidebarState>({
		playlists: {},
		songs: {},
	});

	return (
		<SidebarContext.Provider value={{ state, setState }}>
			{children}
		</SidebarContext.Provider>
	);
};

export const useSidebar = () => {
	const context = useContext(SidebarContext);
	if (!context) {
		throw new Error("useSidebar must be used within a SidebarProvider");
	}
	return context;
};
