import { Prisma } from "@/lib/generated/prisma";
import { prisma } from "@/lib/prisma";
import { ensureUserInDb } from "@/services/userService";

export type DeletedPhase = Prisma.PromiseReturnType<typeof deleteUserPhase>;

export type UserPracticeRoutine = Prisma.PromiseReturnType<
	typeof getUserPracticeRoutines
>[number];

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

export async function deleteUserPhase(phaseId: string) {
	const dbUser = await ensureUserInDb();

	try {
		const phase = await prisma.phase.findUnique({
			where: { id: phaseId },
			include: { timerSet: true },
		});

		if (!phase) {
			throw new Error("Phase not found");
		}

		if (phase.timerSet.userId !== dbUser.id) {
			throw new Error("Not authorized to delete this phase");
		}

		const deletedPhase = await prisma.phase.delete({
			where: { id: phaseId },
		});

		return deletedPhase;
	} catch (err: any) {
		throw new Error(err.message);
	}
}

export const deletePhase = async (phaseId: string) => {
	try {
		const res = await fetch("/api/timer-sets", {
			method: "DELETE",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ phaseId }),
		});

		if (!res.ok) {
			const error = await res.json();
			console.error("Delete failed:", error.error);
			return { success: false };
		}

		return { success: true };
	} catch (err) {
		console.error("Unexpected error:", err);
	}
};
