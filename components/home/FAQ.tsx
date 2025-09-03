'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { faqData } from '@/data/mockData';

export default function FAQ() {
  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-3xl md:text-4xl font-bold">Frequently Asked Questions</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Find answers to common questions about our products, shipping, and services.
        </p>
      </div>

      <div className="max-w-3xl mx-auto">
        <Accordion type="single" collapsible className="w-full space-y-4">
          {faqData.map((faq) => (
            <AccordionItem key={faq.id} value={`item-${faq.id}`} className="border rounded-lg px-6">
              <AccordionTrigger className="text-left hover:no-underline">
                <span className="font-medium">{faq.question}</span>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}