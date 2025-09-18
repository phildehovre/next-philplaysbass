import React from "react";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { getUserPlaylists } from "@/actions/playlistActions";
import Timer from "@/components/timer/Timer";
import { PracticeSessionProvider } from "@/context/practiceSessionsContext";
import { NoteMatchGameProvider } from "@/context/noteMatchGameContext";
import { SoundFXProvider } from "@/context/soundContext";
import { getUserPracticeRoutines } from "@/actions/timerActions";

const page = async () => {
	const { isAuthenticated } = await getKindeServerSession();
	const isLoggedIn = await isAuthenticated();

	if (!isLoggedIn) {
		redirect("/login");
	}

	const playlists = await getUserPlaylists();

	const routines = await getUserPracticeRoutines();

	return (
		<main className="flex justify-center">
			<PracticeSessionProvider>
				<NoteMatchGameProvider>
					<SoundFXProvider>
						<Timer routines={routines} />
					</SoundFXProvider>
				</NoteMatchGameProvider>
			</PracticeSessionProvider>
		</main>
	);
};

export default page;
