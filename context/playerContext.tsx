"use client";

import useCookies from "@/hooks/useCookies";
import { Prisma } from "@/lib/generated/prisma";
import {
	getSpotifyTrackByArtistAndTitle,
	loadSpotifySDK,
} from "@/services/Spotify";
import { SpotifyPlayer } from "@/types/types";
import { createContext, useState, useEffect, useContext } from "react";
import { toast } from "sonner";
import Spotify, { Track } from "spotify-api.js";

type PlayerContextType = {
	player: SpotifyPlayer | null;
	currentTrack: Prisma.SongCreateInput | undefined;
	setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
	setCurrentTrack: React.Dispatch<
		React.SetStateAction<Prisma.SongCreateInput | undefined>
	>;
	isPlaying: boolean;
	isPaused: boolean;
	setIsPaused: React.Dispatch<React.SetStateAction<boolean>>;
	play: (position?: number) => Promise<void>;
	spotifyTrack: Spotify.Track | undefined;
	setResumePosition: React.Dispatch<React.SetStateAction<number>>;
	resumePosition: number;
	findCacheCorrespondance: (song: Prisma.SongCreateInput) => Track | null;
};

export const PlayerContext = createContext<PlayerContextType | undefined>(
	undefined
);

export const PlayerProvider = ({ children }: { children: React.ReactNode }) => {
	const [player, setPlayer] = useState<SpotifyPlayer | null>(null);
	const [currentTrack, setCurrentTrack] = useState<
		Prisma.SongCreateInput | undefined
	>(undefined);
	const [isPlaying, setIsPlaying] = useState(false);
	const [isPaused, setIsPaused] = useState(false);
	const [spotifyTrack, setSpotifyTrack] = useState<Spotify.Track>();
	const [deviceId, setDeviceId] = useState("");
	const [isNextSongLoading, setIsNextSongLoading] = useState(false);
	const [resumePosition, setResumePosition] = useState<number>(0);
	const [spotifyCache, setSpotifyCache] = useState<Track[]>([]);

	const { setCookie, getCookie } = useCookies();

	// =====================
	// Initialize player SKD
	// =====================

	useEffect(() => {
		let player: SpotifyPlayer;

		loadSpotifySDK()
			.then(() => {
				const token = JSON.parse(getCookie("token") || "{}")?.access_token;
				if (!token) {
					console.warn("No access token found in cookies.");
					return;
				}
				player = new (window as any).Spotify.Player({
					name: "PhilPlaysBass app",
					getOAuthToken: (cb: (token: string) => void) => cb(token),
					volume: 0.5,
				}) as any;

				setPlayer(player);

				player.addListener("ready", async ({ device_id }: any) => {
					console.log("✅ Ready with Device ID", device_id);
					setDeviceId(device_id);
					setCookie("device_id", device_id);

					const pb = await transferPlayback(device_id, token);
					console.log("🔁 Playback transferred", pb);
				});

				player.addListener("not_ready", ({ device_id }: any) => {
					console.log("❌ Device offline", device_id);
				});

				player.addListener("player_state_changed", (state: any) => {
					if (!state) return;
					setResumePosition(state.position);
					setIsPaused(state.paused);
					setIsNextSongLoading(state.loading);
				});

				player.connect().then((success: boolean) => {
					if (success) {
						console.log("✅ Web player connected");
					}
				});
			})
			.catch((error) => {
				console.error("❌ Failed to load Spotify SDK", error);
			});

		return () => {
			if (player) {
				player.disconnect();
			}
		};
	}, []);

	// =================
	// Fetch next song
	// =================
	useEffect(() => {
		const data = getCookie("token");
		setIsNextSongLoading(true);

		if (!data) {
			console.warn("No token cookie found");
			return;
		}

		try {
			const data = getCookie("token");
			if (!data) {
				throw new Error("no token found in cookies");
			}
			const tokenObject = JSON.parse(data);
			if (currentTrack && tokenObject?.access_token) {
				(async () => {
					try {
						const result: any = await getSpotifyTrackByArtistAndTitle(
							currentTrack.title,
							currentTrack.artist,
							tokenObject.access_token
						);
						if (result) {
							setSpotifyTrack(result[0]);
							setSpotifyCache((prev) => [...prev, result[0]]);
						} else {
							toast("Not found", {
								description: `Spotify did not find '${currentTrack.title}' by '${currentTrack.artist}'`,
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
		if (isNextSongLoading) {
			play();
		}
	}, [spotifyTrack]);

	// ================================================
	// Necessary to ensure the app can control playback
	// ================================================
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

	async function play(position?: number) {
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
				body: JSON.stringify({
					uris: [spotifyTrack?.uri],
					position_ms: position || 0,
				}),
			}
		).then(() => setIsNextSongLoading(false));
	}

	const findCacheCorrespondance = (song: Prisma.SongCreateInput) => {
		const track = spotifyCache.find(
			(track: Track) =>
				track.artists[0].name === song.artist && track.name === song.title
		);
		return track || null;
	};

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
				play,
				spotifyTrack,
				setResumePosition,
				resumePosition,
				findCacheCorrespondance,
			}}
		>
			{children}
		</PlayerContext.Provider>
	);
};

export const usePlayer = () => {
	const context = useContext(PlayerContext);
	if (!context) {
		throw new Error("usePlayer must be used within a PlayerProvider");
	}
	return context;
};
