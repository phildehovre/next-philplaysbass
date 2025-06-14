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
			const { externalId, title, tempo, artist } = firstSong;
			console.log("From server: ", firstSong[0].title);

			if (!externalId || !title) {
				return NextResponse.json(
					{
						error: "Song data incomplete: need at least song id and song title",
						externalId,
						title,
						tempo,
						artist,
					},
					{ status: 400 }
				);
			}

			// Check if song already exists
			let song = await prisma.song.findUnique({
				where: { externalId: externalId },
			});

			if (!song) {
				// Create song
				song = await prisma.song.create({
					data: {
						externalId,
						title,
						tempo: parseInt(tempo),
						artist: artist?.name ?? "Unknown Artist",
						...firstSong[0],
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
		console.log("Error creating playlist:", error);
		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 }
		);
	}
}
