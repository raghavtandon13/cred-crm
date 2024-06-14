import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { connectToMongoDB } from "@/lib/db";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CM Database",
  description: "ALT DB FRONT CREDMANTRA",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    connectToMongoDB()
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
