import { ScaleQuality } from "@/constants/chromaticScale";
import { useState } from "react";

export const useGameOptions = () => {
	const [withTimer, setWithTimer] = useState(false);
	const [withMetronome, setWithMetronome] = useState(false);
	const [withArpeggios, setWithArpeggios] = useState(false);
	const [withInversions, setWithInversions] = useState(false);
	const [selectedQualities, setSelectedQualities] = useState<ScaleQuality[]>([
		"major",
	]);
	const [isPracticeMode, setIsPracticeMode] = useState(false);

	const options = {
		withTimer,
		withMetronome,
		withArpeggios,
		withInversions,
		selectedQualities,
		isPracticeMode,
	};

	return {
		options,
		setWithTimer,
		setWithMetronome,
		setWithArpeggios,
		setWithInversions,
		setSelectedQualities,
		setIsPracticeMode,
	};
};
