import { toast } from "sonner";
import { Track } from "spotify-api.js";

export const PlaySong = () => {
	console.log("Beep boop");
};

const SPOTIFY_API_BASE = "https://api.spotify.com/v1";

let spotifySDKPromise: Promise<void> | null = null;

export function loadSpotifySDK(): Promise<void> {
	if (spotifySDKPromise) return spotifySDKPromise;

	spotifySDKPromise = new Promise((resolve, reject) => {
		if ((window as any).Spotify) {
			resolve();
			return;
		}

		const script = document.createElement("script");
		script.src = "https://sdk.scdn.co/spotify-player.js";
		script.async = true;
		script.onload = () => {
			(window as any).onSpotifyWebPlaybackSDKReady = () => resolve();
		};
		script.onerror = reject;

		document.body.appendChild(script);
	});

	return spotifySDKPromise;
}

export async function getSpotifyTrackByArtistAndTitle(
	title: string,
	artistName: string,
	accessToken: string
): Promise<Track | null> {
	const query = `track:${title} artist:${artistName}`;
	const url = new URL(`${SPOTIFY_API_BASE}/search`);
	url.searchParams.append("q", query);
	url.searchParams.append("type", "track");
	url.searchParams.append("limit", "1");

	try {
		const res = await fetch(url.toString(), {
			headers: {
				Authorization: `Bearer ${accessToken}`,
				"Content-Type": "application/json",
			},
		});

		if (!res.ok) {
			const errorData = await res.json();
			throw new Error(
				`Spotify search error: ${res.status} ${res.statusText} - ${errorData.error?.message}`
			);
		}

		const data = await res.json();
		const track = data.tracks.items;

		return track || null;
	} catch (err) {
		toast("The Spotify access has reset, please log in again", {});
		console.log("[Spotify Search Error]", err);
		return null;
	}
}

export async function searchSpotifyArtistByName(
	name: string,
	accessToken: string
): Promise<any | null> {
	const query = `artist:${name}`;
	const url = new URL(`${SPOTIFY_API_BASE}/search`);
	url.searchParams.append("q", query);
	url.searchParams.append("type", "artist");
	url.searchParams.append("limit", "1");

	try {
		const res = await fetch(url.toString(), {
			headers: {
				Authorization: `Bearer ${accessToken}`,
				"Content-Type": "application/json",
			},
		});

		if (!res.ok) {
			const errorData = await res.json();
			throw new Error(
				`Spotify search error: ${res.status} ${res.statusText} - ${errorData.error?.message}`
			);
		}

		const data = await res.json();
		const artist = data.artists.items[0];

		return artist || null;
	} catch (err) {
		toast("The Spotify access has reset, please log in again", {});
		console.log("[Spotify Artist Search Error]", err);
		return null;
	}
}
