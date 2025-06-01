import React, { useEffect, useRef, useState } from "react";
import "cloudinary-video-player/cld-video-player.min.css";
import "./VideoPlayer.css";

// Dynamic import of cloudinary
const loadCloudinary = () => {
	if (typeof window !== "undefined") {
		return import("cloudinary-video-player");
	}
	return Promise.resolve(null);
};

const VideoPlayer: React.FC = () => {
	const [bgLoaded, setBgLoaded] = useState(false);
	const videoRef = useRef<HTMLVideoElement>(null);

	useEffect(() => {
		const video = videoRef.current;
		if (!video) return;

		const handleLoad = () => setBgLoaded(true);

		video.addEventListener("loadedmetadata", handleLoad);
		return () => video.removeEventListener("loadedmetadata", handleLoad);
	}, []);

	useEffect(() => {
		let playerInstance: any;

		loadCloudinary().then((module) => {
			if (module) {
				const cloudinary = module.default;
				playerInstance = cloudinary.videoPlayer("my-video-id", {
					cloudName: "dtnif6mzm",
					publicId:
						"Portfolio - 2024/promo_intro_clean_web_export_-_720WebShareName_lmzz2h",
					autoplay: true,
					muted: true,
					controls: false,
					loop: true,
				});
			}
		});

		return () => {
			if (playerInstance?.destroy) {
				playerInstance.destroy();
			}
		};
	}, []);

	return (
		<div id="player_ctn">
			<video
				ref={videoRef}
				id="my-video-id" // important for cloudinary to target
				className={`video_ctn ${bgLoaded ? "loaded" : ""}`}
				data-cld-public-id="Portfolio - 2024/promo_intro_clean_web_export_-_720WebShareName_lmzz2h"
			/>
		</div>
	);
};

export default VideoPlayer;
