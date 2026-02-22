import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Sony WH-1000XM6 - Silence, perfected",
  description: "Experience the flagship wireless noise-cancelling headphones.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased bg-[#050505] text-white selection:bg-[#0050FF] selection:text-white`}>
        {children}
      </body>
    </html>
  );
}
