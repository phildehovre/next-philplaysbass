import React from "react";

function layout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html>
			<body>{children}</body>
		</html>
	);
}

export default layout;
