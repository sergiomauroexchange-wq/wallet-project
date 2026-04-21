import { Building, Wallet, Target, Clock } from "lucide-react"

const stats = [
  {
    icon: Building,
    value: "400+",
    label: "Business Clients",
  },
  {
    icon: Wallet,
    value: "4M+",
    label: "Wallets Checked",
  },
  {
    icon: Target,
    value: "99.9%",
    label: "Accuracy Rate",
  },
  {
    icon: Clock,
    value: "24/7",
    label: "Live Monitoring",
  },
]

export function Stats() {
  return (
    <section className="py-16 border-y border-border bg-card/50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                <stat.icon className="h-6 w-6 text-primary" />
              </div>
              <div className="text-3xl font-bold text-foreground">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
