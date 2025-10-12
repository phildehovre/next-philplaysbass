import { withAuth } from "@kinde-oss/kinde-auth-nextjs/middleware";
import { RequestData } from "next/dist/server/web/types";

// You can use the withAuth helper as shown below with a middleware callback function
// which has access to the req.kindeAuth object that exposes the token and user data.
type KindeReqType = {
	kindeAuth: unknown;
};

export default withAuth(async function middleware(req: KindeReqType) {}, {
	publicPaths: ["/", "/lessons", "/about", "/learnwithmarco"],
});

/*
Matcher _rsc endpoint exclusion:

These are not public API routes, not JSON endpoints, and not user-accessible resources.
They are short-lived, opaque internal calls between the React client and the Next.js server, carrying serialized component data.

They’re only created:

- by the Next.js runtime itself
- for currently loaded components
- and scoped to the app’s domain and session context

So excluding them from the middleware does not open any new access path for users, t just tells the auth layer:

“Don’t try to handle internal React streaming requests.”
*/
export const config = {
	matcher: [
		"/((?!_next|_rsc|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
	],
};
