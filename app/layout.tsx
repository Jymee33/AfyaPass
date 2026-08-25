import type { Metadata } from "next";
import "./globals.css";

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
      <body className="min-h-screen antialiased">
        {children}
      </body>
    </html>
  );
}
