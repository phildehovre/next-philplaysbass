import { prisma } from "../lib/prisma";

export async function createPlaylistForUser({
	kindeId,
	name,
	firstSongId,
}: {
	kindeId: string;
	name: string;
	firstSongId?: string;
}) {
	const user = await prisma.user.findUnique({
		where: { kindeId },
	});

	if (!user) throw new Error("User not found");

	const playlist = await prisma.playlist.create({
		data: {
			name,
			user: {
				connect: { id: user.id },
			},
			songs: firstSongId
				? {
						create: {
							song: { connect: { id: firstSongId } }, // <-- this is required
						},
				  }
				: undefined,
		},
		include: {
			songs: {
				include: { song: true },
			},
		},
	});

	return playlist;
}

export async function addSongsToPlaylist({
	playlistId,
	songIds,
}: {
	playlistId: string;
	songIds: string[];
	kindeId: string;
}) {
	const operations = songIds.map((songId) =>
		prisma.playlistSong.upsert({
			where: {
				playlistId_songId: { playlistId, songId },
			},
			update: {},
			create: {
				playlist: { connect: { id: playlistId } },
				song: { connect: { id: songId } },
			},
		})
	);

	return await prisma.$transaction(operations);
}

export async function getUserPlaylists(userId: string) {
	try {
		const playlists = await prisma.playlist.findMany({
			where: {
				userId,
			},
			include: {
				songs: {
					include: {
						song: true, // this will include song details inside each PlaylistSong
					},
				},
			},
			orderBy: {
				createdAt: "desc",
			},
		});

		return playlists;
	} catch (error) {
		console.error("Error fetching playlists:", error);
		throw new Error("Failed to fetch user playlists");
	}
}
