import React from "react";
import "./Feature.css";

const Feature = ({ children }: { children: React.ReactNode }) => {
	return <div className="feature_ctn">{children}</div>;
};

export default Feature;
