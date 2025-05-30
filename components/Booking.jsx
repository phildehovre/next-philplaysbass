"use client";
// Example Calendly embed in a React/Next.js component
import { useEffect } from "react";

export default function Booking() {
	useEffect(() => {
		const script = document.createElement("script");
		script.src = "https://assets.calendly.com/assets/external/widget.js";
		script.async = true;
		document.body.appendChild(script);
	}, []);

	return (
		<div
			className="calendly-inline-widget"
			data-url="https://calendly.com/philplaysbass"
			style={{ minWidth: "320px", height: "630px" }}
		></div>
	);
}
