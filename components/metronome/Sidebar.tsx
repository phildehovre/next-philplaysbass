import "./Sidebar.css";
import React from "react";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
} from "@/components/ui/sidebar";
import { Playlist, Song } from "@/types/types";

const MetroSidebar = ({ playlists }: { playlists: Song[][] }) => {
	return (
		<Sidebar className="sidebar_main">
			<SidebarHeader />
			<SidebarContent>
				<SidebarGroup />
				<SidebarGroupLabel>Playlists</SidebarGroupLabel>
				<SidebarGroupContent>
					<h1>hello</h1>
				</SidebarGroupContent>
				<SidebarGroup />
			</SidebarContent>
			<SidebarFooter />
		</Sidebar>
	);
};

export default MetroSidebar;
