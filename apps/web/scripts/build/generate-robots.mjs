import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { sitemapConfig } from './sitemap.config.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const SITE_URL = sitemapConfig.siteUrl;
const OUTPUT_PATH = path.join(__dirname, '../../dist', sitemapConfig.robotsPath);

function generateRobotsTxt() {
  const robotsTxt = `User-agent: *
Allow: /

# Sitemap
Sitemap: ${SITE_URL}/sitemap.xml

# Common crawl delay (optional)
Crawl-delay: 1

# Disallow certain paths if needed
# Disallow: /admin
# Disallow: /private
`;

  // Ensure the dist directory exists
  const distDir = path.dirname(OUTPUT_PATH);
  if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir, { recursive: true });
  }

  // Write the robots.txt
  fs.writeFileSync(OUTPUT_PATH, robotsTxt);
  console.log(`✅ robots.txt generated at ${OUTPUT_PATH}`);
}

// Generate robots.txt when script is run directly
if (import.meta.url === `file://${process.argv[1]}`) {
  generateRobotsTxt();
}

export { generateRobotsTxt };
