// app/api/spotify/route.ts
export async function POST(req: Request) {
	const body = await req.json();
	const { code } = body;

	if (!code) {
		return new Response(
			JSON.stringify({ error: "Authorization code is missing" }),
			{
				status: 400,
				headers: { "Content-Type": "application/json" },
			}
		);
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
			return new Response(JSON.stringify({ error: data.error_description }), {
				status: response.status,
				headers: { "Content-Type": "application/json" },
			});
		}

		return new Response(JSON.stringify(data), {
			status: 200,
			headers: { "Content-Type": "application/json" },
		});
	} catch (err) {
		console.error("[Spotify Token Error]", err);
		return new Response(JSON.stringify({ error: "Internal Server Error" }), {
			status: 500,
			headers: { "Content-Type": "application/json" },
		});
	}
}
