import { Inter } from "next/font/google"
import { ThemeProvider } from "../components/ui/theme-provider"
import ClientLandingPage from "../app/(pages)/landing/ClientPage"
 //import { useTheme } from "next-themes"
// import "@/app/landing-globals.css"

const inter = Inter({ subsets: ["latin"] })
// Metadados da página
export const metadata = {
  title: "ZapQI - Atendimento via WhatsApp simplificado para sua empresa",
  description:
    "Gerencie todas as suas conversas do WhatsApp em um só lugar. Aumente a satisfação dos clientes e impulsione suas vendas.",
}

export default function LandingPage() {

  return ( 
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <ClientLandingPage />
        </ThemeProvider>
      </body>
    </html>
  )
}