"use client";
import React, { useState, useEffect, useCallback } from "react";
//@ts-ignore

import "./metronome.scss";
import Dropdown from "./Dropdown";
import SongList from "./SongList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import Logo from "./Logo";
import { LoginWithSpotifyButton } from "./LoginWithSpotifyButton";
import { SongListProvider } from "@/context/songListContext";
import useCookies from "@/hooks/useCookies";
import Modal from "../Modal";
import SongSearch from "./SongSearch";
import {
	MAX_TEMPO_AS_NUM,
	MAX_TEMPO_AS_STR,
	MIN_TEMPO_AS_STR,
} from "../../constants/GameConstants";

type SoundObject = {
	woodblock: HTMLAudioElement | undefined;
	cowbell: HTMLAudioElement | undefined;
	sidestick: HTMLAudioElement | undefined;
};

const Metronome = ({ playlists }: { playlists: any }) => {
	const [showSongs, setShowSongs] = useState(false);
	const [play, setPlay] = useState(false);
	const [bpm, setBpm] = useState(MAX_TEMPO_AS_NUM / 2);
	const [tempoInterval, setTempoInterval] = useState<number>(0);
	const [tapped, setTapped] = useState<number>();
	const [soundEffect, setSoundEffect] = useState("sidestick");
	const [debouncedBpm, setDebouncedBpm] = useState(bpm);
	const [dropdownOpen, setDropdownOpen] = useState(false);
	const [showRetrySpotifyLogin, setShowRetrySpotifyLogin] = useState(false);
	// const [searchTerm, setSearchTerm] = useState('Search')
	const [listSize, setListSize] = useState(12);
	const [pulse, setPulse] = useState(false);
	const [sounds, setSounds] = useState<SoundObject>({
		woodblock: undefined,
		cowbell: undefined,
		sidestick: undefined,
	});
	const { getCookie } = useCookies();

	useEffect(() => {
		const woodblock = new Audio("sounds/Woodblock.mp3");
		const cowbell = new Audio("sounds/Cowbell.mp3");
		const sidestick = new Audio("sounds/Click.wav");
		setSounds({ woodblock, cowbell, sidestick });
	}, []);

	useEffect(() => {
		const token = getCookie("token");
		if (!token) {
			setShowRetrySpotifyLogin(true);
		}
	}, []);

	// ========================== Tap Tempo Logic:

	const tapTempo = () => {
		if (tapped) {
			let elapsed = new Date().getTime() - tapped;
			if (elapsed < 2500) {
				const tappedBpm = Math.round((6000 / elapsed) * 10);
				setBpm(tappedBpm);
			} else {
				setTapped(new Date().getTime());
			}
		}
		setTapped(new Date().getTime());
	};

	const playSound = useCallback(() => {
		if (soundEffect === "cowbell") {
			sounds?.cowbell?.play();
		} else if (sounds && soundEffect === "woodblock") {
			sounds?.woodblock?.play();
		} else {
			sounds?.sidestick?.play();
		}
	}, [soundEffect, sounds]);

	// Sound and Visual:

	const trigger = useCallback(() => {
		if (play) {
			playSound();
		} else {
			return;
		}
	}, [play, playSound]);

	const startClick = () => {
		setPlay(!play);
	};

	// Tempo setter:
	useEffect(() => {
		if (play) {
			const intervalId = setInterval(() => {
				trigger();
				setPulse(true);
				setTimeout(() => {
					setPulse(false);
				}, tempoInterval - tempoInterval * 0.1);
			}, tempoInterval);
			return () => {
				clearInterval(intervalId);
			};
		}
	}, [play, tempoInterval, soundEffect, trigger]);

	useEffect(() => {
		setTempoInterval((60 / bpm) * 1000);
		if (bpm <= 40) {
			setBpm(40);
		}
		if (bpm >= 220) {
			setBpm(220);
		}
		const intervalId = setTimeout(() => {
			setDebouncedBpm(bpm);
		}, 500);
		return () => {
			clearTimeout(intervalId);
		};
	}, [bpm]);

	const handleDisplaySongsList = () => {
		setShowSongs(!showSongs);
	};

	const increment = () => {
		setBpm(Number(bpm) + 1);
	};
	const decrement = () => {
		setBpm(Number(bpm) - 1);
	};

	const queryClient = new QueryClient();
	return (
		<QueryClientProvider client={queryClient}>
			<div className="metronome-ctn">
				<div className={`metronome ${pulse ? "pulse" : ""}`}>
					<div className="header">
						<Logo size={60} />
					</div>
					<div className="metro-display">
						<div className="metro-btn decrement" onClick={decrement}>
							-
						</div>
						<div className="metro-display bpm">{bpm}</div>
						<div className="metro-btn increment" onClick={increment}>
							+
						</div>
					</div>
					<input
						type="range"
						min={MIN_TEMPO_AS_STR}
						max={MAX_TEMPO_AS_STR}
						value={bpm}
						onChange={(e) => setBpm(Number(e.target.value))}
					/>
					<div className="metro-controls">
						<div
							onClick={startClick}
							className={`metro-btn ${play ? `pause` : `play`} noSelect`}
							id="metro-there"
							style={{ animationDuration: `${tempoInterval}ms` }}
						></div>
						<div
							className="metro-btn-generate"
							onClick={() => handleDisplaySongsList()}
						>
							<FontAwesomeIcon icon={faBars} size="2x" />
						</div>

						<div onClick={tapTempo} className="metro-btn-tap">
							<div className="outer">
								<div className="inner"></div>
							</div>
						</div>
						<div
							className="metro-dropdown-header"
							onClick={() => setDropdownOpen(!dropdownOpen)}
						>
							<ChevronDown />
							{soundEffect}
							<Dropdown
								open={dropdownOpen}
								soundEffect={soundEffect}
								setSoundEffect={setSoundEffect}
								dropdownOpen={dropdownOpen}
								setDropdownOpen={setDropdownOpen}
							/>
						</div>
					</div>
					<LoginWithSpotifyButton />

					<h6 style={{ color: "var(--secondary)" }}>
						Powered by{" "}
						<Link href="https://www.getsongbpm.com">getsongbpm.com</Link>
					</h6>
					<SongListProvider>
						<SongSearch />
						<SongList
							bpm={debouncedBpm}
							showSongs={showSongs}
							listSize={listSize}
							setListSize={setListSize}
							playlists={playlists}
						/>
					</SongListProvider>
				</div>
			</div>
			{showRetrySpotifyLogin && (
				<Modal excludeRefs={[]} onClose={() => setShowRetrySpotifyLogin(false)}>
					<h1>Spotify login expired</h1>
					<p>You must login again to continue using the app!</p>
					<LoginWithSpotifyButton />
				</Modal>
			)}
		</QueryClientProvider>
	);
};

export default Metronome;
