import GameSelection from "@/components/games/dashboard/GameSelection";
import NavbarBuffer from "@/components/NavbarBuffer";
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
