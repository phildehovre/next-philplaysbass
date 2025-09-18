import { Prisma } from "@/lib/generated/prisma";
import { prisma } from "@/lib/prisma";
import { ensureUserInDb } from "@/services/userService";

export async function getUserPracticeRoutines() {
	const dbUser = await ensureUserInDb();

	try {
		const routines = await prisma.timerSet.findMany({
			where: {
				userId: dbUser.id,
			},
			include: {
				phases: true,
			},
		});

		return routines;
	} catch (err: any) {
		throw new Error(err.message);
	}
}

export type UserPracticeRoutine = Prisma.PromiseReturnType<
	typeof getUserPracticeRoutines
>[number];
