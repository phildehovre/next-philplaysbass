export const handleDecode = (encodedText: string) => {
	const parser = new DOMParser();
	const decoded =
		parser.parseFromString(encodedText, "text/html").body.textContent || "";
	return decoded;
};
