"use client";

import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuLink,
  NavGridCard,
  NavSmallItem,
  NavLargeItem,
  type NavItemType,
} from "@/components/ui/navigation-menu";

export function DesktopMenu({
  productLinks,
  servicesLinks,
  onOpenGuides,
}: {
  productLinks: NavItemType[];
  servicesLinks: NavItemType[];
  onOpenGuides: () => void;
}) {
  return (
    <NavigationMenu className="hidden lg:block" aria-label="Primary">
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger data-testid="trigger-product">
            About Woof Dogs
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="mx-auto w-[calc(100vw-4rem)] sm:w-[calc(640px-4rem)] md:w-[calc(768px-4rem)] lg:w-[calc(1024px-4rem)] xl:w-[calc(1280px-4rem)] 2xl:w-[calc(1400px-4rem)]">
              <div className="grid md:grid-cols-[1fr_.30fr]">
                <ul className="grid grow gap-4 p-4 md:grid-cols-3 md:border-r">
                  {productLinks.slice(0, 3).map((link) => (
                    <li key={link.title}>
                      <NavGridCard
                        link={link}
                        data-testid={`card-product-${link.title.toLowerCase().replace(/\s+/g, "-")}`}
                      />
                    </li>
                  ))}
                </ul>
                <ul className="space-y-1 p-4">
                  {productLinks.slice(3).map((link) => {
                    const isExternal = link.href.startsWith("http");
                    return (
                      <li key={link.title}>
                        <NavSmallItem
                          item={link}
                          href={link.href}
                          className="gap-x-1"
                          data-testid={`link-product-${link.title.toLowerCase().replace(/\s+/g, "-")}`}
                          {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                        />
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger data-testid="trigger-services">
            Services
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="mx-auto w-[calc(100vw-4rem)] sm:w-[calc(640px-4rem)] md:w-[calc(768px-4rem)] lg:w-[calc(1024px-4rem)] xl:w-[calc(1280px-4rem)] 2xl:w-[calc(1400px-4rem)]">
              <div className="grid md:grid-cols-[1fr_.40fr]">
                <ul className="grid grow grid-cols-2 gap-4 p-4 md:border-r">
                  {servicesLinks.slice(0, 2).map((link) => (
                    <li key={link.title}>
                      <NavGridCard
                        link={link}
                        className="min-h-36"
                        data-testid={`card-services-${link.title.toLowerCase().replace(/\s+/g, "-")}`}
                      />
                    </li>
                  ))}
                  <div className="col-span-2 grid grid-cols-3 gap-x-4">
                    {servicesLinks.slice(5, 8).map((link) => (
                      <li key={link.title}>
                        <NavLargeItem
                          href={link.href}
                          link={link}
                          data-testid={`link-services-${link.title.toLowerCase().replace(/\s+/g, "-")}`}
                        />
                      </li>
                    ))}
                  </div>
                </ul>
                <ul className="space-y-2 p-4">
                  {servicesLinks.slice(2, 5).map((link) => (
                    <li key={link.title}>
                      {link.title === "Owner Guides" ? (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            onOpenGuides();
                          }}
                          className="w-full text-left"
                          data-testid="link-services-owner-guides"
                        >
                          <NavLargeItem href="#" link={link} />
                        </button>
                      ) : (
                        <NavLargeItem
                          href={link.href}
                          link={link}
                          data-testid={`link-services-${link.title.toLowerCase().replace(/\s+/g, "-")}`}
                        />
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link
              href="/dog-boarding"
              className="cursor-pointer"
              data-testid="link-dog-boarding"
            >
              Dog Boarding
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
