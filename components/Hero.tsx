"use client";

import VideoPlayer from "./VideoPlayer";
import "./Hero.css";
import Socials from "./Socials";
import { textObject } from "../constants/textFile";
import { useLanguage } from "../context/LanguageContext";
import Link from "next/link";
import Logo from "./metronome/Logo";
import { useTheme } from "@/context/themeContext";

const Hero: React.FC = () => {
	const { language } = useLanguage();

	return (
		<div className="hero_ctn">
			<VideoPlayer />
			<div className="slogan_ctn">
				<div className="left top">
					<Logo size={450} />
				</div>
				<div className="right bottom">
					<div className="container">
						<div className="links_ctn">
							<ul>
								<li className="link_item">
									<Link href="/dashboard">
										{textObject.nav.buttons.app.labels[language]}
									</Link>
								</li>
								<li className="link_item">
									<Link href="/lessons">
										{textObject.nav.buttons.lessons.labels[language]}
									</Link>
								</li>
								{/* <li className="link_item disabled pointer-none:">
									<a href="/" className="md:flex pointer-none:">
										{textObject.nav.buttons.shop.labels[language]}
										<p className="md:text-center text-sm lowercase tracking-wider">
											(coming soon...)
										</p>
									</a>
								</li> */}
								<li className="link_item">
									<Link href="/games">
										{textObject.nav.buttons.games.labels[language]}
									</Link>
								</li>
								<li className="link_item">
									<Link href="/">
										{textObject.nav.buttons.about.labels[language]}
									</Link>
								</li>
							</ul>
						</div>
						<div className="buttons_ctn">
							<Link className="button" href="/lessons/shop">
								Shop
							</Link>
							<a className="button" href="/lessons/book">
								Learn
							</a>
						</div>
						<Socials />
					</div>
				</div>
			</div>
		</div>
	);
};

export default Hero;
