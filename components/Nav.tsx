"use client";

import "./Nav.css";
import { textObject as lg } from "../constants/textFile";
import { useLanguage } from "../context/LanguageContext";
import { LANGUAGES } from "../constants/languages";
import type { LanguagesType } from "../types/types";
import React from "react";
import { LoginLink, LogoutLink } from "@kinde-oss/kinde-auth-nextjs";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LucideMenu } from "lucide-react";

type NavProps = {
	isLoggedIn: boolean | null;
};

const Nav: React.FC<NavProps> = ({ isLoggedIn }) => {
	const { language, setLanguage } = useLanguage();

	const languages: LanguagesType[] = LANGUAGES;
	const btns = lg.nav.buttons;

	const renderLanguageButtons = () => {
		return languages.map((item, index) => (
			<React.Fragment key={item}>
				<button onClick={() => setLanguage(item)}>{item}</button>
				{index < languages.length - 1 && <span>|</span>}
			</React.Fragment>
		));
	};

	const navLinks = [
		{
			href: "/",
			label: btns.home.labels[language],
			tooltip: btns.home.tooltip[language],
		},
		{
			href: "/about",
			label: btns.about.labels[language],
			tooltip: btns.about.tooltip[language],
		},
		{
			href: "/lessons",
			label: btns.lessons.labels[language],
			tooltip: btns.lessons.tooltip[language],
		},
	];

	return (
		<nav>
			<ul className="desktop-menu desktop">
				{navLinks.map((link) => (
					<li key={link.href}>
						<a href={link.href} title={link.tooltip}>
							{link.label}
						</a>
					</li>
				))}
			</ul>

			<div className="mobile-menu">
				<DropdownMenu>
					<DropdownMenuTrigger>
						<LucideMenu />
					</DropdownMenuTrigger>
					<DropdownMenuContent>
						{navLinks.map((link) => (
							<DropdownMenuItem asChild key={link.href}>
								<a
									className="gap-1 text-black"
									style={{ color: "black", gap: "1em" }}
									href={link.href}
									title={link.tooltip}
								>
									{link.label}
								</a>
							</DropdownMenuItem>
						))}
					</DropdownMenuContent>
				</DropdownMenu>
			</div>

			{isLoggedIn ? (
				<button className="auth_btn desktop">
					<LogoutLink>Log out</LogoutLink>
				</button>
			) : (
				<button className="auth_btn desktop">
					<LoginLink>Sign in</LoginLink>
				</button>
			)}
			<div className="languages desktop">{renderLanguageButtons()}</div>
		</nav>
	);
};

export default Nav;
