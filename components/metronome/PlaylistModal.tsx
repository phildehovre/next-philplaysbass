"use client";
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import "./PlaylistModal.css";
import { createPlaylist } from "@/actions/playlistActions";
import { Prisma } from "@/lib/generated/prisma";
import { usePlaylists } from "@/context/playlistContext";
import { getTrackAndMapToSongInput } from "@/services/Spotify";
import useCookies from "@/hooks/useCookies";
import Spinner from "../Spinner";
import { useRouter } from "next/navigation";

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
	const [playlistName, setPlaylistName] = useState("");
	const [mappedSongData, setMappedSongData] =
		useState<Prisma.SongCreateInput>();
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<FormValues>();
	const modalRef = useRef<HTMLDivElement>(null);

	const { addPlaylist, refreshPlaylists } = usePlaylists();
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

	useEffect(() => {
		if (!mappedSongData) {
			setIsLoading(true);
		}
		if (mappedSongData) {
			setIsLoading(false);
		}
	}, [mappedSongData]);

	useEffect(() => {
		(async () => {
			const mapped = await consolidateSongDataWithSpotify();
			setMappedSongData(mapped);
		})();
	}, []);

	console.log(mappedSongData);
	const consolidateSongDataWithSpotify = async () => {
		const tokenCookie = getCookie("token");
		if (!tokenCookie) {
			throw new Error("No Spotify access token found");
		}
		const { access_token } = JSON.parse(tokenCookie);
		const mapped = await getTrackAndMapToSongInput(song, access_token);

		if (!mapped) return;
		return mapped;
	};

	const formRef = useRef<HTMLFormElement>(null);

	const onSubmit = async (data: FormValues) => {
		setIsLoading(true);
		try {
			// Create a FormData object to pass to the server action
			const formData = new FormData();
			formData.append("playlistName", data.playlistName);
			formData.append("songData", JSON.stringify(song));

			await createPlaylist(formData); // call server action

			await refreshPlaylists(); // manually re-fetch playlists

			reset();
			onClose();
		} catch (err) {
			console.error("Playlist creation failed:", err);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="modal_overlay">
			<div className="modal_ctn" ref={modalRef}>
				<form ref={formRef} onSubmit={handleSubmit(onSubmit)}>
					<label htmlFor="name">Playlist Name:</label>
					{errors.playlistName && (
						<p className="modal_error">Please enter a playlist name.</p>
					)}
					<input
						type="text"
						id="playlist-name"
						placeholder="Enter your name here..."
						{...register("playlistName", { required: true })}
						name="playlistName"
						autoFocus
					/>

					<input type="hidden" name="songData" value={JSON.stringify(song)} />
					<button
						className={`submit_btn ${isLoading ? "loading" : ""}`}
						type="submit"
						disabled={isLoading}
					>
						{isLoading ? <Spinner /> : "Create playlist"}
					</button>
				</form>
			</div>
		</div>
	);
};

export default PlaylistModal;
