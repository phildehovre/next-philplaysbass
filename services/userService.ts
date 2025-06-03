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
