import React from "react";
import "../../globals.css";

function layout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html>
			<body style={{ color: "black !important" }}>{children}</body>
		</html>
	);
}

export default layout;
