"use client";

import { getSpotifyLoginUrl } from "@/utils/spotifyAuth";

export function LoginWithSpotifyButton() {
	const handleLogin = () => {
		window.location.href = getSpotifyLoginUrl();
	};

	return (
		<button
			onClick={handleLogin}
			className="px-4 py-2 bg-green-500 text-white rounded"
		>
			Log in with Spotify
		</button>
	);
}
