// import { handleAuth } from "@kinde-oss/kinde-auth-nextjs/server";
// export const GET = handleAuth();

import { handleRedirectToApp } from "@kinde-oss/kinde-auth-nextjs/server";

export async function GET(req) {
	try {
		return await handleRedirectToApp(req);
	} catch (error) {
		console.error("🔴 Kinde callback error:", error);
		return new Response("Kinde callback failed", { status: 500 });
	}
}
