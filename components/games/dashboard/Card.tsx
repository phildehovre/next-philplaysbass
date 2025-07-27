import React from "react";
import Sticker from "./Sticker";

export const GameCard = (props: {
	title: string;
	description: string;
	btnText: string;
}) => {
	const { title, description, btnText } = props;

	return (
		<div className="dashboard_card">
			<div className="dashboard-card_header">
				<Sticker content="NOT COMPLETED" />
			</div>
			<div className="dashboard-card_body">
				<h1>{title}</h1>
				<div className="dashboard-card_content">{description}</div>
			</div>
			<div className="dashboard-card_footer">
				<button className="dashboard_btn">{btnText}</button>
			</div>
		</div>
	);
};
