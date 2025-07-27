import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { prisma } from "../lib/prisma";

export async function ensureUserInDb() {
	const { getUser } = getKindeServerSession();
	const kindeUser = await getUser();

	if (!kindeUser) throw new Error("User not authenticated");

	let user = await prisma.user.findUnique({
		where: { kindeId: kindeUser.id },
	});

	if (!user) {
		user = await prisma.user.create({
			data: {
				kindeId: kindeUser.id,
				email: kindeUser.email as string,
				name: kindeUser.given_name || "",
			},
		});
	}

	return user;
}

export async function getCurrentUserId(): Promise<string | null> {
	const { getUser, isAuthenticated } = getKindeServerSession();
	if (!(await isAuthenticated())) return null;

	const user = await getUser();
	return user?.id || null;
}

export async function recalculateAverageScore(
	userId: string,
	newScore: number
) {
	const stats = await prisma.userStats.findUnique({
		where: { userId },
	});

	if (!stats) return newScore;

	const total = stats.totalSessions;
	const previousAvg = stats.avgScore;
	const newAvg = (previousAvg * total + newScore) / (total + 1);

	return newAvg;
}
