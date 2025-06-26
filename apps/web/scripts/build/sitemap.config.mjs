// Sitemap configuration
export const sitemapConfig = {
  // Your website's base URL - IMPORTANT: Change this to your actual domain
  siteUrl: process.env.SITE_URL || 'https://your-domain.com',
  
  // Output paths (relative to dist folder)
  sitemapPath: 'sitemap.xml',
  robotsPath: 'robots.txt',
  
  // Default values for routes
  defaults: {
    changefreq: 'weekly',
    priority: '0.7'
  },
  
  // Routes to exclude from sitemap (if any)
  exclude: [
    // '/admin',
    // '/private'
  ],
  
  // Custom route configurations
  customRoutes: {
    '/': { priority: '1.0', changefreq: 'daily' },
    '/feed': { priority: '0.9', changefreq: 'daily' },
    '/login': { priority: '0.3', changefreq: 'monthly' },
    '/signup': { priority: '0.3', changefreq: 'monthly' },
    '/tools/postnatal/breastfeeding-timer': { priority: '0.6', changefreq: 'monthly' }
  },
  
  // Dynamic route settings
  dynamicRoutes: {
    // If you have API endpoints to fetch dynamic data
    // apiEndpoints: {
    //   profiles: '/api/profiles',
    //   providers: '/api/providers'
    // }
  }
};
