import type { Metadata } from "next";
import { ThemeProvider } from "@/components/ui/theme-provider"
import { Toaster } from "@/components/ui/sonner"
import { AuthProvider } from "@/components/ui/AuthProvider";
import { frontConstants } from "./core/constants/front-constants";

const {
  dataTitle,
  dataAutors,
  dataDescription,
  dataIcon,
  lenguage,
}= frontConstants.metaData

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"]
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: dataTitle,
  description: dataDescription,
  authors: dataAutors,
  icons: dataIcon
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang={lenguage}>
      <AuthProvider>
        <ThemeProvider
              attribute="class"
              defaultTheme="light"
              enableSystem
              disableTransitionOnChange
            >          
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}  >
          {children}
          <Toaster />
        </body>
        </ThemeProvider>
      </AuthProvider>
    </html>
  );
}