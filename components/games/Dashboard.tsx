"use client";
import React, { useEffect, useState } from "react";
import {
	Card,
	CardAction,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { PracticeEvent } from "@/lib/generated/prisma";
import Spinner from "../Spinner";

const Dashboard = (props: any) => {
	const [userData, setUserData] = useState<PracticeEvent[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	useEffect(() => {
		setIsLoading(true);
		(async () => {
			const res = await fetch(`/api/practice`);
			const data = await res.json();
			setUserData(data);
		})();
		setIsLoading(false);
	}, []);

	useEffect(() => {
		if (userData) {
		}
	}, [userData]);

	return (
		<div className="flex w-full justify-center gap-2">
			<Card className="w-50 h-50 bg-transparent flex flex-col text-center border-gray-600">
				<CardHeader>
					<CardTitle>Correct</CardTitle>
				</CardHeader>
				<CardContent>
					{isLoading && <Spinner />}
					<h2 className="text-8xl">
						{userData
							? userData.filter((i: PracticeEvent) => i.isCorrect).length
							: "No data"}
					</h2>
				</CardContent>
			</Card>
			<Card className="w-50 bg-transparent  flex text-center border-gray-600">
				<CardHeader>
					<CardTitle>Incorrect</CardTitle>
				</CardHeader>
				<CardContent>
					{isLoading && <Spinner />}
					<h2 className="text-8xl">
						{userData
							? userData.filter((i: PracticeEvent) => !i.isCorrect).length
							: "No data yet"}
					</h2>
				</CardContent>
			</Card>
		</div>
	);
};

export default Dashboard;
