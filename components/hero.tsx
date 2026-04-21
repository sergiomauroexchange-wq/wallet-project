"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Shield, CheckCircle, Zap } from "lucide-react"
import { WalletCheckModal } from "./wallet-check-modal"

export function Hero() {
  const [walletModalOpen, setWalletModalOpen] = useState(false)

  return (
    <section className="relative overflow-hidden py-20 lg:py-32">
      {/* Background gradient effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-primary/10 via-accent/5 to-transparent blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-[400px] w-[400px] rounded-full bg-gradient-to-tr from-accent/10 via-primary/5 to-transparent blur-3xl" />
      </div>

      <div className="container relative mx-auto px-4">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary">
              <Shield className="h-4 w-4" />
              Live Protection Active
            </div>

            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl text-balance">
              Crypto Verification for{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Crypto Business</span>
            </h1>

            <p className="text-lg text-muted-foreground max-w-xl leading-relaxed">
              Professional compliance screening for USDT, ETH, BTC and 4000+
              cryptocurrencies. Protect your assets with automated compliance
              checks trusted by 400+ businesses worldwide.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="gap-2 shadow-lg shadow-primary/20" onClick={() => setWalletModalOpen(true)}>
                Check Your Wallet
                <Zap className="h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" className="border-border hover:bg-secondary">
                Learn More
              </Button>
            </div>

            <WalletCheckModal open={walletModalOpen} onOpenChange={setWalletModalOpen} />
          </div>

          {/* Right Content - Risk Assessment Card */}
          <div className="relative">
            <div className="rounded-3xl border border-border bg-card p-8 shadow-2xl shadow-primary/5">
              <div className="mb-6 flex items-center justify-between">
                <span className="text-sm font-medium text-muted-foreground">Risk Assessment</span>
                <div className="flex items-center gap-2 text-accent">
                  <CheckCircle className="h-4 w-4" />
                  <span className="text-sm font-semibold">Safe</span>
                </div>
              </div>

              {/* Risk Score Circle */}
              <div className="mb-8 flex justify-center">
                <div className="relative h-44 w-44">
                  <svg className="h-full w-full -rotate-90">
                    <circle
                      cx="88"
                      cy="88"
                      r="76"
                      stroke="currentColor"
                      strokeWidth="10"
                      fill="none"
                      className="text-secondary"
                    />
                    <circle
                      cx="88"
                      cy="88"
                      r="76"
                      stroke="currentColor"
                      strokeWidth="10"
                      fill="none"
                      strokeDasharray={478}
                      strokeDashoffset={478 - (478 * 15.68) / 100}
                      className="text-primary"
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-4xl font-bold text-foreground">15.68%</span>
                    <span className="text-sm text-muted-foreground">Risk Score</span>
                  </div>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-4 gap-4 mb-6">
                <div className="text-center p-3 rounded-xl bg-secondary/50">
                  <div className="text-xl font-bold text-foreground">4</div>
                  <div className="text-xs text-muted-foreground">Networks</div>
                </div>
                <div className="text-center p-3 rounded-xl bg-secondary/50">
                  <div className="text-xl font-bold text-foreground">100%</div>
                  <div className="text-xs text-muted-foreground">Accuracy</div>
                </div>
                <div className="text-center p-3 rounded-xl bg-secondary/50">
                  <div className="text-xl font-bold text-foreground">24/7</div>
                  <div className="text-xs text-muted-foreground">Monitoring</div>
                </div>
                <div className="text-center p-3 rounded-xl bg-secondary/50">
                  <div className="flex items-center justify-center">
                    <CheckCircle className="h-5 w-5 text-accent" />
                  </div>
                  <div className="text-xs text-muted-foreground">Verified</div>
                </div>
              </div>

              <div className="flex items-center justify-center gap-2 rounded-2xl bg-accent/10 py-4 text-accent">
                <Shield className="h-5 w-5" />
                <span className="font-semibold">Wallet is safe</span>
              </div>
            </div>

            {/* Floating badges */}
            <div className="absolute -left-4 top-1/4 flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 shadow-lg">
              <div className="h-2.5 w-2.5 rounded-full bg-accent animate-pulse" />
              <span className="text-sm font-medium text-foreground">Protected</span>
            </div>
            <div className="absolute -right-4 bottom-1/4 flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 shadow-lg">
              <CheckCircle className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-foreground">Verified</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
