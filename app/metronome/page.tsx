import Metronome from "@/components/metronome/Metronome";
import React from "react";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { PlayerProvider } from "@/context/playerContext";
import SpotifyPlayer from "@/components/metronome/SpotifyPlayer";
import { getUserPlaylists } from "@/services/playlistService";
import { ensureUserInDb } from "@/services/userService";
import MetroSidebar from "@/components/metronome/Sidebar";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Playlist, Song } from "@/types/types";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const page = async () => {
	const { isAuthenticated, getUser } = await getKindeServerSession();
	const isLoggedIn = await isAuthenticated();
	const user = await getUser();

	if (!isLoggedIn) {
		redirect("/login");
	}

	let playlists: any[] = [];

	if (user) {
		const { id } = await ensureUserInDb();
		if (id) {
			playlists = await getUserPlaylists(id);
			console.log("user playlists: ", playlists);
		}
	}

	return (
		<PlayerProvider>
			<Metronome playlists={playlists} />
			<SpotifyPlayer />
			<MetroSidebar playlists={playlists} />
			<SidebarTrigger />
		</PlayerProvider>
	);
};

export default page;
