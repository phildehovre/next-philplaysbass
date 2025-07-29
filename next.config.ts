import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "i.ytimg.com",
			},
			{
				protocol: "https",
				hostname: "lh3.googleusercontent.com",
			},
			{
				protocol: "https",
				hostname: "gravatar.com",
			},
			{
				protocol: "https",
				hostname: "res.cloudinary.com",
			},
		],
	},
	env: {
		KINDE_SITE_URL:
			process.env.KINDE_SITE_URL ?? `https://${process.env.VERCEL_URL}`,
		KINDE_POST_LOGOUT_REDIRECT_URL:
			process.env.KINDE_POST_LOGOUT_REDIRECT_URL ??
			`https://${process.env.VERCEL_URL}`,
		KINDE_POST_LOGIN_REDIRECT_URL:
			process.env.KINDE_POST_LOGIN_REDIRECT_URL ??
			`https://${process.env.VERCEL_URL}/dashboard`,
	},
};

export default nextConfig;
