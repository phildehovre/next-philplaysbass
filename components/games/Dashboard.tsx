"use client";

import "./DashboardStyles.css";
import React, { useState, useEffect, useRef } from "react";
import { gameCards, toolCards } from "@/constants/games";
import UserStats from "./dashboard/UserStats";
import { GameCard } from "./dashboard/Card";
import ActivityFeed from "./ActivityFeed";
import Link from "next/link";
import { LinkIcon } from "lucide-react";
import gsap from "gsap";

const Dashboard = (props: any) => {
	const { userData } = props;
	const dashboardRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (dashboardRef.current) {
			// Select all children sections inside the dashboard
			const sections = dashboardRef.current.querySelectorAll(
				".dashboard_section, .welcome_banner"
			);
			gsap.fromTo(
				sections,
				{ opacity: 0, y: 20 },
				{
					opacity: 1,
					y: 0,
					stagger: 0.2,
					duration: 0.6,
					ease: "power2.out",
				}
			);
		}
	}, []);

	const renderToolCards = () => {
		return toolCards.map((tool, index) => {
			return (
				<GameCard
					{...tool}
					userData={userData}
					sticker={false}
					key={tool.title + index}
				/>
			);
		});
	};

	const renderGameCards = () => {
		return gameCards.map((game, index) => {
			return <GameCard {...game} sticker={true} key={game.title + index} />;
		});
	};

	return (
		<div className="dashboard_ctn w-full" ref={dashboardRef}>
			<div className="welcome_banner opacity-0 flex flex-col items-center">
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
							The timer has officially dropped! This little beast comes packed
							with a Timer, Tuner, and Metronome, basically the holy trinity of
							practice tools!
						</p>
					</AnnouncementBanner>
				</div>
			</div>

			<div className="dashboard_section justify-center">
				<h1 className="section_title">Your progress</h1>
				<UserStats userData={userData} />
			</div>

			<div className="dashboard_section w-full">
				<h1 className="section_title">Challenges</h1>
				<div className="dashboard-cards_ctn flex gap-2 justify-center">
					{renderGameCards()}
				</div>
			</div>

			<div className="dashboard_section w-full">
				<h1 className="section_title">Tools</h1>
				<div className="dashboard-cards_ctn flex gap-2">
					{renderToolCards()}
				</div>
			</div>

			<div className="dashboard_section">
				<h1 className="section_title">Activity</h1>
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
		<div className="dashboard_box announcement_box flex flex-col gap-2">
			<h1>{title}</h1>
			{children}
			<span className="flex w-full justify-end">
				{callToActionText && (
					<Link
						href={process.env.NEXT_PUBLIC_DISCORD_LINK || "/dashboard"}
						className="dashboard_btn cta discord"
					>
						<LinkIcon size={"12"} />
						{callToActionText}
					</Link>
				)}
			</span>
		</div>
	);
};
