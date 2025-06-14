import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
	try {
		const body = await req.json();
		const { kindeId, name, firstSong } = body;

		if (!kindeId || !name) {
			return NextResponse.json(
				{ error: "Missing required fields" },
				{ status: 400 }
			);
		}

		const user = await prisma.user.findUnique({ where: { kindeId } });
		if (!user) {
			return NextResponse.json({ error: "User not found" }, { status: 404 });
		}

		let songIdToConnect: number | undefined = undefined;

		if (firstSong) {
			const {
				id: song_id,
				title: song_title,
				uri: song_uri,
				tempo,
				artist,
			} = firstSong;

			if (!song_id || !song_title) {
				return NextResponse.json(
					{
						error: "Song data incomplete: need at least song_id and song_title",
					},
					{ status: 400 }
				);
			}

			// Check if song already exists
			let song = await prisma.song.findUnique({
				where: { externalId: song_id },
			});

			if (!song) {
				// Create song
				song = await prisma.song.create({
					data: {
						externalId: song_id,
						title: song_title,
						uri: song_uri,
						tempo: parseInt(tempo),
						artist: artist?.name ?? "Unknown Artist",
						...firstSong,
					},
				});
			}

			songIdToConnect = song.id;
		}

		const playlist = await prisma.playlist.create({
			data: {
				name,
				user: { connect: { id: user.id } },
				songs: songIdToConnect
					? {
							create: {
								song: { connect: { id: songIdToConnect } },
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

		return NextResponse.json(playlist, { status: 201 });
	} catch (error) {
		console.error("Error creating playlist:", error);
		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 }
		);
	}
}
