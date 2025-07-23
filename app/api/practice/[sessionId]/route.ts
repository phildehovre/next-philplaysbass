// app/api/practice/[sessionId]/route.ts

import { NextRequest } from "next/server";

export async function POST(
	req: NextRequest,
	{ params }: { params: { sessionId: string } }
) {
	try {
		const sessionId = params.sessionId;
		const body = await req.json();

		console.log("Received session ID:", sessionId);
		console.log("Request body:", body);

		return new Response(
			JSON.stringify({ message: `Session ${sessionId} received`, data: body }),
			{ status: 200, headers: { "Content-Type": "application/json" } }
		);
	} catch (error: any) {
		console.error("Error in /api/practice/[sessionId]:", error);
		return new Response(JSON.stringify({ error: "Invalid request" }), {
			status: 400,
		});
	}
}
