export const fetchTempoData = async (bpm: number) => {
	const apiUrl = `https://api.getsongbpm.com/tempo/?api_key=${process.env.SONGBPM_API_KEY}&bpm=${bpm}`;

	const response = await fetch(apiUrl);
	if (!response.ok) {
		throw new Error("Network response was not ok");
	}

	const data = await response.json();

	return data.tempo;
};
