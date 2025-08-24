import InversionsGame from "@/components/games/InversionsGame";
import BackToButton from "@/components/games/ui/BackToButton";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import React from "react";

const page = async () => {
	return (
		<>
			<InversionsGame />;
		</>
	);
};

export default page;
