"use client";
import React, { useState } from "react";
import "./UserMenu.css";
import Image from "next/image";
import { DropdownMenu } from "@radix-ui/react-dropdown-menu";
import {
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs";

type UserMenuProps = {
	user: any;
};
const UserMenu: React.FC<UserMenuProps> = (props) => {
	const [show, setShow] = useState(false);
	const { user } = props;

	const items = [
		{ label: "Settings", link: "/settings" },
		{ label: "Log out", link: "" },
	];

	const renderUserMenu = () => {
		return items.map((item) => {
			if (item.label === "Log out") {
				return (
					<DropdownMenuItem key={item.label} className="dropdown-menu_item">
						<LogoutLink>Logout</LogoutLink>
					</DropdownMenuItem>
				);
			}
			return (
				<DropdownMenuItem key={item.link} className="dropdown-menu_item">
					<a href={item.link} title={item.label}>
						{item.label}
					</a>
				</DropdownMenuItem>
			);
		});
	};

	return (
		<div className="z-100">
			<DropdownMenu>
				<DropdownMenuTrigger>
					<Image
						onClick={() => setShow(!show)}
						src={user.picture}
						alt="user avatar"
						className="user-menu"
						width={20}
						height={20}
						quality={100}
					/>
				</DropdownMenuTrigger>
				{show && (
					<DropdownMenuContent className="dropdown-menu_content">
						{renderUserMenu()}
					</DropdownMenuContent>
				)}
			</DropdownMenu>
		</div>
	);
};

export default UserMenu;
