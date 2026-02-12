# Architecture Research

**Domain:** Developer Portfolio with Project Case Studies
**Researched:** 2026-02-11
**Confidence:** HIGH

## Standard Architecture

### System Overview

```
┌─────────────────────────────────────────────────────────────┐
│                      Presentation Layer                      │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐        │
│  │ Layout  │  │ Navbar  │  │  Hero   │  │ Footer  │        │
│  └────┬────┘  └────┬────┘  └────┬────┘  └────┬────┘        │
│       │            │            │            │              │
├───────┴────────────┴────────────┴────────────┴──────────────┤
│                      Route Layer (App Router)                │
├─────────────────────────────────────────────────────────────┤
│  ┌──────────┐  ┌──────────────────────────────────┐         │
│  │   / (home) │  │  /projects/[slug] (dynamic)    │         │
│  └──────────┘  └──────────────────────────────────┘         │
│                                                               │
├─────────────────────────────────────────────────────────────┤
│                      Data Layer                              │
│  ┌─────────────────┐  ┌──────────────┐                      │
│  │  src/data/*.ts  │  │  Supabase    │                      │
│  │  (static JSON)  │  │  (forms only)│                      │
│  └─────────────────┘  └──────────────┘                      │
└─────────────────────────────────────────────────────────────┘
```

### Component Responsibilities

| Component | Responsibility | Typical Implementation |
|-----------|----------------|------------------------|
| **RootLayout** | Global layout shell, fonts, metadata, persistent navigation | Server Component with Navbar/Footer wrapping children |
| **Page Routes** | Route entry points (`page.tsx`), compose page sections | Server Components or Client Components with sections |
| **Section Components** | Major page sections (Hero, Projects, About, Contact) | Client Components for interactivity, Server for static content |
| **UI Components** | Reusable primitives (Button, Card) | Atomic, composable components with variant support |
| **Layout Components** | Navigation, Footer, structural wrappers | Client Components for interactive state (Navbar), can be Server |
| **Data Store** | Centralized content (`src/data/index.ts`) | Exported TypeScript objects/arrays |
| **Utils/Lib** | Helper functions, external service clients | Pure functions, singleton clients |

## Recommended Project Structure for Case Study Pages

```
src/
├── app/                      # Next.js App Router
│   ├── layout.tsx            # Root layout (Navbar, Footer, fonts)
│   ├── page.tsx              # Homepage (Hero, Projects list, About, Contact)
│   ├── projects/             # Projects section
│   │   └── [slug]/           # Dynamic case study pages
│   │       ├── page.tsx      # Case study detail page
│   │       └── layout.tsx    # Optional: Case study-specific layout
│   └── globals.css           # Global styles, Tailwind directives
│
├── components/               # React components
│   ├── home/                 # Homepage-specific sections
│   │   ├── Hero.tsx
│   │   ├── ProjectsGrid.tsx  # Renamed from Projects.tsx for clarity
│   │   ├── About.tsx
│   │   └── Contact.tsx
│   ├── projects/             # NEW: Project case study components
│   │   ├── CaseStudyHero.tsx      # Project title, role, tech stack header
│   │   ├── CaseStudyOverview.tsx  # Problem, solution, impact summary
│   │   ├── CaseStudySection.tsx   # Reusable section component
│   │   ├── CaseStudyGallery.tsx   # Image/video showcase
│   │   ├── TechStackBadges.tsx    # Technology badges
│   │   └── RelatedProjects.tsx    # Links to other projects
│   ├── layout/               # Layout components
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   └── ui/                   # Reusable UI primitives
│       ├── Button.tsx
│       ├── Card.tsx
│       ├── Badge.tsx         # NEW: For tech tags
│       └── Section.tsx       # NEW: Generic section wrapper
│
├── data/                     # Content store
│   ├── index.ts              # Current: exports all data
│   ├── projects.ts           # NEW: Detailed project data with case studies
│   ├── site.ts               # NEW: Site config (name, title, description)
│   └── types.ts              # NEW: TypeScript types for data
│
├── lib/                      # Utilities and external services
│   ├── utils.ts              # cn() for Tailwind class merging
│   └── supabase.ts           # Supabase client for contact form
│
└── public/                   # Static assets
    └── projects/             # Project images, videos
        ├── project-slug-1/
        │   ├── hero.jpg
        │   ├── screenshot-1.jpg
        │   └── demo.mp4
        └── project-slug-2/
            └── ...
```

### Structure Rationale

- **app/projects/[slug]:** Dynamic routes for project case studies, uses `generateStaticParams()` for static export
- **components/projects/:** Groups all case study-specific components separately from homepage sections
- **data/projects.ts:** Separates detailed project data from site config, enables easy content updates
- **public/projects/[slug]/:** Organizes assets by project slug for clarity and maintainability

## Architectural Patterns

### Pattern 1: Static Export with Dynamic Routes

**What:** Use `generateStaticParams()` to pre-render all project case study pages at build time for static export deployment.

**When to use:** When you have a finite set of projects known at build time (standard for portfolios).

**Trade-offs:**
- **Pros:** Fast page loads, works with static hosting (Netlify), no server required, SEO-friendly
- **Cons:** Requires rebuild to add new projects (acceptable for portfolios updated infrequently)

**Example:**
```typescript
// app/projects/[slug]/page.tsx
import { projects } from '@/data/projects'
import { notFound } from 'next/navigation'

// Generate static params for all projects at build time
export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }))
}

// Server Component - rendered at build time
export default async function ProjectPage({
  params
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const project = projects.find(p => p.slug === slug)

  if (!project) {
    notFound()
  }

  return (
    <div>
      <h1>{project.title}</h1>
      {/* Case study content */}
    </div>
  )
}

// Generate metadata for SEO
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = projects.find(p => p.slug === slug)

  return {
    title: `${project?.title} - Case Study`,
    description: project?.description,
  }
}
```

### Pattern 2: Data-Driven Content with TypeScript

**What:** Store all portfolio content in typed TypeScript files (`src/data/`) rather than hardcoding in components.

**When to use:** Always for portfolio sites - separates content from presentation, enables easy updates.

**Trade-offs:**
- **Pros:** Single source of truth, type safety, easy to update content without touching components
- **Cons:** Requires rebuild for content changes (not an issue for static portfolios)

**Example:**
```typescript
// data/types.ts
export interface Project {
  slug: string              // URL-friendly identifier
  title: string
  shortDescription: string  // For grid/list view
  featured: boolean
  tags: string[]

  // Case study details
  caseStudy: {
    role: string
    duration: string
    team: string[]
    problem: string
    solution: string
    impact: string[]
    techStack: string[]
    features: {
      title: string
      description: string
      image?: string
    }[]
    gallery: {
      type: 'image' | 'video'
      src: string
      caption?: string
    }[]
    links: {
      demo?: string
      github?: string
      live?: string
    }
  }
}

// data/projects.ts
export const projects: Project[] = [
  {
    slug: 'ecommerce-platform',
    title: 'E-Commerce Platform',
    shortDescription: 'Full-stack online store with payment integration',
    featured: true,
    tags: ['Next.js', 'Stripe', 'PostgreSQL'],
    caseStudy: {
      role: 'Full-Stack Developer',
      duration: '3 months',
      team: ['Solo Project'],
      problem: 'Local businesses need affordable online presence...',
      solution: 'Built responsive e-commerce platform with...',
      impact: [
        'Increased client sales by 40%',
        'Reduced cart abandonment by 25%'
      ],
      // ... rest of case study data
    }
  }
]
```

### Pattern 3: Component Composition for Case Studies

**What:** Build case study pages from reusable section components rather than monolithic page components.

**When to use:** Always - enables consistency across case studies, easier to maintain and update.

**Trade-offs:**
- **Pros:** DRY code, consistent design, easy to add new sections, testable
- **Cons:** Slight overhead in component organization (minimal for this scale)

**Example:**
```typescript
// components/projects/CaseStudySection.tsx
interface CaseStudySectionProps {
  title: string
  children: React.ReactNode
  variant?: 'default' | 'dark' | 'accent'
}

export default function CaseStudySection({
  title,
  children,
  variant = 'default'
}: CaseStudySectionProps) {
  return (
    <section className={`py-16 ${variant === 'dark' ? 'bg-dark' : 'bg-cream'}`}>
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-4xl font-serif mb-8">{title}</h2>
        {children}
      </div>
    </section>
  )
}

// app/projects/[slug]/page.tsx - Composition
export default function ProjectPage({ project }) {
  return (
    <>
      <CaseStudyHero project={project} />
      <CaseStudySection title="The Problem">
        <p>{project.caseStudy.problem}</p>
      </CaseStudySection>
      <CaseStudySection title="The Solution" variant="dark">
        <p>{project.caseStudy.solution}</p>
      </CaseStudySection>
      <CaseStudyGallery images={project.caseStudy.gallery} />
      {/* ... more sections */}
    </>
  )
}
```

## Data Flow

### Build-Time Flow (Static Export)

```
[Build Triggered]
    ↓
[generateStaticParams()] → Reads projects from data/projects.ts
    ↓                     → Returns array of { slug } objects
[Static Rendering]      → For each slug:
    ↓                       - Fetch project from data/projects.ts
[page.tsx rendered]       - Render Server Components
    ↓                       - Generate HTML
[HTML Output]           → projects/[slug].html files in /out
    ↓
[Deploy to Netlify]     → Static files served
```

### Runtime Flow (Client Navigation)

```
[User clicks project link]
    ↓
[Next.js Router] → Client-side navigation (no page reload)
    ↓
[Pre-generated HTML] → Loads from static files
    ↓
[React hydration] → Client Components become interactive
    ↓                  (animations, interactions)
[Page displayed]
```

### Content Update Flow

```
[Edit data/projects.ts]
    ↓
[Run: npm run build]
    ↓
[generateStaticParams()] → Regenerates all project pages
    ↓
[Deploy updated /out]
    ↓
[Changes live]
```

### Key Data Flows

1. **Homepage → Case Study:** User clicks project card → Next.js Link prefetches → Client-side navigation to `/projects/[slug]`
2. **Case Study → Homepage:** User clicks back/home → Client-side navigation → Return to homepage sections
3. **Contact Form → Supabase:** User submits form → Client Component sends to Supabase Edge Function → Email notification

## Static Export Constraints

Based on Next.js 16 official documentation, when using `output: 'export'`:

### Supported with Dynamic Routes

✅ **Dynamic routes with `generateStaticParams()`**
```typescript
// This WORKS with static export
export async function generateStaticParams() {
  return [{ slug: 'project-1' }, { slug: 'project-2' }]
}
```

✅ **Metadata generation for SEO**
```typescript
export async function generateMetadata({ params }) {
  // Generate meta tags per project
}
```

✅ **Server Components for build-time rendering**
```typescript
// Data fetching runs at build time
export default async function Page() {
  const data = projects.find(/* ... */)
  return <div>{data.title}</div>
}
```

### NOT Supported (Will Cause Build Errors)

❌ **Dynamic routes without `generateStaticParams()`**
- Must provide all possible param values at build time
- Cannot have truly dynamic routes based on runtime requests

❌ **Runtime-dependent APIs**
- `cookies()`, `headers()` from next/headers
- Server Actions
- Dynamic API routes that depend on Request object
- Incremental Static Regeneration (ISR)

❌ **Dynamic rendering APIs**
- `dynamicParams: true` without generating static params
- Routes that need server-side rendering per request

### Workarounds for Constraints

**Client-side data fetching:** Use for non-critical data (e.g., view counts, comments)
```typescript
'use client'
export function ViewCounter({ slug }: { slug: string }) {
  const { data } = useSWR(`/api/views/${slug}`, fetcher)
  // Runs in browser, not at build time
}
```

**Hybrid approach:** Static pages + client-side enhancement
- Static HTML for content (fast, SEO-friendly)
- Client-side fetch for dynamic features (comments, analytics)

## Scaling Considerations

| Scale | Architecture Adjustments |
|-------|--------------------------|
| 1-10 projects | Current single-file data approach is optimal. All projects in one `data/projects.ts` file. |
| 10-50 projects | Split data by category: `data/projects/web.ts`, `data/projects/mobile.ts`. Combine in index. |
| 50+ projects | Consider pagination on homepage. Keep individual case studies as static pages. Add filtering/search with client-side JS. |
| 100+ projects | Evaluate if static export still makes sense. May need ISR or dynamic rendering. Archive old projects. |

### Scaling Priorities

1. **First bottleneck (30+ projects):** Homepage becomes too long
   - **Fix:** Add category filtering, pagination, or "Load More" button (client-side)
   - **Why:** Keeps individual case study pages fast, only homepage needs adjustment

2. **Second bottleneck (50+ projects):** Build time increases
   - **Fix:** Use `dynamicParams: false` to strictly limit generated pages, or move to server-rendered pages for older projects
   - **Why:** Static export rebuilds all pages on every deploy

## Anti-Patterns

### Anti-Pattern 1: Hardcoding Content in Components

**What people do:**
```typescript
// BAD: Hardcoded in component
export default function ProjectPage() {
  return (
    <div>
      <h1>My E-Commerce Project</h1>
      <p>Built with Next.js and Stripe...</p>
    </div>
  )
}
```

**Why it's wrong:** Violates separation of concerns, hard to maintain, no type safety, content scattered across files.

**Do this instead:**
```typescript
// GOOD: Data-driven
import { projects } from '@/data/projects'

export default function ProjectPage({ params }) {
  const project = projects.find(p => p.slug === params.slug)
  return (
    <div>
      <h1>{project.title}</h1>
      <p>{project.caseStudy.solution}</p>
    </div>
  )
}
```

### Anti-Pattern 2: Missing generateStaticParams

**What people do:**
```typescript
// BAD: Dynamic route without generateStaticParams in static export
export default function ProjectPage({ params }: { params: { slug: string } }) {
  // This will FAIL at build time with output: 'export'
}
```

**Why it's wrong:** Static export requires knowing all routes at build time. Without `generateStaticParams()`, Next.js doesn't know which pages to generate.

**Do this instead:**
```typescript
// GOOD: Provide static params
export async function generateStaticParams() {
  return projects.map(project => ({ slug: project.slug }))
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  // Now works with static export
}
```

### Anti-Pattern 3: Deeply Nested Route Segments

**What people do:**
```
app/projects/[category]/[year]/[slug]/page.tsx
```

**Why it's wrong:** Over-complicated URLs for portfolio sites, harder to maintain, confusing for users, unnecessary for typical portfolio scale.

**Do this instead:**
```
app/projects/[slug]/page.tsx  // Simple, clean URLs
```
If categorization is needed, handle it in the UI with filtering, not routes.

### Anti-Pattern 4: Mixing Server and Client Component Boundaries Incorrectly

**What people do:**
```typescript
// BAD: Client Component at page level fetching static data
'use client'
export default function ProjectPage() {
  const [project, setProject] = useState(null)
  useEffect(() => {
    // Fetching data that could be static
  }, [])
}
```

**Why it's wrong:** Misses out on static rendering benefits, increases client bundle size, slower initial page load.

**Do this instead:**
```typescript
// GOOD: Server Component for static content
export default async function ProjectPage({ params }) {
  const { slug } = await params
  const project = projects.find(p => p.slug === slug)

  return (
    <>
      {/* Static content rendered at build time */}
      <CaseStudyHero project={project} />

      {/* Client Components only where interactivity needed */}
      <ImageGallery images={project.gallery} /> {/* 'use client' */}
    </>
  )
}
```

## Integration Points

### External Services

| Service | Integration Pattern | Notes |
|---------|---------------------|-------|
| **Supabase** | Client-side form submission in Contact component | Only for contact form. No auth needed. Environment variables for anon key. |
| **Static Hosting (Netlify)** | Deploy `/out` folder after `npm run build` | Configure build command: `npm run build`. Publish directory: `out`. |
| **Image Optimization** | Next.js Image component with custom loader OR standard img tags | Static export requires custom loader if using next/image optimization. Simple img tags work fine for portfolio scale. |
| **Analytics (optional)** | Client-side script in layout.tsx | Google Analytics, Plausible, etc. Use Script component with strategy="afterInteractive". |

### Internal Boundaries

| Boundary | Communication | Notes |
|----------|---------------|-------|
| **Layout ↔ Pages** | Parent-child component tree | Layout wraps all pages, provides Navbar/Footer consistently. |
| **Page ↔ Section Components** | Props passing | Pages compose sections with project data as props. |
| **Components ↔ Data** | ES6 imports | Components import from `@/data`, type-safe access. |
| **UI Components ↔ Styling** | Tailwind CSS classes via `cn()` utility | Consistent variant system, dark theme via Tailwind classes. |

## Build Order for Implementation

### Phase 1: Data Structure (Foundation)
**Why first:** Everything depends on typed data structure.

1. Create `src/data/types.ts` - Define `Project` interface with case study fields
2. Split `src/data/index.ts` into:
   - `src/data/site.ts` - Site config
   - `src/data/projects.ts` - Detailed project array
3. Add `slug` field to each project
4. Expand project objects with `caseStudy` nested object

**Dependencies:** None
**Validates:** Build should still work, homepage displays correctly

### Phase 2: Dynamic Routes (Core Routing)
**Why second:** Establishes routing before building UI.

1. Create `src/app/projects/[slug]/page.tsx`
2. Implement `generateStaticParams()` reading from `projects.ts`
3. Implement `generateMetadata()` for SEO
4. Add basic page component that displays project title (minimal UI)
5. Test build to ensure static generation works

**Dependencies:** Phase 1 (needs typed data with slugs)
**Validates:** `npm run build` succeeds, generates HTML files in `out/projects/[slug].html`

### Phase 3: Case Study Components (UI Building Blocks)
**Why third:** Reusable components before page assembly.

1. Create base components in `src/components/projects/`:
   - `CaseStudySection.tsx` - Generic section wrapper
   - `TechStackBadges.tsx` - Technology tags
2. Add UI primitives in `src/components/ui/`:
   - `Badge.tsx` - For tech tags
   - `Section.tsx` - Generic section wrapper
3. Test components in isolation (Storybook optional)

**Dependencies:** Phase 1 (types for props)
**Validates:** Components render correctly with sample data

### Phase 4: Case Study Page Assembly (Feature Complete)
**Why fourth:** Compose components into complete pages.

1. Build specialized components:
   - `CaseStudyHero.tsx` - Header section
   - `CaseStudyOverview.tsx` - Problem/Solution/Impact
   - `CaseStudyGallery.tsx` - Images/videos
   - `RelatedProjects.tsx` - Navigation to other projects
2. Compose in `src/app/projects/[slug]/page.tsx`
3. Add project images to `public/projects/[slug]/`

**Dependencies:** Phases 2 & 3 (routing and components)
**Validates:** Case study pages display full content, images load, links work

### Phase 5: Homepage Updates (Integration)
**Why fifth:** Connect existing homepage to new case study pages.

1. Update `src/components/home/Projects.tsx`:
   - Change project cards to Link components pointing to `/projects/[slug]`
   - Update hover states to indicate clickability
2. Ensure navigation items in `src/data/index.ts` link correctly

**Dependencies:** Phase 4 (case study pages exist)
**Validates:** Click flow from homepage → case study → back works smoothly

### Phase 6: Dark Theme Integration (Polish)
**Why last:** Visual design doesn't block functionality.

1. Update Tailwind config for dark theme colors
2. Apply dark classes to new components (CaseStudy*, etc.)
3. Ensure consistency with existing techy/dark design direction
4. Test color contrast for accessibility

**Dependencies:** Phase 4 (components exist)
**Validates:** Dark theme applied consistently, no light theme remnants

## Component Interaction Diagram

```
┌─────────────────────────────────────────────────────────┐
│                    RootLayout                           │
│  ┌─────────────────────────────────────────────────┐   │
│  │ Navbar (Client - state for mobile menu)         │   │
│  └─────────────────────────────────────────────────┘   │
│                                                          │
│  ┌─────────────────────────────────────────────────┐   │
│  │ {children} - Page Component                     │   │
│  │                                                  │   │
│  │  Homepage:                                       │   │
│  │    ├── Hero (Client - animations)               │   │
│  │    ├── ProjectsGrid (Client - animations)       │   │
│  │    │   └── Links to /projects/[slug]            │   │
│  │    ├── About (Client - animations)              │   │
│  │    └── Contact (Client - Supabase submit)       │   │
│  │                                                  │   │
│  │  Case Study Page:                                │   │
│  │    ├── CaseStudyHero (Server - static)          │   │
│  │    ├── CaseStudyOverview (Server - static)      │   │
│  │    ├── CaseStudyGallery (Client - interactive)  │   │
│  │    └── RelatedProjects (Server - static)        │   │
│  └─────────────────────────────────────────────────┘   │
│                                                          │
│  ┌─────────────────────────────────────────────────┐   │
│  │ Footer (Server - static links)                  │   │
│  └─────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘

Data Flow:
  data/projects.ts → generateStaticParams() → Build-time HTML
                  → Page Components → Props → Section Components
```

## Sources

**HIGH Confidence (Official Documentation):**
- Next.js 16 Dynamic Routes: https://nextjs.org/docs/app/building-your-application/routing/dynamic-routes
  - `generateStaticParams()` API for static generation
  - Dynamic segment conventions `[slug]`
  - Params handling with `await params` (Next.js 15+)

- Next.js 16 Static Exports: https://nextjs.org/docs/app/building-your-application/deploying/static-exports
  - `output: 'export'` configuration
  - Supported/unsupported features with static export
  - Dynamic routes compatibility requirements

**MEDIUM Confidence (Current Codebase Analysis):**
- Existing architecture patterns derived from:
  - `src/app/layout.tsx` - Root layout structure
  - `src/data/index.ts` - Data-driven content pattern
  - `src/components/` organization - Component grouping by function
  - `next.config.js` - Static export confirmation

**MEDIUM Confidence (Portfolio Best Practices - Training Data):**
- Case study structure (Problem/Solution/Impact format)
- Component composition patterns for case studies
- Image gallery and showcase components
- Build order based on dependency analysis

**LOW Confidence (Ecosystem Patterns - Training Data, Unverified):**
- Specific scaling thresholds (30/50/100 projects) - based on general patterns, not portfolio-specific research
- Category-based data splitting approach - common pattern but not verified against current tooling

---
*Architecture research for: Developer Portfolio with Project Case Studies*
*Next.js 16 Static Export Architecture*
*Researched: 2026-02-11*
