/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: false,
  images: {
    domains: [],
    unoptimized: false,
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
  },
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  allowedDevOrigins: [
    '*.replit.dev',
    '*.spock.replit.dev',
  ],
  turbopack: {
    resolveAlias: {
      '@assets': './attached_assets',
      '@/assets': './src/assets',
    },
  },
  async redirects() {
    return [
      // www → non-www (DNS/CDN should also handle this at the infrastructure
      // level; this rule covers any traffic that reaches Next.js with a www host).
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.woofdogs.com' }],
        destination: 'https://woofdogs.com/:path*',
        permanent: true,
      },
      // Old slug redirects (pre-existing)
      {
        source: '/about-us',
        destination: '/about',
        permanent: true,
      },
      {
        source: '/dog-training',
        destination: '/obedience',
        permanent: true,
      },
      // Stale URLs found in Google Search Console export.
      // Trailing-slash variants are included explicitly so the final destination
      // is reached in a single hop (trailingSlash: false would otherwise strip
      // the slash first, then our rule fires — two hops instead of one).
      {
        source: '/ask-for-an-evaluation',
        destination: '/evaluation',
        permanent: true,
      },
      {
        source: '/ask-for-an-evaluation/',
        destination: '/evaluation',
        permanent: true,
      },
      {
        source: '/certified-therapy-dog',
        destination: '/service-animal-training',
        permanent: true,
      },
      {
        source: '/certified-therapy-dog/',
        destination: '/service-animal-training',
        permanent: true,
      },
    ];
  },
  async headers() {
    const isProd = process.env.NODE_ENV === 'production';

    const securityHeaders = [
      { key: 'X-Content-Type-Options', value: 'nosniff' },
      { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
      { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
      {
        key: 'Permissions-Policy',
        value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
      },
    ];

    if (isProd) {
      securityHeaders.push({
        key: 'Strict-Transport-Security',
        value: 'max-age=63072000; includeSubDomains; preload',
      });
    }

    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
      {
        source: '/',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400',
          },
          {
            key: 'Vary',
            value: 'Accept-Encoding',
          },
        ],
      },
      {
        source: '/:all*(svg|jpg|jpeg|png|webp|avif|gif|ico|woff|woff2|ttf|otf)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
}

export default nextConfig;
