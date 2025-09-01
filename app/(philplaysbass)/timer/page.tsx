import React from "react";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { PlayerProvider } from "@/context/playerContext";
import SpotifyPlayer from "@/components/metronome/SpotifyPlayer";
import { getUserPlaylists } from "@/actions/playlistActions";
import { PlaylistProvider } from "@/context/playlistContext";
import Timer from "@/components/timer/Timer";
import { PracticeSessionProvider } from "@/context/practiceSessionsContext";
import { NoteMatchGameProvider } from "@/context/noteMatchGameContext";
import { SoundFXProvider } from "@/context/soundContext";

const page = async () => {
	const { isAuthenticated } = await getKindeServerSession();
	const isLoggedIn = await isAuthenticated();

	if (!isLoggedIn) {
		redirect("/login");
	}

	const playlists = await getUserPlaylists();

	return (
		<main className="flex justify-center">
			<PracticeSessionProvider>
				<NoteMatchGameProvider>
					<SoundFXProvider>
						<Timer />
					</SoundFXProvider>
				</NoteMatchGameProvider>
			</PracticeSessionProvider>
		</main>
	);
};

export default page;
