import { Track } from "spotify-api.js";
import { Song } from "@/lib/generated/prisma";
import { ScaleQuality } from "@/constants/chromaticScale";

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
		hash: "/dashboard",
	},
	{
		name: "Lessons",
		hash: "/lessons",
	},
	{
		name: "About",
		hash: "/about",
	},
	{
		name: "Leaderboard",
		hash: "/leaderboard",
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

export type Note =
	| "C"
	| "B#"
	| "C#"
	| "Db"
	| "D"
	| "D#"
	| "Eb"
	| "E"
	| "E#"
	| "Fb"
	| "F"
	| "F#"
	| "Gb"
	| "G"
	| "G#"
	| "Ab"
	| "A"
	| "A#"
	| "Bb"
	| "B"
	| "Cb";

export type ChordQuality = "major" | "minor" | "diminished" | "augmented";

export type ArpeggioMap = {
	[key in Note]: {
		[quality in ChordQuality]: string[];
	};
};

export type NoteInfo = {
	noteName: string; // e.g., "G"
	octave: number; // e.g., 2
	centsOff: number; // e.g., 3.83 — how far off from the ideal frequency, in cents
	display: string; // e.g., "G2"
	volume: number;
};

export interface NoteEvent {
	expectedNote: string;
	playedNote?: string;
	isCorrect: boolean;
	timeToHitMs?: number;
	metronomeOffsetMs?: number;
	playedAt: Date;
}

export type NoteMatchEvent = {
	scaleType: ScaleQuality;
	key: string;
	bpm: number;
	withTimer: boolean;
	duration: number;
	speed: number;
};

export type ArpeggioMatchParams = {
	scaleType: ScaleQuality;
	key: string;
	bpm: number;
	withTimer: boolean;
	duration: number;
};

export type PracticeSession = {
	id: string;
	userId: string;
	createdAt: string; // ISO date string
	gameType: string; // You could replace with a union like "note-match" | "interval-match" if known
	duration: number;
	resultId: string | null;
	result: any | null; // You can refine this type if you know the shape of `result`
	totalScore: number;
};

export type UserWithPracticeSessions = {
	id: string;
	email: string;
	name: string;
	kindeId: string;
	PracticeSession: PracticeSession[];
};

export type GameTypes =
	| "note-match"
	| "chord-match"
	| "name-triad"
	| "tempo-match"
	| "rhythm-accuracy"
	| "free-practice";

export type Score = {
	rhythm: number;
	pitch: number;
	bonus: number;
};

export type InstrumentPreset = {
	label: string;
	strings: number;
	active: boolean[];
};
