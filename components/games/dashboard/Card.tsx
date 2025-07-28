import React from "react";
import Sticker from "./Sticker";
import { Ellipsis, EllipsisVertical, Menu } from "lucide-react";

export const GameCard = (props: {
	title: string;
	description: string;
	btnText: string;
}) => {
	const { title, description, btnText } = props;

	return (
		<div className="dashboard_box dashboard_card">
			<div className="dashboard-card_header flex justify-between">
				<Sticker content="NOT COMPLETED" />
				<EllipsisVertical />
			</div>
			<div className="dashboard-card_body">
				<h1>{title}</h1>
				<div className="dashboard-card_content">{description}</div>
			</div>
			<div className="dashboard-card_footer flex justify-center">
				<button className="dashboard_btn">{btnText}</button>
			</div>
		</div>
	);
};
