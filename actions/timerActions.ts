import { Phase, Prisma } from "@/lib/generated/prisma";
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
export async function saveRoutine(name: string, phases: Phase[]) {
	try {
		const res = await fetch("/api/timer-sets", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				name: name,
				phases: phases,
			}),
		});

		const data = await res.json();
		return data;
	} catch (error: any) {
		throw new Error(error.message);
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

export const deleteRoutine = async (id: string) => {
	try {
		const res = await fetch("/api/timer-sets", {
			method: "DELETE",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ id }),
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
export const updateRoutine = async (routine: UserPracticeRoutine) => {
	try {
		const res = await fetch("/api/timer-sets", {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				id: routine.id,
				name: routine.name,
				phases: routine.phases.map((phase) => ({
					id: phase.id,
					label: phase.label,
					initialDuration: phase.initialDuration,
					bpm: phase.bpm,
					postCooldown: phase.postCooldown,
					order: phase.order,
					timerSetId: phase.timerSetId,
				})),
			}),
		});

		if (!res.ok) {
			const error = await res.json();
			console.error("Update failed:", error.error);
			return { success: false };
		}

		const updated = await res.json();
		return updated;
	} catch (err) {
		console.error("Unexpected error:", err);
		return { success: false };
	}
};
