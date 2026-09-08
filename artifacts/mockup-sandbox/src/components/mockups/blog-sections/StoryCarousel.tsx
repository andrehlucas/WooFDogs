import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Quote, Bookmark } from "lucide-react";
import { samplePosts, formatPostDate } from "./_posts";

// Variant C — "Magazine Carousel". A real horizontally-scrollable, snap-aligned
// track of wide post cards with overlay titles, working prev/next arrow
// controls, and a visual progress indicator. Mobile-responsive: cards size
// down and side padding shrinks at narrow widths.

type CarouselSlide = {
  id: string;
  number: string;
  category: string;
  title: string;
  excerpt: string;
  authorName: string;
  authorRole: string;
  meta: string;
  hue: string;
  client?: string;
  isStory?: boolean;
};

// Build slides primarily from the shared dataset, with the lead "field story"
// slide tailored to a narrative pull-quote.
const storySource = samplePosts[0];
const slides: CarouselSlide[] = [
  {
    id: "story-bella",
    number: "01",
    category: "Field Story",
    title:
      "She lunged at every dog on our block. Now we walk past three off-leash labs without a sound.",
    excerpt:
      "Bella's family had stopped walking her after dark. Six weeks into our reactivity protocol, they were back at the park — and so was she.",
    authorName: storySource?.authorName ?? "Marcus Reyes",
    authorRole: "Lead Behavior Coach",
    meta: storySource?._visual.readTime
      ? `${storySource._visual.readTime} read`
      : "9 min read",
    hue: "from-rose-700 via-red-600 to-amber-500",
    client: "Bella · 3yo Aussie · Boca Raton",
    isStory: true,
  },
  ...samplePosts.slice(1, 6).map((p, i) => ({
    id: p.id,
    number: String(i + 2).padStart(2, "0"),
    category: p.categories[0]?.name ?? "Article",
    title: p.title,
    excerpt: p.excerpt,
    authorName: p.authorName,
    authorRole: "WooF Trainer",
    meta: `${p._visual.readTime} read · ${formatPostDate(p.date, "short")}`,
    hue: p._visual.gradient,
  })),
];

export function StoryCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const total = slides.length;

  const scrollToIndex = (idx: number) => {
    const el = trackRef.current;
    if (!el) return;
    const next = Math.max(0, Math.min(total - 1, idx));
    const card = el.children[next] as HTMLElement | undefined;
    if (card) {
      el.scrollTo({ left: card.offsetLeft - el.offsetLeft, behavior: "smooth" });
    }
  };

  // Track which card is most-centered to keep `active` in sync with manual
  // scroll/swipe.
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const onScroll = () => {
      const center = el.scrollLeft + el.clientWidth / 2;
      let best = 0;
      let bestDist = Infinity;
      for (let i = 0; i < el.children.length; i++) {
        const card = el.children[i] as HTMLElement;
        const cardCenter = card.offsetLeft + card.clientWidth / 2;
        const d = Math.abs(cardCenter - center);
        if (d < bestDist) {
          bestDist = d;
          best = i;
        }
      }
      setActive(best);
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  const progress = total > 1 ? ((active + 1) / total) * 100 : 100;

  return (
    <div className="min-h-screen bg-zinc-950 text-white font-['Inter'] relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full bg-red-600/10 blur-[120px] pointer-events-none" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-amber-500/5 blur-[100px] pointer-events-none" />

      <section className="relative max-w-[1280px] mx-auto px-4 sm:px-8 py-16 sm:py-20">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10 sm:mb-14">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-12 bg-red-500" />
              <span className="text-[11px] font-bold tracking-[0.3em] uppercase text-red-400">
                Stories from the Pack
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-[56px] font-bold tracking-tight leading-[1.05]">
              Real dogs. Real wins.
              <br />
              <span className="text-red-400 italic font-light">
                Read how they got there.
              </span>
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              aria-label="Previous story"
              onClick={() => scrollToIndex(active - 1)}
              disabled={active === 0}
              className="h-12 w-12 rounded-full border border-white/15 hover:bg-white hover:text-zinc-950 transition-colors flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              aria-label="Next story"
              onClick={() => scrollToIndex(active + 1)}
              disabled={active === total - 1}
              className="h-12 w-12 rounded-full bg-red-600 hover:bg-red-500 transition-colors flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <ArrowRight className="h-5 w-5" />
            </button>
            <div className="ml-3 flex items-center gap-1.5">
              <span className="text-2xl font-bold tabular-nums">
                {String(active + 1).padStart(2, "0")}
              </span>
              <span className="text-white/40">/</span>
              <span className="text-white/40 tabular-nums">
                {String(total).padStart(2, "0")}
              </span>
            </div>
          </div>
        </div>

        {/* Carousel track */}
        <div
          ref={trackRef}
          className="flex gap-5 sm:gap-6 overflow-x-auto snap-x snap-mandatory pb-6 -mx-4 sm:-mx-8 px-4 sm:px-8 scroll-smooth [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          tabIndex={0}
          aria-label="Story carousel"
        >
          {slides.map((slide) => (
            <article
              key={slide.id}
              className="snap-center shrink-0 w-[88%] sm:w-[78%] md:w-[68%] lg:w-[62%] h-[480px] sm:h-[540px] rounded-3xl overflow-hidden relative group cursor-pointer shadow-[0_30px_80px_-20px_rgba(220,38,38,0.4)]"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${slide.hue}`}
              />
              <div className="absolute inset-0 [background-image:radial-gradient(circle_at_70%_30%,rgba(255,255,255,0.15)_1px,transparent_1px)] [background-size:28px_28px]" />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/95 via-zinc-950/40 to-transparent" />

              {/* Top row */}
              <div className="absolute top-5 sm:top-7 left-5 sm:left-7 right-5 sm:right-7 flex items-start justify-between gap-3">
                <div className="flex flex-wrap items-center gap-2 sm:gap-3 min-w-0">
                  <span className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md text-white text-[10px] sm:text-[11px] font-bold tracking-wider uppercase px-3 py-1.5 rounded-full border border-white/20">
                    <span className="h-1.5 w-1.5 rounded-full bg-amber-300 animate-pulse" />
                    {slide.category}
                  </span>
                  {slide.client ? (
                    <span className="text-white/70 text-xs truncate">
                      {slide.client}
                    </span>
                  ) : null}
                </div>
                <button
                  type="button"
                  aria-label="Save story"
                  onClick={(e) => e.preventDefault()}
                  className="h-9 w-9 sm:h-10 sm:w-10 shrink-0 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 flex items-center justify-center transition-colors"
                >
                  <Bookmark className="h-4 w-4" />
                </button>
              </div>

              {/* Big number */}
              <div className="absolute top-5 sm:top-7 right-5 sm:right-7 mt-12 sm:mt-14 text-[100px] sm:text-[140px] font-black leading-none text-white/[0.07] tabular-nums select-none pointer-events-none">
                {slide.number}
              </div>

              {/* Bottom content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10">
                {slide.isStory ? (
                  <Quote
                    className="h-7 w-7 sm:h-8 sm:w-8 text-amber-300 mb-4 sm:mb-5 -scale-x-100"
                    aria-hidden
                  />
                ) : null}
                <h3 className="text-2xl sm:text-3xl md:text-[34px] font-bold leading-[1.15] text-white mb-3 sm:mb-5 max-w-3xl group-hover:text-amber-100 transition-colors">
                  {slide.title}
                </h3>
                <p className="hidden sm:block text-white/80 text-sm sm:text-base leading-relaxed mb-5 sm:mb-7 max-w-2xl">
                  {slide.excerpt}
                </p>
                <div className="flex items-center justify-between flex-wrap gap-3 sm:gap-4">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="h-10 w-10 sm:h-11 sm:w-11 rounded-full bg-gradient-to-br from-amber-300 to-rose-500 flex items-center justify-center text-zinc-900 font-bold text-xs sm:text-sm shrink-0">
                      {slide.authorName
                        .split(" ")
                        .map((p) => p[0])
                        .join("")
                        .slice(0, 2)}
                    </div>
                    <div className="min-w-0">
                      <div className="text-sm font-semibold text-white truncate">
                        {slide.authorName}
                      </div>
                      <div className="text-xs text-white/60 truncate">
                        {slide.authorRole} · {slide.meta}
                      </div>
                    </div>
                  </div>
                  <div className="inline-flex items-center gap-2 bg-white text-zinc-900 font-semibold px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm group-hover:bg-amber-300 transition-colors">
                    Read story
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Progress bar + dots */}
        <div className="mt-8 sm:mt-10 flex items-center gap-4 sm:gap-6 flex-wrap">
          <div className="h-0.5 flex-1 min-w-[120px] bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-red-500 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex items-center gap-1.5">
            {slides.map((s, i) => (
              <button
                key={s.id}
                type="button"
                aria-label={`Go to story ${i + 1}`}
                onClick={() => scrollToIndex(i)}
                className={`h-1.5 rounded-full transition-all ${
                  i === active ? "w-6 bg-red-500" : "w-1.5 bg-white/20 hover:bg-white/40"
                }`}
              />
            ))}
          </div>
          <a
            href="#"
            className="text-xs font-semibold tracking-wider uppercase text-white/60 hover:text-white transition-colors flex items-center gap-2"
          >
            View All Articles
            <ArrowRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </section>
    </div>
  );
}
