"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import BackToButton from "./BackToButton";

const GameContainer = ({ children }: { children: React.ReactNode }) => {
	const gameCtn = useRef<HTMLDivElement>(null);
	useEffect(() => {
		if (gameCtn.current) {
			const tl = gsap.timeline();

			// Animate the container first
			tl.fromTo(
				gameCtn.current,
				{ opacity: 0, y: 30 },
				{
					opacity: 1,
					y: 0,
					duration: 0.25,
					ease: "power2.out",
				}
			);

			// Then animate all its children with a stagger
			const sections = gameCtn.current.querySelectorAll("div");
			tl.fromTo(
				sections,
				{ opacity: 0, y: 20 },
				{
					opacity: 1,
					y: 0,
					stagger: 0.05,
					duration: 0.15,
					ease: "power2.out",
				},
				"-=0.05" // overlap slightly so it feels smooth
			);
		}
	}, []);
	return (
		<div ref={gameCtn} className="game_ctn max-w-[24em]">
			<BackToButton label="To dashboard" url={"/dashboard"} />
			{children}
		</div>
	);
};

export default GameContainer;
