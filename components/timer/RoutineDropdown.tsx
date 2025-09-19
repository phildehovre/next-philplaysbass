"use client";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Phase } from "@/lib/generated/prisma";
import { EllipsisVertical, Loader, Save, Trash, Trash2, X } from "lucide-react";
import Spinner from "../Spinner";
import { UserPracticeRoutine } from "@/actions/timerActions";

type RoutineDropdownProps = {
	loading: boolean;
	routine: UserPracticeRoutine;
	handleDeleteRoutine: (id: string) => void;
};
export function RoutineDropdown(props: RoutineDropdownProps) {
	const { loading, routine, handleDeleteRoutine } = props;

	const dropdownOptions = [
		{
			label: "Save practice",
			action: (id: string) => {},
			variant: "",
			icon: () => <Save />,
		},
		{
			label: "Delete practice",
			action: handleDeleteRoutine,
			variant: "destructive",
			icon: () => <Trash2 />,
		},
	];

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="outline" className="rounded-full w-[1.5em] h-[1.5em]">
					{loading ? <Spinner /> : <EllipsisVertical />}
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-56 p-2" align="start">
				{dropdownOptions.map((o) => {
					return (
						<DropdownMenuItem
							className={`${o.variant && o.variant}`}
							key={o.label}
							onClick={() => o.action(routine.id)}
						>
							{o.icon()}
							{o.label}
						</DropdownMenuItem>
					);
				})}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
