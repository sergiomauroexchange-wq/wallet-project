"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqs = [
  {
    question: "What information does the check provide?",
    answer:
      "Our check provides comprehensive risk assessment including risk score percentage, source of funds analysis, transaction history review, and compliance recommendations for your wallet.",
  },
  {
    question: "What does the risk score percentage represent?",
    answer:
      "The risk score represents the likelihood that a wallet has been involved in suspicious or illegal activities. 0-24% is low risk (safe), 25-74% is medium risk, and 75-100% is high risk.",
  },
  {
    question: "Which cryptocurrencies are supported?",
    answer:
      "We support 4000+ cryptocurrencies including Bitcoin, Ethereum, USDT (TRC-20, ERC-20, BEP-20), Solana, and many more across all major blockchain networks.",
  },
  {
    question: "How does the platform ensure data protection?",
    answer:
      "We use end-to-end encryption, don't store sensitive private keys, and comply with GDPR and other data protection regulations. Your privacy is our priority.",
  },
  {
    question: "How can I prevent my account from being blocked?",
    answer:
      "By checking wallets before transactions, you can avoid receiving funds from high-risk sources that could trigger exchange account freezes or regulatory issues.",
  },
  {
    question: "What are the sources of risk?",
    answer:
      "Risks can come from mixers, darknet markets, sanctioned entities, stolen funds, gambling services, scam addresses, and other high-risk categories identified by our analysis.",
  },
]

export function FAQ() {
  return (
    <section id="faq" className="py-20 lg:py-28 bg-card/30">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <p className="mb-2 text-sm font-medium uppercase tracking-wider text-primary">
            Questions
          </p>
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl text-balance">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="rounded-xl border border-border bg-card px-6"
              >
                <AccordionTrigger className="text-left text-foreground hover:text-primary hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
