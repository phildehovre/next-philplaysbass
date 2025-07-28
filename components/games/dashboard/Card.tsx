import React from "react";
import Sticker from "./Sticker";
import { EllipsisVertical } from "lucide-react";
import Link from "next/link";

export const GameCard = (props: {
	title: string;
	description: string;
	btnText: string;
	href: string;
}) => {
	const { title, description, btnText, href } = props;

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
				<Link className="dashboard_btn flex justify-center" href={href}>
					{btnText}
				</Link>
			</div>
		</div>
	);
};
