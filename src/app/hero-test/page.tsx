import HeroABTest from "@/page-components/HeroABTest";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hero A/B Test",
  robots: { index: false, follow: false },
};

export default function HeroTestPage() {
  return <HeroABTest />;
}
