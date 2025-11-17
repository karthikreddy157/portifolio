# Portfolio Website for Karthik Attooru

## Overview

This is a full-stack portfolio website built for Karthik Attooru, showcasing professional experience, projects, and skills in software engineering. The application features a modern, clean design inspired by Linear's typography and developer portfolio aesthetics, with a contact form that stores submissions. The portfolio emphasizes full-stack development, backend systems, and computer vision expertise.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework**: React 18 with TypeScript, using Vite as the build tool and development server. The application follows a single-page application (SPA) architecture with client-side routing via Wouter.

**UI Component System**: Leverages shadcn/ui components built on Radix UI primitives, providing a comprehensive set of accessible, customizable components. The design system uses Tailwind CSS with a custom configuration implementing consistent spacing units (4, 8, 12, 16, 20, 24) and a neutral color scheme with HSL color variables for theme flexibility.

**Typography**: Primary font is Inter for modern developer aesthetics, with JetBrains Mono for code snippets. The hierarchy follows a systematic scale from text-5xl/7xl for hero sections down to text-sm for labels.

**State Management**: TanStack Query (React Query) handles server state management with custom query functions for API communication. Form state is managed via React Hook Form with Zod schema validation for type-safe form handling.

**Layout Strategy**: Responsive design using Tailwind's utility-first approach with mobile-first breakpoints. The portfolio follows a structured layout with sticky navigation, hero section (80vh), professional experience timeline, 2-column project grid, and contact form.

### Backend Architecture

**Server Framework**: Express.js running on Node.js with TypeScript. The server provides a minimal REST API architecture focused on the contact form submission endpoint.

**API Design**: RESTful endpoints under `/api` namespace:
- `POST /api/contact` - Create contact submission with validation
- `GET /api/contact` - Retrieve all contact submissions

**Request Processing**: Custom middleware logs all API requests with timing and response data. JSON body parsing includes raw body capture for potential webhook integrations. Error handling distinguishes between validation errors (400) and server errors (500).

**Development vs Production**: In development, Vite middleware integrates with Express for HMR (Hot Module Replacement). In production, the server serves static assets from the built distribution directory.

### Data Storage

**Current Implementation**: In-memory storage using a Map-based implementation (`MemStorage` class). Contact submissions are stored with generated UUIDs and sorted by submission timestamp.

**Database Schema Design**: PostgreSQL schema defined using Drizzle ORM with the `contact_submissions` table containing:
- `id` (varchar, primary key, auto-generated UUID)
- `name` (text, required)
- `email` (text, required)
- `message` (text, required)
- `submittedAt` (timestamp, auto-generated)

**ORM Strategy**: Drizzle ORM configured for PostgreSQL dialect with schema-to-Zod integration for runtime validation. The schema defines type-safe insert and select operations, with validation rules ensuring email format, minimum name length (2 chars), and minimum message length (10 chars).

**Migration Strategy**: Drizzle Kit configured to output migrations to `./migrations` directory with schema source at `./shared/schema.ts`.

### Validation & Type Safety

**Schema Validation**: Zod schemas created from Drizzle table definitions using `createInsertSchema`, ensuring consistency between database schema and runtime validation. Custom refinements add email validation and length constraints.

**Type Generation**: TypeScript types inferred from Drizzle schemas provide end-to-end type safety from database to API to frontend.

**Form Validation**: React Hook Form integrated with Zod resolver for client-side validation before submission, providing immediate user feedback.

### Build & Deployment

**Build Process**: 
- Frontend: Vite bundles React application with TypeScript compilation, outputting to `dist/public`
- Backend: esbuild bundles server code as ESM module to `dist/index.js`

**Module System**: ES Modules throughout with `"type": "module"` in package.json. All imports use `.js` extensions per ESM standards.

**Development Tooling**: TSConfig enables strict mode with path aliases (`@/` for client, `@shared/` for shared code). Vite plugins include runtime error overlay and Replit-specific development tools.

### Design System

**Color Theming**: CSS custom properties define HSL color values for light mode, enabling future dark mode support. Color system includes semantic tokens (primary, secondary, muted, accent, destructive) with foreground and border variants.

**Component Variants**: Class Variance Authority (CVA) provides type-safe variant management for components like buttons, badges, and alerts.

**Spacing System**: Consistent Tailwind spacing units with custom border radius values (9px, 6px, 3px).

## External Dependencies

### UI Component Libraries
- **Radix UI**: Complete set of unstyled, accessible component primitives including dialogs, dropdowns, tooltips, forms, and navigation
- **shadcn/ui**: Pre-built component collection using Radix UI with Tailwind styling
- **Lucide React**: Icon library for consistent iconography

### Form Management
- **React Hook Form**: Performant form state management with minimal re-renders
- **@hookform/resolvers**: Integration layer between React Hook Form and validation libraries
- **Zod**: TypeScript-first schema validation for runtime type checking

### Data Fetching & State
- **TanStack Query**: Server state management with caching, background updates, and request deduplication
- **Wouter**: Lightweight client-side routing alternative to React Router

### Database & ORM
- **Drizzle ORM**: TypeScript ORM with focus on type safety and developer experience
- **@neondatabase/serverless**: PostgreSQL client optimized for serverless environments
- **drizzle-zod**: Automatic Zod schema generation from Drizzle tables
- **Drizzle Kit**: CLI tool for schema migrations and database management

### Styling & Design
- **Tailwind CSS**: Utility-first CSS framework
- **class-variance-authority**: Type-safe variant styling
- **clsx & tailwind-merge**: Conditional class name utilities

### Build Tools
- **Vite**: Fast development server and optimized production builds
- **esbuild**: JavaScript bundler for server code
- **PostCSS & Autoprefixer**: CSS processing pipeline

### Date Utilities
- **date-fns**: Modern date utility library for formatting and manipulation

### Development Tools
- **TypeScript**: Static type checking
- **@replit/vite-plugin-runtime-error-modal**: Development error overlay
- **@replit/vite-plugin-cartographer**: Replit-specific development features

### Future Integration Points
The application is architected to easily transition from in-memory storage to persistent PostgreSQL database by swapping the `MemStorage` implementation with a Drizzle-based storage adapter while maintaining the same `IStorage` interface.