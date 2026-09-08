import type { Metadata } from "next";
import ReactDOM from "react-dom";
import { WoofDogsLanding } from "@/components/WoofDogsLanding";
import { WebPageSchema } from "@/components/WebPageSchema";
import trainersImage from "@/assets/trainers.webp";

export const metadata: Metadata = {
  alternates: {
    canonical: "https://woofdogs.com",
  },
};

const NEXT_IMAGE_DEVICE_SIZES = [640, 750, 828, 1080, 1200, 1920, 2048, 3840];

function buildNextImageSrcSet(src: string, quality = 75) {
  return NEXT_IMAGE_DEVICE_SIZES.map(
    (w) => `/_next/image?url=${encodeURIComponent(src)}&w=${w}&q=${quality} ${w}w`,
  ).join(", ");
}

export default function Home() {
  // Explicit hero LCP preload, mirroring what next/image emits for the first
  // BentoItem (priority + sizes "(max-width: 768px) 100vw, 66vw"). This is
  // hoisted into <head> by react-dom/Next 16, so the browser sees it before
  // discovering the <img> in the streamed body.
  ReactDOM.preload(
    `/_next/image?url=${encodeURIComponent(trainersImage.src)}&w=1920&q=75`,
    {
      as: "image",
      fetchPriority: "high",
      imageSrcSet: buildNextImageSrcSet(trainersImage.src),
      imageSizes: "(max-width: 768px) 100vw, 66vw",
    },
  );

  return (
    <>
      <WebPageSchema />
      <WoofDogsLanding />
    </>
  );
}
