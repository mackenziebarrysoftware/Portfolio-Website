# Phase 3: Content & Navigation - Research

**Researched:** 2026-02-13
**Domain:** Content sections, navigation UX, scroll behavior, accessibility (Next.js 16 static export)
**Confidence:** HIGH

## Summary

Phase 3 enhances the existing portfolio site with professional content (bio, availability status, location/timezone), working navigation between sections, and social links. The codebase already has a functioning structure: Hero, Projects, About, Contact sections exist with Framer Motion animations, a Navbar with mobile menu, a Footer with social links, and a centralized data store at `src/data/index.ts`. The Contact form (CNCT-01) and email link (CNCT-02) are already implemented and working. The profile photo is already in the Hero section.

The primary work for this phase is: (1) enriching the About section with a professional bio, availability status badge, and Belfast location with timezone, (2) adding real GitHub/LinkedIn URLs to the navigation data store and verifying they render correctly in the Navbar and Footer, (3) ensuring smooth scroll navigation works correctly with the fixed Navbar offset, and (4) verifying the existing contact form still functions. This is predominantly a content-and-polish phase, not an architecture phase. The existing patterns (centralized data store, Framer Motion animations, Tailwind utility classes with oklch tokens) should be followed consistently.

**Primary recommendation:** Extend the existing `src/data/index.ts` data store with availability status and location data, enhance the About component to display this data with appropriate icons from lucide-react, add `scroll-margin-top` to section elements for fixed-navbar offset, and update placeholder social URLs with real values. No new libraries needed.

## Standard Stack

### Core (Already Installed)
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| next | 16.1.6 | Framework, static export | Already configured with `output: 'export'` |
| react | 19.2.4 | UI library | Already in use across all components |
| tailwindcss | 4.1.18 | Styling with oklch color tokens | Already configured with dark/light theme |
| framer-motion | 12.34.0 | Scroll-triggered animations | Already used in About, Contact, Projects, Navbar |
| lucide-react | 0.563.0 | Icon library (MapPin, Clock, Globe, Github, Linkedin, Mail) | Already used in Navbar, Footer, Hero, Contact |
| next-themes | 0.4.6 | Dark/light theme switching | Already configured, dark default |

### Supporting (Already Installed)
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| clsx | 2.1.1 | Conditional class merging | Already used via `cn()` utility |
| tailwind-merge | 3.4.0 | Tailwind conflict resolution | Already used via `cn()` utility |
| @supabase/supabase-js | 2.95.3 | Contact form backend | Already working, verify only |
| zod | 4.3.6 | Schema validation | Already used for project data |

### No New Dependencies Required
This phase requires zero new npm packages. Everything needed is already installed.

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| CSS `scroll-behavior: smooth` | Lenis / react-scroll | Overkill for simple hash navigation; adds bundle size for no benefit |
| Native `<img>` tag | next/image with `unoptimized` | next/image with unoptimized adds complexity for static export with minimal benefit for a single portfolio image |
| CSS `scroll-margin-top` | JavaScript scroll offset calculation | CSS is simpler, more maintainable, and already has browser support |

## Architecture Patterns

### Current Project Structure (No Changes Needed)
```
src/
├── app/
│   ├── globals.css          # oklch theme tokens, scroll-behavior: smooth (already set)
│   ├── layout.tsx           # RootLayout with Navbar + Footer + ThemeProvider
│   └── page.tsx             # Hero -> Projects -> About -> Contact sections
├── components/
│   ├── home/
│   │   ├── About.tsx        # ENHANCE: Add availability, location, photo
│   │   ├── Contact.tsx      # VERIFY ONLY: Already working
│   │   ├── Hero.tsx         # VERIFY ONLY: Profile photo already present
│   │   └── Projects.tsx     # NO CHANGES
│   ├── layout/
│   │   ├── Navbar.tsx       # ENHANCE: Add social links, active section indicator
│   │   └── Footer.tsx       # VERIFY: Social links already render from data store
│   ├── theme/               # NO CHANGES
│   └── ui/                  # NO CHANGES
├── data/
│   └── index.ts             # ENHANCE: Add availability, location, timezone data
├── lib/
│   └── utils.ts             # NO CHANGES
└── types/
    └── project.ts           # NO CHANGES
```

### Pattern 1: Centralized Data Store Extension
**What:** All new content (availability status, location, timezone) goes into `src/data/index.ts` following the existing pattern. Components read from the data store, never hardcode content.
**When to use:** Always -- this is the established pattern from Phase 2.
**Example:**
```typescript
// src/data/index.ts - EXTEND existing exports
export const about = {
  title: 'About Me',
  bio: 'Professional bio text here...',
  // NEW: Add availability and location data
  availability: {
    status: 'available' as const, // 'available' | 'limited' | 'unavailable'
    message: 'Available for freelance projects',
  },
  location: {
    city: 'Belfast',
    country: 'Northern Ireland',
    timezone: 'GMT/BST (UTC+0/+1)',
  },
  skills: { /* existing */ },
  experience: [ /* existing */ ],
}
```

### Pattern 2: Icon-Based Info Items with Lucide
**What:** Use lucide-react icons alongside text for location, timezone, and availability status. Import only needed icons to keep bundle small.
**When to use:** For any metadata-style information display (location, status, time).
**Example:**
```typescript
// Source: Already established in Footer.tsx
import { MapPin, Clock, Circle } from 'lucide-react'

// Availability badge
<div className="inline-flex items-center gap-2">
  <Circle className="w-2 h-2 fill-green-500 text-green-500" />
  <span className="text-sm text-muted-foreground">{about.availability.message}</span>
</div>

// Location with icon
<div className="inline-flex items-center gap-2">
  <MapPin className="w-4 h-4 text-primary" />
  <span>{about.location.city}, {about.location.country}</span>
</div>
```

### Pattern 3: CSS Scroll Offset for Fixed Navbar
**What:** Use `scroll-margin-top` on section elements to offset content below the fixed Navbar (h-20 = 5rem). The site already has `scroll-behavior: smooth` in globals.css.
**When to use:** Always when hash-linking to sections with a fixed header.
**Why not scroll-padding-top on html:** There is a known Next.js App Router bug (#49612) where the `<Link>` component does not respect `scroll-padding` properties. Using `scroll-margin-top` on individual sections is more reliable.
**Example:**
```css
/* globals.css - ADD to existing base layer */
@layer base {
  section[id] {
    scroll-margin-top: 6rem; /* navbar h-20 (5rem) + 1rem breathing room */
  }
}
```

### Pattern 4: Framer Motion whileInView (Existing Pattern)
**What:** Continue the established animation pattern using `motion.div` with `initial`, `whileInView`, `viewport={{ once: true }}`, and staggered `transition.delay`.
**When to use:** For any new content blocks added to the About section.
**Example:**
```typescript
// Source: Already established in About.tsx, Contact.tsx, Projects.tsx
<motion.div
  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.8 }}
>
  {/* Content */}
</motion.div>
```

### Pattern 5: Native Anchor Tags for Hash Navigation
**What:** Use native `<a>` tags (not Next.js `<Link>`) for same-page hash navigation. The site already does this correctly in Navbar.tsx and Hero.tsx.
**When to use:** Always for hash links (`#about`, `#contact`, `#work`). Only use `<Link>` for page-to-page navigation.
**Why:** Native `<a>` tags correctly respect CSS `scroll-behavior: smooth` and `scroll-margin-top`. Next.js `<Link>` has known issues with scroll-padding in the App Router.

### Anti-Patterns to Avoid
- **Hardcoding content in components:** All text, URLs, and config must go in `src/data/index.ts`. Components consume data, never define it.
- **Installing scroll libraries:** No Lenis, react-scroll, or locomotive-scroll needed. CSS `scroll-behavior: smooth` is already configured and sufficient for this single-page portfolio.
- **Using Next.js `<Link>` for hash navigation:** Stick with native `<a>` tags for `#section` links. The existing codebase already does this correctly.
- **Overengineering the availability status:** A simple colored dot + text is sufficient. No need for complex real-time status or database-backed availability.
- **Breaking existing animations:** When enhancing components, preserve existing Framer Motion animation patterns. Add new `motion.div` wrappers following the same initial/whileInView/viewport pattern.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Smooth scroll navigation | Custom scroll handlers with requestAnimationFrame | CSS `scroll-behavior: smooth` (already in globals.css) | Browser-native, zero JS, better performance, already configured |
| Navbar scroll offset | JavaScript scroll position calculations | CSS `scroll-margin-top: 6rem` on sections | Pure CSS, no JS overhead, works with native smooth scroll |
| Icon system | Custom SVG components or icon font | lucide-react (already installed, 0.563.0) | Tree-shakeable, consistent design, already used throughout |
| Class merging | Manual conditional string building | `cn()` utility (already in `src/lib/utils.ts`) | Handles Tailwind conflicts, already established pattern |
| Mobile menu | Custom hamburger with CSS transitions | Existing Navbar.tsx with Framer Motion AnimatePresence | Already built and working well |
| Contact form | New form implementation | Existing Contact.tsx with Supabase | Already working, just needs verification |

**Key insight:** This phase is primarily a content and data enrichment phase, not an infrastructure phase. The architecture, components, and patterns are already established. The work is extending existing components with new data, not building new systems.

## Common Pitfalls

### Pitfall 1: Fixed Navbar Covering Scroll Targets
**What goes wrong:** Clicking a navigation link like `#about` scrolls the section under the fixed navbar, hiding the section header.
**Why it happens:** The fixed navbar (h-20 = 5rem) occupies viewport space that the browser's default scroll-to-anchor calculation doesn't account for.
**How to avoid:** Add `scroll-margin-top: 6rem` to all `section[id]` elements in globals.css. The 6rem value accounts for navbar height (5rem) plus 1rem breathing room.
**Warning signs:** Section headers are hidden behind the navbar when clicking nav links.

### Pitfall 2: Placeholder Content Left in Production
**What goes wrong:** Placeholder URLs like `https://github.com/yourusername` or placeholder text like "Your Name" make it to production.
**Why it happens:** Data store has placeholder values from initial scaffolding (visible in current `src/data/index.ts`: `url: 'https://yourportfolio.com'`, social links with `yourusername`).
**How to avoid:** Audit every field in `src/data/index.ts` for placeholder values. Create a checklist of fields that need real data: social URLs, site URL, author names, bio text.
**Warning signs:** Any string containing "your", "placeholder", "example", "todo", "lorem" in the data store.

### Pitfall 3: External Links Missing `target="_blank"` Security Attributes
**What goes wrong:** External links (GitHub, LinkedIn) open in the same tab or expose the site to `window.opener` security issues.
**Why it happens:** Developer forgets to add `target="_blank"` with `rel="noopener noreferrer"` on external links.
**How to avoid:** All links to external domains (github.com, linkedin.com) must have both `target="_blank"` and `rel="noopener noreferrer"`. The Footer.tsx already does this correctly -- follow the same pattern.
**Warning signs:** External links navigate away from the portfolio instead of opening in a new tab.

### Pitfall 4: Supabase Environment Variables Missing in Production
**What goes wrong:** Contact form fails silently because `NEXT_PUBLIC_SUPABASE_URL` or `NEXT_PUBLIC_SUPABASE_ANON_KEY` are not set in the Netlify deploy environment.
**Why it happens:** These are in `.env.local` for development but may not be configured in the production host.
**How to avoid:** This is a verification step only -- the contact form is already working. Check that environment variables are set in Netlify dashboard and that the form still submits successfully.
**Warning signs:** Contact form shows "Something went wrong" error in production.

### Pitfall 5: Image Not Loading in Static Export
**What goes wrong:** Profile photo fails to display after build because of path issues or missing files.
**Why it happens:** The current Hero.tsx uses a native `<img>` tag with `src="/mackenzie-barry.jpeg"`. The file exists at `public/mackenzie-barry.jpeg`. This should work fine with static export. The risk is if someone changes it to use `next/image` without adding `images: { unoptimized: true }` to the config.
**How to avoid:** Keep using the native `<img>` tag for the profile photo (already working). If switching to `next/image`, must add `images: { unoptimized: true }` to `next.config.js` for static export compatibility.
**Warning signs:** Build warnings about Image Optimization API, broken image on deployed site.

### Pitfall 6: Breaking Mobile Responsiveness
**What goes wrong:** New content (availability badge, location info) overflows or wraps badly on mobile screens.
**Why it happens:** Testing only on desktop, forgetting responsive breakpoints for new UI elements.
**How to avoid:** Use existing responsive patterns: `grid-cols-1 lg:grid-cols-12`, `md:text-3xl`, `flex-wrap`. Test at 320px, 768px, and 1024px widths.
**Warning signs:** Horizontal scroll on mobile, text truncation, overlapping elements.

### Pitfall 7: Accessibility Issues with Status Indicators
**What goes wrong:** Availability status green dot is meaningless to screen readers. Color-only indicators fail WCAG 1.4.1 (Use of Color).
**Why it happens:** Using only a colored dot without accompanying text.
**How to avoid:** Always pair color indicators with text labels. The green dot must have accompanying text like "Available for freelance projects". Add `aria-label` or screen-reader-only text if the visual indicator is purely decorative.
**Warning signs:** Lighthouse accessibility warnings about color contrast or missing labels.

## Code Examples

Verified patterns from the existing codebase:

### Extending the Data Store
```typescript
// src/data/index.ts - Extend the existing 'about' export
// Follow the existing pattern established in the codebase

export const about = {
  title: 'About Me',
  bio: 'I am a Software Engineering student at Lancaster University...',
  // NEW fields for Phase 3
  availability: {
    status: 'available' as const,
    message: 'Available for freelance projects',
  },
  location: {
    city: 'Belfast',
    country: 'Northern Ireland',
    timezone: 'GMT/BST (UTC+0/+1)',
    timezoneNote: 'UK timezone',
  },
  skills: {
    frontend: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'],
    backend: ['Node.js', 'Python', 'PostgreSQL', 'MongoDB'],
    tools: ['Git', 'Docker', 'VS Code', 'Figma'],
  },
  experience: [
    {
      role: 'Software Engineering (MEng)',
      company: 'Lancaster University',
      period: '2024 - 2028',
      description: 'Integrated masters degree in Software Engineering.',
    },
  ],
}
```

### Availability Status Badge Component Pattern
```typescript
// Inside About.tsx - following existing Framer Motion pattern
import { MapPin, Clock, Circle } from 'lucide-react'
import { about } from '@/data'

// Availability status badge
<div className="flex flex-wrap gap-6">
  {/* Availability */}
  <div className="inline-flex items-center gap-2">
    <span className="relative flex h-2 w-2">
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
      <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
    </span>
    <span className="text-sm text-muted-foreground">
      {about.availability.message}
    </span>
  </div>

  {/* Location */}
  <div className="inline-flex items-center gap-2 text-sm text-muted-foreground">
    <MapPin className="w-3.5 h-3.5 text-primary" />
    <span>{about.location.city}, {about.location.country}</span>
  </div>

  {/* Timezone */}
  <div className="inline-flex items-center gap-2 text-sm text-muted-foreground">
    <Clock className="w-3.5 h-3.5 text-primary" />
    <span>{about.location.timezone}</span>
  </div>
</div>
```

### Scroll Offset CSS
```css
/* globals.css - Add inside existing @layer base block */
@layer base {
  section[id] {
    scroll-margin-top: 6rem;
  }
}
```

### Social Links in Navbar (Following Footer Pattern)
```typescript
// Navbar.tsx already iterates navigation.main for page links
// Add social links following the same pattern used in Footer.tsx

// In the desktop nav area, after main navigation items:
{navigation.social
  .filter(s => s.name !== 'Email') // Only GitHub + LinkedIn in navbar
  .map((social) => {
    const Icon = social.icon === 'Github' ? Github
      : social.icon === 'Linkedin' ? Linkedin : Mail
    return (
      <a
        key={social.name}
        href={social.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-muted-foreground hover:text-foreground transition-colors"
        aria-label={social.name}
      >
        <Icon className="w-4 h-4" />
      </a>
    )
  })}
```

### Updating Placeholder Data
```typescript
// src/data/index.ts - Replace ALL placeholder values
export const navigation = {
  social: [
    { name: 'GitHub', href: 'https://github.com/REAL_USERNAME', icon: 'Github' },
    { name: 'LinkedIn', href: 'https://linkedin.com/in/REAL_USERNAME', icon: 'Linkedin' },
    { name: 'Email', href: 'mailto:Mackenzie.barry@icloud.com', icon: 'Mail' },
  ],
}

export const siteConfig = {
  name: 'Mackenzie Barry',
  title: 'Mackenzie Barry — Software Engineering Portfolio',
  description: 'Showcasing my skills, experience and qualifications in Software Engineering',
  url: 'https://REAL_DOMAIN.com', // Replace with actual Netlify URL
}
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| JavaScript scroll libraries (react-scroll) | CSS `scroll-behavior: smooth` + `scroll-margin-top` | 2023-2024 | Zero JS overhead, native browser support, simpler |
| Custom icon SVGs | lucide-react tree-shaken imports | 2022-2024 | Consistent design system, smaller bundle, 1500+ icons |
| Fixed navbar scroll offset with JS | CSS `scroll-margin-top` on targets | 2021-2023 | Pure CSS solution, no JS calculations needed |
| Separate page for About section | Single-page with anchor navigation | Standard for portfolios | Better UX for portfolio sites, less navigation friction |
| `next/image` mandatory | Native `<img>` acceptable for static exports | Next.js 14+ | `next/image` with `output: 'export'` requires `unoptimized: true` or custom loader; native `<img>` is simpler for single images |

**Deprecated/outdated:**
- **react-scroll library:** CSS `scroll-behavior: smooth` has full modern browser support (97%+), making JS scroll libraries unnecessary for basic smooth scrolling
- **`next export` CLI command:** Replaced by `output: 'export'` in next.config.js since Next.js 14 (already configured)
- **Scroll-based active section detection via IntersectionObserver:** While technically valid, for a simple 4-section portfolio, visual active indicators are optional polish, not required for Phase 3 success criteria

## Open Questions

1. **What are Mackenzie's real GitHub and LinkedIn URLs?**
   - What we know: Current data store has placeholder `yourusername` values
   - What's unclear: The actual URLs to use
   - Recommendation: The planner should include a task to update these with real values. The user will need to provide them. Use the format `https://github.com/USERNAME` and `https://linkedin.com/in/USERNAME`.

2. **Should the availability status be dynamic or static?**
   - What we know: For a static export, the status will be baked in at build time
   - What's unclear: Whether the user wants to update availability frequently
   - Recommendation: Use a simple string in the data store. To change availability, update `src/data/index.ts` and redeploy. This is the simplest approach for a static site and matches the existing data-file-over-CMS decision.

3. **Should the About section include a profile photo?**
   - What we know: The Hero section already displays `/mackenzie-barry.jpeg` as a profile photo. The success criteria say "About section displays professional bio with profile photo."
   - What's unclear: Whether this means adding a SECOND photo to the About section, or whether the existing Hero photo satisfies this requirement.
   - Recommendation: The Hero already has the photo. The About section should focus on bio, skills, experience, availability, and location. If a photo is desired in About too, reuse the same image file. Do NOT remove it from Hero. Verify with user if both locations are desired.

4. **What content should the professional bio contain?**
   - What we know: Current bio is generic ("I am a Software Engineering student at Lancaster University..."). The site is meant to signal technical skill for freelancing clients.
   - What's unclear: What specific content the user wants in the bio
   - Recommendation: Enhance the existing bio to be more compelling for freelance clients. Focus on: what the user builds, what technologies they specialize in, what value they provide. The planner should note this content needs user input or approval.

## Sources

### Primary (HIGH confidence)
- **Existing codebase** - All component files, data store, and configuration verified by direct reading
- [Next.js Static Exports Guide](https://nextjs.org/docs/app/guides/static-exports) - Image optimization limitations, static export configuration (v16.1.6, 2026-02-11)
- [Lucide React Icons](https://lucide.dev/guide/packages/lucide-react) - MapPin, Clock, Circle, Github, Linkedin icons verified available
- [Motion.dev Scroll Animations API](https://motion.dev/docs/react-scroll-animations) - whileInView, viewport options (once, amount, margin)

### Secondary (MEDIUM confidence)
- [Next.js Issue #49612](https://github.com/vercel/next.js/issues/49612) - Confirmed bug: Link component does not respect scroll-padding in App Router
- [Mario Giancini - Smooth Scroll with Tailwind and Next.js](https://mariogiancini.com/implementing-smooth-scroll-behavior-with-tailwind-css-and-nextjs) - CSS scroll-behavior implementation pattern
- [Perishable Press - Margin Offset for Anchor Targets](https://perishablepress.com/margin-offset-anchor-targets/) - scroll-margin-top pattern for fixed headers
- [A11y Collective - aria-current](https://www.a11y-collective.com/blog/aria-current/) - Accessible navigation patterns
- [Joel Olawanle - Hash Links Padding](https://joelolawanle.com/blog/hash-links-padding) - scroll-padding-top vs scroll-margin-top comparison

### Tertiary (LOW confidence)
- [Portfolio Design Trends 2026](https://colorlib.com/wp/portfolio-design-trends/) - General portfolio patterns, not specific implementation guidance

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - All libraries already installed and verified working in current codebase
- Architecture: HIGH - Following established patterns already proven in Phases 1-2; no new patterns needed
- Pitfalls: HIGH - Based on direct codebase analysis and verified Next.js documentation
- Content structure: MEDIUM - Data store extension pattern is clear, but actual content text needs user input

**Research date:** 2026-02-13
**Valid until:** ~30 days (2026-03-15) - All patterns are stable and already proven in this codebase
