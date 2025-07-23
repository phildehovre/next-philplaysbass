import { PrismaClient } from "@/lib/generated/prisma";
import { ensureUserInDb } from "@/services/userService";
import { NextRequest } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
	try {
		const body = await req.json();
		const user = await ensureUserInDb();

		const { gameType } = body;

		const session = await prisma.practiceSession.create({
			data: {
				userId: user.id,
				gameType,
				duration: 0,
			},
		});

		return new Response(JSON.stringify({ sessionId: session.id }), {
			status: 201,
			headers: { "Content-Type": "application/json" },
		});
	} catch (err) {
		console.error("Error creating session:", err);
		return new Response(JSON.stringify({ error: "Failed to create session" }), {
			status: 500,
		});
	}
}
