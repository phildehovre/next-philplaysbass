"use client";
import React, { useState, useContext, useEffect, useRef } from "react";
import { PlayerContext } from "@/context/playerContext";
import "./SpotifyPlayer.css";
import { Slider } from "../ui/slider";
import { toast } from "sonner";
import { formatTime } from "@/utils/helpers";
import {
	ChevronDown,
	ChevronsDown,
	ChevronUp,
	PauseIcon,
	PlayIcon,
} from "lucide-react";

const SpotifyPlayer = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [position, setPosition] = useState<number>(0);
	const [sliderValue, setSliderValue] = useState<number>(0);
	const [duration, setDuration] = useState<number>(0);
	const [isPlaying, setIsPlaying] = useState(false);

	const { isNextSongLoading, player, spotifyTrack, currentTrack } =
		useContext<any>(PlayerContext);

	useEffect(() => {
		if (isPlaying) {
			setIsOpen(true);
		}
	}, [isPlaying]);

	const isSeekingRef = useRef(false);
	const previousSliderValueRef = useRef<number>(sliderValue);

	// Open player when currentTrack changes
	useEffect(() => {
		if (currentTrack) {
			setIsOpen(true);
		}
	}, [currentTrack]);

	// Reset position and slider on new track
	useEffect(() => {
		if (!currentTrack) return;
		setPosition(0);
		setSliderValue(0);
		setDuration(0);
	}, [currentTrack]);

	// Initialize slider when player is ready
	useEffect(() => {
		if (!player) return;

		const updateInitialSlider = async () => {
			const state = await player.getCurrentState();
			if (state && !state.paused && state.duration) {
				setPosition(state.position);
				setDuration(state.duration);
				setSliderValue((state.position / state.duration) * 100);
				setIsPlaying(!state.paused);
			}
		};

		updateInitialSlider();
	}, [player]);

	// Poll player position every 500ms (but pause updates if seeking)
	useEffect(() => {
		if (!player) return;

		let interval: NodeJS.Timeout;

		const startPolling = () => {
			interval = setInterval(async () => {
				const state = await player.getCurrentState();
				if (!state || !state.duration) return;

				setDuration(state.duration);
				setIsPlaying(!state.paused);

				if (!isSeekingRef.current) {
					setPosition(state.position);
					setSliderValue((state.position / state.duration) * 100);
				}
			}, 500);
		};

		startPolling();

		return () => clearInterval(interval);
	}, [player]);

	// Mismatch detection (toast notification)
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

	// Play/pause toggle handler
	const togglePlayPause = async () => {
		if (!player) return;

		const state = await player.getCurrentState();
		if (!state) return;

		if (state.paused) {
			await player.resume();
			setIsPlaying(true);
		} else {
			await player.pause();
			setIsPlaying(false);
		}
	};

	return (
		<div className={`player_ctn ${isOpen ? "open" : ""}`}>
			<ChevronsDown className="close_btn" onClick={() => setIsOpen(false)} />
			<div className="header">
				<button
					onClick={togglePlayPause}
					className="player-toggle_btn"
					aria-label={isPlaying ? "Pause" : "Play"}
				>
					{!isPlaying ? <PlayIcon /> : <PauseIcon />}
				</button>
				<h1>{spotifyTrack?.name}</h1>
				<p>{spotifyTrack?.artists[0].name}</p>
			</div>
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
						previousSliderValueRef.current = value[0];
					});
				}}
			/>
			<div className="flex justify-between text-xs text-gray-400 mt-1">
				<span>{formatTime(position || 0)}</span>
				<span>{formatTime(duration || 0)}</span>
			</div>
		</div>
	);
};

export default SpotifyPlayer;
