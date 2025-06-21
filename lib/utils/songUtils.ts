import { GSBSong } from "@/types/types";
import { Prisma } from "@/lib/generated/prisma";
import { getTrackAndMapToSongInput } from "@/services/Spotify";

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

export const consolidateSongDataWithSpotify = async (
	song: Prisma.SongCreateInput,
	token: string | null
) => {
	if (!token) {
		throw new Error("No Spotify access token found");
	}
	const { access_token } = JSON.parse(token);
	const mapped = await getTrackAndMapToSongInput(song, access_token);

	if (!mapped) return;
	return mapped;
};

export const formatDuration = (duration: number) => {
	let formatted: { seconds: number; minutes: number } = {
		seconds: 0,
		minutes: 0,
	};

	formatted.seconds = Math.floor(duration / 1000) % 60;
	formatted.minutes = Math.floor(duration / 1000 / 60);

	return formatted;
};
