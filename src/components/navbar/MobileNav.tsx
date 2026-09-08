"use client";

import {
  MenuIcon,
  XIcon,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useBookingModal } from "@/contexts/BookingModalContext";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { NavItemMobile, type NavItemType } from "@/components/ui/navigation-menu";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function MobileNav({
  productLinks,
  servicesLinks,
  onOpenGuides,
}: {
  productLinks: NavItemType[];
  servicesLinks: NavItemType[];
  onOpenGuides: () => void;
}) {
  const { openModal } = useBookingModal();
  const sections = [
    { id: "about-woof-dogs", name: "About Woof Dogs", list: productLinks, featured: 3 },
    { id: "services", name: "Services", list: servicesLinks, featured: 2 },
  ];

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          size="icon"
          variant="ghost"
          className="rounded-full lg:hidden"
          data-testid="button-menu-mobile"
          aria-label="Open navigation menu"
        >
          <MenuIcon className="size-5" aria-hidden="true" />
        </Button>
      </SheetTrigger>
      <SheetContent
        className="bg-background/95 supports-[backdrop-filter]:bg-background/80 w-full gap-0 backdrop-blur-lg"
        showClose={false}
        aria-describedby={undefined}
      >
        <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
        <div className="flex h-14 items-center justify-end border-b px-4">
          <SheetClose asChild>
            <Button
              size="icon"
              variant="ghost"
              className="rounded-full"
              data-testid="button-close-mobile-menu"
              aria-label="Close navigation menu"
            >
              <XIcon className="size-5" aria-hidden="true" />
            </Button>
          </SheetClose>
        </div>
        <div className="grid gap-y-2 overflow-y-auto pt-6 pb-12" style={{ paddingLeft: "16px", paddingRight: "16px" }}>
          <Accordion type="single" collapsible className="space-y-2">
            {sections.map((section) => (
              <AccordionItem
                key={section.id}
                value={section.id}
                className="border rounded-lg bg-card/50"
              >
                <AccordionTrigger
                  className="px-4 py-3 text-base font-semibold hover:no-underline"
                  data-testid={`accordion-trigger-${section.id}`}
                >
                  {section.name}
                </AccordionTrigger>
                <AccordionContent className="px-2 pb-3">
                  <ul className="grid gap-2">
                    {section.list.slice(0, section.featured).map((link) => (
                      <li key={link.title}>
                        <SheetClose asChild>
                          <NavItemMobile
                            item={link}
                            href={link.href}
                            data-testid={`link-mobile-${section.id}-${link.title.toLowerCase().replace(/\s+/g, "-")}`}
                          />
                        </SheetClose>
                      </li>
                    ))}
                    {section.list.length > section.featured && (
                      <>
                        <div className="border-t my-2" />
                        {section.list.slice(section.featured).map((link) => (
                          <li key={link.title}>
                            {link.title === "Owner Guides" ? (
                              <SheetClose asChild>
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    onOpenGuides();
                                  }}
                                  className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-accent hover:text-white hover:[&_svg]:text-white transition-colors"
                                  data-testid="link-mobile-services-owner-guides"
                                >
                                  {link.icon && <link.icon className="size-4 text-muted-foreground" />}
                                  <span>{link.title}</span>
                                </button>
                              </SheetClose>
                            ) : (
                              <SheetClose asChild>
                                <a
                                  href={link.href}
                                  className="flex items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-accent hover:text-white hover:[&_svg]:text-white transition-colors"
                                  data-testid={`link-mobile-${section.id}-${link.title.toLowerCase().replace(/\s+/g, "-")}`}
                                  {...(link.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                                >
                                  {link.icon && <link.icon className="size-4 text-muted-foreground" />}
                                  <span>{link.title}</span>
                                </a>
                              </SheetClose>
                            )}
                          </li>
                        ))}
                      </>
                    )}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="border rounded-lg bg-card/50">
            <SheetClose asChild>
              <Link
                href="/dog-boarding"
                className="flex items-center px-4 py-3 text-base font-semibold hover:bg-accent hover:text-white transition-colors rounded-lg"
                data-testid="link-mobile-dog-boarding"
              >
                Dog Boarding
              </Link>
            </SheetClose>
          </div>

          <div className="mt-4 flex flex-col gap-2 border-t pt-4">
            <SheetClose asChild>
              <a
                href="https://woofdogs.portal.gingrapp.com/#/public/login"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full"
              >
                <Button className="w-full justify-start" variant="ghost" data-testid="button-mobile-customer-login">
                  Customer Login
                </Button>
              </a>
            </SheetClose>
            <SheetClose asChild>
              <Button
                className="w-full"
                onClick={openModal}
                data-testid="button-mobile-get-started"
              >
                Get Started
              </Button>
            </SheetClose>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
