"use client";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuPortal,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Phase } from "@/lib/generated/prisma";
import { EllipsisVertical, Trash, X } from "lucide-react";

type PhaseDropDownProps = {
	handleDelete: (id: string) => void;
	handleOmit: (id: string) => void;
	phase: Phase;
};

export function PhaseDropdown(props: PhaseDropDownProps) {
	const { handleDelete, handleOmit, phase } = props;

	const dropdownOptions = [
		{
			label: "Remove for this session",
			action: handleOmit,
			variant: "",
			icon: () => <X />,
		},
		{
			label: "Delete",
			action: handleDelete,
			variant: "destructive",
			icon: () => <Trash />,
		},
	];

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="outline">
					<EllipsisVertical />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-56 p-2" align="start">
				{dropdownOptions.map((o) => {
					return (
						<DropdownMenuItem
							className={`${o.variant && o.variant}`}
							key={o.label}
							onClick={() => o.action(phase.id)}
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
