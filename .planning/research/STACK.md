# Stack Research

**Domain:** Developer Portfolio with Dark Theme, Animations & Case Studies
**Researched:** 2026-02-11
**Confidence:** MEDIUM (based on current package versions and industry patterns; unable to verify latest docs due to tool access)

## Recommended Stack

### Core Technologies

| Technology | Version | Purpose | Why Recommended |
|------------|---------|---------|-----------------|
| Next.js | 16.1.6+ | Framework | Static export capability, excellent performance, App Router maturity. Version 16 is stable for production portfolios. |
| React | 19.2.4+ | UI Library | Latest stable with improved concurrent features. React 19 is the standard for new projects in 2026. |
| TypeScript | 5.9+ | Type Safety | Essential for maintainability. Version 5.9+ has better type inference and performance. |
| Tailwind CSS | 4.1.18+ | Styling | Version 4 brings performance improvements and better dark mode support. Standard for utility-first styling. |

### Animation & Interaction

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| Framer Motion | 12.34.0+ | UI Animations | Primary animation library. Excellent React integration, declarative API, scroll animations, layout animations. Use for page transitions, micro-interactions, reveal animations. |
| Lucide React | 0.563.0+ | Icons | Lightweight, tree-shakeable icon library. Better performance than heroicons or react-icons for static sites. |

### Dark Mode & Theming

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| next-themes | 0.4.6+ | Theme Management | Recommended for Next.js static export. Handles system preference detection, persistence, and prevents flash of unstyled content (FOUC). Essential for professional dark mode implementation. |
| Tailwind dark: class | Built-in | Dark Mode Utility | Use `dark:` variant with next-themes. More control than media queries for portfolio sites. |

### Content Management

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| Zod | 3.23+ | Schema Validation | Validate project data structure, ensure type safety for data files. Use with TypeScript for runtime validation. |
| Gray-matter | 4.0+ | Markdown Frontmatter | If using .md files for case studies. Parse frontmatter metadata. |
| MDX | 3.1+ | Markdown + JSX | Optional: If case studies need interactive components. Allows React components in markdown. |

### Data Storage & Forms

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| Supabase JS | 2.95.3+ | Contact Form Backend | Already integrated. Provides serverless backend for form submissions without API routes (important for static export). |
| React Hook Form | 7.54+ | Form Management | Lightweight, performant form handling. Better DX than plain controlled components. |
| Zod + React Hook Form | Integration | Form Validation | Type-safe form validation schema shared with TypeScript. |

### Development Tools

| Tool | Purpose | Notes |
|------|---------|-------|
| ESLint | Linting | Use Next.js config (`extends: "next/core-web-vitals"`) |
| Prettier | Formatting | Configure with Tailwind plugin for class sorting |
| Netlify CLI | Deployment | Already configured. Test static export locally before deploy. |

### Utility Libraries

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| clsx | 2.1.1+ | Conditional Classes | Already installed. Lightweight class name composition. |
| tailwind-merge | 3.4.0+ | Merge Tailwind Classes | Already installed. Essential for component libraries to prevent class conflicts. |
| date-fns | 3.6+ | Date Formatting | For project dates, blog posts. Lighter than moment.js. Tree-shakeable. |

## Installation

```bash
# Already installed (keep current versions)
# next, react, react-dom, tailwindcss, framer-motion, @supabase/supabase-js
# clsx, tailwind-merge, lucide-react

# Add for dark mode
npm install next-themes

# Add for data validation
npm install zod

# Add for forms
npm install react-hook-form @hookform/resolvers

# Add for date handling
npm install date-fns

# Optional: Add for MDX case studies
npm install @next/mdx @mdx-js/loader @mdx-js/react gray-matter

# Dev dependencies
npm install -D @tailwindcss/typography prettier prettier-plugin-tailwindcss
```

## Alternatives Considered

| Recommended | Alternative | When to Use Alternative |
|-------------|-------------|-------------------------|
| Framer Motion | GSAP | If you need timeline-based animations or complex sequencing. GSAP has more animation power but steeper learning curve. |
| next-themes | Manual CSS Variables | If you want full control and don't need system preference detection. More work but lighter weight. |
| Tailwind CSS 4 | CSS Modules | If you prefer component-scoped styles. More verbose but explicit. |
| Data files (TS/JSON) | CMS (Sanity, Contentful) | If client needs to edit content without code. Overkill for solo developer portfolio. |
| Zod | Yup / Joi | If already familiar with these libraries. Zod has better TypeScript integration. |
| React Hook Form | Formik | If you prefer render props pattern. React Hook Form is more performant. |
| MDX | Pure Markdown + Remark | If case studies don't need interactivity. Simpler but less flexible. |
| Lucide React | Heroicons | If you prefer the Heroicons aesthetic. Both are high quality. |

## What NOT to Use

| Avoid | Why | Use Instead |
|-------|-----|-------------|
| Styled Components / Emotion | Runtime CSS-in-JS hurts performance, especially on static sites. React 18+ concurrent rendering exposes issues. | Tailwind CSS (zero runtime) or CSS Modules |
| Chakra UI / MUI | Too heavy for portfolio sites. Harder to achieve custom dark techy aesthetic. Bundle size impact. | Tailwind + custom components |
| Anime.js | Less React-friendly than Framer Motion. Manual DOM manipulation. | Framer Motion for React-first animations |
| moment.js | Massive bundle size (67KB). Deprecated. | date-fns (tree-shakeable, 2-5KB per function) |
| Redux / Zustand | Overkill for portfolio state management. Theme is the only global state needed. | React Context (theme) + local state |
| Create React App | Deprecated. No SSG/SSR. Poor performance vs Next.js. | Next.js (already using) |
| Tailwind CSS 3 | Missing performance improvements and better CSS layer support in v4. | Tailwind CSS 4 (already using) |
| CSS Media Query Dark Mode | Doesn't allow user toggle. Flash of wrong theme on load for static sites. | next-themes + class-based dark mode |
| Axios | Fetch API is sufficient for Supabase. Unnecessary dependency. | Native fetch or Supabase client |

## Stack Patterns by Variant

**Case Study Pages — Markdown Approach:**
- Use Gray-matter for frontmatter (metadata: title, date, tech stack)
- Store .md files in `src/content/projects/`
- Use simple markdown parser for content
- Pros: Easy to write, no build complexity
- Cons: No interactive components

**Case Study Pages — MDX Approach:**
- Use @next/mdx for full component support
- Embed interactive demos, code snippets, image galleries
- Configure next.config.js for MDX page routes
- Pros: Full React component capability
- Cons: Slightly more build complexity

**Case Study Pages — Data File Approach (Recommended):**
- Extend `src/data/index.ts` with detailed project objects
- Store images in `public/projects/`
- Build custom case study components
- Create dynamic routes: `src/app/projects/[slug]/page.tsx`
- Pros: Type-safe, full design control, no markdown parsing
- Cons: More code for rich content

**Dark Theme Implementation:**
```typescript
// app/providers.tsx
import { ThemeProvider } from 'next-themes'

export function Providers({ children }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      {children}
    </ThemeProvider>
  )
}

// tailwind.config.js
export default {
  darkMode: 'class', // NOT 'media'
  theme: {
    extend: {
      colors: {
        // Define dark theme colors
        dark: {
          bg: '#0a0a0a',
          surface: '#111111',
          border: '#222222',
          text: '#e4e4e4',
          muted: '#888888',
        }
      }
    }
  }
}
```

**Animation Patterns:**
```typescript
// Scroll-triggered reveal
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.5 }}
>

// Page transitions (app router)
// Use Framer Motion's AnimatePresence with route changes
// Note: App Router transitions require client components

// Hover interactions
<motion.div
  whileHover={{ scale: 1.02 }}
  whileTap={{ scale: 0.98 }}
>
```

## Version Compatibility

| Package | Compatible With | Notes |
|---------|-----------------|-------|
| next@16.1.6 | react@19.2.4 | React 19 requires Next.js 16+ |
| framer-motion@12.x | react@19 | Version 12 supports React 19. Earlier versions may have issues. |
| @tailwindcss/postcss@4.x | tailwindcss@4.x | Required for Tailwind 4 to work with Next.js |
| next-themes@0.4.x | next@16 | Works with static export. Supports App Router. |
| react-hook-form@7.x | react@19 | Fully compatible. Use with TypeScript for best DX. |
| @supabase/supabase-js@2.x | All versions | Client-side only for static export. No SSR features. |

## Configuration Requirements

**next.config.js for static export:**
```javascript
const nextConfig = {
  output: 'export', // Already configured
  images: {
    unoptimized: true, // Required for static export
  },
}
```

**TypeScript strict mode (recommended):**
```json
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true
  }
}
```

## Data Structure for Case Studies

**Recommended schema for project data:**
```typescript
// src/types/project.ts
import { z } from 'zod'

export const projectSchema = z.object({
  id: z.string(),
  slug: z.string(),
  title: z.string(),
  tagline: z.string(),
  description: z.string(),
  longDescription: z.string().optional(), // For case study page

  // Visual assets
  thumbnail: z.string(),
  images: z.array(z.string()).optional(),
  video: z.string().optional(),

  // Technical details
  stack: z.array(z.string()),
  github: z.string().url().optional(),
  demo: z.string().url().optional(),

  // Case study sections
  problem: z.string().optional(),
  solution: z.string().optional(),
  results: z.array(z.string()).optional(),
  learnings: z.array(z.string()).optional(),

  // Metadata
  date: z.date(),
  featured: z.boolean(),
  status: z.enum(['completed', 'in-progress', 'archived']),
})

export type Project = z.infer<typeof projectSchema>
```

## Performance Considerations

**Bundle Size Targets (for static portfolio):**
- First Load JS: < 100KB (Next.js baseline ~85KB)
- Framer Motion: ~35KB gzipped (acceptable for animation-heavy site)
- Total JS: Target < 150KB for good mobile performance

**Optimization Strategies:**
1. Use `dynamic()` imports for heavy components
2. Lazy-load Framer Motion variants:
   ```typescript
   const MotionDiv = dynamic(() =>
     import('framer-motion').then(mod => mod.motion.div)
   )
   ```
3. Optimize images: WebP format, next-image alternative for static export
4. Tree-shake Lucide icons: Import only needed icons
5. Use Tailwind's purge/content config to remove unused CSS

## Sources

**Version Information:**
- package.json analysis (current project versions verified as recent/stable)

**Best Practices (MEDIUM confidence - training data):**
- Next.js static export patterns (Next.js 14-16 patterns)
- Framer Motion with React 19 (version 12+ supports concurrent features)
- Tailwind CSS 4 dark mode (class-based recommended over media queries)
- Developer portfolio patterns (2024-2025 trends)

**Limitations:**
- Unable to verify latest documentation via WebFetch (tool access denied)
- Unable to query npm registry for absolute latest versions (tool access denied)
- Unable to WebSearch for 2026-specific patterns (tool access denied)
- Versions validated against current package.json which shows recent stable releases

**Verification Needed:**
- [ ] Confirm Framer Motion 12.x best practices for React 19
- [ ] Verify next-themes 0.4.x is latest stable for Next.js 16
- [ ] Check Tailwind CSS 4 official dark mode recommendations
- [ ] Validate MDX 3.x compatibility with Next.js 16 App Router

---
*Stack research for: Developer portfolio with dark theme, animations, and case studies*
*Researched: 2026-02-11*
*Note: Research conducted with limited tool access. Recommendations based on current package versions and established patterns. Suggest verification of latest versions via official documentation.*
