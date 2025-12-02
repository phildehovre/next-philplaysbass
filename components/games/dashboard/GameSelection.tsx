"use client";
import React from "react";
import Link from "next/link";
import { ChevronsLeft } from "lucide-react";
import { GameCard } from "./Card";
import "../DashboardStyles.css";
import { gameCards } from "@/constants/games";

const GameSelection = (props: any) => {
	const { userData } = props;
	const renderGameCards = () => {
		return gameCards.map((game, index) => {
			return (
				<GameCard sticker={true} {...game} key={game.title} data={userData} />
			);
		});
	};

	return (
		<div className="flex flex-col ">
			<Link href="/dashboard" className="flex">
				<ChevronsLeft color="gray" />
				Dashboard
			</Link>
			<ul className="tabs flex gap-1 w-full flex-col md:flex-row justify-evenly text-2xl md:gap-2 ">
				{renderGameCards()}
			</ul>
		</div>
	);
};

export default GameSelection;
