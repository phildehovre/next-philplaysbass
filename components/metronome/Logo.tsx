import React from "react";
import Image from "next/image";

const Logo = (props: { size: number }) => {
	const { size } = props;
	return (
		<>
			<Image
				alt="Phil plays bass logo"
				width={size}
				height={size}
				src="/logo.png"
			/>
		</>
	);
};

export default Logo;
