import React from "react";

const Sticker = (props: { content: string }) => {
	const { content } = props;
	return <div className="sticker">{content}</div>;
};

export default Sticker;
