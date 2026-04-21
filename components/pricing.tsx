import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"

const plans = [
  {
    name: "Starter",
    description: "For individuals",
    price: "$0.2",
    unit: "/check",
    features: [
      "Single wallet checks",
      "Basic risk score",
      "Email support",
      "PDF reports",
    ],
    cta: "Get Started",
    popular: false,
  },
  {
    name: "Enterprise",
    description: "Custom solutions",
    price: "Custom",
    unit: "",
    features: [
      "Unlimited checks",
      "Dedicated support",
      "Custom integration",
      "SLA guarantee",
      "White-label option",
    ],
    cta: "Contact Us",
    popular: true,
  },
]

export function Pricing() {
  return (
    <section id="pricing" className="py-20 lg:py-28 bg-card/30">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <p className="mb-2 text-sm font-medium uppercase tracking-wider text-primary">
            Simple Pricing
          </p>
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl text-balance">
            Choose Your Plan
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Transparent pricing with no hidden fees. Start free, scale as you grow.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 max-w-4xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl border p-8 ${
                plan.popular
                  ? "border-primary bg-card shadow-xl shadow-primary/10"
                  : "border-border bg-card"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-4 py-1 text-xs font-medium text-primary-foreground">
                  Popular
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-xl font-semibold text-foreground">{plan.name}</h3>
                <p className="text-sm text-muted-foreground">{plan.description}</p>
              </div>

              <div className="mb-6">
                <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                <span className="text-muted-foreground">{plan.unit}</span>
              </div>

              <ul className="mb-8 space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-sm text-foreground">
                    <Check className="h-4 w-4 text-primary" />
                    {feature}
                  </li>
                ))}
              </ul>

              <Button
                className="w-full"
                variant={plan.popular ? "default" : "outline"}
              >
                {plan.cta}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
