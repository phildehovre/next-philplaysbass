import { usePracticeSession } from "@/context/practiceSessionsContext";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const handleTabClose = (callback: () => void) => {
	const handleVisibilityChange = () => {
		if (document.hidden) callback();
	};
	const handleBeforeUnload = () => callback();

	document.addEventListener("visibilitychange", handleVisibilityChange);
	window.addEventListener("beforeunload", handleBeforeUnload);
	return () => {
		document.removeEventListener("visibilitychange", handleVisibilityChange);
		window.removeEventListener("beforeunload", handleBeforeUnload);
	};
};
