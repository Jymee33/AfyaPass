import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], display: "swap", variable: "--font-sans" });

export const metadata: Metadata = {
  title: "AfyaPass - Digital Portable Health Record Platform",
  description: "Your Health. Wherever You Go. Digital portable health-record platform connecting patients across healthcare facilities in Murang'a County, Kenya.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${inter.variable} min-h-screen antialiased`}>
        {children}
      </body>
    </html>
  );
}
