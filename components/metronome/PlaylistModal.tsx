"use client";
import React, { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import "./PlaylistModal.css";
import { GSBSong } from "@/types/types";
import { createPlaylist } from "@/actions/playlistActions";
import { Prisma } from "@/lib/generated/prisma";

type Props = {
	setShow: (p: boolean) => void;
	song: Prisma.SongCreateInput;
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
		await createPlaylist(data.playlistName, song)
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
