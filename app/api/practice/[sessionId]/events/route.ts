import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
	try {
		const body = await req.json();
		const { sessionId } = body;
		if (!sessionId) {
			return NextResponse.json({ error: "Missing sessionId" }, { status: 400 });
		}
		console.log("EVENTS ROUTE::", body);

		if (!Array.isArray(body.events)) {
			return NextResponse.json(
				{ error: "Invalid events array" },
				{ status: 400 }
			);
		}

		const formattedEvents = body.events.map((event: any) => ({
			sessionId,
			expectedNote: event.expectedNote,
			playedNote: event.playedNote ?? null,
			isCorrect: event.isCorrect,
			playedAt: new Date(event.playedAt),
			timeToHitMs: event.timeToHitMs ?? null,
			metronomeOffsetMs: event.metronomeOffsetMs ?? null,
		}));

		const res = await prisma.practiceEvent.createMany({
			data: formattedEvents,
			skipDuplicates: true,
		});

		return NextResponse.json({ success: true }, { status: 201 });
	} catch (err) {
		console.error("Error saving events:", err);
		return NextResponse.json(
			{ error: "Internal Server Error" },
			{ status: 500 }
		);
	}
}
