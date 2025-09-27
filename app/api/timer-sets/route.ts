import { prisma } from "@/lib/prisma";
import { ensureUserInDb } from "@/services/userService";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function GET() {
	return new Response(JSON.stringify({ ok: true }), { status: 200 });
}
export async function POST(req: Request) {
	try {
		const { getUser } = await getKindeServerSession();
		const user = await getUser();
		if (!user?.id) {
			return new Response(JSON.stringify({ error: "Unauthorized" }), {
				status: 401,
			});
		}

		const dbUser = await ensureUserInDb();
		if (!dbUser) {
			return new Response(JSON.stringify({ error: "Unauthorized" }), {
				status: 401,
			});
		}

		const body = await req.json();
		const { id, name, phases } = body;

		let timerSet;

		if (id) {
			// Update routine name
			timerSet = await prisma.timerSet.update({
				where: { id },
				data: { name: name || "Untitled Set" },
			});

			// Delete phases that are no longer in the list
			const incomingIds = phases.filter((p: any) => p.id).map((p: any) => p.id);
			await prisma.phase.deleteMany({
				where: {
					timerSetId: id,
					NOT: { id: { in: incomingIds } },
				},
			});

			// Upsert each phase
			for (let i = 0; i < phases.length; i++) {
				const p = phases[i];
				await prisma.phase.upsert({
					where: { id: p.id ?? "" }, // empty string will never match, so it creates
					update: {
						initialDuration: p.initialDuration,
						bpm: p.bpm,
						label: p.label,
						postCooldown: p.postCooldown,
						order: i,
					},
					create: {
						initialDuration: p.initialDuration,
						bpm: p.bpm,
						label: p.label,
						postCooldown: p.postCooldown,
						order: i,
						timerSetId: id,
					},
				});
			}

			// Finally, return the updated set with its phases
			timerSet = await prisma.timerSet.findUnique({
				where: { id },
				include: { phases: true },
			});
		} else {
			// ➕ Create new routine as before
			timerSet = await prisma.timerSet.create({
				data: {
					name: name || "Untitled Set",
					userId: dbUser.id,
					phases: {
						create: phases.map((p: any, i: number) => ({
							initialDuration: p.initialDuration,
							bpm: p.bpm,
							label: p.label,
							postCooldown: p.postCooldown,
							order: i,
						})),
					},
				},
				include: { phases: true },
			});
		}
		revalidatePath("/timer");
		return new Response(JSON.stringify(timerSet), { status: id ? 200 : 201 });
	} catch (error) {
		console.error(error);
		return new Response(JSON.stringify({ error: "Something went wrong" }), {
			status: 500,
		});
	}
}

export async function DELETE(req: Request) {
	try {
		const { id } = await req.json();

		await prisma.timerSet.delete({
			where: { id },
		});

		revalidatePath("/timer");
		return NextResponse.json({ success: true, revalidatePath: true });
	} catch (err: any) {
		console.error("deleteTimerSet API error:", err);
		return NextResponse.json({ error: "Server error" }, { status: 500 });
	}
}
export async function PUT(req: Request) {
	try {
		const dbUser = await ensureUserInDb();
		const body = await req.json();
		const { id, name, phases } = body;

		// Ensure routine belongs to this user
		const routine = await prisma.timerSet.findUnique({
			where: { id },
			include: { phases: true },
		});
		if (!routine || routine.userId !== dbUser.id) {
			return new Response(
				JSON.stringify({ error: "Not authorized or routine not found" }),
				{ status: 403 }
			);
		}

		// Wrap in a transaction for safety
		const result = await prisma.$transaction(async (tx) => {
			// Update routine itself
			const updatedRoutine = await tx.timerSet.update({
				where: { id },
				data: { name },
			});

			// Delete all existing phases
			await tx.phase.deleteMany({
				where: { timerSetId: id },
			});

			// Recreate phases
			const newPhases = await Promise.all(
				phases.map((p: any) =>
					tx.phase.create({
						data: {
							label: p.label,
							initialDuration: p.initialDuration,
							bpm: p.bpm,
							postCooldown: p.postCooldown,
							order: p.order,
							timerSetId: id,
						},
					})
				)
			);

			return { ...updatedRoutine, phases: newPhases };
		});

		return new Response(JSON.stringify(result), { status: 200 });
	} catch (err: any) {
		return new Response(JSON.stringify({ error: err.message }), {
			status: 500,
		});
	}
}
