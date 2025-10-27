import { GAME_LABELS, GameType } from "../../constants/gameConstants";
import { PracticeSession, UserWithPracticeSessions } from "@/types/types";
import { formatTime } from "@/utils/helpers";
import { formatDistance } from "date-fns";
import React, { useEffect, useState } from "react";

const ActivityFeed = (props: { userData: UserWithPracticeSessions }) => {
	const { userData } = props;

	const [activityLength, setActivityLength] = useState<number>(10);
	const [activity, setActivity] = useState<PracticeSession[]>();

	useEffect(() => {
		if (!userData) return;
		const filtered = userData.PracticeSession.filter(
			(s) => Number(s.duration) > 0
		);
		const sortedByDate = filtered.sort(
			(a, b) =>
				new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
		);
		const slice =
			sortedByDate.length < 10
				? sortedByDate
				: sortedByDate.slice(0, activityLength);
		setActivity(slice);
	}, [activityLength, userData]);

	const formatSessionDate = (date: Date) => {
		return formatDistance(date, new Date(), {
			addSuffix: true,
		});
	};

	const renderActivity = () => {
		return activity?.map((a, i) => {
			if (a.duration == 0) return;
			return (
				<div className="dashboard_box activity" key={a.id}>
					<label className="activity_label">
						<div>{GAME_LABELS[a.gameType as GameType]}</div>
					</label>
					<div className="">{formatTime(a.duration)}</div>
					<label className="activity_label">
						<div>{formatSessionDate(new Date(a.createdAt))}</div>
					</label>

					<>
						<span className={`${a.result ? "" : "no-data"}`}>
							{/* {a.result?.score ? a.result.score : "No score data"} */}
							{((a.result?.correctNotes / a.result?.totalNotes) * 100).toFixed(
								1
							)}
							%
						</span>
						<span>
							{a.result?.correctNotes}/{a.result?.totalNotes}
						</span>
					</>
				</div>
			);
		});
	};
	return (
		<div className=" activity-feed_ctn w-full flex flex-col gap-0.5">
			<div className="activity text-gray-500">
				<label className="activity_label">
					<div>Game type</div>
				</label>
				<label className="activity_label">
					<div>Session duration</div>
				</label>
				<label className="activity_label">
					<div>Session date</div>
				</label>
				<label className="activity_label">
					<div>Score</div>
				</label>
				<label className="activity_label">
					<div>win/total</div>
				</label>
			</div>
			{renderActivity()}
		</div>
	);
};

export default ActivityFeed;
