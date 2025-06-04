export const PlaySong = () => {
	console.log("Beep boop");
};

const SPOTIFY_API_BASE = "https://api.spotify.com/v1";

export async function getSpotifyTrackIdByArtistAndTitle(
	title: string,
	accessToken: string
): Promise<string | null> {
	const query = `track:${title}`;
	const url = new URL(`${SPOTIFY_API_BASE}/search`);
	url.searchParams.append("q", query);
	url.searchParams.append("type", "track");
	url.searchParams.append("limit", "1");

	try {
		const res = await fetch(url.toString(), {
			headers: {
				Authorization: `Bearer ${accessToken}`,
				"Content-Type": "application/json",
			},
		});

		if (!res.ok) {
			const errorData = await res.json();
			throw new Error(
				`Spotify search error: ${res.status} ${res.statusText} - ${errorData.error?.message}`
			);
		}

		const data = await res.json();
		const track = data.tracks.items[0];

		return track || null;
	} catch (err) {
		console.error("[Spotify Search Error]", err);
		return null;
	}
}
