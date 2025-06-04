"use client";

import useCookies from "@/hooks/useCookies";
import { getSpotifyTrackIdByArtistAndTitle } from "@/services/Spotify";
import { SongData } from "@/types/types";
import { createContext, useState, useEffect } from "react";
// context/PlayerContext.tsx
export const PlayerContext = createContext({
	/* state & controls */
});

export const PlayerProvider = ({ children }: { children: React.ReactNode }) => {
	const [player, setPlayer] = useState(null);
	const [currentTrack, setCurrentTrack] = useState<SongData | undefined>(
		undefined
	);
	const [spotifyTrack, setSpotifyTrack] = useState<string | null>("");
	const { getCookie } = useCookies();

	useEffect(() => {
		// Load Web Playback SDK and auth user
		// Set player instance
	}, []);

	useEffect(() => {
		const data = getCookie("token");

		if (!data) {
			console.warn("No token cookie found");
			return;
		}

		try {
			const tokenObject = JSON.parse(data);

			if (currentTrack && tokenObject?.access_token) {
				(async () => {
					try {
						const result = await getSpotifyTrackIdByArtistAndTitle(
							currentTrack.song_title,
							currentTrack.artist.name,
							tokenObject.access_token
						);
						setSpotifyTrack(result);
						console.log("Spotify track ID:", result);
					} catch (err) {
						console.error("Error fetching Spotify track ID:", err);
					}
				})();
			}
		} catch (err) {
			console.error("Failed to parse token cookie:", err);
		}
	}, [currentTrack]);

	console.log(spotifyTrack);

	const play = (trackUri: string) => {
		// Tell Spotify SDK to play that URI
	};

	return (
		<PlayerContext.Provider
			value={{ player, currentTrack, play, setCurrentTrack }}
		>
			{children}
		</PlayerContext.Provider>
	);
};
