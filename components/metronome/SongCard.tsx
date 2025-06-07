"use client";

import "./SongCard.scss";
import { Song, SongData } from "../../types/types";

import { animate, stagger } from "motion";
import { useContext, useEffect, useLayoutEffect, useState } from "react";
import PlayButton from "./PlayButton";
import { PlayerContext } from "@/context/playerContext";

function SongCard(props: { song: SongData }) {
	const { song } = props;
	const [showPlayButton, setShowPlayButton] = useState(false);
	const { player, currentTrack } = useContext<any>(PlayerContext);

	useLayoutEffect(() => {
		animate(
			".songcard",
			{ opacity: [0, 1] },
			{ duration: 0.5, delay: stagger(0.05) }
		);
	}, []);
	useEffect(() => {
		if (currentTrack && currentTrack.song_title == song.song_title) {
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
		<div
			className="songcard"
			onMouseEnter={() => setShowPlayButton(true)}
			onMouseLeave={() => {
				if (currentTrack && currentTrack.song_title !== song.song_title) {
					setShowPlayButton(false);
				}
			}}
		>
			<div className="songcard-left">
				<div>
					<div className="songcard-title">{formatTitle(song.song_title)}</div>
					<div className="songcard-artist">{song.artist.name}</div>
				</div>
			</div>
			<div className="songcard-right">
				<div className="songcard-genres">
					{renderGenres(song.artist.genres)}
				</div>
				{player && (
					<PlayButton isShowing={showPlayButton} player={player} song={song} />
				)}
			</div>
		</div>
	);
}

export default SongCard;
