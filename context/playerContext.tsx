"use client";

import useCookies from "@/hooks/useCookies";
import { getSpotifyTrackIdByArtistAndTitle } from "@/services/Spotify";
import { SongData } from "@/types/types";
import { createContext, useState, useEffect } from "react";
import { toast } from "sonner";

export const PlayerContext = createContext<any>({});

export const PlayerProvider = ({ children }: { children: React.ReactNode }) => {
	const [player, setPlayer] = useState<Spotify.Player | null>(null);
	const [currentTrack, setCurrentTrack] = useState<SongData | undefined>();
	const [spotifyTrack, setSpotifyTrack] = useState<any>(null);
	const [isPaused, setIsPaused] = useState(true);
	const [deviceId, setDeviceId] = useState("");

	const { setCookie, getCookie } = useCookies();

	// Load SDK and connect player
	useEffect(() => {
		const script = document.createElement("script");
		script.src = "https://sdk.scdn.co/spotify-player.js";
		script.async = true;
		document.body.appendChild(script);

		(window as any).onSpotifyWebPlaybackSDKReady = () => {
			const token = JSON.parse(getCookie("token") || "{}")?.access_token;
			if (!token) return;

			const playerInstance = new (window as any).Spotify.Player({
				name: "PhilPlaysBass app",
				getOAuthToken: (cb: any) => cb(token),
				volume: 0.5,
			});

			setPlayer(playerInstance);

			playerInstance.addListener("ready", async ({ device_id }: any) => {
				setDeviceId(device_id);
				setCookie("device_id", device_id);
				await transferPlayback(device_id, token);
			});

			playerInstance.addListener("not_ready", ({ device_id }: any) => {
				console.log("Device ID offline", device_id);
			});

			playerInstance.addListener("player_state_changed", (state: any) => {
				if (!state) return;
				setSpotifyTrack(state.track_window.current_track);
				setIsPaused(state.paused);
			});

			playerInstance.connect();
		};

		return () => {
			delete (window as any).onSpotifyWebPlaybackSDKReady;
		};
	}, []);

	// Fetch Spotify track for currentTrack
	useEffect(() => {
		const tokenData = getCookie("token");
		if (!tokenData || !currentTrack) return;

		const token = JSON.parse(tokenData)?.access_token;

		(async () => {
			try {
				const result: any = await getSpotifyTrackIdByArtistAndTitle(
					currentTrack.song_title,
					token
				);

				const match = result?.artists?.find(
					(a: any) => a.name === currentTrack.artist.name
				);

				if (match) {
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
	}, [currentTrack]);

	const transferPlayback = async (device_id: string, token: string) => {
		await fetch("https://api.spotify.com/v1/me/player", {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify({ device_ids: [device_id], play: false }),
		});
	};

	const play = async (uri?: string) => {
		const token = JSON.parse(getCookie("token") || "{}")?.access_token;
		const device_id = getCookie("device_id");

		if (!token || !device_id || !uri) {
			console.warn("Missing token, device_id or uri");
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
				body: JSON.stringify({ uris: [uri] }),
			}
		);
	};

	const pause = async () => {
		const token = JSON.parse(getCookie("token") || "{}")?.access_token;
		if (!token) return;

		try {
			await fetch("https://api.spotify.com/v1/me/player/pause", {
				method: "PUT",
				headers: {
					Authorization: `Bearer ${token}`,
					"Content-Type": "application/json",
				},
			});
		} catch (err) {
			console.error("Failed to pause", err);
		}
	};

	const playSong = async (song: SongData) => {
		setCurrentTrack(song);

		// Wait until spotifyTrack matches this song
		const waitForCorrectSpotifyTrack = async () => {
			for (let i = 0; i < 10; i++) {
				await new Promise((res) => setTimeout(res, 500));

				if (
					spotifyTrack?.name === song.song_title &&
					spotifyTrack?.artists?.some((a: any) => a.name === song.artist.name)
				) {
					return spotifyTrack.uri;
				}
			}
			return null;
		};

		const uri = await waitForCorrectSpotifyTrack();

		if (uri) {
			await play(uri);
		} else {
			console.warn("Correct Spotify track not found in time.");
			toast.error("Couldn't load this track from Spotify.");
		}
	};

	return (
		<PlayerContext.Provider
			value={{
				player,
				currentTrack,
				setCurrentTrack,
				isPaused,
				spotifyTrack,
				play,
				pause,
				playSong,
			}}
		>
			{children}
		</PlayerContext.Provider>
	);
};
