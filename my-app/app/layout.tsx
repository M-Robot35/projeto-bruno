import type { Metadata } from "next";
import { ThemeProvider } from "@/components/ui/theme-provider"
import { Toaster } from "@/components/ui/sonner"
import { AuthProvider } from "@/components/ui/AuthProvider";

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
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt">
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
