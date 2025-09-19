import { prisma } from "@/lib/prisma";
import { ensureUserInDb } from "@/services/userService";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
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
		const { name, phases } = body;

		const timerSet = await prisma.timerSet.create({
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

		return new Response(JSON.stringify(timerSet), { status: 201 });
	} catch (error) {
		console.error(error);
		return new Response(JSON.stringify({ error: "Something went wrong" }), {
			status: 500,
		});
	}
}

export async function DELETE(req: Request) {
	try {
		const { phaseId } = await req.json();

		const phase = await prisma.phase.findUnique({
			where: { id: phaseId },
			select: { id: true, timerSetId: true, order: true },
		});

		if (!phase) {
			return NextResponse.json({ error: "Phase not found" }, { status: 404 });
		}

		await prisma.$transaction(async (tx) => {
			await tx.phase.delete({ where: { id: phaseId } });

			const remaining = await tx.phase.findMany({
				where: { timerSetId: phase.timerSetId },
				orderBy: { order: "asc" },
			});

			for (let i = 0; i < remaining.length; i++) {
				await tx.phase.update({
					where: { id: remaining[i].id },
					data: { order: i },
				});
			}
		});

		return NextResponse.json({ success: true });
	} catch (err: any) {
		console.error("deletePhase API error:", err);
		return NextResponse.json({ error: "Server error" }, { status: 500 });
	}
}
