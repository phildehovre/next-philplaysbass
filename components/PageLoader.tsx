import Spinner from "@/components/Spinner";
import React from "react";

const PageLoader = () => {
	return (
		<div className="w-full h-full flex flex-col justify-center items-center">
			<Spinner />
		</div>
	);
};

export default PageLoader;
