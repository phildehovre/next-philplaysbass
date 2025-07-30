import { PracticeEvent } from "@/lib/generated/prisma";
import { formatDuration } from "@/lib/utils/dashboardUtils";
import { PracticeSession, UserWithPracticeSessions } from "@/types/types";
import { formatDistance, subDays } from "date-fns";
import React, { act, useEffect, useState } from "react";

const ActivityFeed = (props: { userData: UserWithPracticeSessions }) => {
	const { userData } = props;

	const [activityLength, setActivityLength] = useState<number>(10);
	const [activity, setActivity] = useState<PracticeSession[]>();

	useEffect(() => {
		if (!userData) return;
		const slice = userData.PracticeSession.slice(
			userData.PracticeSession.length - activityLength
		);
		setActivity(slice);
	}, [activityLength]);

	const formatSessionDate = (date: any) => {
		return formatDistance(subDays(new Date(), 3), date, {
			addSuffix: true,
		});
	};

	const renderActivity = () => {
		return activity?.map((a, i) => {
			return (
				<div className="dashboard_box activity" key={a.id}>
					<label className="activity_label">
						<div>{a.gameType}</div>
					</label>
					<div className="">{formatDuration(a.duration)}</div>
					<label className="activity_label">
						<div>{formatSessionDate(a.createdAt)}</div>
					</label>

					<>
						<span className={`${a.result ? "" : "no-data"}`}>
							{a.result?.score ? a.result.score : "No score data"}
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
			<div className="activity">
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
