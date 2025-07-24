import Dashboard from "@/components/games/Dashboard";
import { prisma } from "@/lib/prisma";
import { ensureUserInDb, getCurrentUserId } from "@/services/userService";
import { redirect } from "next/navigation";
import React from "react";

export const dynamic = "force-dynamic";

const Page = async () => {
	return (
		<div className="flex w-full h-full">
			<Dashboard />
		</div>
	);
};

export default Page;
