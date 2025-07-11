import { mapGSBSongToSongInput } from "@/lib/utils/songUtils";
import { GSBSong } from "@/types/types";

export const fetchTempoData = async (bpm: number) => {
	const apiUrl = `https://api.getsong.co/tempo/?api_key=${process.env.NEXT_PUBLIC_SONGBPM_API_KEY}&bpm=${bpm}`;
	const response = await fetch(apiUrl);
	if (!response.ok) {
		throw new Error("Network response was not ok");
	}

	const data = await response.json();

	const result = data.tempo.map((item: GSBSong) => {
		return mapGSBSongToSongInput(item, "", 0);
	});
	return result;
};

export const fetchArtist = async (artistName: string) => {
	const artistString =
		artistName.split(" ").length > 1
			? artistName.split(" ").join("+")
			: artistName;
	const apiUrl = `https://api.getsong.co/search/?api_key=${process.env.NEXT_PUBLIC_SONGBPM_API_KEY}&type=song&lookup=${artistString}&limit=50`;
	const response = await fetch(apiUrl);
	if (!response) {
		throw new Error("network response was not ok, artist/song lookup");
	}
	return response;
};
