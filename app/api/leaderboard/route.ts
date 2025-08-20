import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma"; // adjust path to your prisma client
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const session = await getKindeServerSession();
	if (!session) {
		return res.status(401).json({ error: "Unauthorized" });
	}

	try {
		const leaderboard = await prisma.user.findMany({
			select: {
				id: true,
			},
			// orderBy: { score: "desc" },
			take: 20, // top 20
		});

		res.status(200).json(leaderboard);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Internal Server Error" });
	}
}
