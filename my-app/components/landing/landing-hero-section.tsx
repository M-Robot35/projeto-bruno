"use client"

import { useEffect, useRef, useState } from "react"
import { ArrowRight, CheckCircle, MessageCircle, Phone, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    setIsVisible(true)

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.1 },
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
    <>
      {/* Definição da animação float diretamente no componente */}
      <style jsx global>{`
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        @keyframes float {
          0% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
          100% {
            transform: translateY(0px);
          }
        }
      `}</style>

      <section ref={sectionRef} className="relative w-full overflow-hidden py-12 md:py-24 lg:py-32 xl:py-48">
        {/* Background elements */}
        <div className="absolute inset-0 bg-grid opacity-30"></div>
        <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-emerald-200 opacity-20 blur-3xl"></div>
        <div className="absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-emerald-200 opacity-20 blur-3xl"></div>

        <div className="container relative px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_500px] lg:gap-12 xl:grid-cols-[1fr_650px]">
            <div
              className={`flex flex-col justify-center space-y-4 transition-all duration-700 ${isVisible ? "opacity-100" : "opacity-0 translate-y-10"}`}
            >
              <div className="space-y-2">
                <div className="inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-sm text-emerald-700 mb-4">
                  <span className="relative flex h-2 w-2 mr-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
                  </span>
                  Novo: Prompts totalmente personalizados
                </div>
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  <span className="text-gradient">Atendimento via WhatsApp</span> simplificado para sua empresa
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  Gerencie todas as suas conversas do WhatsApp em um só lugar. Aumente a satisfação dos clientes e
                  impulsione suas vendas.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">

                <Link href="https://wa.me/31985019300?text=Quero%20uma%20demonstração" target="_blank" rel="noopener noreferrer" passHref>
                  <Button
                    size="lg"
                    className="group relative overflow-hidden bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 transition-all duration-300"
                  >
                    <span className="relative z-10">Experimente grátis</span>
                    <ArrowRight className="relative z-10 ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-emerald-600 to-emerald-700 opacity-0 transition-opacity group-hover:opacity-100"></div>
                  </Button>
                </Link>
                <Link href="https://wa.me/31985019300?text=Quero%20agendar%20uma%20demonstração" target="_blank" rel="noopener noreferrer" passHref>
                <Button
                  size="lg"
                  variant="outline"
                  className="group border-emerald-200 hover:bg-emerald-50 transition-all duration-300"
                >
                  Agendar demonstração
                </Button>
                </Link>
              </div>
              <div className="flex flex-wrap items-center gap-4 text-sm">
                <div className="flex items-center space-x-1">
                  <CheckCircle className="h-4 w-4 text-emerald-500" />
                  <span>14 dias grátis</span>
                </div>
                <div className="flex items-center space-x-1">
                  <CheckCircle className="h-4 w-4 text-emerald-500" />
                  <span>Sem cartão de crédito</span>
                </div>
                <div className="flex items-center space-x-1">
                  <CheckCircle className="h-4 w-4 text-emerald-500" />
                  <span>Suporte 24/7</span>
                </div>
              </div>
            </div>
            <div
              className={`flex items-center justify-center transition-all duration-700 delay-300 ${isVisible ? "opacity-100" : "opacity-0 translate-y-10"}`}
            >
              <div className="relative w-full h-[400px] md:h-[450px] lg:h-[500px] xl:h-[550px] overflow-hidden rounded-xl border bg-background p-1 md:p-2 lg:p-3 shadow-xl">
                {/* Botões de janela */}
                <div className="absolute top-4 left-4 z-20 flex space-x-2">
                  <div className="h-3 w-3 rounded-full bg-red-500"></div>
                  <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                  <div className="h-3 w-3 rounded-full bg-green-500"></div>
                </div>

                {/* Fundo da tela */}
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 to-white"></div>

                {/* Conteúdo principal */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative z-10 w-full h-full flex items-center justify-center">
                    {/* Smartphone mockup - Aqui está a animação float */}
                    <div className="relative w-[180px] h-[350px] md:w-[200px] md:h-[380px] lg:w-[220px] lg:h-[400px] animate-float">
                      {/* Ícones flutuantes */}
                      <div className="absolute -right-6 -top-10 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-lg animate-pulse-slow">
                        <MessageCircle className="h-5 w-5 text-emerald-500" />
                      </div>
                      <div
                        className="absolute -left-6 -bottom-6 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-lg animate-pulse-slow"
                        style={{ animationDelay: "1s" }}
                      >
                        <Phone className="h-5 w-5 text-emerald-500" />
                      </div>
                      <div
                        className="absolute -left-10 -top-5 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-lg animate-pulse-slow"
                        style={{ animationDelay: "2s" }}
                      >
                        <Users className="h-5 w-5 text-emerald-500" />
                      </div>

                      {/* Smartphone frame */}
                      <div className="relative w-full h-full rounded-[24px] border-[5px] border-gray-800 bg-white shadow-2xl overflow-hidden">
                        {/* Notch do smartphone */}
                        <div className="absolute top-0 left-0 right-0 h-4 bg-gray-800 flex justify-center items-end pb-1">
                          <div className="w-12 h-0.5 bg-gray-600 rounded-full"></div>
                        </div>

                        {/* Conteúdo da tela */}
                        <div className="absolute top-4 left-0 right-0 bottom-0 overflow-hidden">
                          <div className="w-full h-full bg-emerald-50 flex flex-col">
                            {/* Cabeçalho do WhatsApp */}
                            <div className="h-8 bg-emerald-500 flex items-center px-2">
                              <div className="w-4 h-4 rounded-full bg-white mr-1.5"></div>
                              <div className="flex flex-col">
                                <div className="h-1 w-12 bg-white/80 rounded-full"></div>
                                <div className="h-0.5 w-8 bg-white/60 rounded-full mt-0.5"></div>
                              </div>
                            </div>

                            {/* Mensagens simplificadas */}
                            <div className="flex-1 p-1.5 flex flex-col gap-1.5 overflow-hidden">
                              {/* Mensagem recebida */}
                              <div className="self-start max-w-[70%] bg-white p-1.5 rounded-md rounded-tl-none shadow-sm">
                                <p className="text-[8px] font-medium text-gray-800">Olá! </p><p className="text-[8px] font-medium text-gray-800"> Como posso ajudá-lo(a) hoje?</p>
                              </div>

                              {/* Mensagem enviada */}
                              <div className="self-end max-w-[70%] bg-emerald-100 p-1.5 rounded-md rounded-tr-none mt-1">
                                <p className="text-[8px] font-medium text-emerald-800">
                                  Quero realizar um pedido
                                </p>
                              </div>

                              {/* Campo de digitação simplificado */}
                              <div className="mt-auto flex items-center bg-white rounded-full p-1 border border-gray-200 mx-1">
                                <div className="h-1 w-full bg-gray-200 rounded-full mx-auto"></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
