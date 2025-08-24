import { OscillatorGenProvider } from "@/context/oscillatorGenContext";
import { PracticeSessionProvider } from "@/context/practiceSessionsContext";
import { SoundFXProvider } from "@/context/soundContext";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className="w-full h-full flex flex-col justify-center items-center">
			<PracticeSessionProvider>
				<SoundFXProvider>
					<OscillatorGenProvider>{children}</OscillatorGenProvider>
				</SoundFXProvider>
			</PracticeSessionProvider>
		</div>
	);
};

export default layout;
