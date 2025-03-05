import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { MaxWidthWrapper } from "@/components/ui/max-width-wrapper"

interface IFaqItem {
  title: string
  content: string
}
const faqItems: IFaqItem[] = [
  {
    title: "When is Doow launching?",
    content:
      "Doow is launching soon. We're currently in the middle of partnerships and integrations with licensed and insured banks, corporate card issuers and fintech partners around the world to offer you a comprehensive suite of financial products when we go live.",
  },
  {
    title: "Can I open foreign business accounts from anywhere?",
    content:
      "Yes, Doow supports companies from over 190 countries. We don't require an SSN or ITIN to open your business bank account in the United States.",
  },
  {
    title: "Is Doow a Bank?",
    content:
      "Doow is not a bank. Doow is financial technology company that offers all of its services in partnership with licensed banking and financial partners in their respective jurisdictions worldwide.",
  },
  {
    title: "Is Doow free?",
    content:
      "Yes and no, technically. Doow will be free of subscription fees for customers who join our waitlist and use the product during our beta period. We'll launch tiered subscription plans once we launch out of beta.",
  },
]

export const FAQSection = () => {
  return (
    <section className="relative w-full">
      <MaxWidthWrapper className="flex flex-col items-center justify-center text-center w-full md:w-[70%] section-spacing ">
        <div className="mb-8 max-w-60 md:max-w-2xl mx-auto">
            <h2 className="text-sub-heading text-doow_zinc capitalize">Frequently asked questions</h2>
        </div>

          <div className="w-full flex flex-col items-center">
            <Accordion type="single" collapsible className="w-[80%] sm:w-full">
              {faqItems.map((item, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left text-lg sm:text-xl font-medium hover:no-underline">
                    {item.title}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm sm:text-base text-justify text-balance">
                    {item.content}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
      </MaxWidthWrapper>
    </section>
  )
}
