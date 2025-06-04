"use client";

import useCookies from "@/hooks/useCookies";
import { getSpotifyTrackIdByArtistAndTitle } from "@/services/Spotify";
import { SongData } from "@/types/types";
import { createContext, useState, useEffect } from "react";
import { toast } from "sonner";
// context/PlayerContext.tsx
export const PlayerContext = createContext({
	/* state & controls */
});

export const PlayerProvider = ({ children }: { children: React.ReactNode }) => {
	const [player, setPlayer] = useState(null);
	const [currentTrack, setCurrentTrack] = useState<SongData | undefined>(
		undefined
	);
	const [spotifyTrack, setSpotifyTrack] = useState<any>("");
	const { getCookie } = useCookies();
	useEffect(() => {
		const script = document.createElement("script");
		script.src = "https://sdk.scdn.co/spotify-player.js";
		script.async = true;
		document.body.appendChild(script);

		(window as any).onSpotifyWebPlaybackSDKReady = () => {
			console.log("Spotify SDK is ready");
		};
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
						const result: any = await getSpotifyTrackIdByArtistAndTitle(
							currentTrack.song_title,
							tokenObject.access_token
						);
						const exists = result?.artists.find(
							(item: any) => item.name === currentTrack.artist.name
						);
						if (exists) {
							setSpotifyTrack(result);
						} else {
							toast("Not found", {
								description: `Spotify did not find '${currentTrack.song_title}' by '${currentTrack.artist.name}'`,
								className: "not-found_toast",
							});
						}
					} catch (err) {
						console.error("Error fetching Spotify track ID:", err);
					}
				})();
			}
		} catch (err) {
			console.error("Failed to parse token cookie:", err);
		}
	}, [currentTrack]);

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
