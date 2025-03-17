import type { Metadata } from "next";
import { Inter, Libre_Baskerville } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const libreBaskerville = Libre_Baskerville({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  variable: "--font-libre-baskerville",
});

const switzer = localFont({
  src: '../fonts/Switzer/Switzer-Regular.otf',
  variable: '--font-switzer'
});

export const metadata: Metadata = {
  title: "Get You There",
  description: "Your immigration journey starts here.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${libreBaskerville.variable} ${switzer.variable}`}>
      <body className={`${inter.className} ${libreBaskerville.className} ${switzer.className}`}>
        {children}
      </body>
    </html>
  );
}
