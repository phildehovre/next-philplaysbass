import InversionsGame from "@/components/games/NoteMatchGame";
import { NoteMatchGameProvider } from "@/context/noteMatchGameContext";
import React from "react";

const page = async () => {
	return (
		<>
			<NoteMatchGameProvider>
				<InversionsGame />;
			</NoteMatchGameProvider>
		</>
	);
};

export default page;
