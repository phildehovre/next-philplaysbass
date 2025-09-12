import { prisma } from "@/lib/prisma";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export async function POST(req: Request) {
	try {
		const { getUser } = await getKindeServerSession();
		const user = await getUser();
		if (!user?.id) {
			return new Response(JSON.stringify({ error: "Unauthorized" }), {
				status: 401,
			});
		}

		const body = await req.json();
		const { name, phases } = body;

		const timerSet = await prisma.timerSet.create({
			data: {
				name: name || "Untitled Set",
				userId: user.id,
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
