import React from "react";
import "../../globals.css";
import "../isolatedGlobals.css";
import { OscillatorGenProvider } from "@/context/oscillatorGenContext";

function layout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html>
			<OscillatorGenProvider>
				<body style={{ color: "black !important" }}>{children}</body>
			</OscillatorGenProvider>
		</html>
	);
}

export default layout;
