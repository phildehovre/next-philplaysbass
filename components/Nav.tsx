"use client";
import { useEffect, useLayoutEffect, useState } from "react";
import "./Nav.css";
import { useActiveSectionContext } from "../context/activeElementContext";
import { links } from "../types/types";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Link from "next/link";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { LoginLink } from "@kinde-oss/kinde-auth-nextjs";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@radix-ui/react-tooltip";
import { MoonIcon, User } from "lucide-react";
import Switch from "./Switch";
import { useTheme } from "next-themes";
import UserMenu from "./UserMenu";
import NavbarBuffer from "./NavbarBuffer";
import { useIsMobile } from "@/hooks/use-mobile";

function Header() {
	const { activeSection, setActiveSection, setTimeOfLastClick } =
		useActiveSectionContext();
	const [isShowing, setIsShowing] = useState(false);
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const { setTheme, theme } = useTheme();
	const isMobile = useIsMobile();

	const { user } = useKindeBrowserClient();

	useEffect(() => {
		if (user) {
			setIsLoggedIn(true);
		}
		if (!user) {
			setIsLoggedIn(false);
		}
	});
	useLayoutEffect(() => {
		gsap.registerPlugin(ScrollTrigger);

		if (isMobile) return;
		const ctx = gsap.context(() => {
			ScrollTrigger.create({
				trigger: "main",
				start: "50px 5%",
				toggleClass: { targets: "nav", className: "nav-active" },
				// markers: true,
			});
		});

		return () => ctx.revert();
	});

	const toggleTheme = () => {
		setTheme((prev) => {
			if (theme == "light") {
				return "dark";
			} else {
				return "light";
			}
		});
	};

	const renderLinks = () => {
		return links.map((link) => {
			return (
				<li
					key={link.name}
					onClick={() => {
						setActiveSection(link.name);
						setTimeOfLastClick(Date.now());
						setIsShowing(false);
					}}
					className={!isMobile && activeSection === link.name ? "active" : ""}
				>
					<Link href={link.hash}>{link.name}</Link>
				</li>
			);
		});
	};
	return (
		<header>
			<NavbarBuffer />
			<nav className="navbar">
				{isLoggedIn && isMobile && <UserMenu user={user} />}
				<ul className={`links ${isShowing ? "showing" : ""}`}>
					{renderLinks()}
					<li className="login-btn">
						{isLoggedIn ? (
							<UserMenu user={user} />
						) : (
							<button className="auth_btn">
								<LoginLink postLoginRedirectURL="/api/user">Sign in</LoginLink>
							</button>
						)}
					</li>
					<Tooltip>
						<TooltipTrigger asChild={true}>
							<label htmlFor="darkMode" className="flex items-center gap-2">
								<MoonIcon />
								<Switch
									disabled={false}
									checked={theme === "light"}
									onCheckChange={toggleTheme}
								/>
							</label>
						</TooltipTrigger>
						<TooltipContent>Toggle dark/light mode</TooltipContent>
					</Tooltip>
				</ul>
			</nav>
		</header>
	);
}

export default Header;
