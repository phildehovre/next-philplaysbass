import { UserWithPracticeSessions } from "@/types/types";
import { format, isToday, subDays } from "date-fns";

export const getTotalPracticeTime = (data: UserWithPracticeSessions) => {
	return data?.PracticeSession.reduce((acc, session) => {
		return acc + session.duration;
	}, 0);
};

export const getTotalPracticeTimeToday = (data: UserWithPracticeSessions) => {
	if (!data?.PracticeSession?.length) return 0;

	return data.PracticeSession.reduce((acc, session) => {
		// parseISO if createdAt is a string; adjust if already Date
		if (isToday(session.createdAt)) {
			return acc + session.duration;
		}
		return acc;
	}, 0);
};

export const getAveragePracticeTime = (data: UserWithPracticeSessions) => {
	if (!data?.PracticeSession?.length) return 0;

	const total = data.PracticeSession.reduce((acc, session) => {
		return acc + session.duration;
	}, 0);

	return Math.round(total / data.PracticeSession.length);
};

export const formatDuration = (totalSeconds: number): string => {
	const hours = Math.floor(totalSeconds / 3600);
	const minutes = Math.floor((totalSeconds % 3600) / 60);
	const seconds = totalSeconds % 60;

	const parts = [];
	if (hours) parts.push(`${hours}h`);
	if (minutes) parts.push(`${minutes}m`);
	if (seconds || parts.length === 0) parts.push(`${seconds}s`);

	return parts.join(" ");
};

export const getCurrentStreak = (sessions: { createdAt: string }[]): number => {
	const dateSet = new Set(
		sessions.map((s) => format(new Date(s.createdAt), "yyyy-MM-dd"))
	);

	let streak = 0;
	let day = new Date();

	while (dateSet.has(format(day, "yyyy-MM-dd"))) {
		streak++;
		day = subDays(day, 1);
	}

	return streak;
};
