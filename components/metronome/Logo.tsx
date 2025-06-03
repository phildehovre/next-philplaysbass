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
				src="https://res.cloudinary.com/dtnif6mzm/image/upload/v1748938746/philplaysbass/logo_unified_thx8q9.png"
			/>
		</>
	);
};

export default Logo;
