import { Inter } from "next/font/google"
import { ThemeProvider } from "../components/ui/theme-provider"
import ClientLandingPage from "../app/(pages)/landing/ClientPage"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "ZapQI - Atendimento via WhatsApp simplificado para sua empresa",
  description:
    "Gerencie todas as suas conversas do WhatsApp em um só lugar. Aumente a satisfação dos clientes e impulsione suas vendas.",
}

export default function LandingPage() {
  return (
    <div className={inter.className}>
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
        <ClientLandingPage />
      </ThemeProvider>
    </div>
  )
}
