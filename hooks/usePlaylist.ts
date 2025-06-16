import { SongObject } from "@/types/types";
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

type SongPayload = {
	id?: number;
	externalId?: string;
	title?: string;
	artist?: string;
	uri?: string;
	tempo?: number;
	spotify_uri?: string;
	// add other song fields if needed
};

const addSongToPlaylist = async ({
	playlistId,
	song,
}: {
	playlistId: number;
	song: SongPayload;
}) => {
	const res = await fetch(`/api/playlist/${playlistId}`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(song),
	});

	console.log("FROM HOOK, playlistId:", playlistId, "song:", song);

	if (!res.ok) {
		const errorData = await res.json();
		throw new Error(errorData.error || "Failed to add song to playlist");
	}

	return res.json();
};

export function useAddSongToPlaylist() {
	return useMutation({
		mutationFn: ({
			playlistId,
			song,
		}: {
			playlistId: number;
			song: SongPayload;
		}) => addSongToPlaylist({ playlistId, song }),
	});
}
