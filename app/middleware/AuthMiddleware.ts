// middleware.js
import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl;
	const token = request.cookies.get("auth_token");

	if (pathname.startsWith("/protected") && !token) {
		return NextResponse.redirect(new URL("/login", request.url));
	}

	return NextResponse.next();
}
