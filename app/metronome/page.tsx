import Metronome from "@/components/metronome/Metronome";
import React from "react";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { PlayerProvider } from "@/context/playerContext";
import SpotifyPlayer from "@/components/metronome/SpotifyPlayer";
import { ensureUserInDb } from "@/services/userService";
import MetroSidebar from "@/components/metronome/Sidebar";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { getUserPlaylists } from "@/actions/playlistActions";
import { PlaylistProvider } from "@/context/playlistContext";

const page = async () => {
	const { isAuthenticated } = await getKindeServerSession();
	const isLoggedIn = await isAuthenticated();

	if (!isLoggedIn) {
		redirect("/login");
	}

	const playlists = await getUserPlaylists();

	return (
		<PlayerProvider>
			<PlaylistProvider>
				<Metronome playlists={playlists} />
				<SpotifyPlayer />
				<MetroSidebar playlists={playlists} />
				<SidebarTrigger />
			</PlaylistProvider>
		</PlayerProvider>
	);
};

export default page;
