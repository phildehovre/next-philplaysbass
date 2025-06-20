"use client";
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import "./PlaylistModal.css";
import { createPlaylist } from "@/actions/playlistActions";
import { Prisma } from "@/lib/generated/prisma";
import { usePlaylists } from "@/context/playlistContext";
import { getTrackAndMapToSongInput } from "@/services/Spotify";
import useCookies from "@/hooks/useCookies";

type Props = {
	setShow: (p: boolean) => void;
	song: Prisma.SongCreateInput;
	onClose: () => void;
};

type FormValues = {
	playlistName: string;
};

const PlaylistModal = ({ setShow, song, onClose }: Props) => {
	const [isLoading, setIsLoading] = useState(false);
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<FormValues>();
	const modalRef = useRef<HTMLDivElement>(null);

	const { addPlaylist } = usePlaylists();
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

	const onSubmit = async (data: FormValues) => {
		setIsLoading(true);
		const playlistWithSong = { ...data, songs: [song] };
		addPlaylist(playlistWithSong);
		const tokenCookie = getCookie("token");
		if (!tokenCookie) {
			throw new Error("No Spotify access token found");
		}
		const { access_token } = JSON.parse(tokenCookie);
		const mapped = await getTrackAndMapToSongInput(song, access_token);
		console.log("mapped: ", mapped);
		await createPlaylist(data.playlistName, mapped)
			.catch((err) => {
				throw new Error(err);
			})
			.then(() => {
				reset();
				onClose();
			});
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
