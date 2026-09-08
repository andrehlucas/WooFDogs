"use client";

import { useEffect, useState } from "react";
import { Aperture, BarChart3, LayoutGrid, Activity, Layers, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const getRootTheme = () => {
  if (typeof document === "undefined") {
    if (typeof window !== "undefined" && window.matchMedia) {
      return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }
    return "light";
  }

  const root = document.documentElement;
  if (root.classList.contains("dark")) return "dark";
  if (root.getAttribute("data-theme") === "dark" || (root as any).dataset?.theme === "dark") return "dark";
  if (root.classList.contains("light")) return "light";

  if (typeof window !== "undefined" && window.matchMedia) {
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  return "light";
};

function HeroVariantB() {
  const [theme, setTheme] = useState("light");
  const [activeFeature, setActiveFeature] = useState(0);

  useEffect(() => {
    if (typeof document === "undefined") return;
    const id = "hero-variant-b-animations";
    if (document.getElementById(id)) return;
    const style = document.createElement("style");
    style.id = id;
    style.innerHTML = `
      @keyframes slideInUp {
        0% { opacity: 0; transform: translateY(30px); }
        100% { opacity: 1; transform: translateY(0); }
      }
      @keyframes fadeInScale {
        0% { opacity: 0; transform: scale(0.95); }
        100% { opacity: 1; transform: scale(1); }
      }
      @keyframes shimmer {
        0% { background-position: -1000px 0; }
        100% { background-position: 1000px 0; }
      }
      @keyframes iconBounce {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-8px); }
      }
    `;
    document.head.appendChild(style);
    return () => {
      style.remove();
    };
  }, []);

  useEffect(() => {
    if (typeof document === "undefined") return;
    const root = document.documentElement;

    const syncTheme = () => {
      const next = getRootTheme();
      setTheme((prev) => (prev === next ? prev : next));
    };

    syncTheme();

    const observer = new MutationObserver(syncTheme);
    observer.observe(root, { attributes: true, attributeFilter: ["class", "data-theme"] });

    const handleStorage = (event: StorageEvent) => {
      if (event.key === "bento-theme") syncTheme();
    };

    const media =
      typeof window !== "undefined" && window.matchMedia
        ? window.matchMedia("(prefers-color-scheme: dark)")
        : null;

    const handleMediaChange = () => syncTheme();

    if (typeof window !== "undefined") {
      window.addEventListener("storage", handleStorage);
    }
    media?.addEventListener("change", handleMediaChange);

    return () => {
      observer.disconnect();
      if (typeof window !== "undefined") {
        window.removeEventListener("storage", handleStorage);
      }
      media?.removeEventListener("change", handleMediaChange);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % 5);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const toggleTheme = () => {
    if (typeof document === "undefined") return;
    const root = document.documentElement;
    const current = getRootTheme();
    const next = current === "dark" ? "light" : "dark";
    root.classList.toggle("dark", next === "dark");
    root.classList.toggle("light", next === "light");
    root.setAttribute("data-theme", next);
    setTheme(next);
    try {
      window.localStorage?.setItem("bento-theme", next);
    } catch (_err) {
      /* ignore */
    }
  };

  const features = [
    {
      title: "Obedience Training",
      blurb:
        "From basic commands to advanced control, obedience builds the foundation for confidence, trust, and reliable communication.",
      meta: "Focus",
      icon: Aperture,
    },
    {
      title: "Boarding & Bootcamp",
      blurb:
        "Immersive, trainer-led programs that reinforce structure and balance through consistent daily routines.",
      meta: "Environment",
      icon: BarChart3,
    },
    {
      title: "Puppy Training",
      blurb:
        "Early learning shapes lifelong habits. Teaching focus, boundaries, and social manners in a safe, nurturing way.",
      meta: "Foundation",
      icon: LayoutGrid,
    },
    {
      title: "Service Animal Training",
      blurb:
        "Tailored programs preparing dogs to support, guide, and respond with precision. Aligned to ADA-compliant standards.",
      meta: "Purpose",
      icon: Activity,
    },
    {
      title: "Aggression Management",
      blurb:
        "Behavioral rehabilitation grounded in psychology, structure, and calm leadership. Transforming stress into stability.",
      meta: "Expertise",
      icon: Layers,
    },
  ];

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50 text-neutral-900 transition-colors duration-500 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 dark:text-white">
      <div className="absolute inset-0 -z-10">
        <div
          className="absolute inset-0 opacity-30 dark:opacity-20"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, ${theme === "dark" ? "rgba(148, 163, 184, 0.15)" : "rgba(100, 116, 139, 0.1)"} 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />
        <div className="absolute right-0 top-0 h-[600px] w-[600px] rounded-full bg-blue-500/10 blur-[120px]" />
        <div className="absolute bottom-0 left-0 h-[400px] w-[400px] rounded-full bg-purple-500/10 blur-[100px]" />
      </div>

      <section className="relative mx-auto max-w-7xl px-6 py-16 md:py-24">
        <div className="mb-8 flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400" data-testid="text-section-label">
            Professional Training
          </span>
          <button
            type="button"
            onClick={toggleTheme}
            className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 transition-all hover:border-slate-300 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:border-slate-600 dark:hover:bg-slate-800"
            data-testid="button-toggle-theme"
          >
            {theme === "dark" ? "☀️ Light" : "🌙 Dark"}
          </button>
        </div>

        <div className="mb-16 grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="flex flex-col justify-center" style={{ animation: "slideInUp 0.8s ease-out" }}>
            <h1 className="mb-6 text-5xl font-black leading-tight tracking-tight text-slate-900 md:text-6xl lg:text-7xl dark:text-white" data-testid="text-hero-heading">
              We Speak Your Dog&apos;s{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent dark:from-blue-400 dark:to-purple-400">
                Language
              </span>
            </h1>
            <p className="mb-8 text-lg leading-relaxed text-slate-600 md:text-xl dark:text-slate-300" data-testid="text-hero-description">
              A structured approach to canine communication where clarity, consistency, and compassion create lasting transformation.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button
                size="lg"
                className="group bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 dark:from-blue-500 dark:to-purple-500"
                data-testid="button-get-started"
              >
                Get Started
                <ChevronRight className="ml-1 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-slate-300 dark:border-slate-600"
                data-testid="button-learn-more"
              >
                Learn More
              </Button>
            </div>
          </div>

          <div className="relative" style={{ animation: "fadeInScale 1s ease-out 0.2s backwards" }}>
            <div className="relative aspect-square overflow-hidden rounded-3xl border border-slate-200 bg-white p-8 shadow-2xl dark:border-slate-800 dark:bg-slate-900/50">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                const isActive = activeFeature === index;
                return (
                  <div
                    key={feature.title}
                    className={`absolute inset-8 flex flex-col items-center justify-center text-center transition-all duration-700 ${
                      isActive ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
                    }`}
                  >
                    <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30">
                      <Icon
                        className="h-12 w-12 text-blue-600 dark:text-blue-400"
                        strokeWidth={1.5}
                        style={{ animation: isActive ? "iconBounce 2s ease-in-out infinite" : undefined }}
                      />
                    </div>
                    <div className="mb-3 inline-block rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                      {feature.meta}
                    </div>
                    <h3 className="mb-4 text-2xl font-bold text-slate-900 md:text-3xl dark:text-white">
                      {feature.title}
                    </h3>
                    <p className="text-base leading-relaxed text-slate-600 dark:text-slate-300">
                      {feature.blurb}
                    </p>
                  </div>
                );
              })}

              <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-2">
                {features.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveFeature(index)}
                    className={`h-2 rounded-full transition-all ${
                      activeFeature === index
                        ? "w-8 bg-blue-600 dark:bg-blue-400"
                        : "w-2 bg-slate-300 hover:bg-slate-400 dark:bg-slate-600 dark:hover:bg-slate-500"
                    }`}
                    aria-label={`View ${features[index].title}`}
                    data-testid={`button-feature-indicator-${index}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <button
                key={feature.title}
                onClick={() => setActiveFeature(index)}
                className={`group relative overflow-hidden rounded-xl border p-6 text-left transition-all duration-300 ${
                  activeFeature === index
                    ? "border-blue-500 bg-blue-50 shadow-lg dark:border-blue-400 dark:bg-blue-950/30"
                    : "border-slate-200 bg-white hover:border-slate-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-900/30 dark:hover:border-slate-700"
                }`}
                style={{ animation: `slideInUp 0.6s ease-out ${index * 0.1}s backwards` }}
                data-testid={`card-feature-${index}`}
              >
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30">
                  <Icon className="h-6 w-6 text-blue-600 dark:text-blue-400" strokeWidth={1.5} />
                </div>
                <h4 className="mb-2 text-sm font-bold uppercase tracking-wide text-slate-900 dark:text-white" data-testid={`text-feature-title-${index}`}>
                  {feature.title}
                </h4>
                <div
                  className={`absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-blue-600 to-purple-600 transition-transform duration-300 ${
                    activeFeature === index ? "scale-x-100" : "scale-x-0"
                  }`}
                />
              </button>
            );
          })}
        </div>

        <footer className="mt-20 border-t border-slate-200 pt-8 text-center dark:border-slate-800">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400" data-testid="text-footer-tagline">
            Calm structure for real-world results.
          </p>
        </footer>
      </section>
    </div>
  );
}

export default HeroVariantB;
