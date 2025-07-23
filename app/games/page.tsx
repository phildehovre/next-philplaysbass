import Dashboard from "@/components/games/Dashboard";
import GameSelection from "@/components/GameSelection";
import { prisma } from "@/lib/prisma";
import { ensureUserInDb } from "@/services/userService";
import React from "react";

const page = async () => {
	const user = await ensureUserInDb();

	// Step 1: Get all session IDs for this user
	const sessions = await prisma.practiceSession.findMany({
		where: { userId: user.id },
		select: { id: true },
	});

	const sessionIds = sessions.map((s) => s.id);

	// Step 2: Get all events for those session IDs
	const events = await prisma.practiceEvent.findMany({
		where: {
			sessionId: {
				in: sessionIds,
			},
		},
	});

	return (
		<div className="flex w-full h-full">
			<Dashboard userData={events} />
		</div>
	);
};

export default page;
