"use server";

import { prisma } from "@/lib/prisma";
import { ensureUserInDb } from "@/services/userService";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
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

export async function createPlaylist(name: string, songId?: string) {
	const dbUser = await ensureUserInDb();

	try {
		const playlist = await prisma.playlist.create({
			data: {
				name,
				userId: dbUser.id,
			},
		});

		if (songId) {
			await prisma.playlistSong.create({
				data: {
					playlistId: playlist.id,
					songId: songId,
				},
			});
		}

		revalidatePath("/metronome");

		return playlist;
	} catch (error: any) {
		throw new Error(error.message);
	}
}
