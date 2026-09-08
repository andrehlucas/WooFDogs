import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";
import type {
  BlogPost,
  BlogCategory,
  BlogAuthor,
  BlogPostQuery,
} from "../../shared/blogTypes";
import type { IBlogDataSource } from "./blogService";
import {
  notifyUrlPublished,
  isAnyChannelConfigured,
  readIndexNowState,
  readGoogleIndexState,
  writeIndexNowState,
  writeGoogleIndexState,
  pingIndexNowAndRecord,
  notifyGoogleAndRecord,
  type PingState,
} from "./publishNotifyService";
import { getIndexNowKey } from "./indexNowService";
import { isGoogleIndexingConfigured } from "./googleIndexingService";

const CONTENT_DIR = path.join(process.cwd(), "content", "blog");
const PUBLISH_WINDOW_MS = 14 * 24 * 60 * 60 * 1000;
const WATCH_DEBOUNCE_MS = 1500;
let publishScanRan = false;
let watcherInitialized = false;
const pendingWatchPings = new Map<string, NodeJS.Timeout>();

function resolvePostFile(slug: string): { filePath: string; mtimeMs: number } | null {
  for (const ext of [".mdx", ".md"]) {
    const candidate = path.join(CONTENT_DIR, `${slug}${ext}`);
    try {
      const stat = fs.statSync(candidate);
      return { filePath: candidate, mtimeMs: stat.mtimeMs };
    } catch {
      /* try next extension */
    }
  }
  return null;
}

/**
 * Notify IndexNow + Google Indexing for a single MDX post slug if its source
 * file has been added or modified since the last recorded successful ping per
 * channel. State is only updated after a successful ping, so transient
 * failures retry on the next file change or boot scan. Always fire-and-forget.
 */
export function notifyPostPublished(slug: string): void {
  try {
    const resolved = resolvePostFile(slug);
    if (!resolved) return;
    notifyUrlPublished(slug, `/blog/${slug}`, resolved.mtimeMs);
  } catch (err) {
    console.warn(`[publish-notify] notifyPostPublished(${slug}) error:`, err);
  }
}

function scheduleWatchPing(slug: string): void {
  const existing = pendingWatchPings.get(slug);
  if (existing) clearTimeout(existing);
  const handle = setTimeout(() => {
    pendingWatchPings.delete(slug);
    notifyPostPublished(slug);
  }, WATCH_DEBOUNCE_MS);
  pendingWatchPings.set(slug, handle);
}

function setupContentWatcher(): void {
  if (watcherInitialized) return;
  watcherInitialized = true;
  if (!isAnyChannelConfigured()) return;
  if (!fs.existsSync(CONTENT_DIR)) return;
  try {
    const watcher = fs.watch(
      CONTENT_DIR,
      { persistent: false },
      (_eventType, filename) => {
        if (!filename) return;
        const name = filename.toString();
        if (!name.endsWith(".mdx") && !name.endsWith(".md")) return;
        const slug = name.replace(/\.mdx?$/, "");
        scheduleWatchPing(slug);
      },
    );
    watcher.on("error", (err) => {
      console.warn("[indexnow] content watcher error:", err);
    });
    console.log(
      `[indexnow] watching ${CONTENT_DIR} for blog publish/update events`,
    );
  } catch (err) {
    console.warn("[indexnow] failed to start content watcher:", err);
  }
}

interface ScanTarget {
  state: PingState;
  ping: (slug: string, urlPath: string, mtimeMs: number) => void;
  write: (state: PingState) => void;
  label: string;
}

function runPublishScan(target: ScanTarget): void {
  const { state, ping, write, label } = target;
  const firstRun = Object.keys(state.pings).length === 0;
  const now = Date.now();
  let mutated = false;

  const files = fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith(".mdx") || f.endsWith(".md"));

  for (const file of files) {
    const filePath = path.join(CONTENT_DIR, file);
    const slug = file.replace(/\.mdx?$/, "");
    let mtimeMs = 0;
    try {
      mtimeMs = fs.statSync(filePath).mtimeMs;
    } catch {
      continue;
    }
    const lastPinged = state.pings[slug] || 0;
    const isNewOrChanged = mtimeMs > lastPinged;
    const withinWindow = now - mtimeMs <= PUBLISH_WINDOW_MS;

    if (firstRun) {
      // First boot ever for this notifier: seed state with current mtimes so
      // we don't flood the API with the entire archive.
      state.pings[slug] = mtimeMs;
      mutated = true;
      continue;
    }

    if (isNewOrChanged && withinWindow) {
      ping(slug, `/blog/${slug}`, mtimeMs);
    } else if (isNewOrChanged) {
      state.pings[slug] = mtimeMs;
      mutated = true;
    }
  }

  if (mutated) {
    try {
      write(state);
    } catch (err) {
      console.warn(`[${label}] failed to persist boot scan state:`, err);
    }
  }
}

function notifyNewlyPublishedPosts(): void {
  if (publishScanRan) return;
  publishScanRan = true;
  if (!fs.existsSync(CONTENT_DIR)) return;

  if (getIndexNowKey()) {
    runPublishScan({
      state: readIndexNowState(),
      ping: pingIndexNowAndRecord,
      write: writeIndexNowState,
      label: "indexnow",
    });
  }

  if (isGoogleIndexingConfigured()) {
    runPublishScan({
      state: readGoogleIndexState(),
      ping: notifyGoogleAndRecord,
      write: writeGoogleIndexState,
      label: "google-index",
    });
  }
}

void notifyNewlyPublishedPosts();
setupContentWatcher();

interface MdxFrontmatter {
  title: string;
  description?: string;
  coverImage?: string;
  coverImageAlt?: string;
  ogImage?: string;
  date: string;
  lastUpdated?: string;
  author?: string;
  tags?: string[];
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function cleanMdxContent(raw: string): string {
  let content = raw;
  content = content.replace(
    /\[INTERNAL-LINK:\s*([^\]→]+?)→\s*([^\]]+)\]/g,
    (_, linkText, linkUrl) => `[${linkText.trim()}](${linkUrl.trim()})`
  );
  content = content.replace(/^[ \t]*<!--[\s\S]*?-->[ \t]*\r?\n?/gm, "");
  content = content.replace(/<script[\s\S]*?<\/script>/gi, "");
  return content;
}

function sanitizeHtml(html: string): string {
  let sanitized = html;
  sanitized = sanitized.replace(/<iframe[\s\S]*?<\/iframe>/gi, "");
  sanitized = sanitized.replace(/<iframe[\s\S]*?\/?>/gi, "");
  sanitized = sanitized.replace(/<object[\s\S]*?<\/object>/gi, "");
  sanitized = sanitized.replace(/<embed[\s\S]*?\/?>/gi, "");
  sanitized = sanitized.replace(/<form[\s\S]*?<\/form>/gi, "");
  sanitized = sanitized.replace(
    /\s+on\w+\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+)/gi,
    ""
  );
  sanitized = sanitized.replace(
    /href\s*=\s*["']?\s*javascript\s*:/gi,
    'href="'
  );
  return sanitized;
}

function parseDate(dateStr: string): string | null {
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) {
    return null;
  }
  return d.toISOString();
}

function parseMdxFile(
  filePath: string,
  fileName: string
): BlogPost | null {
  try {
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(fileContent);
    const frontmatter = data as MdxFrontmatter;

    if (!frontmatter.title || !frontmatter.date) {
      console.warn(`MDX file ${fileName}: missing required frontmatter (title or date)`);
      return null;
    }

    const parsedDate = parseDate(frontmatter.date);
    if (!parsedDate) {
      console.warn(`MDX file ${fileName}: invalid date "${frontmatter.date}"`);
      return null;
    }

    const slug = fileName.replace(/\.mdx?$/, "");
    const cleaned = cleanMdxContent(content);
    const renderer = new marked.Renderer();
    const originalTable = renderer.table.bind(renderer);
    renderer.table = (token) => {
      const inner = originalTable(token);
      return `<div class="table-wrapper">${inner}</div>`;
    };
    const rawHtml = marked.parse(cleaned, { async: false, renderer }) as string;
    const htmlContent = sanitizeHtml(rawHtml);

    const excerpt =
      frontmatter.description ||
      cleaned
        .replace(/<[^>]*>/g, "")
        .replace(/[#*_~`>|[\]]/g, "")
        .replace(/\n+/g, " ")
        .trim()
        .slice(0, 200) + "…";

    const authorName = frontmatter.author || "WooF Dogs";
    const authorSlug = slugify(authorName);

    const categories: { name: string; slug: string }[] = (
      frontmatter.tags || []
    ).map((tag) => ({
      name: tag,
      slug: slugify(tag),
    }));

    return {
      id: `mdx_${slug}`,
      databaseId: 0,
      title: frontmatter.title,
      slug,
      excerpt,
      content: htmlContent,
      date: parsedDate,
      featuredImageUrl: frontmatter.coverImage,
      featuredImageAlt: frontmatter.coverImageAlt,
      authorName,
      authorSlug,
      authorAvatar: undefined,
      categories,
      sourceType: "mdx" as const,
      rawMdxSource: cleaned,
    };
  } catch (err) {
    console.error(`Error parsing MDX file ${fileName}:`, err);
    return null;
  }
}

function getAllMdxPosts(): BlogPost[] {
  if (!fs.existsSync(CONTENT_DIR)) {
    return [];
  }

  const files = fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith(".mdx") || f.endsWith(".md"));

  const posts: BlogPost[] = [];
  for (const file of files) {
    const post = parseMdxFile(path.join(CONTENT_DIR, file), file);
    if (post) {
      posts.push(post);
    }
  }

  posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  return posts;
}

export class MdxBlogService implements IBlogDataSource {
  async getPosts(
    query?: BlogPostQuery
  ): Promise<{ posts: BlogPost[]; hasMore: boolean }> {
    let posts = getAllMdxPosts();

    if (query?.category) {
      posts = posts.filter((p) =>
        p.categories.some((cat) => cat.slug === query.category)
      );
    }

    const limit = query?.limit || 10;
    const sliced = posts.slice(0, limit);

    return {
      posts: sliced,
      hasMore: posts.length > limit,
    };
  }

  async getPostBySlug(slug: string): Promise<BlogPost | null> {
    const posts = getAllMdxPosts();
    return posts.find((p) => p.slug === slug) || null;
  }

  async getCategories(): Promise<BlogCategory[]> {
    const posts = getAllMdxPosts();
    const catMap = new Map<string, { name: string; slug: string; count: number }>();

    for (const post of posts) {
      for (const cat of post.categories) {
        const existing = catMap.get(cat.slug);
        if (existing) {
          existing.count++;
        } else {
          catMap.set(cat.slug, { name: cat.name, slug: cat.slug, count: 1 });
        }
      }
    }

    return Array.from(catMap.values()).map((c, i) => ({
      id: `mdx_cat_${i}`,
      name: c.name,
      slug: c.slug,
      description: undefined,
      count: c.count,
    }));
  }

  async getAuthors(): Promise<BlogAuthor[]> {
    const posts = getAllMdxPosts();
    const authorMap = new Map<string, BlogAuthor>();

    for (const post of posts) {
      if (!authorMap.has(post.authorSlug)) {
        authorMap.set(post.authorSlug, {
          id: `mdx_author_${post.authorSlug}`,
          name: post.authorName,
          slug: post.authorSlug,
          description: undefined,
          avatar: post.authorAvatar,
        });
      }
    }

    return Array.from(authorMap.values());
  }

  async getPostsByCategory(
    categorySlug: string,
    limit: number = 10
  ): Promise<BlogPost[]> {
    const { posts } = await this.getPosts({ category: categorySlug, limit });
    return posts;
  }
}
