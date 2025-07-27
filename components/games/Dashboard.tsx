"use client";

import "./DashboardStyles.css";
import React, { useState } from "react";
import { toolCards } from "@/constants/games";
import UserStats from "./dashboard/UserStats";
import { GameCard } from "./dashboard/Card";
import ActivityFeed from "./ActivityFeed";

const Dashboard = (props: any) => {
	const { userData } = props;
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const renderGameCards = () => {
		return toolCards.map((tool, index) => {
			return <GameCard {...tool} key={tool.title + index} />;
		});
	};

	return (
		<div className="w-full justify-center gap-2">
			<div className="welcome_banner">
				<AnnouncementBanner
					title={"Join the conversation"}
					callToActionText="Discord invite"
				>
					<p>
						The PhilPlaysBass community would love for you to join the forum and
						start exchanging with other members!
					</p>
				</AnnouncementBanner>
				<AnnouncementBanner title={"Announcements"} callToActionText="">
					<p>
						The PhilPlaysBass community would love for you to join the forum and
						start exchanging with other members!
					</p>
				</AnnouncementBanner>
			</div>
			<div className="dashboard_section">
				<h1 className="section_title">Challenges</h1>
				{renderGameCards()}
			</div>
			<div className="dashboard_section">
				<UserStats />
			</div>
			<div className="dashboard_section">
				<ActivityFeed userData={userData} />
			</div>
		</div>
	);
};

export default Dashboard;

export const AnnouncementBanner = (props: {
	title: string;
	callToActionText: string;
	children: any;
}) => {
	const { children, title, callToActionText } = props;
	return (
		<div className="announcement_box">
			<h1>{title}</h1>
			{children}
			{callToActionText && <button>{callToActionText}</button>}
		</div>
	);
};
