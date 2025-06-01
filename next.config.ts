import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "i.ytimg.com",
			},
		],
	},

	async redirects() {
		return [
			{
				source: "/:path*",
				has: [
					{
						type: "host",
						value: "next-philplaysbass.vercel.app",
					},
				],
				destination: "https://philplaysbass.com/:path*",
				permanent: true,
			},
		];
	},
};

export default nextConfig;
