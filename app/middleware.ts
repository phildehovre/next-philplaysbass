import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl;
	// const token = request.cookies.get("auth_token");

	const { isAuthenticated } = getKindeServerSession();
	console.log("API ROUTE MIDDLEWARE: ", isAuthenticated);

	if (pathname.startsWith("/api") && !(await isAuthenticated())) {
		return NextResponse.redirect(new URL("/login", request.url));
	}

	return NextResponse.next();
}
