import type { Metadata } from "next";
import { Geist, Geist_Mono, Roboto, Montserrat, Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import { CookieHub } from "@/components/CookieHub";
import PopUp from "@/components/shared/PopUp";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Font configurations
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-sans",
  display: "swap",
});

const montserratHeading = Montserrat({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-heading",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Albion Game",
    template: "Albion Game - %s",
  },
  description: "The All-in-One Gaming Platform for Albion Online players. Marketplace prices, crafting calculators, PvP/PvE builds, guild management, interactive maps, and community tools.",
  keywords: ["Albion Online", "Albion Game", "The All-in-One Gaming Platform", "Gaming Platform", "Marketplace", "Calculators", "Builds", "Guild Management", "MMORPG", "Guild Tools"],
  authors: [{ name: "M.I. Rohan", url: "https://meetrohan.netlify.app/" }],
  creator: "Mahedul Islam Rohan",
  publisher: "Techtwen LLC",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://albiongame.netlify.app"),
  verification: {
    google: 'T6d9N8VnKTSWRrNwabEeMxtTMlp383yGz9V8MB7iH1E',
  },
  openGraph: {
    title: "Albion Game - The All-in-One Gaming Platform",
    description: "The All-in-One Gaming Platform for Albion Online players. Marketplace prices, crafting calculators, PvP/PvE builds, guild management, interactive maps, and community tools.",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://albiongame.netlify.app",
    siteName: "Albion Game - The All-in-One Gaming Platform",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Albion Game - The All-in-One Gaming Platform",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Albion Game - The All-in-One Gaming Platform",
    description: "The All-in-One Gaming Platform for Albion Online players. Marketplace prices, crafting calculators, PvP/PvE builds, guild management, interactive maps, and community tools.",
    images: ["/twitter-image.png"],
    creator: "@albiongame",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png" }],
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "h-full scroll-smooth",
        geistSans.variable,
        geistMono.variable,
        roboto.variable,
        montserratHeading.variable,
        inter.variable
      )}
    >
      <body className="min-h-full bg-background font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
          storageKey="albion-theme"
        >
          <TooltipProvider delayDuration={0}>
            <GoogleAnalytics />
            {/* <CookieHub /> */}
            <PopUp />

            {children}
            <ToastContainer />
          
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}