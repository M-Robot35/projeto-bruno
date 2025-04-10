import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      <section className="container mx-auto px-4 py-24 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div>
          <h1 className="text-5xl font-bold mb-6">
            Automação de WhatsApp para Empresas
          </h1>
          <p className="text-lg mb-6">
            Alcance mais clientes, reduza tarefas manuais e aumente sua produtividade com nossa plataforma de automação no WhatsApp ideal para empresas de todos os tamanhos.
          </p>
          <div className="flex gap-4">
            <Button className="px-6 py-3 text-lg">Comece Grátis Agora</Button>
            <Button variant="outline" className="px-6 py-3 text-lg">Agende uma Demonstração</Button>
          </div>
        </div>

        <div className="relative w-full h-80 md:h-96">
          <Image
            src="/whatsapp-automation-illustration.png"
            alt="Automação WhatsApp"
            fill
            className="object-contain"
            priority
          />
        </div>
      </section>

      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-semibold mb-6">O que nossa plataforma oferece</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-2">Chatbots Inteligentes</h3>
              <p>Atenda automaticamente seus clientes 24/7 com fluxos personalizados.</p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">Campanhas em Massa</h3>
              <p>Dispare mensagens para centenas de contatos com poucos cliques e total controle.</p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">Relatórios e Métricas</h3>
              <p>Acompanhe taxas de resposta, horários de pico e otimize sua comunicação.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-semibold mb-4">Comece a automatizar hoje mesmo</h2>
          <p className="mb-6">Teste grátis por 14 dias. Sem cartão de crédito. Ideal para vendas, suporte e marketing via WhatsApp.</p>
          <Button className="px-8 py-4 text-lg">Criar Conta Grátis</Button>
        </div>
      </section>
    </main>
  );
}
