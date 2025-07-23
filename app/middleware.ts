import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl;
	// const token = request.cookies.get("auth_token");

	const { isAuthenticated } = getKindeServerSession();

	if (pathname.startsWith("/api") && !(await isAuthenticated())) {
		return NextResponse.redirect(new URL("/login", request.url));
	}

	return NextResponse.next();
}
