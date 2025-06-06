"use client";

import useCookies from "@/hooks/useCookies";
import { getSpotifyTrackIdByArtistAndTitle } from "@/services/Spotify";
import { SongData } from "@/types/types";
import { createContext, useState, useEffect, useRef } from "react";
import { toast } from "sonner";
import Spotify from "spotify-api.js";
export const PlayerContext = createContext({});

export const PlayerProvider = ({ children }: { children: React.ReactNode }) => {
	const [player, setPlayer] = useState<Spotify.Player | null>(null);
	const [currentTrack, setCurrentTrack] = useState<SongData | undefined>(
		undefined
	);
	const [isPlaying, setIsPlaying] = useState(false);
	const [isPaused, setIsPaused] = useState(false);
	const [spotifyTrack, setSpotifyTrack] = useState<any>("");
	const [deviceId, setDeviceId] = useState("");
	const [active, setActive] = useState(false);

	const { setCookie, getCookie } = useCookies();

	useEffect(() => {
		const script = document.createElement("script");
		script.src = "https://sdk.scdn.co/spotify-player.js";
		script.async = true;
		document.body.appendChild(script);

		(window as any).onSpotifyWebPlaybackSDKReady = () => {
			const token = JSON.parse(getCookie("token") || "{}")?.access_token;
			if (!token) {
				console.warn("No access token found in cookies.");
				return;
			}

			const player = new (window as any).Spotify.Player({
				name: "PhilPlaysBass app",
				getOAuthToken: (cb: any) => cb(token),
				volume: 0.5,
			});

			setPlayer(player);

			player.addListener("ready", async ({ device_id }: any) => {
				console.log("Ready with Device ID", device_id);

				setDeviceId(device_id);
				setCookie("device_id", device_id);

				const pb = await transferPlayback(device_id, token);
				console.log("playback transferred to device", pb);
			});

			player.addListener("not_ready", ({ device_id }: any) => {
				console.log("Device ID has gone offline", device_id);
			});

			player.addListener("player_state_changed", (state: any) => {
				if (!state) {
					return;
				}

				setSpotifyTrack(state.track_window.current_track);
				setIsPaused(state.paused);

				player.getCurrentState().then((state: any) => {
					!state ? setActive(false) : setActive(true);
				});
			});

			player.connect().then((success: boolean) => {
				if (success) {
					console.log("The web player sucessfully connected to Spotify");
				}
			});
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

	// console.log(currentTrack, spotifyTrack);
	async function transferPlayback(device_id: string, token: string) {
		await fetch("https://api.spotify.com/v1/me/player", {
			method: "PUT",
			body: JSON.stringify({
				device_ids: [device_id],
			}),
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`, // use a valid token
			},
		});
	}

	return (
		<PlayerContext.Provider
			value={{
				player,
				currentTrack,
				setIsPlaying,
				setCurrentTrack,
				isPlaying,
				isPaused,
				setIsPaused,
				spotifyTrack,
			}}
		>
			{children}
		</PlayerContext.Provider>
	);
};
