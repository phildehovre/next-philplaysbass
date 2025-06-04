// pages/api/spotify/token.ts
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const { code } = req.body;

	if (!code) {
		return res.status(400).json({ error: "Authorization code is missing" });
	}

	const params = new URLSearchParams({
		grant_type: "authorization_code",
		code,
		redirect_uri: process.env.SPOTIFY_REDIRECT_URI!,
		client_id: process.env.SPOTIFY_CLIENT_ID!,
		client_secret: process.env.SPOTIFY_CLIENT_SECRET!,
	});

	try {
		const response = await fetch("https://accounts.spotify.com/api/token", {
			method: "POST",
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
			},
			body: params.toString(),
		});

		const data = await response.json();

		if (!response.ok) {
			return res
				.status(response.status)
				.json({ error: data.error_description });
		}

		// Optional: store refresh_token in a cookie or DB
		return res.status(200).json(data); // access_token, refresh_token, expires_in
	} catch (err) {
		console.error("[Spotify Token Error]", err);
		return res.status(500).json({ error: "Internal Server Error" });
	}
}
