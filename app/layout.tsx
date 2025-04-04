import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NYC Congestion Zone Revenue Calculator",
  description: "Project how much money NYC's congestion pricing has raised for the MTA in real-time since January 5, 2025.",
  openGraph: {
    type: "website",
    url: "https://www.congestionrevenue.nyc/",
    title: "NYC Congestion Zone Revenue Calculator",
    description: "Project how much money NYC's congestion pricing has raised for the MTA in real-time since January 5, 2025.",
    images: [{
      url: "/og-image.jpg",
      width: 1200,
      height: 630,
      alt: "NYC Congestion Zone Revenue Calculator"
    }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@ezramechaber",
    images: "/og-image.jpg",
  },
  icons: {
    icon: [
      {
        url: '/favicon.ico',
        sizes: 'any',
      },
    ],
    apple: [
      {
        url: '/apple-icon.png',
        sizes: '180x180',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <Script
          defer
          src="https://cloud.umami.is/script.js"
          data-website-id="fef06fc3-d384-4791-ac3f-51d44204cbf4"
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}