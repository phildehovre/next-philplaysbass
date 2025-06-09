// pages/callback.tsx or app/callback/page.tsx (Next 13+)
"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import useCookies from "@/hooks/useCookies";
import { LoaderPinwheelIcon } from "lucide-react";

export default function CallbackPage() {
	const router = useRouter();
	const params = useSearchParams();

	const { setCookie } = useCookies();
	const [loading, setLoading] = useState(false);
	useEffect(() => {
		const code = params.get("code") as string;

		if (!code) return;

		const fetchToken = async () => {
			setLoading(true);
			const res = await fetch("/api/spotify/token", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ code }),
			});

			const data = await res.json();
			console.log("Tokens:", data);

			if (res.ok) {
				// Store token in localStorage/context or set cookie
				setCookie("token", JSON.stringify(data));
				router.push("/metronome"); // or dashboard
			} else {
				console.error("Token error:", data.error);
			}
			setLoading(false);
		};

		fetchToken();
	}, [params]);

	return (
		<div className="flex flex-col h-full w-full justify-center items-center">
			<h1 className="absolute top-[50%] right-[50%] mx-auto my-auto h-5 w-10">
				<LoaderPinwheelIcon className="spin" />
				Connecting with Spotify...
			</h1>
		</div>
	);
}
