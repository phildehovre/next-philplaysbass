import React from "react";
import PageLoader from "../../../components/PageLoader";

const Loading = () => {
	return (
		<div className="h-full min-h-[100svh] w-full">
			<div className="welcome_banner w-full"></div>
			<PageLoader />
		</div>
	);
};

export default Loading;
