import { prisma } from "@/lib/prisma";
import { formatTime } from "@/utils/helpers";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import React from "react";
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import Spinner from "@/components/Spinner";

const Page = async () => {
	const { getUser } = await getKindeServerSession();
	const user = await getUser();

	// Safely select only the fields you want
	const results = await prisma.userStats.findMany({
		select: {
			totalScore: true, // adjust for your schema
			totalSessions: true,
			totalTime: true,
			user: {
				select: {
					name: true, // only fetch username
				},
			},
		},
	});

	return (
		<div className="page_ctn flex justify-center w-full h-full min-h-[50svh]">
			{!results && <Spinner />}
			{results && results.length !== 0 && (
				<div className="table_ctn flex justify-center w-full max-w-[768px]">
					<Table>
						<TableCaption>User leaderboard</TableCaption>
						<TableHeader>
							<TableRow>
								<TableHead className="w-[50px]">Rank</TableHead>
								<TableHead className="w-[100px]">User</TableHead>
								<TableHead>Time practiced</TableHead>
								<TableHead>Total sessions</TableHead>
								<TableHead className="text-right">Total score</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{results.map((result, index) => (
								<TableRow key={result.user.name + index}>
									<TableCell>#{index + 1}</TableCell>
									<TableCell>{result.user.name}</TableCell>
									<TableCell>{formatTime(result.totalTime)}</TableCell>
									<TableCell>{result.totalSessions}</TableCell>
									<TableCell className="text-right">
										{result.totalScore}
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</div>
			)}
		</div>
	);
};

export default Page;
