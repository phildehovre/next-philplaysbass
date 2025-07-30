import { GameTypes } from "@/types/types";

export const toolCards = [
	{
		title: "Metronome",
		description:
			"Set your tempo and time signature, or sync with backing tracks. Stay in time with precision.",
		btnText: "Start Metronome",
		href: "/metronome",
	},
	{
		title: "Tuner",
		description:
			"Quickly tune your instrument with visual pitch detection. Supports guitar, bass, and more.",
		btnText: "Open Tuner",
		href: "/tuner",
	},
	{
		title: "Spotify Mode",
		description:
			"Practice to real music at your target tempo. Choose from curated playlists or search by BPM.",
		btnText: "Browse Tracks",
		href: "/metronome",
	},
];

export const gameCards: {
	title: string;
	gameType: GameTypes;
	description: string;
	btnText: string;
	href: string;
}[] = [
	{
		title: "Note Match",
		gameType: "note-match",
		description:
			"Random notes will appear as soon as the game begins — your goal? Play them on your instrument as quickly and accurately as possible to score points. It’s a fast-paced test of fretboard knowledge, reflexes, and instrumental control. Can you keep up?",
		btnText: "Play!",
		href: "/games/inversions",
	},
	{
		title: "Name the triad",
		gameType: "name-triad",
		description:
			"Put your ears and eyes to the test as you race to recognize arpeggios and their qualities — major, minor, diminished, augmented...  all at a glance. Whether you're sharpening your theory skills or training for the bandstand, this fast-paced challenge will push your pattern recognition and chord knowledge to the limit.",
		btnText: "Play!",
		href: "/games/arpeggios",
	},
];
