import NoteMatchGame from "@/components/games/NoteMatchGame";
import { NoteMatchGameProvider } from "@/context/noteMatchGameContext";
import React from "react";

const page = async () => {
	return (
		<>
			<NoteMatchGameProvider>
				<NoteMatchGame />
			</NoteMatchGameProvider>
		</>
	);
};

export default page;
