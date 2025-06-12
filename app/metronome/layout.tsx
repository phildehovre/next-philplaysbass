import MetroSidebar from "@/components/metronome/Sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
	return (
		<div>
			<SidebarProvider>{children}</SidebarProvider>
		</div>
	);
};

export default layout;
