import Dashboard from "@/components/games/Dashboard";
import { prisma } from "@/lib/prisma";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import React from "react";

export const dynamic = "force-dynamic";

const Page = async () => {
	const { getUser } = await getKindeServerSession();
	const kindeUser = await getUser();

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
				},
			},
		},
	});

	console.log(userWithResults);
	return (
		<div className="flex w-full h-full justify-center">
			<Dashboard userData={userWithResults} />
		</div>
	);
};

export default Page;
