# CivicConnect - Civic Engagement Platform

## Overview

CivicConnect is a civic engagement platform that bridges the gap between citizens and local government. The application enables users to track government activities (bills, votes, meetings, budgets), voice community concerns through citizen issues, explore civic data and statistics, and create actionable plans to engage with officials and policies.

The platform follows a trust-through-transparency approach, presenting complex government data in an accessible format with clear data sourcing and real-time activity tracking. Every insight leads to concrete next steps for civic engagement.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Full-Stack Architecture

**Monorepo Structure**: The application uses a unified TypeScript codebase with three main directories:
- `client/`: React-based frontend application
- `server/`: Express.js backend API
- `shared/`: Shared TypeScript types and database schemas

**Build System**: Vite handles frontend bundling with React plugin, while esbuild bundles the backend for production. TypeScript compilation is configured for ESNext modules with path aliases for clean imports.

### Frontend Architecture

**UI Framework**: React 18 with TypeScript, using Wouter for client-side routing (lightweight alternative to React Router).

**Component Library**: Extensive use of Radix UI primitives wrapped with shadcn/ui styling system. Components follow the "new-york" style variant with a neutral base color scheme and CSS variables for theming.

**State Management**: TanStack Query (React Query) handles all server state with custom query client configuration. Forms use React Hook Form with Zod validation via @hookform/resolvers.

**Styling System**: 
- Tailwind CSS with custom design tokens
- CSS variables for dynamic theming (light/dark mode support)
- Custom spacing primitives (2, 4, 6, 8, 12, 16 units)
- Material Design-inspired elevation system for interactive states

**Design Principles**: 
- Trust through transparency with clear data visualization
- Progressive disclosure to avoid overwhelming users
- Action-oriented interface where insights lead to concrete steps
- Responsive grid layouts (12-column desktop, collapsing to cards on mobile)

### Backend Architecture

**API Framework**: Express.js with TypeScript, handling RESTful endpoints for all resources.

**Middleware Stack**:
- JSON body parsing with raw body preservation for webhook support
- Request/response logging with duration tracking
- Error handling with appropriate HTTP status codes

**API Structure**: Resource-based routes following REST conventions:
- `/api/government-activities` - CRUD for bills, votes, meetings, budgets
- `/api/citizen-issues` - CRUD for community-reported issues
- `/api/officials` - Public official data and contact information
- `/api/vote-records` - Voting history for officials
- `/api/statistics` - Area-based civic statistics
- `/api/action-plans` - User-created engagement action plans

**Data Access Layer**: Storage abstraction pattern (IStorage interface) decoupling business logic from data persistence implementation. Currently uses in-memory storage with interface designed for easy database migration.

### Database Design

**ORM**: Drizzle ORM configured for PostgreSQL with schema-first design approach.

**Schema Structure**:
- `government_activities`: Tracks all government events with type categorization (vote, bill, meeting, budget)
- `citizen_issues`: Community-reported issues with voting and matching to government activities
- `officials`: Public official profiles with contact information and social links
- `vote_records`: Historical voting records linking officials to government activities
- `statistics`: Area-based demographic and civic data (by zipcode, city, state)
- `action_plans`: User-generated engagement plans with priority levels and deadlines
- `users`: User authentication and profile data

**Data Validation**: Zod schemas generated from Drizzle table definitions using drizzle-zod, ensuring type safety across frontend and backend.

**Categories**: Consistent categorization across entities (infrastructure, health, safety, education, environment) for filtering and matching.

### Development Environment

**Hot Module Replacement**: Vite dev server with Express middleware integration for seamless development experience.

**Path Aliases**: Configured in both tsconfig and Vite for clean imports:
- `@/` → client source
- `@shared/` → shared types and schemas
- `@assets/` → attached assets

**Replit Integration**: Development plugins for error overlay, cartographer debugging, and dev banner (development mode only).

## External Dependencies

### UI Component Libraries
- **Radix UI**: Comprehensive set of unstyled, accessible React primitives (accordion, dialog, dropdown, select, tabs, toast, etc.)
- **shadcn/ui**: Pre-styled component configurations built on Radix UI
- **Lucide React**: Icon library for consistent iconography
- **cmdk**: Command palette component for keyboard-driven navigation

### Data Visualization
- **Recharts**: Chart library for civic statistics and data visualization

### Form Management
- **React Hook Form**: Performant form handling with minimal re-renders
- **Zod**: Schema validation for type-safe form inputs
- **@hookform/resolvers**: Integration between React Hook Form and Zod

### State & Data Fetching
- **TanStack Query (React Query)**: Server state management with caching and synchronization
- **Wouter**: Lightweight client-side routing

### Styling & Utilities
- **Tailwind CSS**: Utility-first CSS framework
- **class-variance-authority**: Type-safe variant styling
- **clsx & tailwind-merge**: Conditional and merged class names
- **date-fns**: Date manipulation and formatting

### Backend Services
- **Express**: Node.js web framework
- **Drizzle ORM**: Type-safe database toolkit for PostgreSQL
- **@neondatabase/serverless**: Neon serverless Postgres driver
- **connect-pg-simple**: PostgreSQL session store (prepared for session management)

### Database
- **PostgreSQL**: Primary database via Neon serverless (configured but not yet actively used - storage layer currently in-memory)

### Build Tools
- **Vite**: Frontend build tool and dev server
- **esbuild**: Backend bundler for production
- **TypeScript**: Type system across entire stack
- **tsx**: TypeScript execution for development server

### Development Tools
- **@replit/vite-plugin-runtime-error-modal**: Development error overlay
- **@replit/vite-plugin-cartographer**: Code navigation assistance
- **@replit/vite-plugin-dev-banner**: Development environment indicator