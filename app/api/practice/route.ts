import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { ensureUserInDb } from "@/services/userService";

export async function GET(req: NextRequest) {
	try {
		const user = await ensureUserInDb();

		if (!user) {
			return NextResponse.json({ error: "Missing userId" }, { status: 400 });
		}

		const events = await prisma.practiceEvent.findMany({
			where: {
				session: {
					userId: user.id,
				},
			},
			orderBy: {
				playedAt: "desc",
			},
			include: {
				session: true, // if you still want to show info about the session
			},
		});

		return NextResponse.json(events);
	} catch (err) {
		console.error("Error fetching sessions:", err);
		return NextResponse.json(
			{ error: "Internal Server Error" },
			{ status: 500 }
		);
	}
}
