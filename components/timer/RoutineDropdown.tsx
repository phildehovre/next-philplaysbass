"use client";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	BookOpenTextIcon,
	EllipsisVertical,
	Folder,
	Save,
	Trash2,
	X,
} from "lucide-react";
import Spinner from "../Spinner";
import { UserPracticeRoutine } from "@/actions/timerActions";
import { Portal } from "@radix-ui/react-dropdown-menu";

type RoutineDropdownProps = {
	loading: boolean;
	routine?: UserPracticeRoutine; // make it optional
	handleDeleteRoutine: (id: string) => void;
	handleSaveRoutine: (id: string) => void;
	setShowSaveRoutineModal: (b: boolean) => void;
	setShowRoutinesModal: (b: boolean) => void;
	handleCloseRoutine: (id?: string) => void;
};

export function RoutineDropdown({
	loading,
	routine,
	setShowSaveRoutineModal,
	handleDeleteRoutine,
	setShowRoutinesModal,
	handleCloseRoutine,
}: RoutineDropdownProps) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="outline" className="rounded-full w-[1.5em] h-[1.5em]">
					{loading ? <Spinner /> : <EllipsisVertical />}
				</Button>
			</DropdownMenuTrigger>
			<Portal>
				<DropdownMenuContent className="w-56 p-2" align="start" sideOffset={0}>
					<DropdownMenuItem onClick={() => setShowRoutinesModal(true)}>
						<Folder className="mr-2 h-4 w-4" />
						Open
					</DropdownMenuItem>
					<DropdownMenuItem onClick={() => handleCloseRoutine()}>
						<X className="mr-2 h-4 w-4" />
						Close
					</DropdownMenuItem>
					<DropdownMenuItem onClick={() => setShowSaveRoutineModal(true)}>
						<Save className="mr-2 h-4 w-4" />
						Save practice
					</DropdownMenuItem>
					<DropdownMenuItem
						disabled={!routine} // disable if routine not present
						className="text-destructive"
						onClick={() => routine && handleDeleteRoutine(routine.id)}
					>
						<Trash2 className="mr-2 h-4 w-4" />
						Delete practice
					</DropdownMenuItem>
				</DropdownMenuContent>
			</Portal>
		</DropdownMenu>
	);
}
