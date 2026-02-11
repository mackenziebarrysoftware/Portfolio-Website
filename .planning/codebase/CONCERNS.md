# Codebase Concerns

**Analysis Date:** 2026-02-11

## Tech Debt

**Supabase Configuration Missing Runtime Validation:**
- Issue: Environment variables use non-null assertion (`!`) without validation
- Files: `src/lib/supabase.ts`
- Impact: Application crashes at runtime if env vars are missing instead of failing fast with clear error
- Fix approach: Add runtime validation on initialization or use `z.string()` schema validation from Zod

**Static Export Incompatibility with Supabase:**
- Issue: Next.js configured with `output: 'export'` for static hosting, but Contact form uses Supabase client-side database writes
- Files: `next.config.js`, `src/components/home/Contact.tsx`
- Impact: Contact form will fail in production if Supabase is not properly configured; no server-side validation
- Fix approach: Either add API route handler for form submissions (requires removing `output: 'export'`) or add client-side validation + error handling for missing Supabase config

**Hardcoded Placeholder Content:**
- Issue: Data file contains placeholder URLs and demo content not replaced with real data
- Files: `src/data/index.ts`
- Impact: Social links point to `github.com/yourusername`, metadata shows "Your Name", projects link to non-existent demos
- Fix approach: Replace all placeholder values in `src/data/index.ts` with actual portfolio data

**Missing Project Images:**
- Issue: Project data references `/projects/project1.jpg`, `/projects/project2.jpg`, `/projects/project3.jpg` but only README.md exists in directory
- Files: `src/data/index.ts` (lines 42, 52, 62), `public/projects/`
- Impact: Broken images on projects section; fallback to CSS gradient placeholders
- Fix approach: Add actual project screenshots to `public/projects/` or update component to handle missing images gracefully

## Known Bugs

**Contact Form Success State Never Resets:**
- Symptoms: After successful submission, form shows "Message sent!" indefinitely with no way to submit another message
- Files: `src/components/home/Contact.tsx`
- Trigger: Submit contact form successfully
- Workaround: Reload page to reset form

**Mobile Menu Doesn't Close on Navigation:**
- Symptoms: Clicking navigation links in mobile menu triggers navigation but doesn't auto-close menu overlay
- Files: `src/components/layout/Navbar.tsx` (lines 76-78)
- Trigger: Open mobile menu, click any navigation link
- Workaround: Manually close menu with X button; actually, code shows `onClick={() => setIsMobileMenuOpen(false)}` is present, so this may not be a bug - needs testing

**Unused Button Component Doesn't Match Design System:**
- Symptoms: `Button.tsx` component uses different color scheme (primary/gray) than rest of site (cream/charcoal/accent)
- Files: `src/components/ui/Button.tsx`
- Trigger: Button component exists but is never imported or used anywhere in application
- Workaround: Custom buttons implemented inline in components

## Security Considerations

**Environment Variables Exposed to Client:**
- Risk: Supabase URL and anon key are exposed in client bundle via `NEXT_PUBLIC_` prefix
- Files: `src/lib/supabase.ts`, `.env.local`
- Current mitigation: Supabase anon keys are designed for client-side use with Row Level Security (RLS)
- Recommendations: Ensure RLS policies are configured in Supabase database for `contact_messages` table; consider API route for form submission to validate server-side

**No Input Sanitization on Contact Form:**
- Risk: Form submissions sent directly to Supabase without sanitization or validation beyond HTML5 `required`
- Files: `src/components/home/Contact.tsx`
- Current mitigation: None
- Recommendations: Add client-side validation (email format, max length), implement rate limiting in Supabase RLS, add server-side validation if moving to API routes

**Email Address Publicly Visible:**
- Risk: Email `Mackenzie.barry@icloud.com` hardcoded in multiple files increases spam risk
- Files: `src/components/home/Contact.tsx` (line 142), `src/data/index.ts` (line 23, 91)
- Current mitigation: None
- Recommendations: Consider obfuscation technique or use contact form exclusively

**No CSRF Protection:**
- Risk: Contact form has no CSRF token protection
- Files: `src/components/home/Contact.tsx`
- Current mitigation: Static export means no session state to protect
- Recommendations: If migrating to API routes, add CSRF protection; for now, rely on Supabase RLS

## Performance Bottlenecks

**Unoptimized Images:**
- Problem: Hero image uses native `<img>` tag instead of Next.js `<Image>` component
- Files: `src/components/home/Hero.tsx` (line 59-63)
- Cause: Static export limitations or oversight
- Improvement path: Use Next.js `<Image>` component with proper width/height for automatic optimization (works with static export)

**No Font Preloading:**
- Problem: Google Fonts (Cormorant Garamond, Work Sans) loaded via `next/font/google` but no explicit preload
- Files: `src/app/layout.tsx`
- Cause: Default configuration
- Improvement path: Next.js handles this automatically with `next/font/google`, but verify font display strategy is optimal

**Scroll Event Listener Without Throttling:**
- Problem: Navbar scroll handler fires on every scroll event without throttling/debouncing
- Files: `src/components/layout/Navbar.tsx` (lines 12-18)
- Cause: Simple implementation for scroll-based navbar background
- Improvement path: Add throttle/debounce to scroll handler or use Intersection Observer API

**Framer Motion Bundle Size:**
- Problem: Framer Motion imported in multiple components adds ~30-40KB to bundle
- Files: `src/components/layout/Navbar.tsx`, `src/components/home/Contact.tsx`, `src/components/home/Projects.tsx`, `src/components/home/About.tsx`
- Cause: Multiple animation components
- Improvement path: Consider lighter animation library or CSS animations for simple transitions; lazy load framer-motion components

## Fragile Areas

**Data Centralization Without Type Safety:**
- Files: `src/data/index.ts`
- Why fragile: All content centralized but no TypeScript interfaces enforce structure; easy to break by renaming properties
- Safe modification: Create TypeScript interfaces for each exported type (Project, SiteConfig, Navigation, etc.) before modifying structure
- Test coverage: None

**Navbar Scroll State Management:**
- Files: `src/components/layout/Navbar.tsx`
- Why fragile: Uses magic number `50` for scroll threshold; mobile menu state could conflict with scroll state
- Safe modification: Extract scroll threshold as named constant; add tests for state interactions
- Test coverage: None

**Contact Form State Machine:**
- Files: `src/components/home/Contact.tsx`
- Why fragile: Form status managed with string literal union type but transitions between states not validated
- Safe modification: Use explicit state machine library (XState) or add state transition validation
- Test coverage: None

**CSS Custom Properties in globals.css:**
- Files: `src/app/globals.css` (assumed to exist based on layout.tsx import)
- Why fragile: Tailwind config likely defines custom colors (cream, charcoal, accent) but not validated
- Safe modification: Check `tailwind.config.js` before modifying color references
- Test coverage: None

## Scaling Limits

**Static Export Performance:**
- Current capacity: Single-page application, suitable for portfolio
- Limit: Adding blog or dynamic content would require migration away from static export
- Scaling path: Move to standard Next.js with API routes and dynamic rendering; consider Netlify Functions for serverless API

**Supabase Free Tier:**
- Current capacity: Contact form submissions
- Limit: 500MB database, 2GB file storage, 50K monthly active users on free tier
- Scaling path: Monitor Supabase dashboard for usage; upgrade to Pro tier ($25/mo) if needed

**No Analytics or Monitoring:**
- Current capacity: No visibility into traffic, errors, or user behavior
- Limit: Cannot detect production issues or measure conversion
- Scaling path: Add Vercel Analytics, Google Analytics, or Plausible; add error tracking with Sentry

## Dependencies at Risk

**React 19 Bleeding Edge:**
- Risk: Using React 19.2.4 which may have undiscovered issues
- Impact: Potential breaking changes or bugs in production
- Migration plan: Monitor React changelog; consider downgrading to React 18 LTS if stability issues arise

**Tailwind CSS v4 (Pre-release):**
- Risk: Using Tailwind 4.1.18 which is not officially stable (v4 is in beta/alpha)
- Impact: Breaking changes possible, plugin ecosystem may not be compatible
- Migration plan: Lock version in package.json; prepare to downgrade to Tailwind 3.x if issues occur

**Next.js 16 Early Adoption:**
- Risk: Using Next.js 16.1.6 shortly after release
- Impact: Potential bugs, ecosystem tools may lag behind
- Migration plan: Stay on minor versions, avoid experimental features

## Missing Critical Features

**No Test Suite:**
- Problem: Zero test files in `src/` directory
- Blocks: Confident refactoring, CI/CD automation, regression prevention
- Priority: High - Add at minimum smoke tests for critical paths (form submission, navigation)

**No Error Boundaries:**
- Problem: No React Error Boundaries to catch component errors
- Blocks: Graceful error handling; entire app crashes on component error
- Priority: Medium - Add error boundary wrapper in layout

**No Loading States:**
- Problem: Contact form shows "Sending..." but no loading UI for other async operations
- Blocks: User feedback for slow networks
- Priority: Low - Current use case is minimal async operations

**No SEO Metadata for Open Graph:**
- Problem: Metadata defined in layout.tsx but missing `images` property for social sharing
- Blocks: Rich previews on social media
- Priority: Medium - Add OG image to improve social sharing

**No Accessibility Audit:**
- Problem: No aria-labels, semantic HTML review, or keyboard navigation testing
- Blocks: WCAG compliance, screen reader support
- Priority: Medium - Run Lighthouse audit and add missing ARIA attributes

**No 404 Page:**
- Problem: Static export likely has no custom 404 page
- Blocks: User-friendly error handling for broken links
- Priority: Low - Create `src/app/not-found.tsx`

## Test Coverage Gaps

**Contact Form Submission Flow:**
- What's not tested: Supabase integration, error handling, success/error state transitions
- Files: `src/components/home/Contact.tsx`
- Risk: Form could silently fail in production, error states never verified
- Priority: High

**Responsive Navbar Behavior:**
- What's not tested: Mobile menu toggle, scroll state changes, navigation clicks
- Files: `src/components/layout/Navbar.tsx`
- Risk: Mobile users could encounter broken navigation
- Priority: High

**Data Schema Validation:**
- What's not tested: Projects array structure, navigation links, site config
- Files: `src/data/index.ts`
- Risk: Typos or structural changes break rendering without compile-time error
- Priority: Medium

**Framer Motion Animations:**
- What's not tested: Animation variants, viewport triggers, motion components
- Files: All components using `framer-motion`
- Risk: Animations could break or cause performance issues
- Priority: Low - Visual regression testing recommended

---

*Concerns audit: 2026-02-11*
