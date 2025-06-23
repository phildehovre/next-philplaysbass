"use client";

import "./SongCard.scss";
import { Playlist } from "../../types/types";

import { animate, stagger } from "motion";
import { useContext, useEffect, useLayoutEffect, useState } from "react";
import PlayButton from "./PlayButton";
import { PlayerContext } from "@/context/playerContext";
import SongDropdown from "./SongDropdown";
import PlaylistModal from "./PlaylistModal";
import { Prisma } from "@/lib/generated/prisma";

function SongCard(props: {
	song: Prisma.SongCreateInput;
	playlists: Prisma.SongCreateInput[];
	isPlaylist?: boolean;
}) {
	const { song, playlists, isPlaylist } = props;
	const [showPlayButton, setShowPlayButton] = useState(false);
	const [showSongPortal, setShowSongPortal] = useState(false);
	const [isPlaying, setIsPlaying] = useState(false);
	const { player, currentTrack } = useContext<any>(PlayerContext);

	useEffect(() => {
		setIsPlaying(song.title === currentTrack?.title);
	}, [currentTrack]);

	useLayoutEffect(() => {
		animate(
			".songcard",
			{ opacity: [0, 1] },
			{ duration: 0.5, delay: stagger(0.05) }
		);
	}, []);
	useEffect(() => {
		if (currentTrack && currentTrack.song_title == song.title) {
			setShowPlayButton(true);
		} else {
			setShowPlayButton(false);
		}
	}, [currentTrack]);

	const renderGenres = (genres: string[]) => {
		if (genres) {
			const newArr = [];
			for (let i = 0; i < genres.length; i++) {
				newArr.push(genres[i][0].toUpperCase() + genres[i].slice(1));
			}
			return newArr.join(", ");
		}
		return undefined;
	};

	const formatTitle = (title: string) => {
		if (title.length > 30) {
			return title.split(" ").slice(0, 5).join(" ") + "...";
		}
		return title;
	};

	return (
		<>
			{showSongPortal && (
				<PlaylistModal
					setShow={setShowSongPortal}
					song={song}
					onClose={() => setShowSongPortal(false)}
				/>
			)}
			<div
				className={`songcard ${isPlaying ? "active" : ""}`}
				onMouseEnter={() => setShowPlayButton(true)}
				onMouseLeave={() => {
					if (currentTrack && currentTrack.song_title !== song.title) {
						setShowPlayButton(false);
					}
				}}
			>
				<div className="songcard-left">
					<div>
						<div className="songcard-title">{formatTitle(song.title)}</div>
						<div className="songcard-artist">{song.artist}</div>
					</div>
				</div>
				<div className="songcard-right">
					<div className="songcard-genres">
						{renderGenres(song.genres as string[])}
					</div>
					{player && (
						<PlayButton
							isShowing={showPlayButton}
							player={player}
							song={song}
						/>
					)}
					<div className="song-dropdown_btn">
						<SongDropdown
							playlists={playlists}
							setShowSongPortal={setShowSongPortal}
							song={song}
							isPlaylist={isPlaylist}
						/>
					</div>
				</div>
			</div>
		</>
	);
}

export default SongCard;
