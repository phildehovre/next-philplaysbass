"use client";
import React, { useContext, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import "./PlaylistModal.css";
import { useUser } from "@/context/userContext";
import { Song, SongData, SongObject } from "@/types/types";
import { useCreatePlaylist } from "@/hooks/usePlaylist";
import { PlayerContext, usePlayer } from "@/context/playerContext";
import { Track } from "spotify-api.js";
import { getSpotifyTrackByArtistAndTitle } from "@/services/Spotify";
import useCookies from "@/hooks/useCookies";

type Props = {
	setShow: (p: boolean) => void;
	song: Song;
	onClose: () => void;
};

type FormValues = {
	playlistName: string;
};

const PlaylistModal = ({ setShow, song, onClose }: Props) => {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<FormValues>();
	const modalRef = useRef<HTMLDivElement>(null);

	const { user, loading } = useUser();
	const { findCacheCorrespondance } = usePlayer();
	const { getCookie } = useCookies();

	// Close on click outside
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				modalRef.current &&
				!modalRef.current.contains(event.target as Node)
			) {
				setShow(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [setShow]);

	const { mutate: createPlaylist, isPending, error } = useCreatePlaylist();

	const onSubmit = async (data: FormValues) => {
		if (!user) return;

		var track: Track | null;

		track = findCacheCorrespondance(song);
		if (!track) {
			const token = JSON.parse(getCookie("token") || "{}")?.access_token;
			track = await getSpotifyTrackByArtistAndTitle(
				song.song_title,
				song.artist.name,
				token
			);
		}
		try {
			if (!track) return;
			const mappedSong: SongObject = {
				title: song.song_title,
				externalId: song.song_id,
				tempo: Number(song.tempo),
				artist: song.artist.name,
				...track,
			};
			createPlaylist(
				{
					kindeId: user.id,
					name: data.playlistName,
					firstSong: mappedSong,
				},
				{
					onSuccess: (playlist) => {
						console.log("Created:", playlist);
						reset();
						setShow(false);
					},
					onError: (err: any) => {
						throw new Error("Something went wrong: ", err.message);
					},
				}
			);
		} catch (error) {
			console.log(error);
		} finally {
			if (!isPending) {
				onClose();
			}
		}
	};

	return (
		<div className="modal_overlay">
			<div className="modal_ctn" ref={modalRef}>
				<form onSubmit={handleSubmit(onSubmit)}>
					<label htmlFor="name">Playlist Name:</label>
					{errors.playlistName && (
						<p className="modal_error">Please enter a playlist name.</p>
					)}
					<input
						type="text"
						id="playlist-name"
						placeholder="Enter your name here..."
						{...register("playlistName", { required: true })}
					/>
					<input type="submit" value="Create Playlist" />
				</form>
			</div>
		</div>
	);
};

export default PlaylistModal;
