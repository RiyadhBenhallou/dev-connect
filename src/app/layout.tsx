import Header from "@/components/header";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "@/components/ui/toaster";

// changed postgres folder permission with this command sudo chmod -R 755 /your/folder

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DevConnect",
  description: "An application to help pair programming with other devs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <NextTopLoader />
          <Header />
          <div className="container mx-auto">{children}</div>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
