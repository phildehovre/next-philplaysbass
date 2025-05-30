import React from "react";
import "./Section.css";

const Section = ({ children }: { children: React.ReactNode }) => {
	return <div className="section">{children}</div>;
};

export default Section;
