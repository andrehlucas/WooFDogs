import { MetadataRoute } from 'next'
import { blogService } from '../../server/services/blogService'
import { CANONICAL_CATEGORIES, THIN_ARCHIVE_THRESHOLD } from '@/lib/blogCategories'

// Sitemap audit (SEO crawl-bloat cleanup):
// - All entries below have a real backing page (verified against src/app/**/page.tsx).
// - /therapy-dog is intentionally included — src/app/therapy-dog/page.tsx exists.
// - /ask-for-an-evaluation, /certified-therapy-dog, /boarding are NOT included here
//   because they are redirect-only pages, not canonical destinations.
// - No www variants, query strings, or phantom slugs are present.

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://woofdogs.com'

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/obedience`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/puppy-training`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/evaluation`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/behavioral-assessment`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/aggression-management`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/service-animal-training`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/therapy-dog`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/bootcamp`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/board-and-train`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/dog-boarding`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/dog-training-boca-raton`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/dog-training-wellington`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/dog-training-loxahatchee`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/dog-training-west-palm-beach`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/dog-training-delray-beach`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
  ]

  try {
    const { posts } = await blogService.getPosts({ limit: 100 })
    const blogPostPages: MetadataRoute.Sitemap = posts.map(post => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }))

    const categories = await blogService.getCategories()
    const aliasKeys = new Set(Object.keys(CANONICAL_CATEGORIES))
    const categoryPages: MetadataRoute.Sitemap = categories
      // Exclude zero-count and thin archives (below threshold) — they will be
      // noindexed anyway, so including them in the sitemap wastes crawl budget.
      .filter(cat => (cat.count ?? 0) >= THIN_ARCHIVE_THRESHOLD)
      // Exclude alias slugs that redirect to a canonical counterpart.
      .filter(cat => !aliasKeys.has(cat.slug))
      .map(cat => ({
        url: `${baseUrl}/blog/category/${cat.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.6,
      }))

    const authors = await blogService.getAuthors()
    const authorPages: MetadataRoute.Sitemap = authors.map(author => ({
      url: `${baseUrl}/blog/author/${author.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }))

    return [...staticPages, ...blogPostPages, ...categoryPages, ...authorPages]
  } catch {
    return staticPages
  }
}
