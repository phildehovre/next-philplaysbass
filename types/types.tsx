import { Track } from "spotify-api.js";
import { Song } from "@/lib/generated/prisma";

export type LanguagesType = "en" | "fr" | "nl";

export type GSBSong = {
	song_id: string;
	song_title: string;
	song_uri: string;
	tempo: string;
	artist: {
		id: string;
		name: string;
		uri: string;
		genres: string[];
		from: string | null;
		mbid: string;
	};
	album: {
		title: string;
		uri: string;
		year: string;
	};
};

export type Playlist = {
	createdAt: Date;
	id: string;
	name: string;
	userId: string;
	songs: Song[];
};

export type SongData = {
	id: number | string;
	title: string;
	artist: string;
	duration: number;
	tempo: number;
	externalId: string;
	uri: string;
};
type SimplifiedTrack = Omit<Track, "makeCodeImage">;
export type SongObject = SimplifiedTrack & Song;

export const links = [
	{
		name: "Home",
		hash: "/",
	},
	{
		name: "App",
		hash: "/metronome",
	},
	{
		name: "Lessons",
		hash: "/lessons",
	},
	{
		name: "About",
		hash: "/about",
	},
] as const;

export type SectionName = (typeof links)[number]["name"];

export type PaymentDetails = {
	iban: string;
	account_holder: string;
};

declare global {
	interface Window {
		onSpotifyWebPlaybackSDKReady: () => void;
	}
}

export interface SpotifyPlayer {
	connect(): Promise<boolean>;
	disconnect(): void;
	addListener(
		event: "ready" | "not_ready",
		callback: (data: { device_id: string }) => void
	): boolean;
	addListener(
		event: "player_state_changed",
		callback: (state: Spotify.PlaybackState | null) => void
	): boolean;
	addListener(event: string, callback: (...args: any[]) => void): boolean;
	removeListener(event: string): boolean;
	getCurrentState(): Promise<Spotify.PlaybackState | null>;
	pause(): Promise<void>;
	resume(): Promise<void>;
	previousTrack(): Promise<void>;
	nextTrack(): Promise<void>;
}
