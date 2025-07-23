"use client";
import React from "react";
import {
	Card,
	CardAction,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { PracticeEvent } from "@/lib/generated/prisma";

const Dashboard = (props: any) => {
	const { userData } = props;

	const userWins = userData.filter((i: PracticeEvent) => i.isCorrect).length;
	const userLosses = userData.filter((i: PracticeEvent) => !i.isCorrect).length;
	console.log(userWins, userLosses);
	return (
		<div className="flex w-full justify-center gap-2">
			<Card className="w-50 h-50 bg-transparent flex flex-col text-center border-gray-600">
				<CardHeader>
					<CardTitle>Correct</CardTitle>
				</CardHeader>
				<CardContent>
					<h2 className="text-8xl">{userWins}</h2>
				</CardContent>
			</Card>
			<Card className="w-50 bg-transparent  flex text-center border-gray-600">
				<CardHeader>
					<CardTitle>Incorrect</CardTitle>
				</CardHeader>
				<CardContent>
					<h2 className="text-8xl">{userLosses}</h2>
				</CardContent>
			</Card>
		</div>
	);
};

export default Dashboard;
