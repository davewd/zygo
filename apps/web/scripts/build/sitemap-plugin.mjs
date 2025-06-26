import { generateRobotsTxt } from './generate-robots.mjs';
import { generateSitemap } from './generate-sitemap-advanced.mjs';

/**
 * Vite plugin to generate sitemap and robots.txt during build
 */
export function sitemapPlugin(options = {}) {
  return {
    name: 'sitemap-generator',
    
    // Generate sitemap and robots.txt after build is complete
    writeBundle() {
      if (options.generateOnBuild !== false) {
        generateSitemap();
        if (options.generateRobots !== false) {
          generateRobotsTxt();
        }
      }
    },
    
    // Optionally generate sitemap during development
    buildStart() {
      if (options.generateOnDev === true) {
        generateSitemap();
        if (options.generateRobots !== false) {
          generateRobotsTxt();
        }
      }
    }
  };
}
