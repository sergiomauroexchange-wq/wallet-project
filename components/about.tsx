import { Globe, Clock, Headphones, Award } from "lucide-react"

const aboutStats = [
  { icon: Globe, value: "25+", label: "Countries Served" },
  { icon: Clock, value: "99.9%", label: "Uptime" },
  { icon: Headphones, value: "24/7", label: "Support" },
  { icon: Award, value: "ISO", label: "Certified" },
]

const certifications = ["ISO 27001", "GDPR", "INATBA", "CDA Member"]

export function About() {
  return (
    <section id="about" className="py-20 lg:py-28">
      <div className="container mx-auto px-4">
        <div className="grid gap-12 lg:grid-cols-2 items-center">
          <div>
            <p className="mb-2 text-sm font-medium uppercase tracking-wider text-primary">
              About Us
            </p>
            <h2 className="text-3xl font-bold text-foreground sm:text-4xl mb-6 text-balance">
              Trusted by 400+ Crypto Businesses Worldwide
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We are a team of blockchain analysts, compliance experts, and
              security professionals dedicated to making cryptocurrency safer for
              everyone.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Our platform combines cutting-edge technology with deep industry
              expertise to provide the most accurate compliance screening available.
            </p>
          </div>

          <div className="space-y-8">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {aboutStats.map((stat) => (
                <div
                  key={stat.label}
                  className="flex flex-col items-center rounded-xl border border-border bg-card p-4 text-center"
                >
                  <stat.icon className="mb-2 h-5 w-5 text-primary" />
                  <div className="text-xl font-bold text-foreground">{stat.value}</div>
                  <div className="text-xs text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>

            <div className="rounded-xl border border-border bg-card p-6">
              <h3 className="mb-4 text-sm font-medium text-muted-foreground">
                Certifications & Partners
              </h3>
              <p className="mb-4 text-xs text-muted-foreground">
                We maintain the highest standards of security and compliance
              </p>
              <div className="flex flex-wrap gap-3">
                {certifications.map((cert) => (
                  <div
                    key={cert}
                    className="rounded-lg bg-secondary px-3 py-1.5 text-xs font-medium text-secondary-foreground"
                  >
                    {cert}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
