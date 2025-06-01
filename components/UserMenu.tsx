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
import { LucideMenu } from "lucide-react";

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

	return (
		<React.Fragment>
			<DropdownMenu>
				<DropdownMenuTrigger>
					<Image
						onClick={() => setShow(!show)}
						src={user.picture}
						alt="user avatar"
						className="user-menu"
						width={2}
						height={2}
					/>
				</DropdownMenuTrigger>
				{show && (
					<DropdownMenuContent>
						{items.map((item) => (
							<DropdownMenuItem asChild key={item.link}>
								<a
									className="gap-1 text-black"
									style={{ color: "black", gap: "1em" }}
									href={item.link}
									title={item.label}
								>
									{item.label}
								</a>
							</DropdownMenuItem>
						))}
					</DropdownMenuContent>
				)}
			</DropdownMenu>
		</React.Fragment>
	);
};

export default UserMenu;
