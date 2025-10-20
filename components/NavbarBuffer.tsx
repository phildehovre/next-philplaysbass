import { useIsMobile } from "@/hooks/use-mobile";
import React from "react";

const NavbarBuffer = () => {
	const isMobile = useIsMobile();
	return <div className={`navbar_buffer ${isMobile ? "hidden" : ""}`}></div>;
};

export default NavbarBuffer;
