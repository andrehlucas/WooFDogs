import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

interface FaqItem {
  question?: string;
  q?: string;
  answer?: string;
  a?: string;
}

interface FaqAccordionProps {
  faqs: FaqItem[];
  className?: string;
  itemClassName?: string;
  triggerClassName?: string;
  contentClassName?: string;
  "data-testid"?: string;
  testIdPrefix?: string;
}

export function FaqAccordion({
  faqs,
  className,
  itemClassName,
  triggerClassName,
  contentClassName,
  "data-testid": dataTestId,
  testIdPrefix = "accordion",
}: FaqAccordionProps) {
  const safeFaqs = Array.isArray(faqs) ? faqs : [];
  return (
    <div className={cn("space-y-3 sm:space-y-4", className)} data-testid={dataTestId}>
      {safeFaqs.map((faq, index) => {
        const question = faq.question ?? faq.q ?? "";
        const answer = faq.answer ?? faq.a ?? "";

        return (
          <details
            key={index}
            className={cn("group border-b", itemClassName)}
            data-testid={`${testIdPrefix}-item-${index}`}
          >
            <summary
              className={cn(
                "flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline cursor-pointer list-none [&::-webkit-details-marker]:hidden",
                triggerClassName,
              )}
              data-testid={`${testIdPrefix}-trigger-${index}`}
            >
              {question}
              <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200 group-open:rotate-180" />
            </summary>
            <div
              className={cn(
                "grid grid-rows-[0fr] group-open:grid-rows-[1fr] transition-[grid-template-rows] duration-200 overflow-hidden",
              )}
            >
              <div className="overflow-hidden">
                <div
                  className={cn(
                    "text-sm pb-4 pt-0 text-muted-foreground",
                    contentClassName,
                  )}
                  data-testid={`${testIdPrefix}-content-${index}`}
                >
                  {answer}
                </div>
              </div>
            </div>
          </details>
        );
      })}
    </div>
  );
}
