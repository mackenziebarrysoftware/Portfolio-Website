# Architecture

**Analysis Date:** 2026-02-11

## Pattern Overview

**Overall:** Component-based Next.js App Router architecture with static export

**Key Characteristics:**
- Client-side React components with server-side metadata generation
- Presentation layer driven by centralized data store
- Static site generation (SSG) with `output: 'export'` configuration
- External database integration via Supabase for contact form submissions

## Layers

**Presentation Layer:**
- Purpose: Renders UI components and handles user interactions
- Location: `src/components/`
- Contains: React components (home sections, layout elements, UI primitives)
- Depends on: Data layer (`src/data/`), utilities (`src/lib/`), Framer Motion, Lucide icons
- Used by: Page components in `src/app/`

**Data Layer:**
- Purpose: Centralized content store for all website text and configuration
- Location: `src/data/index.ts`
- Contains: Static content exports (siteConfig, navigation, hero, projects, about, contact, footer)
- Depends on: Nothing (pure data)
- Used by: All components that render content

**Page Layer:**
- Purpose: Next.js App Router pages that compose components into routes
- Location: `src/app/`
- Contains: Page components (`page.tsx`), root layout (`layout.tsx`), global styles
- Depends on: Presentation layer components, data layer
- Used by: Next.js router

**Utility Layer:**
- Purpose: Shared helper functions and external service clients
- Location: `src/lib/`
- Contains: Supabase client (`supabase.ts`), class name utilities (`utils.ts`)
- Depends on: External packages (@supabase/supabase-js, clsx, tailwind-merge)
- Used by: Components that need utilities or external services

**Asset Layer:**
- Purpose: Static files served directly
- Location: `public/`, `images/`
- Contains: Images, project assets
- Depends on: Nothing
- Used by: Components via public URL paths

## Data Flow

**Static Content Rendering:**

1. Page component (`src/app/page.tsx`) imports home section components
2. Section components import data objects from `src/data/index.ts`
3. Components render data using TypeScript props and JSX
4. Next.js builds static HTML at build time (`next build`)
5. Output exported to `out/` directory

**Contact Form Submission:**

1. User fills form in `src/components/home/Contact.tsx`
2. Form submit handler calls Supabase client from `src/lib/supabase.ts`
3. Data inserted into `contact_messages` table via Supabase REST API
4. Component updates UI state based on success/error response
5. No server-side code runs (static export limitation workaround via Supabase)

**State Management:**
- Local component state using React `useState` for UI interactions (mobile menu, form inputs, submission status)
- No global state management (Redux, Zustand, etc.)
- Animation state managed by Framer Motion library

## Key Abstractions

**Section Components:**
- Purpose: Self-contained page sections with consistent visual structure
- Examples: `src/components/home/Hero.tsx`, `src/components/home/Projects.tsx`, `src/components/home/About.tsx`, `src/components/home/Contact.tsx`
- Pattern: Client components ('use client') that consume data exports and render full-width sections

**Layout Components:**
- Purpose: Persistent UI elements across pages
- Examples: `src/components/layout/Navbar.tsx`, `src/components/layout/Footer.tsx`
- Pattern: Client components with scroll/interaction state management

**UI Primitives:**
- Purpose: Reusable styled components with variant props
- Examples: `src/components/ui/Button.tsx`, `src/components/ui/Card.tsx`
- Pattern: forwardRef components with TypeScript interfaces, variant-based styling using `cn()` utility

**Data Objects:**
- Purpose: Type-safe content storage
- Examples: `siteConfig`, `navigation`, `projects`, `about` exports from `src/data/index.ts`
- Pattern: Named exports with structured objects (no TypeScript types defined, relies on inference)

## Entry Points

**Application Entry:**
- Location: `src/app/layout.tsx`
- Triggers: Next.js App Router initialization
- Responsibilities: HTML shell, font loading (Cormorant Garamond, Work Sans), metadata configuration, Navbar/Footer composition

**Home Page:**
- Location: `src/app/page.tsx`
- Triggers: Root route (`/`) navigation
- Responsibilities: Compose Hero, Projects, About, Contact sections in sequence

**Build Entry:**
- Location: `next.config.js`
- Triggers: `npm run build` command
- Responsibilities: Configure static export mode, TypeScript error handling

## Error Handling

**Strategy:** Optimistic UI with inline error display

**Patterns:**
- Contact form: Try/catch with Supabase error object, update component state (`'error'`), display error message inline
- No global error boundaries detected
- No 404 or error pages defined (relies on Next.js defaults)
- TypeScript strict mode enabled (`tsconfig.json`) for compile-time error prevention

## Cross-Cutting Concerns

**Logging:** None (no logging framework detected)

**Validation:** HTML5 form validation (`required` attributes on inputs), no schema validation library

**Authentication:** Not applicable (portfolio site with no auth flow)

---

*Architecture analysis: 2026-02-11*
