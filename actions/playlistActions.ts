"use server";

import { prisma } from "@/lib/prisma";
import { ensureUserInDb } from "@/services/userService";
import { Prisma, Song } from "@/lib/generated/prisma";
import { revalidatePath } from "next/cache";

export async function getUserPlaylists() {
	const dbUser = await ensureUserInDb();

	try {
		const playlists = await prisma.playlist.findMany({
			where: {
				userId: dbUser.id,
			},
			include: {
				songs: {
					include: {
						song: true, // Include full song data
					},
				},
			},
		});

		return playlists;
	} catch (err: any) {
		throw new Error(err.message);
	}
}

export async function createPlaylist(formData: FormData) {
	const dbUser = await ensureUserInDb();
	const name = formData.get("playlistName")?.toString();
	const rawSongData = formData.get("songData");
	if (!name || !rawSongData) return;

	const song = JSON.parse(rawSongData.toString());

	try {
		const dbSong = await findOrCreateSong(song);
		if (!dbSong) {
			throw new Error("Failed to find or create song");
		}

		const playlist = await prisma.playlist.create({
			data: {
				name,
				userId: dbUser.id,
			},
		});
		await prisma.playlistSong.create({
			data: {
				playlistId: playlist.id,
				songId: dbSong.id,
			},
		});

		revalidatePath("/metronome");

		return playlist;
	} catch (error: any) {
		throw new Error(error.message);
	}
}

export async function addSongToPlaylist(
	playlistId: string,
	song: Prisma.SongCreateInput
) {
	const dbUser = await ensureUserInDb();

	try {
		// Optional: verify playlist belongs to user
		const playlist = await prisma.playlist.findFirst({
			where: {
				id: playlistId,
				userId: dbUser.id,
			},
		});

		if (!playlist) {
			throw new Error("Playlist not found or access denied");
		}

		const dbSong = await findOrCreateSong(song);

		// Create join entry
		await prisma.playlistSong.create({
			data: {
				playlistId,
				songId: dbSong.id,
			},
		});

		// Optional: Revalidate the page
		revalidatePath("/metronome");

		return song;
	} catch (err: any) {
		throw new Error(err.message);
	}
}
export async function findOrCreateSong(
	data: Prisma.SongCreateInput
): Promise<Song> {
	try {
		// Check if song already exists (by unique externalId)
		const existing = await prisma.song.findUnique({
			where: { getSongBpmId: data.getSongBpmId },
		});

		if (existing) {
			return existing;
		}

		// Create new song if not found
		const created = await prisma.song.create({
			data,
		});

		return created;
	} catch (err: any) {
		throw new Error(`Error finding or creating song: ${err.message}`);
	}
}

export async function getUserPlaylistsWithSongs() {
	const dbUser = await ensureUserInDb();
	const playlists = await prisma.playlist.findMany({
		where: { userId: dbUser.id },
		include: {
			songs: {
				include: {
					song: true,
				},
			},
		},
		orderBy: {
			createdAt: "desc",
		},
	});
	return playlists.map((playlist) => ({
		id: playlist.id,
		name: playlist.name,
		createdAt: playlist.createdAt,
		songs: playlist.songs.map((playlistSong) => ({
			id: playlistSong.song.id,
			title: playlistSong.song.title,
			artist: playlistSong.song.artist,
			tempo: playlistSong.song.tempo,
			duration: playlistSong.song.duration,
			spotifyUri: playlistSong.song.spotifyUri,
			getSongBpmId: playlistSong.song.getSongBpmId,
			uri: playlistSong.song.uri,
			addedAt: playlistSong.addedAt,
		})),
	}));
}
export async function removeSongFromPlaylist(
	playlistId: string,
	song: Prisma.SongCreateInput
) {
	const dbUser = await ensureUserInDb();

	try {
		// Verify playlist belongs to user
		const playlist = await prisma.playlist.findFirst({
			where: {
				id: playlistId,
				userId: dbUser.id,
			},
		});

		if (!playlist) {
			throw new Error("Playlist not found or access denied");
		}

		// Get existing or matching song
		const dbSong = await findOrCreateSong(song);

		// Remove join entry
		await prisma.playlistSong.deleteMany({
			where: {
				playlistId,
				songId: dbSong.id,
			},
		});

		revalidatePath("/metronome");

		return { success: true };
	} catch (err: any) {
		console.error("Error removing song from playlist:", err);
		throw new Error(err.message || "Failed to remove song from playlist");
	}
}

export async function deletePlaylist(playlistId: string) {
	const dbUser = await ensureUserInDb();

	try {
		// Verify the playlist belongs to the current user
		const playlist = await prisma.playlist.findFirst({
			where: {
				id: playlistId,
				userId: dbUser.id,
			},
		});

		if (!playlist) {
			throw new Error("Playlist not found or access denied");
		}

		// Remove all songs from the playlist (from join table)
		await prisma.playlistSong.deleteMany({
			where: { playlistId },
		});

		// Delete the playlist itself
		await prisma.playlist.delete({
			where: { id: playlistId },
		});

		// Revalidate relevant path if needed
		revalidatePath("/metronome");

		return { success: true };
	} catch (err: any) {
		console.error("Error deleting playlist:", err);
		throw new Error(err.message || "Failed to delete playlist");
	}
}
