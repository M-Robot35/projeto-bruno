import type { Metadata } from "next"
import { ThemeProvider } from "@/components/ui/theme-provider"
import { Toaster } from "@/components/ui/sonner"
import { AuthProvider } from "@/components/ui/AuthProvider"
import { frontConstants } from "./core/constants/front-constants"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"

const {
  dataTitle,
  dataAutors,
  dataDescription,
  dataIcon,
  lenguage,
} = frontConstants.metaData

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: dataTitle,
  description: dataDescription,
  authors: dataAutors,
  icons: dataIcon,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang={lenguage} className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <body>
        <AuthProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <Toaster />
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
