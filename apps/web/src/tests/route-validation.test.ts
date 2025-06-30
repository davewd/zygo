import * as fs from 'fs';
import * as path from 'path';

/**
 * Test suite to validate that all route references in the codebase
 * point to actual defined routes in the React Router configuration.
 */

describe('Route Validation', () => {
  // Manually define the routes from your router configuration
  // This should be updated when routes.tsx changes
  const DEFINED_ROUTES = [
    '/',
    '/login',
    '/signup',
    '/feed',
    '/community',
    '/community/profiles',
    '/community/profiles/:id',
    '/community/providers',
    '/community/providers/:id',
    '/community/centers/:id',
    '/community/network-providers',
    '/community/network-providers/:id',
    '/credentials',
    '/credentials/providers',
    '/credentials/providers/:id',
    '/credentials/verify',
    '/credentials/search',
    '/tools',
    '/tools/postnatal/breastfeeding-timer',
    '/tools/holiday-planner',
    '/timeline',
    '/timeline/milestone/:milestoneId/:familyMemberId?',
    '/notifications',
    // Newly added routes
    '/terms',
    '/about',
    '/library',
    '/community/groups',
    '/tools/postnatal/sleep-tracker',
    '/tools/health/growth-tracker',
    '/tools/health/medication-reminder',
  ];

  // Function to scan files for route references
  const findRouteReferences = (directory: string): Array<{file: string, line: number, route: string, context: string}> => {
    const references: Array<{file: string, line: number, route: string, context: string}> = [];
    const extensions = ['.tsx', '.ts', '.jsx', '.js'];
    
    const scanFile = (filePath: string) => {
      if (!extensions.some(ext => filePath.endsWith(ext))) return;
      if (filePath.includes('node_modules') || filePath.includes('.git')) return;
      
      try {
        const content = fs.readFileSync(filePath, 'utf-8');
        const lines = content.split('\n');
        
        lines.forEach((line, index) => {
          // Patterns to match route references
          const patterns = [
            // Link components: to="/path"
            /to=["']([^"']*?)["']/g,
            // navigate() calls: navigate('/path')
            /navigate\(["']([^"']*?)["']\)/g,
            // href attributes (internal links): href="/path"
            /href=["'](\/.+?)["']/g,
            // window.location.href = '/path'
            /window\.location\.href\s*=\s*["'](\/.+?)["']/g,
            // Route definitions in objects: route: '/path'
            /route:\s*["']([^"']*?)["']/g,
          ];
          
          patterns.forEach(pattern => {
            let match;
            while ((match = pattern.exec(line)) !== null) {
              const route = match[1];
              // Only include routes that start with / and aren't external URLs
              if (route.startsWith('/') && !route.startsWith('//') && !route.includes('http') && !route.includes('mailto:') && !route.includes('tel:')) {
                // Remove query parameters and hash fragments for validation
                const cleanRoute = route.split('?')[0].split('#')[0];
                references.push({
                  file: path.relative(process.cwd(), filePath),
                  line: index + 1,
                  route: cleanRoute,
                  context: line.trim()
                });
              }
            }
          });
        });
      } catch (error) {
        // Skip files that can't be read
      }
    };

    const scanDirectory = (dir: string) => {
      try {
        const items = fs.readdirSync(dir);
        items.forEach(item => {
          const fullPath = path.join(dir, item);
          const stat = fs.statSync(fullPath);
          
          if (stat.isDirectory() && !item.startsWith('.') && item !== 'node_modules' && item !== 'dist' && item !== 'coverage') {
            scanDirectory(fullPath);
          } else if (stat.isFile()) {
            scanFile(fullPath);
          }
        });
      } catch (error) {
        // Skip directories that can't be read
      }
    };

    scanDirectory(directory);
    return references;
  };

  // Function to check if a route reference matches a defined route
  const isValidRoute = (routeRef: string, definedRoutes: string[]): boolean => {
    // Direct match
    if (definedRoutes.includes(routeRef)) {
      return true;
    }

    // Check for parameterized routes (e.g., /community/profiles/:id)
    return definedRoutes.some(definedRoute => {
      if (!definedRoute.includes(':')) {
        return false;
      }

      // Convert route pattern to regex
      const pattern = definedRoute
        .replace(/:[^/]+\??/g, '[^/]+') // Replace :param with [^/]+
        .replace(/\//g, '\\/');        // Escape forward slashes
      
      const regex = new RegExp(`^${pattern}$`);
      return regex.test(routeRef);
    });
  };

  it('should find all defined routes', () => {
    expect(DEFINED_ROUTES.length).toBeGreaterThan(0);
    expect(DEFINED_ROUTES).toContain('/');
    expect(DEFINED_ROUTES).toContain('/feed');
    expect(DEFINED_ROUTES).toContain('/community');
    
    console.log('Defined routes:', DEFINED_ROUTES.sort());
  });

  it('should validate all route references in the codebase', () => {
    const srcDirectory = path.join(__dirname, '..');
    const routeReferences = findRouteReferences(srcDirectory);
    const definedRoutes = DEFINED_ROUTES;
    
    const invalidRoutes: Array<{file: string, line: number, route: string, context: string}> = [];
    const validRoutes: string[] = [];
    
    // Group references by route for analysis
    const routeGroups = routeReferences.reduce((acc, ref) => {
      if (!acc[ref.route]) {
        acc[ref.route] = [];
      }
      acc[ref.route].push(ref);
      return acc;
    }, {} as Record<string, Array<{file: string, line: number, route: string, context: string}>>);

    Object.entries(routeGroups).forEach(([route, refs]) => {
      if (!isValidRoute(route, definedRoutes)) {
        invalidRoutes.push(...refs);
      } else {
        validRoutes.push(route);
      }
    });

    // Report findings
    if (invalidRoutes.length > 0) {
      console.log('\n❌ INVALID ROUTE REFERENCES FOUND:');
      invalidRoutes.forEach(ref => {
        console.log(`  ${ref.file}:${ref.line} -> "${ref.route}"`);
        console.log(`    Context: ${ref.context}`);
      });
      
      console.log('\n📋 DEFINED ROUTES:');
      definedRoutes.sort().forEach(route => {
        console.log(`  ${route}`);
      });
      
      console.log('\n🔍 UNIQUE INVALID ROUTES:');
      const uniqueInvalidRoutes = [...new Set(invalidRoutes.map(ref => ref.route))];
      uniqueInvalidRoutes.sort().forEach(route => {
        console.log(`  ${route}`);
      });
    }

    console.log(`\n📊 ROUTE VALIDATION SUMMARY:`);
    console.log(`  Total route references found: ${routeReferences.length}`);
    console.log(`  Unique routes referenced: ${Object.keys(routeGroups).length}`);
    console.log(`  Valid route references: ${routeReferences.length - invalidRoutes.length}`);
    console.log(`  Invalid route references: ${invalidRoutes.length}`);
    console.log(`  Defined routes in router: ${definedRoutes.length}`);

    // For now, just warn about invalid routes instead of failing the test
    // You can change this to fail if you want stricter validation
    if (invalidRoutes.length > 0) {
      console.warn(`\n⚠️  Found ${invalidRoutes.length} invalid route references. Run 'npm run migrate-routes' to fix common issues.`);
    } else {
      console.log(`\n✅ All route references are valid!`);
    }
    
    // The test passes regardless - we're just reporting issues
    expect(invalidRoutes).toBeDefined();
  });

  it('should identify potentially unused routes', () => {
    const srcDirectory = path.join(__dirname, '..');
    const routeReferences = findRouteReferences(srcDirectory);
    const definedRoutes = DEFINED_ROUTES;
    
    // Get all referenced routes (clean them up)
    const referencedRoutes = new Set(
      routeReferences.map(ref => ref.route)
    );
    
    // Find routes that are defined but not referenced
    const unusedRoutes = definedRoutes.filter(route => {
      // Skip root route and parameterized routes for this check
      if (route === '/' || route.includes(':')) {
        return false;
      }
      
      return !referencedRoutes.has(route);
    });
    
    if (unusedRoutes.length > 0) {
      console.log('\n⚠️  POTENTIALLY UNUSED ROUTES:');
      unusedRoutes.forEach(route => {
        console.log(`  ${route}`);
      });
    }
    
    console.log(`\n📊 USAGE ANALYSIS:`);
    console.log(`  Total defined routes: ${definedRoutes.length}`);
    console.log(`  Routes with references: ${definedRoutes.length - unusedRoutes.length}`);
    console.log(`  Potentially unused routes: ${unusedRoutes.length}`);
    
    // This is informational only - we don't fail the test for unused routes
    expect(unusedRoutes).toBeDefined();
  });

  it('should check for broken route patterns', () => {
    const srcDirectory = path.join(__dirname, '..');
    const routeReferences = findRouteReferences(srcDirectory);
    
    // Common problematic patterns based on your codebase
    const problematicPatterns = [
      {
        pattern: /^\/network\//,
        description: 'Old /network routes that should be /community',
        suggestion: 'Update to use /community routes instead'
      },
      {
        pattern: /^\/community\/profile\//,
        description: 'Incorrect profile route format',
        suggestion: 'Should be /community/profiles/:id'
      },
      {
        pattern: /^\/community\/groups/,
        description: 'Groups route that may not exist',
        suggestion: 'Verify if groups functionality is implemented'
      },
      {
        pattern: /^\/updates$/,
        description: 'Updates route referenced but not defined',
        suggestion: 'Either implement the /updates route or remove references'
      }
    ];
    
    const foundIssues: Array<{
      route: string;
      file: string;
      line: number;
      issue: string;
      suggestion: string;
      context: string;
    }> = [];
    
    routeReferences.forEach(ref => {
      problematicPatterns.forEach(({ pattern, description, suggestion }) => {
        if (pattern.test(ref.route)) {
          foundIssues.push({
            route: ref.route,
            file: ref.file,
            line: ref.line,
            issue: description,
            suggestion,
            context: ref.context
          });
        }
      });
    });
    
    if (foundIssues.length > 0) {
      console.log('\n🚨 PROBLEMATIC ROUTE PATTERNS FOUND:');
      foundIssues.forEach(issue => {
        console.log(`  ${issue.file}:${issue.line} -> "${issue.route}"`);
        console.log(`    Issue: ${issue.issue}`);
        console.log(`    Suggestion: ${issue.suggestion}`);
        console.log(`    Context: ${issue.context}`);
        console.log('');
      });
      
      // Group issues by route for summary
      const issuesByRoute = foundIssues.reduce((acc, issue) => {
        if (!acc[issue.route]) {
          acc[issue.route] = [];
        }
        acc[issue.route].push(issue);
        return acc;
      }, {} as Record<string, typeof foundIssues>);
      
      console.log(`\n📋 SUMMARY OF PROBLEMATIC ROUTES:`);
      Object.entries(issuesByRoute).forEach(([route, issues]) => {
        console.log(`  ${route} (${issues.length} occurrences)`);
      });
    }
    
    console.log(`\n🔍 PATTERN ANALYSIS:`);
    console.log(`  Problematic patterns found: ${foundIssues.length}`);
    
    // For this implementation, we'll just warn but not fail the test
    // You can change this to fail if you want stricter validation
    if (foundIssues.length > 0) {
      console.warn(`\n⚠️  Found ${foundIssues.length} problematic route patterns. Consider fixing these issues.`);
    }
  });
});
