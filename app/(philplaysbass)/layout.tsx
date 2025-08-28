import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import { AuthProvider } from "@/AuthProvider";
import Footer from "@/components/Footer";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Nav from "@/components/Nav";
import ActiveSectionContextProvider from "@/context/activeElementContext";
import { Toaster } from "@/components/ui/sonner";
import { UserProvider } from "@/context/userContext";
import { ThemeProvider } from "next-themes";
import { TooltipProvider } from "@/components/ui/tooltip";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "PhilPlaysBass | learn to learn ",
	description: "Copyright Phil De Hovre 2025",
	icons: {
		icon: "/ppb_icon.png",
	},
};

export default async function WebsiteLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const { isAuthenticated } = getKindeServerSession();
	const isLoggedIn = await isAuthenticated();

	return (
		<html lang="en" suppressHydrationWarning>
			<head>
				<link rel="icon" href="/logo_unified.png" type="image/png" />
			</head>
			<body className={`${geistSans.variable} ${geistMono.variable}`}>
				<AuthProvider>
					<ThemeProvider
						attribute="class"
						defaultTheme="dark"
						enableSystem
						disableTransitionOnChange
					>
						<TooltipProvider>
							<LanguageProvider>
								<UserProvider>
									<ActiveSectionContextProvider>
										<Nav />
									</ActiveSectionContextProvider>
									{children}
									<Footer />
									<Toaster />
								</UserProvider>
							</LanguageProvider>
						</TooltipProvider>
					</ThemeProvider>
				</AuthProvider>
				<script src="https://sdk.scdn.co/spotify-player.js"></script>
			</body>
		</html>
	);
}
