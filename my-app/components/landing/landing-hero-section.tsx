"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
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
    <section ref={sectionRef} className="relative w-full overflow-hidden py-12 md:py-24 lg:py-32 xl:py-48">
      {/* Background elements */}
      <div className="absolute inset-0 bg-grid opacity-30"></div>
      <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-emerald-200 opacity-20 blur-3xl"></div>
      <div className="absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-emerald-200 opacity-20 blur-3xl"></div>

      <div className="container relative px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <div
            className={`flex flex-col justify-center space-y-4 transition-all duration-700 ${isVisible ? "opacity-100" : "opacity-0 translate-y-10"}`}
          >
            <div className="space-y-2">
              <div className="inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-sm text-emerald-700 mb-4">
                <span className="relative flex h-2 w-2 mr-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
                </span>
                Novo: Personalização do Prompt de acordo com seu negócio
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


           
            <Link href="https://wa.me/31985019300?text=Quero%20experimentar%20gratis" target="_blank" rel="noopener noreferrer" passHref>
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
                <span>3 dias grátis</span>
              </div>
              <div className="flex items-center space-x-1">
                <CheckCircle className="h-4 w-4 text-emerald-500" />
                <span>Sem cartão de crédito</span>
              </div>
              <div className="flex items-center space-x-1">
                <CheckCircle className="h-4 w-4 text-emerald-500" />
                <span>Suporte 24/7 - Automatizado</span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center transition-all duration-700 delay-300 opacity-100">
            <div className="relative aspect-video overflow-hidden rounded-xl border bg-background p-2 md:p-4 lg:p-6 shadow-xl">

              {/* Indicadores de status */}
              <div className="absolute top-4 left-4 z-20 flex space-x-2">
                <div className="h-3 w-3 rounded-full bg-red-500"></div>
                <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                <div className="h-3 w-3 rounded-full bg-green-500"></div>
              </div>

              {/* Imagem otimizada com next/image */}
              <Image
                alt="Dashboard do Zapqi mostrando conversas de WhatsApp"
                src="/Up.jpg"
                width={1920}
                height={1080}
                className="object-contain"
                quality={75}
                decoding="async"
              />

              {/* Overlay gradiente */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-500/10 to-background/5"></div>
                <div className="relative z-10 animate-float w-full h-full flex items-center justify-center">
                  <div className="relative w-[280px] h-[500px] md:w-[320px] md:h-[580px]">

                    {/* Ícones flutuantes */}
                    <div className="absolute top-4 right-4 z-30 flex space-x-4">
                      {/* Ícone de mensagem */}
                      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-lg animate-pulse">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="lucide lucide-message-circle h-7 w-7 text-emerald-500"
                        >
                          <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"></path>
                        </svg>
                      </div>

                      {/* Ícone de telefone */}
                      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-lg animate-pulse" style={{ animationDelay: "1s" }}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="lucide lucide-phone h-7 w-7 text-emerald-500"
                        >
                          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                        </svg>
                      </div>

                      {/* Ícone de usuários */}
                      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-lg animate-pulse" style={{ animationDelay: "2s" }}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="lucide lucide-users h-7 w-7 text-emerald-500"
                        >
                          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                          <circle cx="9" cy="7" r="4"></circle>
                          <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                          <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                        </svg>
                      </div>
                    </div>

                    {/* Chat bubble layout */}
                    <div className="relative w-full h-full rounded-[40px] border-[8px] border-gray-800 bg-white shadow-2xl overflow-hidden">
                      <div className="absolute top-0 left-0 right-0 h-6 bg-gray-800 flex justify-center items-end pb-1">
                        <div className="w-20 h-1.5 bg-gray-600 rounded-full"></div>
                      </div>
                      <div className="absolute top-6 left-0 right-0 bottom-0 overflow-hidden">
                        <div className="w-full h-full bg-emerald-50 flex flex-col">
                          <div className="h-14 bg-emerald-500 flex items-center px-4">
                            <div className="w-8 h-8 rounded-full bg-white mr-3"></div>
                            <div className="flex flex-col">
                              <div className="h-2.5 w-24 bg-white/80 rounded-full"></div>
                              <div className="h-2 w-16 bg-white/60 rounded-full mt-1.5"></div>
                            </div>
                          </div>

                          {/* Mensagens */}
                          <div className="flex-1 p-3 flex flex-col gap-2">
                            <div className="self-start max-w-[70%] bg-white p-2 rounded-lg rounded-tl-none">
                              <div className="h-2 w-24 bg-gray-300 rounded-full"></div>
                              <div className="h-2 w-16 bg-gray-300 rounded-full mt-1"></div>
                            </div>
                            <div className="self-end max-w-[70%] bg-emerald-100 p-2 rounded-lg rounded-tr-none">
                              <div className="h-2 w-20 bg-emerald-200 rounded-full"></div>
                              <div className="h-2 w-12 bg-emerald-200 rounded-full mt-1"></div>
                            </div>
                            <div className="self-start max-w-[70%] bg-white p-2 rounded-lg rounded-tl-none mt-1">
                              <div className="h-2 w-28 bg-gray-300 rounded-full"></div>
                              <div className="h-2 w-20 bg-gray-300 rounded-full mt-1"></div>
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
  )
}
