import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; // adjust path
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export async function POST(req: Request) {
	const { getUser } = await getKindeServerSession();
	const user = await getUser();

	if (!user?.id) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}

	try {
		const body = await req.json();
		const { latency, defaultInputDeviceId, completed } = body;

		const settings = await prisma.userSettings.upsert({
			where: { userId: user.id },
			update: { latency, defaultInputDeviceId, completed },
			create: {
				userId: user.id,
				latency,
				defaultInputDeviceId,
				completed,
			},
		});

		return NextResponse.json(settings);
	} catch (err) {
		console.error("Error saving user settings", err);
		return NextResponse.json(
			{ error: "Failed to save settings" },
			{ status: 500 }
		);
	}
}
