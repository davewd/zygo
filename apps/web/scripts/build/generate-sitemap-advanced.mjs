import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { sitemapConfig } from './sitemap.config.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const SITE_URL = sitemapConfig.siteUrl;
const OUTPUT_PATH = path.join(__dirname, '../../dist', sitemapConfig.sitemapPath);
const DATA_PATH = path.join(__dirname, '../../dist/data'); // Path to your data directory

// Static routes with priorities and change frequencies
const staticRoutes = [
  { path: '/', priority: '1.0', changefreq: 'daily' },
  { path: '/login', priority: '0.3', changefreq: 'monthly' },
  { path: '/signup', priority: '0.3', changefreq: 'monthly' },
  { path: '/feed', priority: '0.9', changefreq: 'daily' },
  { path: '/community', priority: '0.8', changefreq: 'weekly' },
  { path: '/community/profiles', priority: '0.7', changefreq: 'weekly' },
  { path: '/community/providers', priority: '0.7', changefreq: 'weekly' },
  { path: '/credentials', priority: '0.8', changefreq: 'weekly' },
  { path: '/credentials/providers', priority: '0.7', changefreq: 'weekly' },
  { path: '/credentials/verify', priority: '0.6', changefreq: 'monthly' },
  { path: '/credentials/search', priority: '0.6', changefreq: 'weekly' },
  { path: '/network', priority: '0.8', changefreq: 'weekly' },
  { path: '/community/services', priority: '0.7', changefreq: 'weekly' },
  { path: '/community/centers', priority: '0.7', changefreq: 'weekly' },
  { path: '/community/providers', priority: '0.7', changefreq: 'weekly' },
  { path: '/community/network-providers', priority: '0.7', changefreq: 'weekly' },
  { path: '/tools', priority: '0.8', changefreq: 'weekly' },
  { path: '/tools/postnatal/breastfeeding-timer', priority: '0.6', changefreq: 'monthly' },
  { path: '/timeline', priority: '0.9', changefreq: 'weekly' },
].map(route => {
  // Apply custom configurations from config file
  const customConfig = sitemapConfig.customRoutes[route.path] || {};
  return { ...route, ...customConfig };
}).filter(route => !sitemapConfig.exclude.includes(route.path));

// Function to load and parse data files
async function loadDataFiles() {
  const dataFiles = {};
  
  try {
    // Load your data files if they exist
    const listJsonPath = path.join(DATA_PATH, 'list.json');
    if (fs.existsSync(listJsonPath)) {
      dataFiles.list = JSON.parse(fs.readFileSync(listJsonPath, 'utf8'));
    }
    
    const timelineJsonPath = path.join(DATA_PATH, 'timeline.json');
    if (fs.existsSync(timelineJsonPath)) {
      dataFiles.timeline = JSON.parse(fs.readFileSync(timelineJsonPath, 'utf8'));
    }
    
    const pedagogyJsonPath = path.join(DATA_PATH, 'pedagogy.json');
    if (fs.existsSync(pedagogyJsonPath)) {
      dataFiles.pedagogy = JSON.parse(fs.readFileSync(pedagogyJsonPath, 'utf8'));
    }
  } catch (error) {
    console.warn('Warning: Could not load data files:', error.message);
  }
  
  return dataFiles;
}

// Function to generate dynamic routes from data
function generateDynamicRoutes(dataFiles) {
  const dynamicRoutes = [];
  
  // Example: Generate timeline milestone routes
  if (dataFiles.timeline && Array.isArray(dataFiles.timeline)) {
    dataFiles.timeline.forEach(milestone => {
      if (milestone.id) {
        dynamicRoutes.push({
          path: `/timeline/milestone/${milestone.id}`,
          priority: '0.6',
          changefreq: 'monthly',
          lastmod: milestone.updatedAt || milestone.createdAt
        });
      }
    });
  }
  
  // Add more dynamic route generation based on your data structure
  // Example for profiles, providers, etc.
  
  return dynamicRoutes;
}

// Function to generate sitemap XML
function generateSitemapXML(routes) {
  const currentDate = new Date().toISOString();
  
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">`;

  routes.forEach(route => {
    const lastmod = route.lastmod || currentDate;
    sitemap += `
  <url>
    <loc>${SITE_URL}${route.path}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`;
  });

  sitemap += `
</urlset>`;
  
  return sitemap;
}

// Main function to generate sitemap
async function generateSitemap() {
  try {
    console.log('🚀 Generating sitemap...');
    
    // Load data files
    const dataFiles = await loadDataFiles();
    
    // Generate dynamic routes from data
    const dynamicRoutes = generateDynamicRoutes(dataFiles);
    
    // Combine static and dynamic routes
    const allRoutes = [...staticRoutes, ...dynamicRoutes];
    
    // Generate XML
    const sitemapXML = generateSitemapXML(allRoutes);
    
    // Ensure the dist directory exists
    const distDir = path.dirname(OUTPUT_PATH);
    if (!fs.existsSync(distDir)) {
      fs.mkdirSync(distDir, { recursive: true });
    }
    
    // Write the sitemap
    fs.writeFileSync(OUTPUT_PATH, sitemapXML);
    
    console.log(`✅ Sitemap generated successfully!`);
    console.log(`📁 Location: ${OUTPUT_PATH}`);
    console.log(`📊 Static routes: ${staticRoutes.length}`);
    console.log(`📊 Dynamic routes: ${dynamicRoutes.length}`);
    console.log(`📊 Total URLs: ${allRoutes.length}`);
    console.log(`🌐 Site URL: ${SITE_URL}`);
    
  } catch (error) {
    console.error('❌ Error generating sitemap:', error);
    process.exit(1);
  }
}

// Generate sitemap when script is run directly
if (import.meta.url === `file://${process.argv[1]}`) {
  generateSitemap();
}

export { generateSitemap };
