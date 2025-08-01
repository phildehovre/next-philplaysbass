"use client";
import { UserWithPracticeSessions } from "@/types/types";
import { CircleHelp } from "lucide-react";
import React, { useEffect, useState } from "react";
import Spinner from "@/components/Spinner";
import {
	formatDuration,
	getAveragePracticeTime,
	getCurrentStreak,
	getTotalPracticeTime,
	getTotalPracticeTimeToday,
} from "@/lib/utils/dashboardUtils";

type UserStatsProps = {
	userData: UserWithPracticeSessions;
};

const UserStats = (props: UserStatsProps) => {
	const [data, setData] = useState<UserWithPracticeSessions | null>();
	const [dailyPractice, setDailyPractice] = useState<number | undefined>();
	const [totalPracticeTime, setTotalPracticeTime] = useState<
		number | undefined
	>(0);
	const [averagePracticeTime, setAveragePracticeTime] = useState<
		number | undefined
	>(0);
	const [currentStreak, setCurrentStreak] = useState<number | undefined>(0);
	const { userData } = props;

	useEffect(() => {
		if (userData) {
			setData(userData);
		}
	}, []);

	useEffect(() => {
		if (!data || !data.PracticeSession.length) return;

		setDailyPractice(getTotalPracticeTimeToday(data));
		setTotalPracticeTime(getTotalPracticeTime(data));
		setAveragePracticeTime(getAveragePracticeTime(data));
		setCurrentStreak(getCurrentStreak(data.PracticeSession));
	}, [data]);

	return (
		<div className="dashboard_box user-stats_ctn flex w-full justify-between gap-2">
			<div className="user-stats_item">
				<div className="span data_label flex justify-between">
					<h1>Practiced today:</h1>
					<CircleHelp color={"gray"} />
				</div>
				<span className="data_ctn flex flex-col justify-end">
					{dailyPractice ? (
						<p>{formatDuration(dailyPractice)}</p>
					) : !userData ? (
						<Spinner />
					) : (
						<p className="no-data">No data yet!</p>
					)}
					<p></p>
				</span>
			</div>
			<div className="user-stats_item ">
				<div className="span data_label flex justify-between">
					<h1>Total practice:</h1>
					<CircleHelp color={"gray"} />
				</div>
				<span className="data_ctn">
					{totalPracticeTime ? (
						<p>{formatDuration(totalPracticeTime)}</p>
					) : !userData ? (
						<Spinner />
					) : (
						<p className="no-data">No data yet!</p>
					)}
				</span>
			</div>
			<div className="user-stats_item">
				<div className="span data_label flex justify-between">
					<h1>Streak:</h1>
					<CircleHelp color={"gray"} />
				</div>
				<span className="data_ctn">
					{currentStreak ? (
						<p>{currentStreak} days</p>
					) : !userData ? (
						<Spinner />
					) : (
						<p className="no-data">No data yet!</p>
					)}
				</span>
			</div>
			<div className="user-stats_item">
				<div className="span data_label flex justify-between">
					<h1>Average duration:</h1>
					<CircleHelp color={"gray"} />
				</div>
				<span className="data_ctn">
					{averagePracticeTime ? (
						<p>{formatDuration(averagePracticeTime)}</p>
					) : !userData ? (
						<Spinner />
					) : (
						<p className="no-data">No data yet!</p>
					)}
				</span>
			</div>
		</div>
	);
};

export default UserStats;
