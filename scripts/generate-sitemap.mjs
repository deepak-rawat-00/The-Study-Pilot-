import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const BASE_URL = 'https://thestudypilot.space';
const TODAY = '2026-11-23';

const STATIC_ROUTES = [
  { path: '/', priority: '1.0', changefreq: 'weekly' },
  { path: '/about', priority: '0.8', changefreq: 'monthly' },
  { path: '/blog', priority: '0.9', changefreq: 'weekly' },
  { path: '/resources', priority: '0.9', changefreq: 'weekly' },
  { path: '/tools', priority: '0.9', changefreq: 'weekly' },
  { path: '/privacy', priority: '0.6', changefreq: 'monthly' },
  { path: '/terms', priority: '0.6', changefreq: 'monthly' },
  { path: '/contact', priority: '0.7', changefreq: 'monthly' },
];

const ARTICLES = [
  { slug: 'how-to-create-a-study-schedule', priority: '0.9' },
  { slug: 'how-to-study-consistently', priority: '0.85' },
  { slug: 'how-to-stop-procrastinating-while-studying', priority: '0.85' },
  { slug: 'how-to-plan-multiple-subjects', priority: '0.85' },
  { slug: 'how-to-track-study-time', priority: '0.85' },
  { slug: 'pomodoro-technique-vs-deep-work', priority: '0.85' },
  { slug: 'how-to-create-a-weekly-study-plan', priority: '0.85' },
  { slug: 'competitive-exam-study-plan', priority: '0.85' },
  { slug: 'how-to-study-with-limited-time', priority: '0.85' },
  { slug: 'how-to-restart-studying-after-losing-motivation', priority: '0.85' },
  { slug: 'how-to-build-a-study-habit', priority: '0.85' },
];

const TOOLS = [
  { slug: 'study-planner-generator', priority: '0.9' },
  { slug: 'weekly-study-planner', priority: '0.9' },
  { slug: 'study-hours-calculator', priority: '0.9' },
  { slug: 'pomodoro-timer', priority: '0.9' },
  { slug: 'study-habit-tracker', priority: '0.9' },
  { slug: 'study-consistency-calculator', priority: '0.9' },
  { slug: 'exam-countdown', priority: '0.9' },
  { slug: 'exam-preparation-progress', priority: '0.9' },
];

export function generateSitemapXml() {
  const urls = [];

  // 1. Root & Static Core
  STATIC_ROUTES.forEach((route) => {
    urls.push({
      loc: `${BASE_URL}${route.path}`,
      lastmod: TODAY,
      changefreq: route.changefreq,
      priority: route.priority,
    });
  });

  // 2. Blog Articles
  ARTICLES.forEach((art) => {
    urls.push({
      loc: `${BASE_URL}/blog/${art.slug}`,
      lastmod: TODAY,
      changefreq: 'weekly',
      priority: art.priority,
    });
  });

  // 3. Tools
  TOOLS.forEach((tool) => {
    urls.push({
      loc: `${BASE_URL}/tools/${tool.slug}`,
      lastmod: TODAY,
      changefreq: 'weekly',
      priority: tool.priority,
    });
  });

  // Sort logically: Root first, About, Blog + Articles, Resources, Tools + Tool Pages, Legal
  const order = [
    '/',
    '/about',
    '/blog',
    ...ARTICLES.map((a) => `/blog/${a.slug}`),
    '/resources',
    '/tools',
    ...TOOLS.map((t) => `/tools/${t.slug}`),
    '/privacy',
    '/terms',
    '/contact',
  ];

  urls.sort((a, b) => {
    const aPath = a.loc.replace(BASE_URL, '') || '/';
    const bPath = b.loc.replace(BASE_URL, '') || '/';
    return order.indexOf(aPath) - order.indexOf(bPath);
  });

  const xmlEntries = urls
    .map(
      (u) => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${u.lastmod}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`
    )
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${xmlEntries}
</urlset>
`;
}

// Run directly if invoked via node
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const xml = generateSitemapXml();
  const sitemapPath = path.join(rootDir, 'public', 'sitemap.xml');
  fs.writeFileSync(sitemapPath, xml, 'utf-8');
  console.log(`Generated sitemap with ${urlsCount(xml)} URLs at: ${sitemapPath}`);
}

function urlsCount(xml) {
  const matches = xml.match(/<loc>/g);
  return matches ? matches.length : 0;
}
