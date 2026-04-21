import { Wallet, BarChart3, FileText } from "lucide-react"

const steps = [
  {
    number: 1,
    icon: Wallet,
    title: "Connect Wallet",
    description:
      "Select your blockchain network and connect your wallet securely.",
  },
  {
    number: 2,
    icon: BarChart3,
    title: "Risk Analysis",
    description:
      "Our system performs deep blockchain analysis checking transaction history.",
  },
  {
    number: 3,
    icon: FileText,
    title: "Get Report",
    description:
      "Receive detailed risk assessment with compliance score and recommendations.",
  },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 lg:py-28">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <p className="mb-2 text-sm font-medium uppercase tracking-wider text-primary">
            Simple Process
          </p>
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl text-balance">
            How It Works
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Get your wallet verified in just 3 simple steps
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3 max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <div key={step.number} className="relative">
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="absolute left-1/2 top-12 hidden h-0.5 w-full bg-border md:block" />
              )}

              <div className="relative flex flex-col items-center text-center">
                <div className="relative mb-6">
                  <div className="flex h-24 w-24 items-center justify-center rounded-full border-2 border-primary/30 bg-card">
                    <step.icon className="h-10 w-10 text-primary" />
                  </div>
                  <div className="absolute -right-1 -top-1 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                    {step.number}
                  </div>
                </div>
                <h3 className="mb-2 text-lg font-semibold text-foreground">
                  {step.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
