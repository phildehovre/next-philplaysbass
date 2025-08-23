import { PrismaClient } from "@/lib/generated/prisma";
import { prisma } from "@/lib/prisma";
import {
	ensureUserInDb,
	recalculateAverageScore,
} from "@/services/userService";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
	try {
		const body = await req.json();
		const user = await ensureUserInDb();

		const { sessionId, totalScore, aggregateScore, durationMs } = body;
		console.log("BODY::", body);

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

		if (durationMs < 1000 && events.length < 1) {
			return new Response(
				JSON.stringify({ error: "Session deemed too short" }),
				{
					status: 404,
				}
			);
		}

		// Already handled on the front-end, safeguard measure.
		if (events.length === 0) {
			return new Response(null, { status: 204 }); // No Content
		}

		const averageHitTimeMs =
			// @ts-ignore
			events.reduce((acc, e) => acc + e.timeToHitMs, 0) / events.length;

		// PLACEHOLDER VALUES
		let rhythmAccuracy,
			score = 0;
		// const rhythmAccuracy = events.reduce((acc, e) => processRhythmicalAccuracy(e.metronomeOffsetMs, session.config.bpm))

		const result = await prisma.practiceResult.create({
			data: {
				totalNotes: events.length,
				correctNotes: events.filter((e) => e.isCorrect).length,
				averageHitTimeMs,
				rhythmAccuracy,
				score,
			},
		});

		const updatedSession = await prisma.practiceSession.update({
			where: { id: sessionId },
			data: {
				duration: durationMs,
				resultId: result.id,
			},
		});

		const userId = session.userId;
		const newScore = result.score;

		await prisma.userStats.upsert({
			where: { userId },
			update: {
				totalSessions: { increment: 1 },
				totalTime: { increment: durationMs },
				totalScore: { increment: totalScore },
				avgScore: await recalculateAverageScore(userId, newScore),
				lastPracticed: new Date(),
			},
			create: {
				userId,
				totalSessions: 1,
				totalTime: durationMs,
				totalScore: totalScore,
				avgScore: newScore,
				lastPracticed: new Date(),
			},
		});

		return new Response(
			JSON.stringify({ sessionId: updatedSession.id, durationMs }),
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
