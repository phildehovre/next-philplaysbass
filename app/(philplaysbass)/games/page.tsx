import GameSelection from "@/components/games/dashboard/GameSelection";
import { prisma } from "@/lib/prisma";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import React from "react";

const page = async () => {
	const { getUser } = getKindeServerSession();
	const kindeUser = await getUser();

	if (!kindeUser) redirect("/login");

	const user = await prisma.user.findUnique({
		where: { kindeId: kindeUser?.id },
	});

	if (!user) redirect("/login");

	const userStats = await prisma.userStats.findMany({
		where: { userId: user.id },
	});

	const userWithResults = await prisma.user.findUnique({
		where: { id: user.id },
		include: {
			PracticeSession: {
				include: {
					result: true,
					events: true,
				},
			},
		},
	});
	return (
		<div>
			<GameSelection userData={userWithResults} />
		</div>
	);
};

export default page;
