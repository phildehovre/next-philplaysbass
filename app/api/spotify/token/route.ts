export async function POST(req: Request) {
	try {
		const body = await req.json();
		const code = body.code;

		if (!code) {
			return new Response(
				JSON.stringify({ error: "Missing authorization code" }),
				{
					status: 400,
					headers: { "Content-Type": "application/json" },
				}
			);
		}

		const client_id = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID!;
		const client_secret = process.env.SPOTIFY_CLIENT_SECRET!;
		const redirect_uri = process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI!;

		const credentials = Buffer.from(`${client_id}:${client_secret}`).toString(
			"base64"
		);

		const tokenRes = await fetch("https://accounts.spotify.com/api/token", {
			method: "POST",
			headers: {
				Authorization: `Basic ${credentials}`,
				"Content-Type": "application/x-www-form-urlencoded",
			},
			body: new URLSearchParams({
				grant_type: "authorization_code",
				code,
				redirect_uri,
			}),
		});

		if (!tokenRes.ok) {
			const errorText = await tokenRes.text();
			return new Response(
				JSON.stringify({
					error: "Failed to exchange token",
					details: errorText,
				}),
				{
					status: tokenRes.status,
					headers: { "Content-Type": "application/json" },
				}
			);
		}

		const tokenData = await tokenRes.json();

		return new Response(
			JSON.stringify({
				access_token: tokenData.access_token,
				refresh_token: tokenData.refresh_token,
				expires_in: tokenData.expires_in,
				scope: tokenData.scope,
				token_type: tokenData.token_type,
			}),
			{
				status: 200,
				headers: { "Content-Type": "application/json" },
			}
		);
	} catch (error) {
		console.error("Error in /api/spotify/token:", error);
		return new Response(JSON.stringify({ error: "Internal server error" }), {
			status: 500,
			headers: { "Content-Type": "application/json" },
		});
	}
}
