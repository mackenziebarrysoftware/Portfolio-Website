# Technology Stack

**Analysis Date:** 2026-02-11

## Languages

**Primary:**
- TypeScript 5.9.3 - All application code
- JavaScript - Configuration files (`next.config.js`, `tailwind.config.js`, `postcss.config.js`)

**Secondary:**
- CSS - Global styles and Tailwind directives

## Runtime

**Environment:**
- Node.js v24.13.1

**Package Manager:**
- npm (based on `package.json` scripts)
- Lockfile: `package-lock.json` present

## Frameworks

**Core:**
- Next.js 16.1.6 - React framework with static export (`output: 'export'`)
- React 19.2.4 - UI library
- React DOM 19.2.4 - React renderer

**Styling:**
- Tailwind CSS 4.1.18 - Utility-first CSS framework
- PostCSS 8.5.6 - CSS processing
- Autoprefixer 10.4.24 - Vendor prefix automation

**Animation:**
- Framer Motion 12.34.0 - Animation library for UI components

**Testing:**
- Not detected

**Build/Dev:**
- Next.js built-in build system
- TypeScript compiler 5.9.3
- ESLint via `next lint`

## Key Dependencies

**Critical:**
- `@supabase/supabase-js` 2.95.3 - Database client for contact form submissions (used in `src/lib/supabase.ts` and `src/components/home/Contact.tsx`)
- `next` 16.1.6 - Framework foundation, static site generation
- `react` 19.2.4 - Core UI library

**Infrastructure:**
- `clsx` 2.1.1 - Conditional class name composition
- `tailwind-merge` 3.4.0 - Tailwind class conflict resolution (used in `src/lib/utils.ts`)
- `lucide-react` 0.563.0 - Icon library (used in `src/components/home/Contact.tsx`)

**Fonts:**
- Next.js Google Fonts integration - Cormorant Garamond and Work Sans loaded via `next/font/google` in `src/app/layout.tsx`

**Development:**
- `@types/node` 25.2.2 - Node.js type definitions
- `@types/react` 19.2.13 - React type definitions
- `@types/react-dom` 19.2.3 - React DOM type definitions
- `netlify-cli` 23.15.1 - Deployment tooling

## Configuration

**Environment:**
- `.env.local` file present - Contains environment variables
- Required env vars: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- Environment variables accessed via `process.env` in `src/lib/supabase.ts`

**TypeScript:**
- `tsconfig.json` - Target ES2020, strict mode enabled, path alias `@/*` maps to `./src/*`
- JSX mode: `react-jsx` (automatic React import)

**Build:**
- `next.config.js` - Static export configured with `output: 'export'`
- `tailwind.config.js` - Custom theme with brand colors (cream, charcoal, accent)
- `postcss.config.js` - Tailwind and Autoprefixer plugins
- `netlify.toml` - Build command `npm run build`, publish directory `out`

**Package:**
- `package.json` - Module type set to `"module"` (ES modules)

## Platform Requirements

**Development:**
- Node.js 24.x (or compatible runtime)
- npm package manager
- Environment variables in `.env.local`

**Production:**
- Static site hosting (configured for Netlify)
- Outputs to `out/` directory
- No server-side runtime required (static export)
- Requires Supabase project for contact form functionality

---

*Stack analysis: 2026-02-11*
