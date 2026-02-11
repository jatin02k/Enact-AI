import type { Metadata } from "next";
import "./globals.css";
import { clsx } from "clsx";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "Enact AI - Transform Your Self-Help Books Into Daily Actions",
  description: "Turn any self-help book into real-world practice. Snap a page, get an actionable task, complete it, upload proof, and gain XP. Build momentum daily.",
  openGraph: {
    title: "Enact AI - Transform Your Self-Help Books Into Daily Actions",
    description: "Turn any self-help book into real-world practice. Snap a page, get an actionable task, complete it, upload proof, and gain XP. Build momentum daily.",
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
    title: "Enact AI - Transform Your Self-Help Books Into Daily Actions",
    description: "Turn any self-help book into real-world practice. Snap a page, get an actionable task, complete it, upload proof, and gain XP. Build momentum daily.",
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
