import GameSelection from "@/components/GameSelection";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className="w-full h-full flex flex-col justify-center items-center">
			<GameSelection />
			{children}
		</div>
	);
};

export default layout;
