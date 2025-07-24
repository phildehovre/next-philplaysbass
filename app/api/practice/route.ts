// app/api/practice/route.ts

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { ensureUserInDb } from "@/services/userService";

export async function GET(req: NextRequest) {
	try {
		const user = await ensureUserInDb();

		if (!user) {
			return NextResponse.json({ error: "Missing userId" }, { status: 400 });
		}

		const sessions = await prisma.practiceSession.findMany({
			where: { userId: user.id },
			orderBy: { createdAt: "desc" }, // most recent first
			include: {
				events: true, // or false if you don’t want to include events
			},
		});

		return NextResponse.json(sessions);
	} catch (err) {
		console.error("Error fetching sessions:", err);
		return NextResponse.json(
			{ error: "Internal Server Error" },
			{ status: 500 }
		);
	}
}
