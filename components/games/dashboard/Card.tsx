import React, { useEffect, useState } from "react";
import Sticker from "./Sticker";
import { EllipsisVertical } from "lucide-react";
import Link from "next/link";
import {
	GameTypes,
	PracticeSession,
	UserWithPracticeSessions,
} from "@/types/types";

type CardPropsType = {
	title: string;
	description: string;
	gameType?: GameTypes;
	btnText: string;
	href: string;
	sticker: boolean;
	userData?: UserWithPracticeSessions;
};

export const GameCard = (props: CardPropsType) => {
	const {
		title,
		sticker: stickerDisplay,
		description,
		btnText,
		href,
		userData,
		gameType,
	} = props;

	const [stickerContent, setStickerContent] = useState<string>("");

	useEffect(() => {
		setStickerContent("not complete");
		if (userData) {
			if (
				userData.PracticeSession.some(
					(s: PracticeSession) => s.gameType === gameType
				)
			) {
				setStickerContent("completed");
			}
		}
	}, [userData]);

	return (
		<div className="dashboard_box dashboard_card">
			<div className="dashboard-card_header flex justify-between relative">
				{stickerDisplay ? (
					<Sticker content={stickerContent} />
				) : (
					<div className="sticker_placeholder"></div>
				)}
				<h1 className="mx-auto">{title}</h1>
				<EllipsisVertical className="absolute right-0 top-0" />
			</div>
			<div className="dashboard-card_body">
				<div className="dashboard-card_content">{description}</div>
			</div>
			<div className="dashboard-card_footer flex justify-center">
				<Link className="dashboard_btn flex justify-center" href={href}>
					{btnText}
				</Link>
			</div>
		</div>
	);
};
