import { withAuth } from "@kinde-oss/kinde-auth-nextjs/middleware";
import { RequestData } from "next/dist/server/web/types";

// You can use the withAuth helper as shown below with a middleware callback function
// which has access to the req.kindeAuth object that exposes the token and user data.
type KindeReqType = {
	kindeAuth: unknown;
};

export default withAuth(
	async function middleware(req: KindeReqType) {
		// console.log("look at me", req.kindeAuth);
	},
	{
		publicPaths: ["/", "/lessons", "/about"], // Add any other public paths as needed
	}
);

export const config = {
	matcher: [
		"/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
	],
};
