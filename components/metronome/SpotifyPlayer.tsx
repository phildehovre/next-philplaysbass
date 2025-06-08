"use client";
import React, { useState, useContext, useEffect, useRef } from "react";
import { PlayerContext } from "@/context/playerContext";
import "./SpotifyPlayer.css";
import { Slider } from "../ui/slider";
import { toast } from "sonner";
import { formatTime } from "@/utils/helpers";

const SpotifyPlayer = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [position, setPosition] = useState<number[] | number>();
	const [sliderValue, setSliderValue] = useState<number>(0);
	const [duration, setDuration] = useState<number>(0);

	const { isNextSongLoading, player, spotifyTrack, currentTrack, play } =
		useContext<any>(PlayerContext);

	const isSeekingRef = useRef(false);
	const previousSliderValueRef = useRef<number>(0);

	useEffect(() => {
		if (currentTrack) {
			setIsOpen(true);
		} else {
			return;
		}
	}, [currentTrack]);

	useEffect(() => {
		if (!currentTrack) return;

		setPosition(0);
		setSliderValue(0);
		setDuration(0); // Optional: Reset duration if it's track-specific
	}, [currentTrack]);

	// Sets slider value immediately when the player becomes ready.
	useEffect(() => {
		if (!player) return;

		const updateInitialSlider = async () => {
			const state = await player.getCurrentState();
			if (state && !state.paused && state.duration) {
				const { position, duration } = state;
				setSliderValue((position / duration) * 100);
				setPosition(position);
				setDuration(duration);
			}
		};

		updateInitialSlider();
	}, [player]);

	useEffect(() => {
		if (!player) return;

		let interval: NodeJS.Timeout;

		const startPolling = () => {
			interval = setInterval(async () => {
				const state = await player.getCurrentState();
				if (!state || !state.duration) return;

				const { position, duration, paused } = state;

				setDuration(duration);

				if (!isSeekingRef.current) {
					setPosition(position);
					const percent = (position / duration) * 100;
					setSliderValue(percent);
				}
			}, 500);
		};

		startPolling();

		return () => clearInterval(interval);
	}, [player]);

	// Mismatch Logic
	// TODO: better Fuzzy match algo
	useEffect(() => {
		setTimeout(() => {
			if (!player || isNextSongLoading) return;
			player.getCurrentState().then((state: Spotify.PlaybackState) => {
				if (
					currentTrack?.artist.name !==
					state?.track_window?.current_track.artists[0].name
				) {
					toast(
						`Mismatch: Showing: ${currentTrack?.artist.name}, Playing: ${state?.track_window?.current_track.artists[0].name}`
					);
				}
			});
		}, 2000);
	}, [player, isNextSongLoading, spotifyTrack]);

	return (
		<div className={`player_ctn ${isOpen ? "open" : ""}`}>
			<div className="header">
				<h1>{spotifyTrack?.name}</h1>
				<p>{spotifyTrack?.artists[0].name}</p>
				<Slider
					value={[sliderValue]}
					max={100}
					step={0.1}
					onValueChange={(value) => {
						setSliderValue(value[0]);
						isSeekingRef.current = true;

						if (duration && value[0] !== previousSliderValueRef.current) {
							const previewPosition = (value[0] / 100) * duration;
							setPosition(previewPosition);
							previousSliderValueRef.current = value[0];
						}
					}}
					onValueCommit={(value) => {
						if (!player) return;
						player.getCurrentState().then((state: Spotify.PlaybackState) => {
							if (!state) return;
							const duration = state.duration;
							const newPosition = (value[0] / 100) * duration;
							player.seek(newPosition);
							setPosition(newPosition);
							setSliderValue(value[0]);
							isSeekingRef.current = false;
							previousSliderValueRef.current = value[0]; // Reset ref
						});
					}}
				/>
				<div className="flex justify-between text-xs text-gray-400 mt-1">
					<span>{formatTime(position || 0)}</span>
					<span>{formatTime(duration || 0)}</span>
				</div>
			</div>
		</div>
	);
};

export default SpotifyPlayer;
