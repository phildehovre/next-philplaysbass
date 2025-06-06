"use client";

import "./SongCard.scss";
import { Song } from "../../types/types";

import { animate, stagger } from "motion";
import { useLayoutEffect } from "react";

function SongCard(props: { song: Song }) {
	const { song } = props;

	useLayoutEffect(() => {
		animate(
			".songcard",
			{ opacity: [0, 1] },
			{ duration: 1, delay: stagger(0.1) }
		);
	}, []);

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
			<div className="songcard">
				<div className="songcard-left">
					<div>
						<div className="songcard-title">{formatTitle(song.song_title)}</div>
						<div className="songcard-artist">{song.artist.name}</div>
					</div>
				</div>
				<div>{renderGenres(song.artist.genres)}</div>
			</div>
		</>
	);
}

export default SongCard;
