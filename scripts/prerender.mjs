import fs from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const distDir = path.join(rootDir, 'dist');
const distSsrDir = path.join(rootDir, 'dist-ssr');

// Polyfill minimal browser globals for clean SSR execution without warnings
if (typeof globalThis.localStorage === 'undefined') {
  globalThis.localStorage = {
    getItem: () => null,
    setItem: () => {},
    removeItem: () => {},
    clear: () => {},
  };
}

function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

async function runPrerender() {
  console.log('--- Step 1: Building SSR Bundle ---');
  execSync('npx vite build --ssr src/entry-prerender.tsx --outDir dist-ssr', {
    cwd: rootDir,
    stdio: 'inherit',
  });

  const entryFile = path.join(distSsrDir, 'entry-prerender.js');
  const { ROUTES, renderRoute } = await import(pathToFileURL(entryFile).href);

  console.log(`--- Step 2: Prerendering ${ROUTES.length} routes ---`);
  const templateHtml = fs.readFileSync(path.join(distDir, 'index.html'), 'utf-8');

  for (const route of ROUTES) {
    const { html, meta } = renderRoute(route);

    let pageHtml = templateHtml;

    // 1. Replace Title
    pageHtml = pageHtml.replace(
      /<title>[\s\S]*?<\/title>/i,
      `<title>${escapeHtml(meta.title)}</title>`
    );

    // 2. Replace Meta Description
    pageHtml = pageHtml.replace(
      /<meta\s+name="description"\s+content="[\s\S]*?"\s*\/?>/i,
      `<meta name="description" content="${escapeHtml(meta.description)}" />`
    );

    // 3. Replace Canonical Link
    pageHtml = pageHtml.replace(
      /<link\s+rel="canonical"\s+href="[\s\S]*?"\s*\/?>/i,
      `<link rel="canonical" href="${meta.canonicalUrl}" />`
    );

    // 4. Replace OG Tags
    pageHtml = pageHtml.replace(
      /<meta\s+property="og:title"\s+content="[\s\S]*?"\s*\/?>/i,
      `<meta property="og:title" content="${escapeHtml(meta.title)}" />`
    );
    pageHtml = pageHtml.replace(
      /<meta\s+property="og:description"\s+content="[\s\S]*?"\s*\/?>/i,
      `<meta property="og:description" content="${escapeHtml(meta.description)}" />`
    );
    pageHtml = pageHtml.replace(
      /<meta\s+property="og:url"\s+content="[\s\S]*?"\s*\/?>/i,
      `<meta property="og:url" content="${meta.canonicalUrl}" />`
    );

    // 5. Replace Twitter Tags
    pageHtml = pageHtml.replace(
      /<meta\s+name="twitter:title"\s+content="[\s\S]*?"\s*\/?>/i,
      `<meta name="twitter:title" content="${escapeHtml(meta.title)}" />`
    );
    pageHtml = pageHtml.replace(
      /<meta\s+name="twitter:description"\s+content="[\s\S]*?"\s*\/?>/i,
      `<meta name="twitter:description" content="${escapeHtml(meta.description)}" />`
    );

    // 6. Robots directive (noindex for 404)
    if (meta.noindex) {
      pageHtml = pageHtml.replace(
        /<meta\s+name="robots"\s+content="[\s\S]*?"\s*\/?>/i,
        `<meta name="robots" content="noindex, nofollow" />`
      );
    }

    // 7. Replace root container with prerendered HTML body
    pageHtml = pageHtml.replace(
      '<div id="root"></div>',
      `<div id="root">${html}</div>`
    );

    // Determine target output file
    let targetPath;
    if (route === '/') {
      targetPath = path.join(distDir, 'index.html');
    } else if (route === '/404') {
      targetPath = path.join(distDir, '404.html');
    } else {
      const folderPath = path.join(distDir, route.replace(/^\//, ''));
      fs.mkdirSync(folderPath, { recursive: true });
      targetPath = path.join(folderPath, 'index.html');
    }

    fs.writeFileSync(targetPath, pageHtml, 'utf-8');
    console.log(`  ✓ Prerendered [${meta.noindex ? 'NOINDEX' : '200'}]: ${route} -> ${path.relative(rootDir, targetPath)}`);
  }

  // Ensure Cloudflare Pages _redirects file is in dist
  const publicRedirects = path.join(rootDir, 'public', '_redirects');
  const distRedirects = path.join(distDir, '_redirects');
  if (fs.existsSync(publicRedirects)) {
    fs.copyFileSync(publicRedirects, distRedirects);
    console.log('  ✓ Verified Cloudflare Pages _redirects in dist');
  }

  // Cleanup dist-ssr
  fs.rmSync(distSsrDir, { recursive: true, force: true });
  console.log('--- Step 3: Prerendering Completed Successfully ---');
}

runPrerender().catch((err) => {
  console.error('Prerendering failed:', err);
  process.exit(1);
});
