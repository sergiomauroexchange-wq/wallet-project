"use client"

import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { Stats } from "@/components/stats"
import { Services } from "@/components/services"
import { Pricing } from "@/components/pricing"
import { HowItWorks } from "@/components/how-it-works"
import { FAQ } from "@/components/faq"
import { About } from "@/components/about"
import { WalletChecker } from "@/components/wallet-checker"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <Stats />
      <Services />
      <Pricing />
      <HowItWorks />
      <FAQ />
      <About />
      <WalletChecker />
      <Footer />
    </main>
  )
}
