import { useState } from "react";
import { ArrowRight, Clock } from "lucide-react";
import { samplePosts, sampleCategories, formatPostDate } from "./_posts";

// Variant D — "Minimal Text-Forward". Image-light, typography-driven layout.
// Posts render as a numbered list with category chips, large titles, and
// excerpts. Tiny color accents (no large hero imagery) keep the focus on
// content. Filter chips and a "View All Articles" CTA frame the section.
//
// The component is named `CompactGrid` to preserve the canvas iframe binding,
// but the layout is intentionally minimal/list-style per Task #15 Variant D.

const listPosts = [
  samplePosts[0],
  samplePosts[3],
  samplePosts[6],
  samplePosts[2],
  samplePosts[8],
].filter(Boolean);

export function CompactGrid() {
  const [activeFilter, setActiveFilter] = useState("All");

  const renderPosts = listPosts.filter((p) => {
    if (activeFilter === "All") return true;
    return p.categories.some(
      (c) => c.name.toLowerCase() === activeFilter.toLowerCase(),
    );
  });

  return (
    <div className="min-h-screen bg-zinc-50 font-['Inter']">
      <section className="max-w-[920px] mx-auto px-6 sm:px-8 py-16 sm:py-20">
        {/* Header */}
        <div className="mb-10">
          <div className="text-[11px] font-bold tracking-[0.3em] uppercase text-red-600 mb-3">
            Resources
          </div>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-zinc-900 mb-3">
                Train smarter, not louder.
              </h2>
              <p className="text-zinc-500">
                Practical guides written by the WooF training team. No fluff —
                just methods that work in real homes.
              </p>
            </div>
            <a
              href="#"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-zinc-900 hover:text-red-600 transition-colors self-start md:self-auto whitespace-nowrap"
            >
              View All Articles
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>

        {/* Filter pills */}
        <div className="flex flex-wrap gap-2 mb-10 pb-8 border-b border-zinc-200">
          {sampleCategories.map((c) => {
            const isActive = c.label === activeFilter;
            return (
              <button
                key={c.label}
                type="button"
                onClick={() => setActiveFilter(c.label)}
                className={`group inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium transition-colors ${
                  isActive
                    ? "bg-zinc-900 text-white"
                    : "bg-white text-zinc-700 hover:bg-zinc-100 border border-zinc-200"
                }`}
              >
                {c.label}
                <span
                  className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${
                    isActive
                      ? "bg-white/20 text-white"
                      : "bg-zinc-100 text-zinc-500"
                  }`}
                >
                  {c.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Numbered minimal list */}
        {renderPosts.length === 0 ? (
          <div className="py-16 text-center">
            <p className="text-zinc-500 text-sm mb-4">
              No articles in <span className="font-semibold text-zinc-900">{activeFilter}</span> yet.
            </p>
            <button
              type="button"
              onClick={() => setActiveFilter("All")}
              className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-red-600 hover:text-red-700 transition-colors"
            >
              Show all articles
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        ) : null}
        <ol className="flex flex-col">
          {renderPosts.map((p, i) => (
            <li key={p.id}>
              <a
                href="#"
                className="group grid grid-cols-[auto,1fr,auto] sm:grid-cols-[64px,1fr,auto] gap-4 sm:gap-8 py-7 border-t border-zinc-200 first:border-t-0 first:pt-0 hover:pl-1 transition-all"
              >
                {/* Number */}
                <div className="flex items-start">
                  <span className="text-2xl sm:text-3xl font-bold tabular-nums text-zinc-300 group-hover:text-red-600 transition-colors leading-none mt-1">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>

                {/* Content */}
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    {p.categories.slice(0, 1).map((c) => (
                      <span
                        key={c.slug}
                        className={`inline-block text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full ${p._visual.categoryPill ?? "text-zinc-700 bg-zinc-100"}`}
                      >
                        {c.name}
                      </span>
                    ))}
                    <span className="text-[11px] text-zinc-400 font-medium">
                      {formatPostDate(p.date, "long")}
                    </span>
                  </div>
                  <h3 className="font-bold text-2xl sm:text-[28px] leading-tight text-zinc-900 group-hover:text-red-600 transition-colors mb-2">
                    {p.title}
                  </h3>
                  <p className="text-sm sm:text-[15px] text-zinc-500 leading-relaxed mb-3 max-w-2xl">
                    {p.excerpt}
                  </p>
                  <div className="flex items-center gap-3 text-xs text-zinc-400">
                    <span className="font-medium text-zinc-700">
                      {p.authorName}
                    </span>
                    <span className="h-1 w-1 rounded-full bg-zinc-300" />
                    <span className="flex items-center gap-1.5">
                      <Clock className="h-3 w-3" />
                      {p._visual.readTime}
                    </span>
                  </div>
                </div>

                {/* Accent rule + arrow */}
                <div className="hidden sm:flex flex-col items-end justify-between pt-2">
                  <span
                    className={`block h-2 w-2 rounded-full ${p._visual.accentDot ?? "bg-zinc-300"}`}
                    aria-hidden
                  />
                  <ArrowRight className="h-5 w-5 text-zinc-300 group-hover:text-red-600 group-hover:translate-x-1 transition-all" />
                </div>
              </a>
            </li>
          ))}
        </ol>

        {/* Footer CTA */}
        <div className="mt-12 flex justify-center">
          <a
            href="#"
            className="group inline-flex items-center gap-2 bg-white border-2 border-zinc-900 hover:bg-zinc-900 hover:text-white text-zinc-900 font-semibold px-7 py-3.5 rounded-full transition-colors text-sm"
          >
            Browse all 47 training articles
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </section>
    </div>
  );
}
