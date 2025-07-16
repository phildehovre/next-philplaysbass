"use client";
import React from "react";
import Link from "next/link";

const GameSelection = (props: any) => {
	return (
		<div className="h-[10em] w-full flex justify-center items-end text-white mt-[60px]">
			<ul className="tabs flex gap-1 w-full justify-evenly text-2xl ">
				<li className="tab ">
					<Link href="/games/arpeggio">Arpeggio</Link>
				</li>
				<li className="tab ">
					<Link href="/games/chords">Chords</Link>
				</li>
				<li className="tab">
					<Link href="/games/inversions">Inversions</Link>
				</li>
			</ul>
		</div>
	);
};

export default GameSelection;
