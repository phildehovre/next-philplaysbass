// app/page.tsx (or your Home component)
"use server";

import styles from "./page.module.css";
import Hero from "@/components/Hero";
import Nav from "@/components/Nav";
import LatestStream from "@/components/LatestStream";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Feature from "@/components/Feature";

// Fetch stream data directly in the server component
async function fetchLatestStream() {
	const channelId = process.env.CHANNEL_ID;
	const apiKey = process.env.YOUTUBE_API_KEY;

	const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&type=video&order=date&key=${apiKey}`;
	const response = await fetch(url);
	const data = await response.json();

	if (data.items && data.items.length > 0) {
		const video = data.items[0];
		console.log(video);
		return {
			id: video.id.videoId,
			title: video.snippet.title,
			thumbnail: video.snippet.thumbnails.high.url,
			url: `https://www.youtube.com/watch?v=${video.id.videoId}`,
		};
	}

	return null;
}

export default async function Home() {
	const { isAuthenticated } = getKindeServerSession();
	const isLoggedIn = await isAuthenticated();
	const latestStream = await fetchLatestStream();

	return (
		<div className={styles.page}>
			<main className={styles.main}>
				<Nav isLoggedIn={isLoggedIn} />
				<Hero />
				<Feature>
					<LatestStream latestStream={latestStream} />
				</Feature>
			</main>
		</div>
	);
}
