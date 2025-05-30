"use client";
// components/LatestStream.tsx
import React, { useEffect, useState } from "react";
import { handleDecode } from "@/utilities/Parsing";
import "./LatestStream.css";

type Video = {
	id: string;
	title: string;
	thumbnail: string;
	url: string;
};

type Props = {
	latestStream: Video | null;
};

// Server Component with props
const LatestStream = ({ latestStream }: Props) => {
	const [title, setTitle] = useState("");
	if (!latestStream) {
		return <div>No live stream available.</div>;
	}

	useEffect(() => {
		const title = handleDecode(latestStream.title);
		setTitle(title);
	}, [latestStream]);

	return (
		<div className="latest-stream_ctn">
			<h1>Latest Live Stream</h1>
			{/* <h2>{title}</h2> */}

			<iframe
				title={title}
				loading="lazy"
				allowFullScreen
				src={`http://www.youtube.com/embed/${latestStream.id}`}
				className="latest-stream"
			/>
		</div>
	);
};

export default LatestStream;
