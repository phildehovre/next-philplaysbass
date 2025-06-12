import React, { useState } from "react";
import "./SongDropdown.css";
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
} from "../ui/dropdown-menu";
import { EllipsisVertical } from "lucide-react";
import { SongData } from "@/types/types";

const SongDropdown = ({
	playlists,
	setShowSongPortal,
	song,
}: {
	playlists: any;
	setShowSongPortal: (p: boolean) => void;
	song: SongData;
}) => {
	const [showSongDropdown, setShowSongDropdown] = useState(false);

	const renderPlaylists = () => {
		return playlists.map((item: any, index: number) => {
			return (
				<DropdownMenuItem key={item.name + index}>{item.name}</DropdownMenuItem>
			);
		});
	};
	return (
		<>
			<DropdownMenu>
				<DropdownMenuTrigger className="song-dropdown_trigger">
					<EllipsisVertical
						onClick={() => setShowSongDropdown(!showSongDropdown)}
					/>
				</DropdownMenuTrigger>
				<DropdownMenuContent className="song-dropdown_ctn">
					<DropdownMenuItem className="song-dropdown_item">
						Nothing yet
					</DropdownMenuItem>
					<DropdownMenuSub>
						<DropdownMenuSubTrigger className="song-dropdown_item">
							Add to playlist
						</DropdownMenuSubTrigger>
						<DropdownMenuPortal>
							<DropdownMenuSubContent className="song-dropdown_ctn">
								<DropdownMenuItem
									className="song-dropdown_item"
									onClick={() => setShowSongPortal(true)}
								>
									New...
								</DropdownMenuItem>
								{playlists?.length > 0 && renderPlaylists()}
								<DropdownMenuSeparator />
								<DropdownMenuItem className="song-dropdown_item">
									More...
								</DropdownMenuItem>
							</DropdownMenuSubContent>
						</DropdownMenuPortal>
					</DropdownMenuSub>
					<DropdownMenuItem className="song-dropdown_item">
						More...
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</>
	);
};

export default SongDropdown;
