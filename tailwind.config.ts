module.exports = {
	content: [
		"./app/**/*.{js,ts,jsx,tsx}",
		"./pages/**/*.{js,ts,jsx,tsx}",
		"./components/**/*.{js,ts,jsx,tsx}",
		"./node_modules/@shadcn/ui/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			keyframes: {
				bob: {
					"0%, 100%": { transform: "translateY(0)" },
					"50%": { transform: "translateY(-8px)" }, // adjust height here
				},
			},
			animation: {
				bob: "bob 1s ease-in-out infinite",
			},
		},
	},
	plugins: [require("tailwindcss-animate")],
};
