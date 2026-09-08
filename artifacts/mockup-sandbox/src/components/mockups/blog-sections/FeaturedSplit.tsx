import { ArrowRight, Calendar, Clock, BookOpen } from "lucide-react";
import { samplePosts, formatPostDate } from "./_posts";

const featuredPost = samplePosts[3]; // The Real Cost of Dog Training
const recentPosts = [
  samplePosts[4],
  samplePosts[5],
  samplePosts[6],
  samplePosts[7],
].filter(Boolean);

export function FeaturedSplit() {
  return (
    <div className="min-h-screen bg-white font-['Inter']">
      <section className="max-w-[1240px] mx-auto px-8 py-20">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 bg-red-50 text-red-700 text-xs font-semibold tracking-wide px-3 py-1.5 rounded-full mb-4">
              <BookOpen className="h-3.5 w-3.5" />
              TRAINING JOURNAL
            </div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-zinc-900">
              Insights from the dog yard
            </h2>
            <p className="mt-3 text-zinc-500 max-w-xl">
              Real lessons, real cases, real dogs. Updated weekly by the WooF training team.
            </p>
          </div>
          <a
            href="#"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-zinc-900 hover:text-red-600 transition-colors self-start md:self-auto"
          >
            View all articles
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        <div className="grid grid-cols-12 gap-8">
          {/* Featured */}
          {featuredPost ? (
            <article className="col-span-12 lg:col-span-7 group cursor-pointer">
              <div
                className={`relative aspect-[16/11] rounded-2xl overflow-hidden bg-gradient-to-br ${featuredPost._visual.gradient}`}
              >
                <div className="absolute inset-0 [background-image:linear-gradient(135deg,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(45deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:32px_32px]" />
                <div className="absolute top-6 left-6">
                  <span className="inline-flex items-center gap-1.5 bg-white/95 backdrop-blur text-zinc-900 text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full">
                    <span className="h-1.5 w-1.5 rounded-full bg-red-600 animate-pulse" />
                    Most Read
                  </span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/85 via-black/40 to-transparent">
                  <h3 className="text-3xl md:text-[40px] font-bold leading-[1.1] text-white mb-4 group-hover:underline decoration-2 underline-offset-4">
                    {featuredPost.title}
                  </h3>
                  <p className="text-white/85 text-base leading-relaxed mb-5 max-w-xl">
                    {featuredPost.excerpt}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-white/80 font-medium">
                    <span>{featuredPost.authorName}, Head Trainer</span>
                    <span className="h-1 w-1 rounded-full bg-white/40" />
                    <span className="flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5" />
                      {formatPostDate(featuredPost.date, "long")}
                    </span>
                    <span className="h-1 w-1 rounded-full bg-white/40" />
                    <span className="flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5" />
                      {featuredPost._visual.readTime} read
                    </span>
                  </div>
                </div>
              </div>
            </article>
          ) : null}

          {/* List */}
          <div className="col-span-12 lg:col-span-5 flex flex-col">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-xs font-bold tracking-[0.2em] uppercase text-zinc-400">
                Latest articles
              </h3>
              <span className="text-xs text-zinc-400">
                {recentPosts.length} new
              </span>
            </div>
            <div className="flex-1 flex flex-col">
              {recentPosts.map((post) => (
                <a
                  href="#"
                  key={post.id}
                  className="group flex items-start gap-4 py-5 border-t border-zinc-100 first:border-t-0 first:pt-0 hover:pl-2 transition-all"
                >
                  <span
                    className={`mt-1.5 shrink-0 h-2 w-2 rounded-full ${post._visual.accentDot ?? "bg-zinc-400"}`}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1.5 text-[10px] font-bold tracking-wider uppercase">
                      <span className="text-zinc-900">
                        {post.categories[0]?.name}
                      </span>
                      <span className="text-zinc-300">•</span>
                      <span className="text-zinc-400">
                        {formatPostDate(post.date, "short")}
                      </span>
                    </div>
                    <h4 className="text-[15px] font-semibold leading-snug text-zinc-900 group-hover:text-red-600 transition-colors mb-1.5">
                      {post.title}
                    </h4>
                    <span className="text-xs text-zinc-400 flex items-center gap-1">
                      <Clock className="h-3 w-3" /> {post._visual.readTime}
                    </span>
                  </div>
                  <ArrowRight className="h-4 w-4 text-zinc-300 group-hover:text-red-600 group-hover:translate-x-1 transition-all mt-1.5" />
                </a>
              ))}
            </div>
            <a
              href="#"
              className="mt-6 block w-full text-center bg-zinc-900 hover:bg-red-600 transition-colors text-white font-semibold py-3.5 rounded-xl text-sm"
            >
              Browse all 47 articles →
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
