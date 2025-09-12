"use client";
import React, { useRef, useState, useEffect } from "react";
import { cn } from "@/lib/utils";

type AnimatedGridRowProps = {
	active: boolean;
	children: React.ReactNode;
	className?: string;
};

const AnimatedGridRow: React.FC<AnimatedGridRowProps> = ({
	active,
	children,
	className,
}) => {
	const contentRef = useRef<HTMLDivElement>(null);
	const [height, setHeight] = useState(0);

	useEffect(() => {
		if (active && contentRef.current) {
			const scrollHeight = contentRef.current.scrollHeight;
			setHeight(scrollHeight);
		} else {
			setHeight(0);
		}
	}, [active, children]);

	return (
		<div
			className={cn(
				"overflow-hidden w-full transition-[height] duration-500 ease-in-out",
				className
			)}
			style={{ height }}
		>
			<div ref={contentRef} className="h-auto flex justify-center items-center">
				{children}
			</div>
		</div>
	);
};

export default AnimatedGridRow;
