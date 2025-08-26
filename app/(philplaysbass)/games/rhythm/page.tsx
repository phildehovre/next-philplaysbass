import RhythmAccuracyGame from "@/components/games/RhythmAccuracyGame";
import { RhythmAccuracyGameProvider } from "@/context/rhythmAccuracyGameContext";
import React from "react";

const page = () => (
	<div>
		<RhythmAccuracyGameProvider>
			<RhythmAccuracyGame />
		</RhythmAccuracyGameProvider>
	</div>
);

export default page;
