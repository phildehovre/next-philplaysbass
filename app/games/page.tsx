import Dashboard from "@/components/games/Dashboard";
import { prisma } from "@/lib/prisma";
import { getCurrentUserId } from "@/services/userService";
import { redirect } from "next/navigation";
import React from "react";

export const dynamic = "force-dynamic"; // optional, but recommended for auth

const Page = async () => {
	const userId = await getCurrentUserId();

	if (!userId) {
		redirect("/login"); // ✅ this is the right way to redirect in a page component
	}

	// Step 1: Get all session IDs for this user
	const sessions = await prisma.practiceSession.findMany({
		where: { userId },
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

export default Page;
