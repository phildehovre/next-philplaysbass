import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const fetchTempoData = async (bpm: number) => {
	const apiUrl = `https://api.getsong.co/tempo/?api_key=${process.env.NEXT_PUBLIC_SONGBPM_API_KEY}&bpm=${bpm}`;

	const response = await fetch(apiUrl);
	if (!response.ok) {
		throw new Error("Network response was not ok");
	}

	const data = await response.json();

	return data.tempo;
};
