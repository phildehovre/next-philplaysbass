import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import { AuthProvider } from "@/AuthProvider";
import Footer from "@/components/Footer";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Nav_alt from "@/components/Nav_alt";
import ActiveSectionContextProvider from "@/context/activeElementContext";
import { Toaster } from "@/components/ui/sonner";
import { UserProvider } from "@/context/userContext";

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
						<UserProvider>
							<ActiveSectionContextProvider>
								<Nav_alt />
							</ActiveSectionContextProvider>
							{children}
							<Footer />
							<Toaster theme="dark" />
						</UserProvider>
					</LanguageProvider>
				</AuthProvider>
				<script src="https://sdk.scdn.co/spotify-player.js"></script>
			</body>
		</html>
	);
}
