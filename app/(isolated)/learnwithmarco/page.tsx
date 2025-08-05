import InversionsGameRedux from "@/components/games/InversionsGameRedux";
import { PracticeSessionProvider } from "@/context/practiceSessionsContext";
import React from "react";

const page = () => {
	return (
		<div className="bg-white text-gray-800 flex justify-center items-center">
			<PracticeSessionProvider>
				<InversionsGameRedux />
			</PracticeSessionProvider>
		</div>
	);
};

export default page;
