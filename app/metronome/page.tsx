"use client";

import Metronome from "@/components/metronome/Metronome";
import React, { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const page = () => {
	const [showSongs, setShowSongs] = useState(false);

	const queryClient = new QueryClient();

	return (
		<QueryClientProvider client={queryClient}>
			<Metronome setShowSongs={setShowSongs} showSongs={showSongs} />
		</QueryClientProvider>
	);
};

export default page;
