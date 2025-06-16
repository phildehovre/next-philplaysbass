import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
	const url = new URL(req.url);
	const parts = url.pathname.split("/");
	const id = parts[parts.length - 1];
	const playlistId = parseInt(id);

	if (isNaN(playlistId)) {
		return NextResponse.json({ error: "Invalid playlist ID" }, { status: 400 });
	}

	const body = await req.json();
	let { songId, externalId, title, artist, uri, tempo } = body;

	// songId or externalId or at least enough info to create a song is required
	if (!songId && !externalId && !(title && artist)) {
		return NextResponse.json(
			{
				error: "Must provide songId, externalId or song info (title & artist)",
			},
			{ status: 400 }
		);
	}

	try {
		// Try to find existing song by songId or externalId
		let song = null;
		if (songId) {
			const parsedSongId =
				typeof songId === "string" ? parseInt(songId) : songId;
			song = await prisma.song.findUnique({ where: { id: parsedSongId } });
		} else if (externalId) {
			song = await prisma.song.findUnique({ where: { externalId } });
		}

		// If song doesn't exist, create it
		if (!song) {
			if (!title || !artist) {
				return NextResponse.json(
					{
						error:
							"Song does not exist, please provide title and artist to create it",
					},
					{ status: 400 }
				);
			}

			console.log(body);
			song = await prisma.song.create({
				data: {
					externalId: externalId || null,
					title,
					artist,
					uri,
					tempo,
					// add any other fields needed here
				},
			});
		}

		// Now add song to playlist
		await prisma.playlistSong.create({
			data: {
				playlistId,
				songId: song.id,
			},
		});

		return NextResponse.json(
			{ message: "Song added to playlist", song },
			{ status: 201 }
		);
	} catch (error: any) {
		if (error.code === "P2002") {
			return NextResponse.json(
				{ error: "Song already in playlist" },
				{ status: 409 }
			);
		}

		console.error("💥 Error:", error);
		return NextResponse.json(
			{ error: "Internal Server Error" },
			{ status: 500 }
		);
	}
}
