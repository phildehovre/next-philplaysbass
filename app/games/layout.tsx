import GameSelection from "@/components/GameSelection";
import { PracticeSessionProvider } from "@/context/practiceSessionsContext";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className="w-full h-full flex flex-col justify-center items-center">
			<PracticeSessionProvider>{children}</PracticeSessionProvider>
		</div>
	);
};

export default layout;
