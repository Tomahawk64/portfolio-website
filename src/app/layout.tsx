import type { Metadata } from "next";
import { Inter } from "next/font/google";
import dynamic from "next/dynamic";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

const Background3D = dynamic(() => import("@/components/Background3D"), { ssr: false });

export const metadata: Metadata = {
  title: "Prince Kushwaha | Full Stack Developer",
  description: "Portfolio of Prince Kushwaha, Full Stack Developer.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased min-h-screen flex flex-col bg-transparent relative`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Background3D />
          <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 focus:p-4 focus:bg-background focus:text-foreground focus:z-50">
            Skip to content
          </a>
          <Header />
          <main id="main-content" className="flex-grow z-10">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
