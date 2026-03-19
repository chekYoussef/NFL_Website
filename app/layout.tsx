import type { Metadata } from "next";
import { Oswald, Open_Sans } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const oswald = Oswald({
  subsets: ["latin"],
  variable: "--font-oswald",
  weight: ["400", "500", "600", "700"],
});

const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-open-sans",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Why Wouldn't We? | NFL Youth Initiative",
  description:
    "To unite everyday players, share the NFL's success with its community, and uplift the next generation players.",
  generator: "v0.app",
  icons: {
    icon: [
      { url: "nfl-logo.webp", media: "(prefers-color-scheme: light)" },
      { url: "nfl-logo.webp", media: "(prefers-color-scheme: dark)" },
      { url: "nfl-logo.webp", type: "image/svg+xml" },
    ],
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning
        className={`${oswald.variable} ${openSans.variable} font-sans antialiased`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
