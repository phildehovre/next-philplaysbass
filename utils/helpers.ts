export const fetchTempoData = async (bpm: number) => {
	const apiUrl = `https://api.getsongbpm.com/tempo/?api_key=${process.env.SONGBPM_API_KEY}&bpm=${bpm}`;

	const response = await fetch(apiUrl);
	if (!response.ok) {
		throw new Error("Network response was not ok");
	}

	const data = await response.json();

	return data.tempo;
};

function normalizeTitle(title: string) {
	return title
		.normalize("NFD") // Decompose accents
		.replace(/[\u0300-\u036f]/g, "") // Remove accents
		.toLowerCase() // Lowercase
		.replace(/[^a-z0-9]/gi, ""); // Remove non-alphanumeric characters
}

export function areTitlesSimilar(title1?: string, title2?: string) {
	if (title1 == undefined || title2 == undefined) {
		console.log("Some titles are missing, 1, 2: ", title1, title2);
	}
	if (title1 && title2) {
		return normalizeTitle(title1) === normalizeTitle(title2);
	}
	console.log("Some titles are missing, 1, 2: ", title1, title2);
}
