"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { MessageSquare, Facebook, Instagram, Linkedin, Twitter } from "lucide-react"

export function Footer() {
  const [isVisible, setIsVisible] = useState(false)
  const footerRef = useRef<HTMLElement>(null)

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

    if (footerRef.current) {
      observer.observe(footerRef.current)
    }

    return () => {
      if (footerRef.current) {
        observer.unobserve(footerRef.current)
      }
    }
  }, [])

  return (
    <footer ref={footerRef} className="relative w-full border-t bg-background overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-grid opacity-30"></div>

      <div
        className={`container flex flex-col items-center justify-center gap-4 py-10 md:h-24 md:flex-row md:py-0 transition-all duration-700 ${
          isVisible ? "opacity-100" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 shadow-md transition-transform duration-300 group-hover:scale-110">
              <MessageSquare className="h-4 w-4 text-white" />
            </div>
            <span className="inline-block font-bold">Zapqi</span>
          </Link>
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            &copy; {new Date().getFullYear()} Zapqi. Todos os direitos reservados.
          </p>
        </div>
        <div className="flex gap-4">
          {[
            { icon: <Facebook className="h-5 w-5" />, name: "Facebook" },
            { icon: <Instagram className="h-5 w-5" />, name: "Instagram" },
            { icon: <Twitter className="h-5 w-5" />, name: "Twitter" },
            { icon: <Linkedin className="h-5 w-5" />, name: "LinkedIn" },
          ].map((social, index) => (
            <Link
              key={index}
              href="#"
              className="text-muted-foreground transition-colors duration-300 hover:text-foreground hover:scale-110"
            >
              {social.icon}
              <span className="sr-only">{social.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </footer>
  )
}
