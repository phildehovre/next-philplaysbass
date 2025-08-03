import { PrismaClient } from "@/lib/generated/prisma";
import {
	ensureUserInDb,
	recalculateAverageScore,
} from "@/services/userService";
import { NextRequest } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
	try {
		const body = await req.json();
		const user = await ensureUserInDb();

		const { sessionId } = body;

		const session = await prisma.practiceSession.findUnique({
			where: { id: sessionId },
		});
		const events = await prisma.practiceEvent.findMany({
			where: { sessionId },
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

		// Already handled on the front-end, safeguard measure.
		if (events.length === 0) {
			return new Response(null, { status: 204 }); // No Content
		}

		// Process events:
		const totalNotes = events.length;
		const correctNotes = events.filter((e) => e.isCorrect).length;
		const averageHitTimeMs = Math.round(
			events.reduce((acc, e) => acc + (e.timeToHitMs || 0), 0) / totalNotes
		);
		const rhythmAccuracy = Math.round(
			events.reduce((acc, e) => acc + Math.abs(e.metronomeOffsetMs || 0), 0) /
				totalNotes
		);
		const score = Math.round((correctNotes / totalNotes) * 100); // basic example

		const result = await prisma.practiceResult.create({
			data: {
				totalNotes,
				correctNotes,
				averageHitTimeMs,
				rhythmAccuracy,
				score,
			},
		});

		const now = new Date();
		const createdAt = new Date(session.createdAt);
		const duration = Math.floor((now.getTime() - createdAt.getTime()) / 1000); // in seconds

		const updatedSession = await prisma.practiceSession.update({
			where: { id: sessionId },
			data: {
				duration,
				resultId: result.id,
			},
		});

		const userId = session.userId;
		const sessionDuration = session.duration;
		const newScore = result.score;

		// Update or create UserStats
		await prisma.userStats.upsert({
			where: { userId },
			update: {
				totalSessions: { increment: 1 },
				totalTime: { increment: sessionDuration },
				avgScore: await recalculateAverageScore(userId, newScore),
				lastPracticed: new Date(),
			},
			create: {
				userId,
				totalSessions: 1,
				totalTime: sessionDuration,
				avgScore: newScore,
				lastPracticed: new Date(),
			},
		});

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
