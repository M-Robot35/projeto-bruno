"use client"

import { useEffect, useRef, useState } from "react"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function CtaSection() {
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
    <section ref={sectionRef} className="relative w-full py-12 md:py-24 lg:py-32 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-white to-emerald-50"></div>
      <div className="absolute inset-0 bg-grid opacity-30"></div>
      <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-emerald-200 opacity-20 blur-3xl"></div>
      <div className="absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-emerald-200 opacity-20 blur-3xl"></div>

      <div className="container relative px-4 md:px-6">
        <div
          className={`flex flex-col items-center justify-center space-y-4 text-center transition-all duration-700 ${isVisible ? "opacity-100" : "opacity-0 translate-y-10"
            }`}
        >
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
              Pronto para transformar seu atendimento via WhatsApp?
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Comece hoje mesmo e veja a diferença que o ZapQI pode fazer para seu negócio.
            </p>
          </div>
          <div className="flex flex-col gap-2 min-[400px]:flex-row">

            <Link href="https://wa.me/31985019300?text=Quero%20experimentar%20por%203%20dias" target="_blank" rel="noopener noreferrer" passHref>
              <Button
                size="lg"
                className="group relative overflow-hidden bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 transition-all duration-300"
              >
                <span className="relative z-10">Experimente grátis por 3 dias</span>
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
        <p className="text-xs text-muted-foreground">
          Não é necessário cartão de crédito. Cancele a qualquer momento.
        </p>
      </div>
    </div>
    </section >
  )
}
