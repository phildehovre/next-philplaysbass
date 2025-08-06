import InversionsGameRedux from "@/components/games/InversionsGameRedux";
import { PracticeSessionProvider } from "@/context/practiceSessionsContext";
import React from "react";
import "../isolatedGlobals.css";

const page = () => {
	return (
		<div className="isolated_page bg-white flex justify-center items-center w-full h-[100svh]">
			<PracticeSessionProvider>
				<InversionsGameRedux />
			</PracticeSessionProvider>
		</div>
	);
};

export default page;
