import GameSelection from "@/components/GameSelection";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className="flex flex-col justify-center items-center">
			<GameSelection />
			{children}
		</div>
	);
};

export default layout;
