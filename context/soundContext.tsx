"use client";

import React, {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useRef,
	useState,
	ReactNode,
} from "react";
import { Howl, Howler } from "howler";

type SpriteMap = Record<string, [number, number]>;

type SoundConfig = {
	src: string[];
	volume?: number;
	sprite?: SpriteMap;
};

type SoundsMap = Record<string, Howl>;

interface SoundContextValue {
	playSoundFX: (name: string) => void;
	toggleMute: () => void;
	changeVolume: (volume: number) => void;
	isMuted: boolean;
	volume: number;
}

const SoundContext = createContext<SoundContextValue | null>(null);

interface SoundFXProviderProps {
	children: ReactNode;
}

export const SoundFXProvider: React.FC<SoundFXProviderProps> = ({
	children,
}) => {
	const sounds = useRef<SoundsMap>({});
	const [isMuted, setIsMuted] = useState<boolean>(false);
	const [volume, setVolume] = useState<number>(1);

	// Load preferences from localStorage
	useEffect(() => {
		if (typeof window === "undefined") return;
		const savedMute = localStorage.getItem("soundfx-muted") === "true";
		const savedVolume = parseFloat(
			localStorage.getItem("soundfx-volume") || "1"
		);

		setIsMuted(savedMute);
		setVolume(savedVolume);
		Howler.mute(savedMute);
		Howler.volume(savedVolume);
	}, []);

	// Preload sounds
	useEffect(() => {
		if (typeof window === "undefined") return;

		// Example: single file with sprite map
		sounds.current["ui"] = new Howl({
			src: ["/sounds/ui-sprites.mp3"],
			volume,
			sprite: {
				click: [0, 200],
				success: [500, 800],
				error: [1500, 600],
			},
		});

		// Example: individual file
		sounds.current["alert"] = new Howl({
			src: ["/sounds/alert.mp3"],
			volume,
		});
	}, [volume]);

	const playSoundFX = useCallback((name: string) => {
		// Check all sprites first
		for (const key in sounds.current) {
			const howl = sounds.current[key];
			if ((howl as any)._sprite && (howl as any)._sprite[name]) {
				howl.play(name);
				return;
			}
		}
		// If not in sprites, try direct
		if (sounds.current[name]) {
			sounds.current[name].play();
		}
	}, []);

	const toggleMute = useCallback(() => {
		setIsMuted((prev) => {
			const newMute = !prev;
			Howler.mute(newMute);
			localStorage.setItem("soundfx-muted", String(newMute));
			return newMute;
		});
	}, []);

	const changeVolume = useCallback((newVolume: number) => {
		setVolume(newVolume);
		Howler.volume(newVolume);
		localStorage.setItem("soundfx-volume", String(newVolume));
	}, []);

	return (
		<SoundContext.Provider
			value={{ playSoundFX, toggleMute, changeVolume, isMuted, volume }}
		>
			{children}
		</SoundContext.Provider>
	);
};

export const useSoundFX = (): SoundContextValue => {
	const ctx = useContext(SoundContext);
	if (!ctx) {
		throw new Error("useSoundFX must be used within a SoundFXProvider");
	}
	return ctx;
};
