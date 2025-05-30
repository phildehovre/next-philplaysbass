import Footer from "@/components/Footer";
import "./lessons.css";
import Nav from "@/components/Nav";

export default function Layout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<>
			<div className="lessons_ctn">{children}</div>
			<Footer />
		</>
	);
}
