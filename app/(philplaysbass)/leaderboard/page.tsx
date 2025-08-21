import { Prisma } from "@/lib/generated/prisma";
import { prisma } from "@/lib/prisma";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import React from "react";
const page = async () => {
	const { getUser } = await getKindeServerSession();
	const user = await getUser();

	const users = await prisma.user.findMany({
		include: {},
	});

	// const userWithResults = await prisma.user.findUnique({
	// 	where: { id: user.id },
	// 	include: {
	// 		PracticeSession: {
	// 			include: {
	// 				result: true,
	// 				events: true,
	// 			},
	// 		},
	// 	},
	// });
	return (
		<div className="page_ctn flex justify-center">
			<h1 className="text-5xl font-black upp">Leaderboard</h1>
		</div>
	);
};

export default page;
