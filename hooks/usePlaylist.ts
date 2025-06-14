import { SongData, SongObject } from "@/types/types";
import { Song } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";

type CreatePlaylistArgs = {
	kindeId: string;
	name: string;
	firstSong: SongObject;
};

export function useCreatePlaylist() {
	return useMutation({
		mutationFn: (data: CreatePlaylistArgs) => createPlaylistForUser(data),
	});
}

const createPlaylistForUser = async ({
	kindeId,
	name,
	firstSong,
}: {
	kindeId: string;
	name: string;
	firstSong: SongObject;
}) => {
	const res = await fetch("/api/playlist", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ kindeId, name, firstSong }),
	});

	if (!res.ok) {
		throw new Error("Failed to create playlist");
	}

	return res.json();
};
