import { GSBSong } from "@/types/types";
import { Prisma } from "@prisma/client";

export function mapGSBSongToSongInput(
	song: GSBSong,
	spotifyUri: string,
	duration: number
): Prisma.SongCreateInput {
	return {
		getSongBpmUri: song.song_id,
		spotifyUri,
		title: song.song_title,
		uri: song.song_uri,
		tempo: parseInt(song.tempo),
		artist: song.artist.name,
		duration: duration,
	};
}
