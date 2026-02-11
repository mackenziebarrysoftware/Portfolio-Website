# Codebase Structure

**Analysis Date:** 2026-02-11

## Directory Layout

```
portfolio-website/
├── .claude/                 # Claude Code configuration and skills
├── .planning/               # Project planning documents
│   └── codebase/           # Codebase analysis documents
├── images/                  # Image assets (separate working directory)
├── public/                  # Static assets served at root
│   ├── mackenzie-barry.jpeg
│   └── projects/           # Project screenshots/assets
├── src/                     # Application source code
│   ├── app/                # Next.js App Router pages
│   ├── components/         # React components
│   ├── data/               # Content data store
│   └── lib/                # Utilities and external clients
├── out/                     # Build output (static export)
├── .next/                   # Next.js build cache
├── next.config.js           # Next.js configuration
├── tsconfig.json            # TypeScript configuration
├── tailwind.config.js       # Tailwind CSS configuration
├── postcss.config.js        # PostCSS configuration
├── package.json             # Dependencies and scripts
└── netlify.toml             # Netlify deployment config
```

## Directory Purposes

**src/app/**
- Purpose: Next.js App Router pages and layouts
- Contains: Page components, root layout, global CSS
- Key files:
  - `page.tsx`: Home page (composes Hero, Projects, About, Contact)
  - `layout.tsx`: Root layout with fonts, metadata, Navbar/Footer
  - `globals.css`: Global styles, theme variables, animations

**src/components/home/**
- Purpose: Page section components for home page
- Contains: Self-contained section components
- Key files:
  - `Hero.tsx`: Hero section with photo and intro text
  - `Projects.tsx`: Project showcase with staggered layout
  - `About.tsx`: Bio, experience, skills section
  - `Contact.tsx`: Contact form with Supabase integration

**src/components/layout/**
- Purpose: Persistent layout components
- Contains: Navigation and footer components
- Key files:
  - `Navbar.tsx`: Fixed header with scroll detection and mobile menu
  - `Footer.tsx`: Site footer with navigation and social links

**src/components/ui/**
- Purpose: Reusable UI primitives
- Contains: Generic styled components
- Key files:
  - `Button.tsx`: Button component with variants (primary, secondary, outline, ghost)
  - `Card.tsx`: Card wrapper component

**src/data/**
- Purpose: Centralized content store
- Contains: All website text content and configuration
- Key files:
  - `index.ts`: Named exports for site config, navigation, hero, projects, about, contact, footer content

**src/lib/**
- Purpose: Utility functions and external service clients
- Contains: Helper functions and API clients
- Key files:
  - `supabase.ts`: Supabase client initialization with env vars
  - `utils.ts`: `cn()` function for merging Tailwind classes

**public/**
- Purpose: Static assets served from root URL
- Contains: Images, project screenshots
- Key files:
  - `mackenzie-barry.jpeg`: Profile photo
  - `projects/`: Directory for project images (currently has README.md placeholder)

**.planning/codebase/**
- Purpose: Codebase documentation for GSD workflow
- Contains: Generated analysis documents
- Generated: Yes
- Committed: Yes

**out/**
- Purpose: Next.js static export output
- Contains: Built HTML, CSS, JS files ready for deployment
- Generated: Yes (via `npm run build`)
- Committed: No (in .gitignore)

**.next/**
- Purpose: Next.js build cache and type generation
- Contains: Cached build artifacts, generated types
- Generated: Yes
- Committed: No

## Key File Locations

**Entry Points:**
- `src/app/layout.tsx`: Application root layout
- `src/app/page.tsx`: Home page
- `next.config.js`: Build configuration

**Configuration:**
- `tsconfig.json`: TypeScript compiler settings with `@/*` path alias
- `tailwind.config.js`: Tailwind theme extension (colors, fonts)
- `postcss.config.js`: PostCSS with Tailwind plugin
- `package.json`: Dependencies and build scripts
- `netlify.toml`: Netlify deployment settings

**Core Logic:**
- `src/data/index.ts`: All website content
- `src/lib/supabase.ts`: Database client
- `src/components/home/Contact.tsx`: Contact form submission logic

**Testing:**
- Not applicable (no test files detected)

**Styling:**
- `src/app/globals.css`: Global styles, CSS variables, animations
- `tailwind.config.js`: Tailwind theme configuration

## Naming Conventions

**Files:**
- Components: PascalCase with `.tsx` extension (e.g., `Hero.tsx`, `Navbar.tsx`)
- Utilities: camelCase with `.ts` extension (e.g., `utils.ts`, `supabase.ts`)
- Config files: kebab-case with appropriate extension (e.g., `next.config.js`, `tailwind.config.js`)
- Data files: lowercase with `.ts` extension (e.g., `index.ts`)

**Directories:**
- Feature-based: lowercase (e.g., `home/`, `layout/`, `ui/`)
- Next.js reserved: lowercase (e.g., `app/`, `public/`)

**Components:**
- Default exports for all components
- Component files match component name exactly

## Where to Add New Code

**New Home Section:**
- Primary code: `src/components/home/NewSection.tsx`
- Data: Add export to `src/data/index.ts`
- Integration: Import and render in `src/app/page.tsx`

**New Page:**
- Primary code: `src/app/newpage/page.tsx`
- Layout (if custom): `src/app/newpage/layout.tsx`
- Navigation: Update `navigation.main` in `src/data/index.ts`

**New UI Component:**
- Implementation: `src/components/ui/NewComponent.tsx`
- Pattern: Follow `Button.tsx` structure (forwardRef, variants, TypeScript interface)

**New Utility Function:**
- Implementation: `src/lib/newUtil.ts`
- Import: Use `@/lib/newUtil` path alias

**New Static Asset:**
- Images: `public/` for direct URL access or `images/` for source images
- Reference: Use `/filename.ext` in component src attributes

**New External Integration:**
- Client initialization: `src/lib/serviceName.ts`
- Environment variables: Add to `.env.local` (not committed)
- Usage: Import client in components that need it

## Special Directories

**images/**
- Purpose: Source images (additional working directory)
- Generated: No
- Committed: Yes (separate git status shows as working directory)

**.claude/**
- Purpose: Claude Code configuration, skills, agents, hooks
- Generated: Partially (contains installed GSD skill)
- Committed: Partially (.claude/settings.local.json modified, .claude/skills/gsd/ untracked)

**node_modules/**
- Purpose: npm package dependencies
- Generated: Yes (via `npm install`)
- Committed: No

**out/**
- Purpose: Static site export for deployment
- Generated: Yes (via `npm run build`)
- Committed: No

**.next/**
- Purpose: Next.js build cache and generated types
- Generated: Yes (during dev and build)
- Committed: No

---

*Structure analysis: 2026-02-11*
