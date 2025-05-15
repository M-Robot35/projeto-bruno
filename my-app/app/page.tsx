import Image from "next/image";
import { ModeToggle } from "@/components/ui/toggle-dark-mode";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/ui/theme-provider";
import ClientLandingPage from "@/components/landingpage/ClientPage";


const inter = Inter({ subsets: ["latin"] })

// Metadados da página
export const metadata = {
  title: "ZapQi - Atendimento via WhatsApp simplificado para sua empresa",
  description:
    "Gerencie todas as suas conversas do WhatsApp em um só lugar. Aumente a satisfação dos clientes e impulsione suas vendas.",
}

export default function Home() {
  return (
    <html lang="pt-BR" suppressHydrationWarning className="flex " >
      <head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </head>
      <body className={inter.className}>
          <ClientLandingPage />
      </body>
    </html>
  );
}
