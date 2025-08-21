import Footer from "@/components/Footer";

export default function Layout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<>
			<div className="leaderboard_ctn">{children}</div>
		</>
	);
}
