import { Search, ClipboardCheck, Shield, FileSearch } from "lucide-react"

const services = [
  {
    icon: Search,
    title: "Compliance Screening",
    description:
      "Real-time transaction monitoring and wallet risk assessment across all major blockchains.",
  },
  {
    icon: ClipboardCheck,
    title: "KYC for Business",
    description:
      "Complete identity verification solutions with regulatory compliance built-in.",
  },
  {
    icon: Shield,
    title: "Risk Management",
    description:
      "Advanced risk scoring and automated alerts for suspicious activity detection.",
  },
  {
    icon: FileSearch,
    title: "Investigations",
    description:
      "Expert blockchain forensics and fund recovery services for stolen assets.",
  },
]

export function Services() {
  return (
    <section id="services" className="py-20 lg:py-28">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <p className="mb-2 text-sm font-medium uppercase tracking-wider text-primary">
            Our Services
          </p>
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl text-balance">
            Crypto Products
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Comprehensive compliance solutions for individuals and businesses
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <div
              key={service.title}
              className="group rounded-2xl border border-border bg-card p-6 transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <service.icon className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-foreground">
                {service.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
