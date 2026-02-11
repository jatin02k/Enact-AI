import type { Metadata } from "next";
import "./globals.css";
import { clsx } from "clsx";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "Enact AI - Stop Reading. Start Doing.",
  description: "Turn your self-help books into real-world action.",
  openGraph: {
    title: "Enact AI - Stop Reading. Start Doing.",
    description: "Turn your self-help books into real-world action.",
    url: "https://enactai.vercel.app",
    siteName: "Enact AI",
    images: [
      {
        url: "https://enactai.vercel.app/enactai.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Enact AI - Stop Reading. Start Doing.",
    description: "Turn your self-help books into real-world action.",
    images: ["https://enactai.vercel.app/enactai.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={clsx(
          "font-sans bg-warm-cream text-deep-brown antialiased"
        )}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
