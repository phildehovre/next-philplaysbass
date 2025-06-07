import Metronome from "@/components/metronome/Metronome";
import React from "react";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { PlayerProvider } from "@/context/playerContext";
import SpotifyPlayer from "@/components/metronome/SpotifyPlayer";

const page = async () => {
	const { isAuthenticated } = await getKindeServerSession();
	const isLoggedIn = await isAuthenticated();

	if (!isLoggedIn) {
		redirect("/login");
	}

	return (
		<PlayerProvider>
			<Metronome />
			<SpotifyPlayer />
		</PlayerProvider>
	);
};

export default page;
