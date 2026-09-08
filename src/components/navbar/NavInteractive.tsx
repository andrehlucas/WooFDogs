"use client";

import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { useBookingModal } from "@/contexts/BookingModalContext";
import { useOwnerGuidesModal } from "@/hooks/useOwnerGuidesModal";
import { DesktopMenu } from "./DesktopMenu";
import { productLinks, servicesLinks } from "./navData";

const MobileNav = dynamic(
  () => import("./MobileNav").then((m) => m.MobileNav),
  { ssr: false, loading: () => <div className="size-9 lg:hidden" aria-hidden="true" /> }
);

const OwnerGuidesModal = dynamic(
  () => import("@/components/OwnerGuidesModal").then((m) => m.OwnerGuidesModal),
  { ssr: false }
);

export function NavInteractive() {
  const { openModal } = useBookingModal();
  const { open: guidesOpen, setOpen: setGuidesOpen, openGuides } = useOwnerGuidesModal();

  return (
    <>
      <DesktopMenu
        productLinks={productLinks}
        servicesLinks={servicesLinks}
        onOpenGuides={openGuides}
      />
      <div className="flex items-center gap-2">
        <a
          href="https://woofdogs.portal.gingrapp.com/#/public/login"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden lg:flex"
        >
          <Button variant="ghost" data-testid="button-customer-login">
            Customer Login
          </Button>
        </a>
        <Button
          className="hidden lg:flex"
          onClick={openModal}
          data-testid="button-get-started"
        >
          Get Started
        </Button>
        <MobileNav
          productLinks={productLinks}
          servicesLinks={servicesLinks}
          onOpenGuides={openGuides}
        />
      </div>
      {guidesOpen && (
        <OwnerGuidesModal open={guidesOpen} onOpenChange={setGuidesOpen} />
      )}
    </>
  );
}
