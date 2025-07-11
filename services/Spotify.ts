import { Prisma } from "@/lib/generated/prisma";
import { mapSpotifyFieldsToSongInput } from "@/lib/utils/songUtils";
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

export const getTrackAndMapToSongInput = async (
	song: Prisma.SongCreateInput,
	token: string
) => {
	if (token) {
		const res: any & { uri: string; duration_ms: number } =
			await getSpotifyTrackByArtistAndTitle(song.title, song.artist, token);
		if (!res) {
			throw new Error("no track was found");
		}
		var songWithSpotifyFields = mapSpotifyFieldsToSongInput(
			song,
			res[0].uri,
			res[0].duration_ms
		);
		return songWithSpotifyFields;
	}
};

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

export async function searchSpotifySongsByArtistName(
	name: string,
	accessToken: string
): Promise<any | null> {
	const query = `artist:${name}`;
	const url = new URL(`${SPOTIFY_API_BASE}/search`);
	url.searchParams.append("q", query);
	url.searchParams.append("type", "track");
	// url.searchParams.append("limit", "10");

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

// export async function exportPlaylistToSpotify(
// 	playlistName: string,
// 	songUris: string[],
// 	accessToken: string
// ) {
// 	// 1. Get current user's Spotify ID
// 	const userRes = await fetch("https://api.spotify.com/v1/me", {
// 		headers: {
// 			Authorization: `Bearer ${accessToken}`,
// 		},
// 	});
// 	if (!userRes.ok) throw new Error("Failed to fetch user profile");
// 	const userData = await userRes.json();

// 	// 2. Create a playlist
// 	const createRes = await fetch(
// 		`https://api.spotify.com/v1/users/${userData.id}/playlists`,
// 		{
// 			method: "POST",
// 			headers: {
// 				Authorization: `Bearer ${accessToken}`,
// 				"Content-Type": "application/json",
// 			},
// 			body: JSON.stringify({
// 				name: playlistName,
// 				public: false,
// 				description: "Exported from Metronome",
// 			}),
// 		}
// 	);
// 	if (!createRes.ok) throw new Error("Failed to create playlist");
// 	const playlistData = await createRes.json();

// 	// 3. Add tracks
// 	const addRes = await fetch(
// 		`https://api.spotify.com/v1/playlists/${playlistData.id}/tracks`,
// 		{
// 			method: "POST",
// 			headers: {
// 				Authorization: `Bearer ${accessToken}`,
// 				"Content-Type": "application/json",
// 			},
// 			body: JSON.stringify({ uris: songUris }),
// 		}
// 	);
// 	if (!addRes.ok) throw new Error("Failed to add tracks to playlist");

// 	return playlistData;
// }

export async function exportPlaylistToSpotify(
	playlistName: string,
	songUris: string[],
	accessToken: string
) {
	const baseUrl = "https://api.spotify.com/v1";

	const headers = {
		Authorization: `Bearer ${accessToken}`,
		"Content-Type": "application/json",
	};

	// Helper to fetch JSON or throw
	const fetchOrThrow = async (url: string, options?: RequestInit) => {
		const res = await fetch(url, options);
		if (!res.ok) {
			const errText = await res.text();
			throw new Error(`Spotify API error: ${res.status} ${errText}`);
		}
		return res.json();
	};

	// 1. Get current user's Spotify ID
	const { id: userId } = await fetchOrThrow(`${baseUrl}/me`, { headers });

	// 2. Check for existing playlist with the same name
	const userPlaylists: any = await fetchOrThrow(
		`${baseUrl}/users/${userId}/playlists?limit=50`,
		{ headers }
	);

	let existingPlaylist = userPlaylists.items.find(
		(p: any) => p.name.toLowerCase() === playlistName.toLowerCase()
	);

	let playlistId: string;

	if (existingPlaylist) {
		playlistId = existingPlaylist.id;

		// Clear existing tracks
		await fetchOrThrow(`${baseUrl}/playlists/${playlistId}/tracks`, {
			method: "PUT",
			headers,
			body: JSON.stringify({ uris: [] }),
		});
	} else {
		// 3. Create a new playlist
		const playlist = await fetchOrThrow(
			`${baseUrl}/users/${userId}/playlists`,
			{
				method: "POST",
				headers,
				body: JSON.stringify({
					name: playlistName,
					public: false,
					description: "Exported from Metronome",
				}),
			}
		);
		playlistId = playlist.id;
	}

	// 4. Add tracks
	if (songUris.length > 0) {
		await fetchOrThrow(`${baseUrl}/playlists/${playlistId}/tracks`, {
			method: "POST",
			headers,
			body: JSON.stringify({ uris: songUris }),
		});
	}

	// 5. Return playlist info
	return await fetchOrThrow(`${baseUrl}/playlists/${playlistId}`, { headers });
}
