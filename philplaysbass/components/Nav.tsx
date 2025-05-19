"use client";

import "./Nav.css";
import { textObject as lg } from "../constants/textFile";
import { useLanguage } from "../context/LanguageContext";
import { LANGUAGES } from "../constants/languages";
import type { LanguagesType } from "../types/types";
import React from "react";
import {
	LoginLink,
	LogoutLink,
	RegisterLink,
} from "@kinde-oss/kinde-auth-nextjs";

type NavProps = {
	isLoggedIn: boolean | null;
};
const Nav: React.FC<NavProps> = ({ isLoggedIn }) => {
	const { language, setLanguage } = useLanguage();

	const languages: LanguagesType[] = LANGUAGES;
	const btns = lg.nav.buttons;

	const renderLanguageButtons = () => {
		return languages.map((item, index) => {
			return (
				<React.Fragment key={item}>
					<button onClick={() => setLanguage(item)}>{item}</button>
					{index < languages.length - 1 && <span>|</span>}
				</React.Fragment>
			);
		});
	};

	return (
		<nav>
			<div className="logo">Logo</div>
			<ul>
				<li>
					<a href="/" title={btns.home.tooltip[language]}>
						{btns.home.labels[language]}
					</a>
				</li>
				<li>
					<a href="/about" title={btns.about.tooltip[language]}>
						{btns.about.labels[language]}
					</a>
				</li>
				<li>
					<a href="/lessons" title={btns.lessons.tooltip[language]}>
						{btns.lessons.labels[language]}
					</a>
				</li>
			</ul>
			<div className="languages">{renderLanguageButtons()}</div>
			{isLoggedIn ? (
				<button className="auth_btn">
					<LogoutLink>Log out</LogoutLink>
				</button>
			) : (
				<button className="auth_btn">
					<LoginLink>Sign in</LoginLink>
				</button>
			)}
		</nav>
	);
};

export default Nav;
