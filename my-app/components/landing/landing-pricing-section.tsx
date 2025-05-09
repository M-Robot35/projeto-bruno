"use client"

import { useEffect, useRef, useState } from "react"
import { CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"
import Link from "next/link"

export function PricingSection() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const planRefs = useRef<(HTMLDivElement | null)[]>([])
  const { theme } = useTheme()

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
    <section id="pricing" ref={sectionRef} className="relative w-full py-12 md:py-24 lg:py-32 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-grid dark:bg-grid-dark opacity-30"></div>
      <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-emerald-200 dark:bg-emerald-900 opacity-20 blur-3xl"></div>
      <div className="absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-emerald-200 dark:bg-emerald-900 opacity-20 blur-3xl"></div>

      <div className="container px-4 md:px-6 relative">
        <div
          className={`flex flex-col items-center justify-center space-y-4 text-center transition-all duration-700 ${isVisible ? "opacity-100" : "opacity-0 translate-y-10"
            }`}
        >
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-emerald-100 dark:bg-emerald-900/50 px-3 py-1 text-sm text-emerald-700 dark:text-emerald-300">
              Preços
            </div>
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
              Planos que crescem com seu negócio
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Escolha o plano ideal para o tamanho da sua operação. Todos incluem suporte prioritário.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 lg:grid-cols-3">
          {[
            {
              title: "Iniciante",
              subtitle: "Ideal para pequenas empresas",
              price: "R$350,00",
              features: ["1 número de WhatsApp/Instância", "Suporte com IA*", "500 Tokens/Ia/mês", "Chatbot básico"],
              cta: "Começar agora",
              popular: false,
              delay: 100,
            },
            {
              title: "Profissional",
              subtitle: "Para empresas em crescimento",
              price: "R$500,00",
              features: [
                "3 números de WhatsApp/Instâncias",
                "Suporte com IA*",
                "2.000 Tokens/IA/mês",
                "Chatbot avançado"
              ],
              cta: "Começar agora",
              popular: true,
              delay: 200,
            },
            {
              title: "Empresarial",
              subtitle: "Para grandes operações",
              price: "R$750,00",
              features: [
                "10 números de WhatsApp/Instâncias",
                "Suporte ilimitado IA* / Humanizado*",
                "Tokens ilimitados",
                "Chatbot com IA avançada"
              ],
              cta: "Falar com vendas",
              popular: false,
              delay: 300,
            },
          ].map((plan, index) => (
            <div
              key={index}
              // ref={(el) => (planRefs.current[index] = el)}
              className={`flex flex-col rounded-xl ${plan.popular
                  ? "relative border-2 border-emerald-200 dark:border-emerald-700 bg-gradient-to-b from-emerald-50 to-white dark:from-emerald-900/20 dark:to-background p-6 shadow-xl"
                  : "border dark:border-border p-6 hover:border-emerald-200 dark:hover:border-emerald-700 hover:shadow-md"
                } transition-all duration-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
              style={{ transitionDelay: `${plan.delay}ms` }}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-emerald-100 dark:bg-emerald-800 px-3 py-1 text-xs font-medium text-emerald-700 dark:text-emerald-300">
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
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-emerald-500 dark:text-emerald-400" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Link href="https://wa.me/31985019300?text=Quero%adquirir%20um%plano" target="_blank" rel="noopener noreferrer" passHref>
                <Button
                  className={`mt-8 group relative overflow-hidden ${plan.popular
                      ? "bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 dark:from-emerald-600 dark:to-emerald-700 dark:hover:from-emerald-500 dark:hover:to-emerald-600"
                      : "bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-700 dark:hover:bg-emerald-600"
                    } transition-all duration-300`}
                >
                  <span className="relative z-10">{plan.cta}</span>
                  <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-emerald-600 to-emerald-700 dark:from-emerald-500 dark:to-emerald-600 opacity-0 transition-opacity group-hover:opacity-100"></div>
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
