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

const MetroSidebar = () => {
	return (
		<Sidebar side="right">
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
