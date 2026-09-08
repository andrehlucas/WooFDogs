import { ArrowUpRight, Clock } from "lucide-react";
import { samplePosts, formatPostDate } from "./_posts";

const featuredPost = samplePosts[0];
const supportingPosts = [samplePosts[1], samplePosts[2]];

export function Editorial() {
  return (
    <div className="min-h-screen bg-[#fafaf7] font-['Inter']">
      <section className="max-w-[1200px] mx-auto px-8 py-20">
        {/* Masthead */}
        <div className="flex items-end justify-between border-b-2 border-zinc-900 pb-6 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-10 bg-red-600" />
              <span className="text-[11px] font-semibold tracking-[0.25em] text-red-600 uppercase">
                The Journal
              </span>
            </div>
            <h2 className="font-['Playfair_Display'] text-6xl font-bold tracking-tight text-zinc-900 leading-[0.95]">
              Field Notes from <br />
              <em className="font-normal italic text-red-600">Real Training</em>
            </h2>
          </div>
          <a
            href="#"
            className="group flex items-center gap-2 text-sm font-medium text-zinc-900 hover:text-red-600 transition-colors"
          >
            <span>View All Articles</span>
            <ArrowUpRight className="h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>

        {/* Issue meta */}
        <div className="flex items-center gap-6 mb-10 text-[11px] tracking-[0.2em] uppercase text-zinc-500 font-medium">
          <span>Issue 24</span>
          <span className="h-1 w-1 rounded-full bg-zinc-300" />
          <span>April 2026</span>
          <span className="h-1 w-1 rounded-full bg-zinc-300" />
          <span>Published Weekly</span>
        </div>

        <div className="grid grid-cols-12 gap-8">
          {/* Featured */}
          {featuredPost ? (
            <article className="col-span-12 md:col-span-7 group cursor-pointer">
              <div
                className={`relative aspect-[4/3] rounded-sm overflow-hidden bg-gradient-to-br ${featuredPost._visual.gradient} mb-6`}
              >
                <div className="absolute inset-0 opacity-20 mix-blend-overlay [background-image:radial-gradient(circle_at_30%_20%,white_1px,transparent_1px)] [background-size:24px_24px]" />
                <div className="absolute top-5 left-5">
                  <span className="inline-block bg-white text-zinc-900 text-[10px] font-bold tracking-[0.2em] uppercase px-3 py-1.5">
                    Featured Story
                  </span>
                </div>
                <div className="absolute bottom-5 right-5 text-white/70 text-xs font-medium">
                  Photo · WooF Studio
                </div>
              </div>
              <div className="flex items-center gap-3 mb-4 text-[11px] font-semibold tracking-[0.2em] uppercase">
                <span className="text-red-600">
                  {featuredPost.categories[0]?.name}
                </span>
                <span className="h-px w-6 bg-zinc-300" />
                <span className="text-zinc-500">
                  {formatPostDate(featuredPost.date, "long")}
                </span>
              </div>
              <h3 className="font-['Playfair_Display'] text-3xl md:text-4xl font-bold leading-[1.1] text-zinc-900 mb-4 group-hover:text-red-600 transition-colors">
                {featuredPost.title}
              </h3>
              <p className="text-zinc-600 leading-relaxed mb-5 max-w-lg">
                {featuredPost.excerpt}
              </p>
              <div className="flex items-center gap-4 text-sm text-zinc-500">
                <span className="font-medium text-zinc-900">
                  {featuredPost.authorName}
                </span>
                <span className="h-1 w-1 rounded-full bg-zinc-300" />
                <span className="flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5" />
                  {featuredPost._visual.readTime}
                </span>
              </div>
            </article>
          ) : null}

          {/* Supporting */}
          <div className="col-span-12 md:col-span-5 flex flex-col">
            <div className="text-[10px] font-bold tracking-[0.25em] uppercase text-zinc-400 mb-6">
              Also in this issue
            </div>
            {supportingPosts.filter(Boolean).map((post) => (
              <article
                key={post.id}
                className="group cursor-pointer py-6 border-t border-zinc-200 first:border-t-0 first:pt-0 last:pb-0"
              >
                <div className="flex gap-5">
                  <div
                    className={`shrink-0 w-28 h-28 rounded-sm bg-gradient-to-br ${post._visual.gradient} relative overflow-hidden`}
                  >
                    <div className="absolute inset-0 opacity-15 [background-image:radial-gradient(circle_at_50%_50%,white_1px,transparent_1px)] [background-size:14px_14px]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2 text-[10px] font-semibold tracking-[0.2em] uppercase">
                      <span className="text-red-600">
                        {post.categories[0]?.name}
                      </span>
                      <span className="h-px w-4 bg-zinc-300" />
                      <span className="text-zinc-400">
                        {formatPostDate(post.date, "long")}
                      </span>
                    </div>
                    <h4 className="font-['Playfair_Display'] text-xl font-bold leading-tight text-zinc-900 group-hover:text-red-600 transition-colors mb-3">
                      {post.title}
                    </h4>
                    <div className="flex items-center gap-1.5 text-xs text-zinc-500">
                      <Clock className="h-3 w-3" />
                      {post._visual.readTime}
                    </div>
                  </div>
                </div>
              </article>
            ))}
            <a
              href="#"
              className="mt-8 inline-flex items-center justify-between border-t-2 border-zinc-900 pt-5 text-sm font-semibold uppercase tracking-[0.2em] text-zinc-900 hover:text-red-600 transition-colors"
            >
              Read the full archive
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
