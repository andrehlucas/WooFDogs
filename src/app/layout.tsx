import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import { headers } from "next/headers";
import "./globals.css";
import { Providers } from "./providers";
import { LocalBusinessSchema } from "@/components/LocalBusinessSchema";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";

const GTM_ID = "GTM-NQBKJVG";
const GTAG_ID = "AW-998417390";

const inter = Inter({ 
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const siteUrl = "https://woofdogs.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Professional Dog Training in South Florida | WooF Dogs",
    template: "%s | WooF Dogs",
  },
  description: "Dog training in Boca Raton, West Palm Beach & nearby cities—obedience, puppy training, behavior help, and service dog training. Book a free consult today.",
  keywords: ["dog training", "puppy training", "obedience training", "dog trainer", "Boca Raton", "Delray Beach", "Wellington", "Palm Beach Gardens", "South Florida", "service dog training", "therapy dog", "aggression management", "behavioral assessment"],
  authors: [{ name: "WooF Dogs" }],
  creator: "WooF Dogs",
  publisher: "WooF Dogs",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "WooF Dogs - Professional Dog Training in South Florida",
    description: "Expert dog training services in Palm Beach County. Obedience, puppy training, evaluation, and more. Over 30 years combined experience.",
    url: siteUrl,
    siteName: "WooF Dogs",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/trainers.webp",
        width: 800,
        height: 600,
        alt: "WooF Dogs Professional Dog Trainers",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "WooF Dogs - Professional Dog Training in South Florida",
    description: "Expert dog training services in Palm Beach County. Obedience, puppy training, evaluation, and more.",
    images: ["/trainers.webp"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const nonce = (await headers()).get("x-nonce") ?? undefined;

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GTAG_ID}`}
          strategy="lazyOnload"
          nonce={nonce}
          async
        />
        <Script
          id="google-ads-gtag"
          strategy="lazyOnload"
          nonce={nonce}
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GTAG_ID}');
            `,
          }}
        />
        <LocalBusinessSchema />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        <Script
          id="gtm-script"
          strategy="lazyOnload"
          nonce={nonce}
          dangerouslySetInnerHTML={{
            __html: `
              (function(){
                var loaded=false;
                function loadGTM(){
                  if(loaded)return;loaded=true;
                  cleanup();
                  (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                  new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                  j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                  'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                  })(window,document,'script','dataLayer','${GTM_ID}');
                }
                var events=['scroll','pointerdown','keydown','touchstart'];
                function cleanup(){events.forEach(function(e){window.removeEventListener(e,loadGTM,{passive:true,capture:true});});}
                events.forEach(function(e){window.addEventListener(e,loadGTM,{passive:true,capture:true,once:true});});
                if('requestIdleCallback' in window){
                  requestIdleCallback(loadGTM,{timeout:5000});
                }else{
                  setTimeout(loadGTM,5000);
                }
              })();
            `,
          }}
        />
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:px-4 focus:py-2 focus:bg-background focus:border focus:rounded-md focus:shadow-md focus:text-sm focus:font-medium focus:text-foreground focus:outline-none"
        >
          Skip to main content
        </a>
        <Providers>
          <Navbar />
          <div id="main-content" tabIndex={-1} className="outline-none">
            {children}
          </div>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
