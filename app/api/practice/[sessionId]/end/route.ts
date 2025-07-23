import { PrismaClient } from "@/lib/generated/prisma";
import { ensureUserInDb } from "@/services/userService";
import { NextRequest } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
	try {
		const body = await req.json();
		const user = await ensureUserInDb();
		console.log("Hitting END ROUTE");
		console.log("REQ BODY", body);

		const { sessionId } = body;

		const session = await prisma.practiceSession.findUnique({
			where: { id: sessionId },
		});

		if (!session) {
			return new Response(JSON.stringify({ error: "Session not found" }), {
				status: 404,
			});
		}

		if (session.userId !== user.id) {
			return new Response(JSON.stringify({ error: "Unauthorized" }), {
				status: 403,
			});
		}

		const now = new Date();
		const createdAt = new Date(session.createdAt);
		const duration = Math.floor((now.getTime() - createdAt.getTime()) / 1000); // in seconds

		const updatedSession = await prisma.practiceSession.update({
			where: { id: sessionId },
			data: {
				duration,
			},
		});

		console.log("updated Session: ", updatedSession);

		return new Response(
			JSON.stringify({ sessionId: updatedSession.id, duration }),
			{
				status: 200,
				headers: { "Content-Type": "application/json" },
			}
		);
	} catch (err) {
		console.error("Error ending session:", err);
		return new Response(JSON.stringify({ error: "Failed to end session" }), {
			status: 500,
		});
	}
}
