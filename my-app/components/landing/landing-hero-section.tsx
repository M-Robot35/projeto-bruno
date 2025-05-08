"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { ArrowRight, CheckCircle, MessageCircle, Phone, Users } from "lucide-react"
import { Button } from "@/components/ui/button"

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
              <Button
                size="lg"
                className="group relative overflow-hidden bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 transition-all duration-300"
              >
                <span className="relative z-10">Experimente grátis</span>
                <ArrowRight className="relative z-10 ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-emerald-600 to-emerald-700 opacity-0 transition-opacity group-hover:opacity-100"></div>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="group border-emerald-200 hover:bg-emerald-50 transition-all duration-300"
              >
                Agendar demonstração
              </Button>
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
          <div
            className={`flex items-center justify-center transition-all duration-700 delay-300 ${isVisible ? "opacity-100" : "opacity-0 translate-y-10"}`}
          >
            <div className="relative aspect-video overflow-hidden rounded-xl border bg-background p-2 md:p-4 lg:p-6 shadow-xl">
              <div className="absolute top-4 left-4 z-20 flex space-x-2">
                <div className="h-3 w-3 rounded-full bg-red-500"></div>
                <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                <div className="h-3 w-3 rounded-full bg-green-500"></div>
              </div>
              <Image
                src="/Up.jpg?height=1080width=1920"
                width={1920}
                height={1080}
                alt="Dashboard do Zapqi mostrando conversas de WhatsApp"
                className="rounded-lg object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-500/10 to-background/5"></div>
                <div className="relative z-10 animate-float w-full h-full flex items-center justify-center">
                  <div className="relative w-[280px] h-[500px] md:w-[320px] md:h-[580px]">
                    {/* Ícones flutuantes */}
                    <div className="absolute -right-10 -top-16 flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-lg animate-pulse-slow">
                      <MessageCircle className="h-7 w-7 text-emerald-500" />
                    </div>
                    <div
                      className="absolute -left-10 -bottom-10 flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-lg animate-pulse-slow"
                      style={{ animationDelay: "1s" }}
                    >
                      <Phone className="h-7 w-7 text-emerald-500" />
                    </div>
                    <div
                      className="absolute -left-16 -top-8 flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-lg animate-pulse-slow"
                      style={{ animationDelay: "2s" }}
                    >
                      <Users className="h-7 w-7 text-emerald-500" />
                    </div>

                    {/* Smartphone mockup */}
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
