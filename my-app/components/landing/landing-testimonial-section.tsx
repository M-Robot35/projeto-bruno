"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"

export function TestimonialSection() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const testimonialRefs = useRef<(HTMLDivElement | null)[]>([])

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
    <section id="testimonials" ref={sectionRef} className="relative w-full py-12 md:py-24 lg:py-32 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-dots opacity-50"></div>
      <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-emerald-200 opacity-20 blur-3xl"></div>
      <div className="absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-emerald-200 opacity-20 blur-3xl"></div>

      <div className="container px-4 md:px-6 relative">
        <div
          className={`flex flex-col items-center justify-center space-y-4 text-center transition-all duration-700 ${
            isVisible ? "opacity-100" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-emerald-100 px-3 py-1 text-sm text-emerald-700">Depoimentos</div>
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">O que nossos clientes dizem</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Veja como o Zapqi está transformando o atendimento ao cliente de empresas como a sua.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
          {[
            {
              content:
                "Desde que implementamos o Zapqi, nosso tempo de resposta caiu pela metade e a satisfação dos clientes aumentou em 40%. Uma ferramenta essencial para nosso negócio.",
              author: "Ana Silva",
              role: "Gerente de Atendimento, Loja Virtual XYZ",
              delay: 100,
            },
            {
              content:
                "O chatbot inteligente do Zapqi qualifica nossos leads antes mesmo de chegarem aos vendedores. Isso aumentou nossa taxa de conversão em 25% no primeiro mês.",
              author: "Carlos Mendes",
              role: "Diretor Comercial, Tech Solutions",
              delay: 200,
            },
            {
              content:
                "Como pequena empresa, precisávamos de uma solução que não exigisse uma equipe grande. O Zapqi nos permitiu automatizar 70% das interações iniciais com clientes.",
              author: "Mariana Costa",
              role: "Proprietária, Boutique Elegance",
              delay: 300,
            },
          ].map((testimonial, index) => (
            <div
              key={index}
              ref={(el) => (testimonialRefs.current[index] = el)}
              className={`group flex flex-col justify-between rounded-xl border p-6 transition-all duration-500 hover:border-emerald-200 hover:bg-emerald-50/50 hover:shadow-md ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${testimonial.delay}ms` }}
            >
              <div className="space-y-4">
                <div className="flex space-x-0.5">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="h-5 w-5 fill-emerald-500 transition-transform duration-300 group-hover:scale-110"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  ))}
                </div>
                <p className="text-muted-foreground">{testimonial.content}</p>
              </div>
              <div className="mt-6 flex items-center space-x-3">
                <div className="relative h-10 w-10 overflow-hidden rounded-full bg-muted">
                  <Image
                    src="/placeholder.svg?height=40&width=40"
                    width={40}
                    height={40}
                    alt={`Avatar de ${testimonial.author}`}
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <div>
                  <p className="text-sm font-medium">{testimonial.author}</p>
                  <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
