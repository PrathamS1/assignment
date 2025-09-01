import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "EduConnect | School Management Mini Project",
  description:
    "A modern, responsive web app to add, discover, and manage schools. Built with Next.js, React, Tailwind CSS, Framer Motion, and MySQL.",
  keywords: [
    "Next.js",
    "React",
    "Tailwind CSS",
    "School Management",
    "Framer Motion",
    "MySQL",
    "react-hook-form",
    "Zod",
    "Education",
    "Mini Project",
  ],
  authors: [{ name: "Pratham Singh", url: "https://github.com/PrathamS1" }],
  creator: "Pratham Singh",
  openGraph: {
    title: "EduConnect | School Management Mini Project",
    description:
      "A modern, responsive web app to add, discover, and manage schools.",
    url: "https://your-deployment-url.com",
    siteName: "EduConnect",
    images: [
      {
        url: "/schoolbg.jpg",
        width: 1200,
        height: 630,
        alt: "EduConnect Hero",
      },
    ],
    locale: "en_US",
    type: "website",
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Toaster position="top-right" />
        {children}
      </body>
    </html>
  );
}