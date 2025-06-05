"use client";

import useCookies from "@/hooks/useCookies";
import { getSpotifyTrackIdByArtistAndTitle } from "@/services/Spotify";
import { SongData } from "@/types/types";
import { createContext, useState, useEffect } from "react";
import { toast } from "sonner";
export const PlayerContext = createContext({});

export const PlayerProvider = ({ children }: { children: React.ReactNode }) => {
	const [player, setPlayer] = useState(null);
	const [currentTrack, setCurrentTrack] = useState<SongData | undefined>(
		undefined
	);
	const [isPlaying, setIsPlaying] = useState(false);
	const [spotifyTrack, setSpotifyTrack] = useState<any>("");
	const [deviceId, setDeviceId] = useState("");

	const { setCookie, getCookie } = useCookies();

	useEffect(() => {
		const script = document.createElement("script");
		script.src = "https://sdk.scdn.co/spotify-player.js";
		script.async = true;
		document.body.appendChild(script);

		(window as any).onSpotifyWebPlaybackSDKReady = () => {
			console.log("Spotify SDK is ready");

			const token = JSON.parse(getCookie("token") || "{}")?.access_token;
			if (!token) {
				console.warn("No access token found in cookies.");
				return;
			}

			const player = new (window as any).Spotify.Player({
				name: "My Web Player",
				getOAuthToken: (cb: any) => cb(token),
				volume: 0.5,
			});

			player.addListener("ready", ({ device_id }: any) => {
				console.log("Ready with Device ID", device_id);
				setDeviceId(device_id);
				setCookie("device_id", device_id);
			});

			player.addListener("not_ready", ({ device_id }: any) => {
				console.log("Device ID has gone offline", device_id);
			});

			player.connect();
			setPlayer(player);
		};

		return () => {
			delete (window as any).onSpotifyWebPlaybackSDKReady;
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

	useEffect(() => {
		if (isPlaying && spotifyTrack) {
			play();
		}
	}, [isPlaying, spotifyTrack]);

	async function play() {
		const token = JSON.parse(getCookie("token") || "{}")?.access_token;
		const device_id = getCookie("device_id");

		if (!token || !device_id) {
			console.error("Missing token or deviceId");
			return;
		}

		await fetch(
			`https://api.spotify.com/v1/me/player/play?device_id=${device_id}`,
			{
				method: "PUT",
				headers: {
					Authorization: `Bearer ${token}`,
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ uris: [spotifyTrack.uri] }),
			}
		);
	}

	return (
		<PlayerContext.Provider
			value={{ player, currentTrack, setIsPlaying, setCurrentTrack }}
		>
			{children}
		</PlayerContext.Provider>
	);
};
