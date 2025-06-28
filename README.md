# Zygo - Family Development Platform

A comprehensive platform designed to support families throughout their development journey, from pregnancy to child development milestones, community connections, and health tracking.

## Overview

Zygo is a modern, TypeScript-based family development platform built with React, offering tools and resources to help families grow together. The platform includes community features, health tracking tools, educational resources, and professional services directory.

## Features

- **Timeline Development Tracking**: Visual milestone tracking with age-appropriate development categories
- **Community Hub**: Connect with other families, share experiences, and build support networks
- **Professional Services Directory**: Find and connect with healthcare providers, childcare centers, and specialists
- **Family Tools**: Breastfeeding timer, sleep tracking, growth monitoring, and more
- **Credentials Management**: Track and manage professional certifications and family health records
- **Feed System**: Community posts, educational content, and personalized recommendations

## Architecture

This is a monorepo using pnpm workspaces with the following structure:

- `apps/web/` - Main React application (Vite + TypeScript)
- `packages/ui/` - Shared UI components library
- `packages/types/` - TypeScript type definitions
- `packages/constants/` - Shared constants and configuration
- `packages/libs/` - Utility functions and providers
- `packages/hooks/` - React hooks for web
- `packages/hooks-native/` - React hooks for React Native
- `packages/tailwind-theme/` - Tailwind CSS theme configuration
- `services/data_store/` - Data storage services (Supabase)

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm (recommended package manager)

### Installation

1. **Clean and install dependencies:**

   ```bash
   pnpm clean
   pnpm install
   ```

2. **Build all packages:**

   ```bash
   pnpm build
   ```

3. **Start development server:**

   ```bash
   pnpm dev
   ```

The application will be available at `http://localhost:5173`

### Build for Production

```bash
pnpm build
```

## Technology Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS, Radix UI components
- **State Management**: React hooks, Context API
- **Data Visualization**: React Flow (for timeline components)
- **Routing**: React Router v6
- **Backend**: Supabase (PostgreSQL, Auth, Storage)
- **Build Tools**: Turbo (monorepo), Vite (bundling)
- **Testing**: Jest, React Testing Library

## Key Components

### Timeline System

Modular timeline component architecture for tracking developmental milestones:

- CSV-based milestone data management
- Interactive visual timeline with React Flow
- Age-range filtering and family member tracking
- Progress monitoring and notes

### Community Features

- User profiles and family networks
- Provider directory with specializations
- Service center listings
- Feed system with posts and educational content

### Tools & Utilities

- Breastfeeding timer with session tracking
- Growth and development monitoring
- Medication reminders
- Sleep pattern tracking

## Development Workflow

### Workspace Commands

```bash
# Clean all workspaces
pnpm clean

# Install dependencies for all workspaces
pnpm install

# Build all packages
pnpm build

# Run development server
pnpm dev

# Run tests
pnpm test

# Lint code
pnpm lint
```

### Code Structure

- Follow TypeScript strict mode
- Use functional components with hooks
- Implement proper error boundaries
- Maintain consistent file naming conventions
- Document complex functions with JSDoc comments

## Configuration

### Environment Variables

Create `.env` files in the appropriate workspace directories:

```bash
# apps/web/.env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Database Setup

The application uses Supabase for data storage. Refer to `services/data_store/` for database schema and configuration.

## Contributing

1. Follow the established code patterns and architecture
2. Update documentation for new features
3. Add tests for new functionality  
4. Ensure all builds pass before submitting PRs
5. Use conventional commit messages

## Recent Updates

- **Milestone Data Migration**: Moved from TypeScript generation to CSV-based data management
- **Timeline Architecture Refactoring**: Modular component system with improved performance
- **UI Component Library**: Comprehensive set of reusable components
- **Mobile Responsiveness**: Optimized for mobile and desktop experiences

## License

Proprietary - All rights reserved

## Support

For questions or support, please refer to the documentation in each package or contact the development team.
