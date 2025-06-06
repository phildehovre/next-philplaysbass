"use client";
import { PlayerContext } from "@/context/playerContext";
import useCookies from "@/hooks/useCookies";
import { PauseIcon, PlayCircleIcon, PlayIcon } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import { PlaybackState } from "spotify-web-playback-sdk";

const PlayButton = ({
	isShowing,
	player,
	handlePlayButtonClick,
}: {
	isShowing: boolean;
	handlePlayButtonClick: () => void;
	player: Spotify.Player;
}) => {
	const { getCookie, setCookie } = useCookies();
	const { spotifyTrack } = useContext<any>(PlayerContext);

	const [playerState, setPlayerState] = useState<PlaybackState | null>();

	useEffect(() => {
		if (!player) return;
		player.getCurrentState().then((state) => {
			console.log(state);
			setPlayerState(state);
		});
	}, []);

	useEffect(() => {
		player.getCurrentState().then((state) => {
			console.log("Player is present: ", playerState);
		});
	}, [player]);

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

	async function pause() {
		const token = JSON.parse(getCookie("token") || "{}")?.access_token;

		if (!player || !token) {
			console.error("Missing player instance or token");
			return;
		}

		try {
			const state = await player.getCurrentState();

			if (!state) {
				console.warn(
					"No active playback state. Falling back to Web API pause."
				);
				await fetch("https://api.spotify.com/v1/me/player/pause", {
					method: "PUT",
					headers: {
						Authorization: `Bearer ${token}`,
						"Content-Type": "application/json",
					},
				});
				return;
			}

			await player.pause();
			console.log("Playback paused using SDK.");
		} catch (err) {
			console.error("Error pausing via SDK. Falling back to Web API:", err);

			try {
				await fetch("https://api.spotify.com/v1/me/player/pause", {
					method: "PUT",
					headers: {
						Authorization: `Bearer ${token}`,
						"Content-Type": "application/json",
					},
				});
				console.log("Playback paused using Web API fallback.");
			} catch (apiErr) {
				console.error("Failed to pause using Web API:", apiErr);
			}
		}
	}

	const handlePlayPause = () => {
		handlePlayButtonClick();
		if (playerState?.isPlaying) {
			pause();
		} else {
			play();
		}
	};

	return (
		<div
			className={`play-button ${isShowing ? "showing" : ""}`}
			onClick={handlePlayPause}
		>
			{playerState?.isPaused ? <PauseIcon /> : <PlayIcon />}
		</div>
	);
};

export default PlayButton;
