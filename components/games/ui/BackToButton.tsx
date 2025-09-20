import { ChevronLeft, ChevronsLeft } from "lucide-react";
import Link from "next/link";
import React from "react";
import "../GameStyles.css";

const BackToButton = (props: {
	url: string;
	label: string;
	className?: string;
}) => {
	return (
		<Link
			className={`${props?.className} flex text-center items-center btn_backto text-xs`}
			href={props.url}
		>
			<ChevronsLeft size={10} />
			{props.label}
		</Link>
	);
};

export default BackToButton;
