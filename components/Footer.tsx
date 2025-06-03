"use client";

import Link from "next/link";
import React from "react";
import "./Footer.css";
import { useLanguage } from "@/context/LanguageContext";
import { textObject } from "@/constants/textFile";
import Image from "next/image";
import Logo from "./metronome/Logo";

const Footer = () => {
	const { language } = useLanguage();

	return (
		<footer className="footer_ctn">
			<Logo size={50} />
			<div className="list_ctn">
				<ul>
					<li>
						<Link href="/">{textObject.nav.buttons.home.labels[language]}</Link>
					</li>
					<li>
						<Link href="/">
							{textObject.nav.buttons.about.labels[language]}
						</Link>
					</li>
					<li>
						<Link href="/">
							{textObject.nav.buttons.privacy.labels[language]}
						</Link>
					</li>
				</ul>
				<ul>
					<li>
						<Link href="/lessons">
							{textObject.nav.buttons.lessons.labels[language]}
						</Link>
					</li>
					<li>
						<Link href="/shop">
							{textObject.nav.buttons.shop.labels[language]}
						</Link>
					</li>
					<li>
						<Link href="/">Watch the stream</Link>
					</li>
				</ul>
			</div>
		</footer>
	);
};

export default Footer;
