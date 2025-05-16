"use client"

import React, { useEffect, useRef, useState } from 'react'
import cloudinary from 'cloudinary-video-player'
import "cloudinary-video-player/cld-video-player.min.css"
import './VideoPlayer.css'

const VideoPlayer = () => {
    const [bgLoaded, setBgLoaded] = useState(false)

    const cloudinaryRef = useRef<any>(undefined)
    const videoRef = useRef<any>(undefined)

  // useEffect(() => {
  //   const video = videoRef.current as HTMLVideoElement | null;
  //   if (!video) return;
  
  //   const handleLoad = () => setBgLoaded(true);
  
  //     video.addEventListener("loadedmetadata", handleLoad);
  //     return () => {
  //       video.removeEventListener("loadedmetadata", handleLoad);
  //   }
  // }, []);

    React.useEffect(() => {
        if (cloudinaryRef.current) return;
        cloudinaryRef.current = cloudinary;
        cloudinaryRef.current.videoPlayer(videoRef.current, {
            cloud_name: 'dtnif6mzm',
            public_id: 'Portfolio - 2024/promo_intro_clean_web_export_-_720WebShareName_lmzz2h',
            autoplay: true,
            muted: true,
            controls: false,
            loop: true,
        })
    }, [])

  return (
    <div id='player_ctn'>
        <video className={`video_ctn ${bgLoaded? 'loaded': ''}`} ref={videoRef} data-cld-public-id="Portfolio - 2024/promo_intro_clean_web_export_-_720WebShareName_lmzz2h"/>
    </div>
  )
}

export default VideoPlayer