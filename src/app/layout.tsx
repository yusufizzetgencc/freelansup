import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/header/Header";
import Footer from "@/components/layout/footer/Footer";
import LoadingScreen from "@/components/ui/LoadingScreen";
import SessionWrapper from "@/components/providers/SessionWrapper";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "freelansup | Freelancer İş Platformu",
  description:
    "Freelansup, modern ve güvenilir bir freelancer iş platformudur. Hemen yeteneklerini sergile, projeni yayınla.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isLoading = false; // replace with Zustand state or context later

  return (
    <html lang="tr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}
      >
        {isLoading && <LoadingScreen />}
        <SessionWrapper>
          <div className="min-h-screen flex flex-col justify-between text-white">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <Toaster richColors position="top-center" />
        </SessionWrapper>
      </body>
    </html>
  );
}
