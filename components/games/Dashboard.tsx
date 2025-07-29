"use client";

import "./DashboardStyles.css";
import React, { useState } from "react";
import { toolCards } from "@/constants/games";
import UserStats from "./dashboard/UserStats";
import { GameCard } from "./dashboard/Card";
import ActivityFeed from "./ActivityFeed";
import Tuner from "./tuner/Tuner";

const Dashboard = (props: any) => {
	const { userData } = props;

	const renderGameCards = () => {
		return toolCards.map((tool, index) => {
			return <GameCard {...tool} key={tool.title + index} />;
		});
	};

	return (
		<div className="dashboard_ctn w-full">
			<div className="welcome_banner flex flex-col items-center">
				<h1>Welcome back, {userData.name}</h1>
				<div className="banner_ctn flex gap-2 justify-center w-full">
					<AnnouncementBanner
						title={"Join the conversation"}
						callToActionText="Discord invite"
					>
						<p>
							The PhilPlaysBass community would love for you to join the forum
							and start exchanging with other members!
						</p>
					</AnnouncementBanner>
					<AnnouncementBanner title={"Announcements"} callToActionText="">
						<p>
							The PhilPlaysBass community would love for you to join the forum
							and start exchanging with other members!
						</p>
					</AnnouncementBanner>
				</div>
			</div>
			<div className="dashboard_section flex justify-center">
				<UserStats userData={userData} />
			</div>
			<div className="dashboard_section w-full">
				<h1 className="section_title">Challenges</h1>
				<div className="dashboard-cards_ctn flex gap-2">
					{renderGameCards()}
				</div>
			</div>
			<div className="dashboard_section ">
				<h1 className="section_title">Activity</h1>
				<ActivityFeed userData={userData} />
			</div>
			<Tuner />
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
		<div className="dashboard_box announcement_box flex flex-col gap-2">
			<h1>{title}</h1>
			{children}
			<span className="flex w-full justify-end">
				{callToActionText && (
					<button className="dashboard_btn cta">{callToActionText}</button>
				)}
			</span>
		</div>
	);
};
