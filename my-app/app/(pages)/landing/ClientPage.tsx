"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Inter } from "next/font/google"
import { ArrowRight, MessageSquare, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { HeroSection } from "@/components/landing/landing-hero-section"
import { FeatureSection } from "@/components/landing/landing-feature-section"
import { PricingSection } from "@/components/landing/landing-pricing-section"
import { TestimonialSection } from "@/components/landing/landing-testimonial-section"
import { CtaSection } from "@/components/landing/landing-cta-section"
import { Footer } from "@/components/landing/landing-footer"
import { Sun, Moon } from "lucide-react"
import { useTheme } from "next-themes"

const inter = Inter({ subsets: ["latin"] })

export default function ClientLandingPage() {
  const { resolvedTheme, setTheme } = useTheme()
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Adicionar função para rolagem suave
  const scrollToSection = (sectionId: string) => {
    setMobileMenuOpen(false)
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <main className="flex min-h-screen flex-col">
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${isScrolled ? "border-b bg-background/80 backdrop-blur-md" : "bg-transparent"
          }`}
      >
        <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
          <div className="flex gap-6 md:gap-10">
            <Link href="/" className="flex items-center space-x-2">
              <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 shadow-md">
                <MessageSquare className="h-4 w-4 text-white" />
              </div>
              <span className="inline-block font-bold">ZapQI</span>
            </Link>
            <nav className="hidden gap-6 md:flex">
              <button
                onClick={() => scrollToSection("features")}
                className="flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-foreground cursor-pointer"
              >
                Recursos
              </button>
              <button
                onClick={() => scrollToSection("pricing")}
                className="flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-foreground cursor-pointer"
              >
                Preços
              </button>
              <button
                onClick={() => scrollToSection("testimonials")}
                className="flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-foreground cursor-pointer"
              >
                Depoimentos
              </button>
            </nav>
          </div>
          <div className="flex flex-1 items-center justify-end space-x-4">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
              aria-label="Alternar tema"
            >
              {resolvedTheme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            <nav className="hidden items-center space-x-2 md:flex">
              <Link href=" auth/login" passHref>
                <Button variant="ghost" size="sm">
                  Entrar
                </Button>
              </Link>

              <Link href="/auth/register" passHref>
                <Button
                  size="sm"
                  className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 transition-all duration-300"
                >
                  Começar agora
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </nav>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
        {mobileMenuOpen && (
          <div className="container pb-4 md:hidden animate-fade-in">
            <nav className="flex flex-col space-y-3">
              <button
                onClick={() => scrollToSection("features")}
                className="rounded-md px-3 py-2 text-sm font-medium hover:bg-muted text-left"
              >
                Recursos
              </button>
              <button
                onClick={() => scrollToSection("pricing")}
                className="rounded-md px-3 py-2 text-sm font-medium hover:bg-muted text-left"
              >
                Preços
              </button>
              <button
                onClick={() => scrollToSection("testimonials")}
                className="rounded-md px-3 py-2 text-sm font-medium hover:bg-muted text-left"
              >
                Depoimentos
              </button>
              <div className="flex flex-col space-y-2 pt-2">
                <Button variant="outline" size="sm">
                  Entrar
                </Button>

                <Link href="/auth/register" passHref>
                  <Button size="sm" className="bg-gradient-to-r from-emerald-500 to-emerald-600">
                    Começar agora
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>


              </div>
            </nav>
          </div>
        )}
      </header>

      <HeroSection />
      <FeatureSection />
      <PricingSection />
      <TestimonialSection />
      <CtaSection />
      <Footer />
    </main>
  )
}
