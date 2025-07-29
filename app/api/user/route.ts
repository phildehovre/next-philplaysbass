// app/api/user/route.ts
import { NextRequest, NextResponse } from "next/server";
import { ensureUserInDb } from "@/services/userService";

export async function GET(req: NextRequest) {
	try {
		const user = await ensureUserInDb();
		if (user) {
			return NextResponse.redirect(new URL("/dashboard", req.url));
		}
	} catch (error) {
		return NextResponse.json(
			{ error: (error as Error).message },
			{ status: 401 }
		);
	}
}
