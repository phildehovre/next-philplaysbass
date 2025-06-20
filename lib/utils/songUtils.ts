import { GSBSong } from "@/types/types";
import { Prisma } from "@/lib/generated/prisma";

export function mapGSBSongToSongInput(
	song: GSBSong,
	spotifyUri: string,
	duration: number
): Prisma.SongCreateInput {
	return {
		getSongBpmId: song.song_id,
		spotifyUri,
		title: song.song_title,
		uri: song.song_uri,
		tempo: parseInt(song.tempo),
		artist: song.artist.name,
		duration: duration,
		genres: song.artist.genres,
	};
}

export function mapSpotifyFieldsToSongInput(
	song: Prisma.SongCreateInput,
	spotifyUri: string,
	duration: number
): Prisma.SongCreateInput {
	const result = {
		...song,
		spotifyUri: spotifyUri,
		duration: duration,
	};
	return result;
}
