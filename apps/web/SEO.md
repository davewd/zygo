# SEO Configuration

This document describes the automated sitemap and SEO file generation setup for the Zygo web application.

## Overview

The project automatically generates a `sitemap.xml` and `robots.txt` file during the build process to improve SEO and help search engines discover and index the website.

## Files Structure

```
apps/web/
├── scripts/
│   ├── build/
│   │   ├── generate-sitemap-advanced.mjs  # Main sitemap generator
│   │   ├── generate-robots.mjs            # Robots.txt generator
│   │   ├── sitemap-plugin.mjs             # Vite plugin for automatic generation
│   │   └── sitemap.config.mjs             # Configuration file
│   └── generate-sitemap.mjs               # Simple sitemap generator (legacy)
└── dist/
    ├── sitemap.xml                        # Generated sitemap
    └── robots.txt                         # Generated robots.txt
```

## Configuration

### Site URL Configuration

The site URL is configured in `scripts/build/sitemap.config.mjs`:

```javascript
export const sitemapConfig = {
  siteUrl: process.env.SITE_URL || 'https://www.zygo.app',
  // ... other configuration
};
```

You can override the site URL using the `SITE_URL` environment variable:

```bash
SITE_URL=https://staging.zygo.app npm run build
```

### Route Configuration

Static routes are automatically extracted from your React Router configuration in `src/routes.tsx`. You can customize route priorities and change frequencies in `sitemap.config.mjs`:

```javascript
customRoutes: {
  '/': { priority: '1.0', changefreq: 'daily' },
  '/feed': { priority: '0.9', changefreq: 'daily' },
  '/login': { priority: '0.3', changefreq: 'monthly' },
  // ... more routes
}
```

## Build Integration

### Automatic Generation

The sitemap is automatically generated during the build process via the Vite plugin:

```javascript
// vite.config.ts
plugins: [
  react(), 
  tailwindcss(), 
  sitemapPlugin({
    generateOnBuild: true,
    generateOnDev: false
  })
]
```

### Manual Generation

You can also generate the SEO files manually using npm scripts:

```bash
# Generate sitemap only
npm run generate-sitemap

# Generate robots.txt only
npm run generate-robots

# Generate both files
npm run generate-seo
```

## GitHub Actions Integration

### Main Deployment (static.yml)

The main deployment workflow automatically generates the sitemap during build and verifies the files:

```yaml
- name: Build project with sitemap
  run: pnpm scratch:build
  env:
    SITE_URL: https://www.zygo.app

- name: Verify sitemap generation
  run: |
    ls -la ./apps/web/dist/sitemap.xml
    ls -la ./apps/web/dist/robots.txt
    echo "Sitemap contains $(grep -c '<url>' ./apps/web/dist/sitemap.xml) URLs"
```

### Pull Request Preview (firebase-hosting-pull-request.yml)

Pull request deployments also generate sitemaps with preview URLs and include verification steps.

### Dedicated Sitemap Generation (generate-sitemap.yml)

A dedicated workflow runs:
- Weekly (Mondays at 2 AM UTC) to update sitemaps
- When route or content files change
- Manually via workflow dispatch

### SEO Validation (seo-validation.yml)

A validation workflow runs on pull requests to ensure:
- Sitemap generation works correctly
- Generated files have valid structure
- All required elements are present
- Provides a summary report in PR comments

## Generated Files

### sitemap.xml

The generated sitemap includes:
- All static routes from React Router
- Proper XML structure with schema validation
- Configurable priorities and change frequencies
- Last modification timestamps
- Support for dynamic routes (future enhancement)

Example structure:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://www.zygo.app/</loc>
    <lastmod>2025-06-26T07:39:22.208Z</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <!-- ... more URLs -->
</urlset>
```

### robots.txt

The robots.txt file includes:
- Search engine permissions
- Sitemap location reference
- Crawl delay settings
- Optional path restrictions

Example:
```
User-agent: *
Allow: /

# Sitemap
Sitemap: https://www.zygo.app/sitemap.xml

# Common crawl delay (optional)
Crawl-delay: 1
```

## Monitoring and Maintenance

### Verification

After deployment, verify the files are accessible:
- https://www.zygo.app/sitemap.xml
- https://www.zygo.app/robots.txt

### Search Console

Submit the sitemap to Google Search Console:
1. Go to Google Search Console
2. Navigate to Sitemaps
3. Add: `https://www.zygo.app/sitemap.xml`

### Updates

The sitemap automatically updates when:
- New routes are added to `src/routes.tsx`
- The build process runs
- Content in tracked directories changes

## Troubleshooting

### Sitemap Not Generated

1. Check build logs for errors
2. Verify file paths in configuration
3. Ensure `dist` directory exists
4. Check environment variables

### Missing URLs

1. Verify routes are defined in `src/routes.tsx`
2. Check route exclusions in `sitemap.config.mjs`
3. Ensure static routes array is updated

### Wrong Domain

1. Check `SITE_URL` environment variable
2. Verify `sitemap.config.mjs` configuration
3. Ensure correct environment variables in CI/CD

## Future Enhancements

- [ ] Dynamic route generation from API data
- [ ] Image sitemap support
- [ ] Multi-language sitemap support
- [ ] Automatic sitemap submission to search engines
- [ ] Sitemap index for large sites
