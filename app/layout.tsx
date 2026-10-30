import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { Footer } from "@/components/footer";
import { Header, MobileTabBar } from "@/components/layout";
import { TradingViewTicker } from "@/components/tradingview-chart";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains" });

export const metadata: Metadata = {
  title: { default: "Aurum Markets — Gold, Forex & Crypto Analysis", template: "%s · Aurum Markets" },
  description: "Institutional-grade research on gold, Bitcoin and major currency pairs.",
};

export const viewport: Viewport = { themeColor: "#0B1220" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${mono.variable}`}>
      <body>
        <TradingViewTicker />
        <Header />
        <main>{children}</main>
        <Footer />
        <MobileTabBar />
      </body>
    </html>
  );
}
