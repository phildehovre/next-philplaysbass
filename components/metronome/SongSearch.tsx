import { useSongList } from "@/context/songListContext";
import useCookies from "@/hooks/useCookies";
import { fetchArtist } from "@/services/getSongBpm";
import {
	searchSpotifyArtistByName,
	searchSpotifySongsByArtistName,
} from "@/services/Spotify";
import React from "react";
import { FieldValues, useForm } from "react-hook-form";

const SongSearch = () => {
	const { handleSubmit, register } = useForm();
	const { searchTerm, setSearchTerm } = useSongList();

	const { getCookie } = useCookies();

	const onSubmit = async (data: FieldValues) => {
		const token = JSON.parse(getCookie("token") || "{}")?.access_token;
		if (!token) {
			console.warn("No access token found in cookies.");
			return;
		}
		const result = await searchSpotifySongsByArtistName(data.searchTerm, token);
	};
	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<input type="text" {...register("searchTerm")} />
		</form>
	);
};

export default SongSearch;
