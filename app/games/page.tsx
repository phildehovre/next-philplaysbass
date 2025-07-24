import Dashboard from "@/components/games/Dashboard";
import { prisma } from "@/lib/prisma";
import { ensureUserInDb, getCurrentUserId } from "@/services/userService";
import { redirect } from "next/navigation";
import React from "react";

export const dynamic = "force-dynamic";

const Page = async () => {
	let user;
	try {
		user = await ensureUserInDb();
	} catch (error) {
		redirect("/login");
	}

	const sessions = await prisma.practiceSession.findMany({
		where: { userId: user.id },
		select: { id: true },
	});

	const sessionIds = sessions.map((s) => s.id);

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
