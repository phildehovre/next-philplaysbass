import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import { AuthProvider } from "@/AuthProvider";
import Footer from "@/components/Footer";
import Nav from "@/components/Nav";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Bass lessons | PhilPlaysBass ",
	description: "Copyright Phil De Hovre 2025",
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const { isAuthenticated } = getKindeServerSession();
	const isLoggedIn = await isAuthenticated();

	return (
		<html lang="en">
			<body className={`${geistSans.variable} ${geistMono.variable}`}>
				<AuthProvider>
					<LanguageProvider>
						<Nav isLoggedIn={isLoggedIn} />
						{children}
						<Footer />
					</LanguageProvider>
				</AuthProvider>
			</body>
		</html>
	);
}
