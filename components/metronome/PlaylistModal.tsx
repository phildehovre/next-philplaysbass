"use client";
import React, { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import "./PlaylistModal.css";
import { useUser } from "@/context/userContext";
import { SongData } from "@/types/types";
import { useCreatePlaylist } from "@/hooks/usePlaylist";

type Props = {
	setShow: (p: boolean) => void;
	song: SongData;
};

type FormValues = {
	playlistName: string;
};

const PlaylistModal = ({ setShow, song }: Props) => {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<FormValues>();
	const modalRef = useRef<HTMLDivElement>(null);

	const { user, loading } = useUser();

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

	const onSubmit = (data: FormValues) => {
		if (!user) return;

		createPlaylist(
			{
				kindeId: user.id,
				name: data.playlistName,
				firstSong: song,
			},
			{
				onSuccess: (playlist) => {
					console.log("Created:", playlist);
					reset();
					setShow(false);
				},
				onError: (err) => {
					console.error("An error occurred:", err);
				},
			}
		);
	};

	return (
		<div className="playlist-modal_overlay">
			<div className="playlist-modal_ctn" ref={modalRef}>
				<form onSubmit={handleSubmit(onSubmit)}>
					<label htmlFor="playlist-name">Playlist Name:</label>
					{errors.playlistName && (
						<p className="playlist-modal_error">
							Please enter a playlist name.
						</p>
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
