import Metronome from "@/components/metronome/Metronome";
import MetroSidebar from "@/components/metronome/Sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import React, { Suspense } from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
	return (
		<div>
			<SidebarProvider>
				<Suspense>{children}</Suspense>
			</SidebarProvider>
		</div>
	);
};

export default layout;
