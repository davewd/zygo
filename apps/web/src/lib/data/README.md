# Sample Data Organization

This document describes the complete organization of all sample/mock data extracted from the Zygo codebase and organized into JSON files within the `/apps/web/src/lib/data/` directory.

## Directory Structure

```
/apps/web/src/lib/data/
├── actors/
│   ├── community_members.json
│   └── service_providers.json
├── credentials/
│   ├── credential_providers.json
│   └── personal_credentials.json
├── feed/
│   ├── feed_items.json
│   ├── blog_posts.json
│   └── list_data.json
├── pedagogy/
│   └── sample_pedagogy.json
├── centers/
│   ├── service_centers.json
│   └── additional_centers.json
├── milestones/
│   └── comprehensive_milestones.json
└── timeline/
    └── timeline_data.json
```

## Data Sources and Content

### Actors
- **community_members.json**: Sample community members and families extracted from `/apps/web/src/data/community/primaryConsumers.ts`
- **service_providers.json**: Service providers from various network centers including Rebecca Cavallaro, healthcare providers, coaches, and educators

### Credentials
- **credential_providers.json**: Credential issuing organizations extracted from `/apps/web/src/data/credentials/credentialProviders_new.ts`
- **personal_credentials.json**: Example personal credentials from `/apps/web/src/data/credentials/exampleCredentials.ts`

### Feed
- **feed_items.json**: Sample feed items including breastfeeding data, sponsored content, and various post types from `/apps/web/src/lib/api/feed.ts`
- **blog_posts.json**: Blog posts and social content from `/apps/web/src/data/network/blogPosts.ts` and related conversion utilities
- **list_data.json**: Additional feed/list data extracted from `/data/list.json`

### Pedagogy
- **sample_pedagogy.json**: Comprehensive developmental milestone tracking data for families, including composite and simple milestones from `/data/pedagogy.json`

### Centers
- **service_centers.json**: Major service centers including Full Circle, Calmbirth, Active8Kids, Elixr, White City Tennis, Kickeroos, EMOG, Kidney Nutrition, Start Training, etc.
- **additional_centers.json**: Additional specialized centers like Mummy's Whispers, St Mary's Childcare, and Kambala School

### Milestones
- **comprehensive_milestones.json**: Detailed developmental milestones from prenatal to adolescence extracted from `/apps/web/public/data/comprehensive-milestones.csv`

### Timeline
- **timeline_data.json**: Timeline/journey data extracted from `/data/timeline.json`

## Data Types Covered

1. **Community Members**: Families, parents, children, grandparents with relationships and provider connections
2. **Service Providers**: Healthcare professionals, coaches, educators, dietitians, etc.
3. **Service Centers**: Clinics, schools, activity centers, sports facilities
4. **Credentials**: Professional qualifications, certifications, and issuing bodies
5. **Feed Content**: Social posts, breastfeeding data, sponsored content, milestone updates
6. **Developmental Data**: Milestones, pedagogy tracking, age-appropriate activities
7. **Timeline Events**: Journey milestones and achievement tracking

## Key Features

- **Comprehensive Coverage**: All major sample data types from the codebase
- **Structured Format**: Consistent JSON formatting for easy consumption
- **Real-world Examples**: Realistic data representing actual use cases
- **Relationship Mapping**: Family relationships, provider connections, and service associations
- **Age Grouping**: Appropriate categorization from prenatal to adolescent stages
- **Multilingual Support**: Some providers and content in multiple languages
- **Geographic Distribution**: Australian-focused with various states and locations

## Usage

This organized sample data can be used for:
- Development and testing
- UI/UX prototyping
- Demo environments
- Data schema validation
- Feature development
- Integration testing
- User experience research

## Data Sources

Original data extracted from:
- TypeScript files in `/apps/web/src/data/`
- API implementation files in `/apps/web/src/lib/api/`
- CSV files in `/apps/web/public/data/`
- Root-level JSON files in `/data/`
- Network center definitions
- Feed conversion utilities
- Test implementation files

All data has been converted to valid JSON format and organized by entity type for easy access and maintenance.
