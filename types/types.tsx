export type LanguagesType = "en" | "fr" | "nl";

export type Song = {
	song_id: string;
	song_title: string;
	song_uri: string;
	tempo: string;
	artist: {
		id: string;
		name: string;
		uri: string;
		img: string;
		genres: string[];
		from: string;
		mbid: string;
	};
	album: {
		title: string;
		uri: string;
		img: string;
		year: string;
	};
};

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

export type SongData = {
	song_id: string;
	song_title: string;
	song_uri: string;
	tempo: string; // or number, depending on how you want to use it
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
		year: string; // or number if you'd rather coerce it
	};
};
