"use client"

import { useEffect, useRef } from "react"
import { MessageSquare, Users, BarChart, Shield, Bot, Clock } from "lucide-react"

export function FeatureSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const featureRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Adicionar a classe animate-fade-in e remover opacity-0
            entry.target.classList.add("animate-fade-in")
            entry.target.classList.remove("opacity-0")
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1, rootMargin: "0px 0px -100px 0px" },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    featureRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
      featureRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref)
      })
    }
  }, [])

  return (
    <section id="features" className="relative w-full py-12 md:py-24 lg:py-32 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-dots opacity-30">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/40 via-transparent to-emerald-50/40"></div>
        <div className="absolute inset-0 animate-pulse-slow"></div>
        <div className="absolute h-full w-full overflow-hidden">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-emerald-300/10"
              style={{
                width: `${Math.random() * 300 + 100}px`,
                height: `${Math.random() * 300 + 100}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDuration: `${Math.random() * 10 + 10}s`,
                animationDelay: `${Math.random() * 5}s`,
                transform: "translate(-50%, -50%)",
              }}
            />
          ))}
        </div>
      </div>
      <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-emerald-200 opacity-20 blur-3xl"></div>
      <div className="absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-emerald-200 opacity-20 blur-3xl"></div>

      <div className="container px-4 md:px-6 relative">
        <div ref={sectionRef} className="flex flex-col items-center justify-center space-y-4 text-center opacity-0">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-emerald-100 px-3 py-1 text-sm text-emerald-700">Recursos</div>
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
              Tudo que você precisa para atender pelo WhatsApp
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Nossa plataforma oferece todas as ferramentas necessárias para transformar seu atendimento via WhatsApp
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
          {[
            {
              icon: <MessageSquare className="h-6 w-6 text-emerald-700" />,
              title: "Inbox Unificado",
              description: "Gerencie todas as conversas de WhatsApp em uma única interface intuitiva.",
            },
            {
              icon: <Users className="h-6 w-6 text-emerald-700" />,
              title: "Múltiplos Atendentes",
              description: "Não deixe seus clientes esperando, nosso sistema tem multi-atendimento.",
            },
            {
              icon: <Bot className="h-6 w-6 text-emerald-700" />,
              title: "Chatbot Inteligente",
              description:
                "Automatize suas vendas com Ia inteligente, agregando tempo e qualidade aos seus produtos.",
            },
            {
              icon: <BarChart className="h-6 w-6 text-emerald-700" />,
              title: "Poupe Tempo e Reduza Custos",
              description: "Acompanhe métricas importantes como tempo de resposta, satisfação do cliente e conversão.",
            },
            {
              icon: <Clock className="h-6 w-6 text-emerald-700" />,
              title: "Mensagens Monitoradas Por Você",
              description: "Monitore as mensagens enviadas pelo bot e assuma o controle quando quiser.",
            },
            {
              icon: <Shield className="h-6 w-6 text-emerald-700" />,
              title: "Segurança Total",
              description:
                "Criptografia de ponta a ponta e conformidade com LGPD para proteger os dados dos seus clientes.",
            },
          ].map((feature, index) => (
            <div
              key={index}
              ref={(el) => (featureRefs.current[index] = el)}
              className="group flex flex-col items-start space-y-4 rounded-xl border p-6 transition-all duration-300 hover:border-emerald-200 hover:bg-emerald-50/50 hover:shadow-md opacity-0 md:opacity-100 md:animate-fade-in"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-100 transition-all duration-300 group-hover:scale-110 group-hover:bg-emerald-200">
                {feature.icon}
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
