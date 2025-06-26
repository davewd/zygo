import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const SITE_URL = 'https://www.zygo.app'; 
const OUTPUT_PATH = path.join(__dirname, '../../dist'); 

// Static routes extracted from your routes.tsx
const staticRoutes = [
  '/',
  '/login',
  '/signup',
  '/feed',
  '/community',
  '/community/profiles',
  '/community/providers',
  '/credentials',
  '/credentials/providers',
  '/credentials/verify',
  '/credentials/search',
  '/network',
  '/network/services',
  '/network/centers',
  '/network/providers',
  '/network/network-providers',
  '/tools',
  '/tools/postnatal/breastfeeding-timer',
  '/timeline',
];

// Dynamic routes that might need additional data
const dynamicRoutes = [
  // '/community/profiles/:id',
  // '/community/providers/:id',
  // '/community/centers/:id',
  // '/credentials/providers/:id',
  // '/network/centers/:id',
  // '/network/providers/:id',
  // '/network/network-providers/:id',
  // '/timeline/milestone/:milestoneId/:familyMemberId?',
];

function generateSitemap() {
  const currentDate = new Date().toISOString();
  
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

  // Add static routes
  staticRoutes.forEach(route => {
    sitemap += `
  <url>
    <loc>${SITE_URL}${route}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${route === '/' ? '1.0' : '0.8'}</priority>
  </url>`;
  });

  // TODO: Add dynamic routes here if you have data to populate them
  // For example, if you have a list of profiles, providers, etc.
  // You would fetch that data and generate URLs for each item

  sitemap += `
</urlset>`;

  // Ensure the dist directory exists
  const distDir = path.dirname(OUTPUT_PATH);
  if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir, { recursive: true });
  }

  // Write the sitemap
  fs.writeFileSync(OUTPUT_PATH, sitemap);
  console.log(`✅ Sitemap generated at ${OUTPUT_PATH}`);
  console.log(`📊 Generated ${staticRoutes.length} URLs`);
}

// Generate sitemap when script is run directly
if (import.meta.url === `file://${process.argv[1]}`) {
  generateSitemap();
}

export { generateSitemap };
