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
	sticker: boolean;
	userData?: UserWithPracticeSessions;
	data: any;
};

export const GameCard = (props: CardPropsType) => {
	const { sticker: stickerDisplay, userData, data } = props;

	console.log(userData);
	const [stickerContent, setStickerContent] = useState<string>("");

	useEffect(() => {
		if (data?.gameType) {
			setStickerContent("not complete");
			if (userData) {
				if (
					userData.PracticeSession.some(
						(s: PracticeSession) => s.gameType === data.gameType
					)
				) {
					setStickerContent("completed");
				}
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
				<h1 className="mx-auto">{data.title}</h1>
				<EllipsisVertical className="absolute right-0 top-0" />
			</div>
			<div className="dashboard-card_body">
				<div className="dashboard-card_content">{data.description}</div>
			</div>
			<div className="dashboard-card_footer flex justify-center">
				<Link className="dashboard_btn flex justify-center" href={data.href}>
					{data.btnText}
				</Link>
			</div>
		</div>
	);
};
