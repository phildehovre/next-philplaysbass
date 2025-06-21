export function getSpotifyLoginUrl() {
	const params = new URLSearchParams({
		client_id: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID!,
		response_type: "code",
		redirect_uri: process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI!,
		scope: [
			"user-read-email",
			"user-read-private",
			"streaming",
			"user-modify-playback-state",
			"user-read-playback-state",
			"playlist-modify-public",
			"playlist-modify-private",
		].join(" "),
	});

	return `https://accounts.spotify.com/authorize?${params.toString()}`;
}
