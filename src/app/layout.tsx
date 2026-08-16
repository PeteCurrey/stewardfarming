import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AuthProvider } from "@/context/AuthContext";

export const metadata: Metadata = {
  metadataBase: new URL("https://steward.co.uk"),
  title: {
    default: "Steward — AI-Powered Farming Advisor for UK Farmers",
    template: "%s | Steward UK Farming Advisory",
  },
  description:
    "A personalised, proactive AI advisor for British farmers. Covering crop planning, livestock health, SFI & Defra subsidies, financials, compliance, and instant access to accredited human vets and agronomists.",
  keywords: [
    "UK farming AI",
    "SFI subsidy advisor",
    "Defra agricultural grants",
    "farm management software UK",
    "arable agronomy AI",
    "livestock health advisor",
    "countryside stewardship",
    "farm financial planning",
    "Red Tractor audit preparation",
    "NVZ compliance planner",
  ],
  authors: [{ name: "Steward Agricultural Technologies Ltd" }],
  creator: "Steward Agricultural Technologies Ltd",
  publisher: "Steward Agricultural Technologies Ltd",
  openGraph: {
    title: "Steward — The Personalised AI Advisor for UK Farmers",
    description:
      "Grounded in traditional British agricultural expertise, empowered by proactive artificial intelligence. Covering crops, livestock, Defra schemes, and compliance.",
    url: "https://steward.co.uk",
    siteName: "Steward UK Farming Advisory",
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Steward — AI-Powered Farming Advisor for UK Farmers",
    description:
      "Grounded in traditional British agricultural expertise, empowered by proactive artificial intelligence.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-GB">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,600;0,9..144,700;1,9..144,400&family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen flex flex-col bg-parchment-100 text-charcoal-800 antialiased selection:bg-forest-200 selection:text-forest-950">
        <AuthProvider>
          <Navbar />
          {/* 
            The Navbar is fixed (z-50, h-20). 
            Pages that are NOT full-screen heroes need top padding to clear it.
            The homepage hero and dashboard shell both handle their own offset internally.
          */}
          <main id="main-content" className="flex-grow">
            {children}
          </main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
