"use client";

import { getSpotifyLoginUrl } from "@/utils/spotifyAuth";
import "./metronome.scss";
import Image from "next/image";

export function LoginWithSpotifyButton() {
	const handleLogin = () => {
		window.location.href = getSpotifyLoginUrl();
	};

	return (
		<button onClick={handleLogin} className="spotify-login_btn">
			Log in with
			<Image
				src="/icons/spotify.png"
				alt="spotify logo"
				width={50}
				height={50}
				quality={100}
			/>
		</button>
	);
}
