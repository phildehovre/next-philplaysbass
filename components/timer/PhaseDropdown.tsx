"use client";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Phase } from "@/lib/generated/prisma";
import { EditIcon, EllipsisVertical, Loader, Trash, X } from "lucide-react";
import Spinner from "../Spinner";

type PhaseDropDownProps = {
	handleOmit: (phase: Phase) => void;
	handleEdit: (phase: Phase) => void;
	phase: Phase;
	loading: boolean;
};

export function PhaseDropdown(props: PhaseDropDownProps) {
	const { loading, handleOmit, handleEdit, phase } = props;

	const dropdownOptions = [
		{
			label: "Edit",
			action: handleEdit,
			variant: "",
			icon: () => <EditIcon />,
		},
		{
			label: "Remove for this session",
			action: handleOmit,
			variant: "",
			icon: () => <X />,
		},
	];

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="outline" className="rounded-full w-[1.5em] h-[1.5em]">
					{loading ? <Spinner /> : <EllipsisVertical />}
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-56 p-2" align="start" sideOffset={0}>
				{dropdownOptions.map((o) => {
					return (
						<DropdownMenuItem
							className={`${o.variant && o.variant}`}
							key={o.label}
							onClick={() => o.action(phase)}
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
