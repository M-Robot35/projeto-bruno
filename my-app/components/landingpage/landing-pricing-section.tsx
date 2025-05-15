"use client"

import { useEffect, useRef, useState } from "react"
import { CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { AnimatedCounter } from "./contadorAnimado"

export function PricingSection() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  return (
    <section id="pricing" ref={sectionRef} className="relative w-full py-12 md:py-24 lg:py-32 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-grid opacity-30"></div>
      <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-emerald-200 opacity-20 blur-3xl"></div>
      <div className="absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-emerald-200 opacity-20 blur-3xl"></div>

      <div className="container px-4 md:px-6 relative">
        <div
          className={`flex flex-col items-center justify-center space-y-4 text-center transition-all duration-700 ${isVisible ? "opacity-100" : "opacity-0 translate-y-10"
            }`}
        >
          {/* NOVO: Destaque teste grátis */}
          <div className="inline-block rounded-lg bg-yellow-100 px-4 py-1 text-sm text-yellow-800 font-semibold animate-pulse">
            Teste grátis por 3 dias – sem cartão de crédito!
          </div>

          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-emerald-100 px-3 py-1 text-sm text-emerald-700">Preços</div>
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
              Planos que crescem com seu negócio
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Escolha o plano ideal para o tamanho da sua operação. Todos incluem suporte prioritário.
            </p>
            {/* NOVO: Prova social */}
            <p className=" text-gray-500 text-2xl">
                Já são <AnimatedCounter target={5000} /> usuários acelerando vendas com nossa plataforma!
            </p>

          </div>
        </div>

        {/* Planos */}
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 lg:grid-cols-3">
          {[
            {
              title: "Iniciante",
              subtitle: "Ideal para pequenas empresas",
              price: "R$470,00",
              features: ["1 número de WhatsApp", "Suporte com IA*", "500 Mensagens/IA/mês", "Chatbot básico"],
              cta: "Testar 3 dias grátis",
              popular: false,
              delay: 100,
            },
            {
              title: "Profissional",
              subtitle: "Para empresas em crescimento",
              price: "R$697,00",
              features: [
                "3 números de WhatsApp",
                "Suporte com IA*",
                "10.000 Mensagens/IA/mês",
                "Chatbot avançado",
                "Coleta e exportação de dados dos clientes",
                "Scripts com técnicas de vendas (PNL, gatilhos mentais)",
                "Relatórios básicos",
                "IA com treinamento personalizado",
                "Suporte via WhatsApp e e-mail",
              ],
              cta: "Testar 3 dias grátis",
              popular: true,
              delay: 200,
            },
            {
              title: "Empresarial",
              subtitle: "Para grandes operações",
              price: "R$957,00",
              features: [
                "15 números de WhatsApp",
                "Funil de vendas automático",
                "Criação de persona/vendedora",
                "Suporte ilimitado IA / Humanizado",
                "Agente de IA multilíngue",
                "Tokens ilimitados",
                "Chatbot IA avançado",
                "Fluxos ilimitados",
                "Mensagens ilimitadas ou alta franquia",
                "Integração com CRMs, ERPs e APIs",
                "Omnichannel (WhatsApp, Telegram, etc)",
                "IA treinada com dados reais",
                "Resumo automático de conversas",
                "Transferência para atendente humano",
                "Suporte dedicado com SLA",
                "Dashboard e relatórios completos",
              ],
              cta: "Solicitar teste gratuito",
              popular: false,
              delay: 300,
            },
          ].map((plan, index) => (
            <div
              key={index}
              className={`flex flex-col rounded-xl ${plan.popular
                ? "relative border-2 border-emerald-200 bg-gradient-to-b from-emerald-50 to-white p-6 shadow-xl"
                : "border p-6 hover:border-emerald-200 hover:shadow-md"
                } transition-all duration-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
              style={{ transitionDelay: `${plan.delay}ms` }}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700">
                  Mais popular
                </div>
              )}
              <div className="space-y-2">
                <h3 className="text-2xl font-bold">{plan.title}</h3>
                <p className="text-muted-foreground">{plan.subtitle}</p>
              </div>
              <div className="mt-4 flex items-baseline text-3xl font-bold">
                {plan.price}
                <span className="text-sm font-normal text-muted-foreground">/mês</span>
              </div>
              <ul className="mt-6 space-y-3">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-emerald-500" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <Link href="https://wa.me/31998237665?text=Quero%20testar%20o%20plano%20{encodeURIComponent(plan.title)}" target="_blank" rel="noopener noreferrer" passHref>
                <Button
                  className={`mt-8 group relative overflow-hidden ${plan.popular
                    ? "bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700"
                    : "bg-emerald-600 hover:bg-emerald-700"
                    } transition-all duration-300`}
                >
                  <span className="relative z-10">{plan.cta}</span>
                  <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-emerald-600 to-emerald-700 opacity-0 transition-opacity group-hover:opacity-100"></div>
                </Button>
              </Link>

              {/* Adicional opcional */}
              <span className="mt-2 text-xs text-emerald-700 text-center">Inclui 3 dias grátis!</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
