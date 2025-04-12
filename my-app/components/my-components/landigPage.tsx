"use client";

import Link from "next/link"; 
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
          <Link href="/auth/register" passHref>
            <Button className="px-6 py-3 text-lg bg-blue-600 text-white hover:bg-blue-700">
            Comece Grátis Agora
            </Button>
          </Link> 
            <Link href="https://wa.me/31985019300?text=Quero%20agendar%20uma%20demonstração" target="_blank" rel="noopener noreferrer" passHref>
            <Button className="px-6 py-3 text-lg bg-blue-600 text-white hover:bg-blue-700">
              Agende uma Demonstração
            </Button>
          </Link>
          </div>
        </div>
        
        <div className="relative w-full h-80 md:h-96">
          <Image
            src="/Up.jpg"
            alt="Automação WhatsApp"
            fill
            className="object-contain"
            priority
          />
        </div>
      </section>

      <section className="bg-gray-50 py-16">
  <div className="container mx-auto px-4 text-center">
    <h2 className="text-3xl font-semibold mb-12">
      O que nossa plataforma oferece
    </h2>
    <div className="grid md:grid-cols-3 gap-8">
      <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition duration-300">
        <div className="text-4xl mb-4">🤖</div>
        <h3 className="text-xl font-bold mb-2">Chatbots Inteligentes</h3>
        <p className="text-gray-600">
          Atenda automaticamente seus clientes 24/7 com fluxos personalizados.
        </p>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition duration-300">
        <div className="text-4xl mb-4">😎</div>
        <h3 className="text-xl font-bold mb-2">Orçamentos automatizados</h3>
        <p className="text-gray-600">
          Não fique preso com um único atendimento.
        </p>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition duration-300">
        <div className="text-4xl mb-4">📊</div>
        <h3 className="text-xl font-bold mb-2">Relatórios e Métricas</h3>
        <p className="text-gray-600">
          Acompanhe taxas de resposta, horários de pico e otimize sua comunicação.
        </p>
      </div>
    </div>
  </div>
</section>
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-semibold mb-4">Comece a automatizar hoje mesmo</h2>
          <p className="mb-6">Teste grátis por 3 dias. Sem cartão de crédito. Ideal para orçamentos, suporte, gestão de tempo e marketing via WhatsApp.</p>
          <Link href="/auth/register" passHref>
          <Button className="px-6 py-3 text-lg bg-blue-600 text-white hover:bg-blue-700">
            Criar Conta Grátis            
          </Button>
          </Link>
        </div>
      </section>
    </main>
  );
}
