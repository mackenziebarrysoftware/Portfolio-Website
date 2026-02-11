# External Integrations

**Analysis Date:** 2026-02-11

## APIs & External Services

**Database & Backend:**
- Supabase - Contact form message storage
  - SDK/Client: `@supabase/supabase-js` (v2.95.3)
  - Configuration: `src/lib/supabase.ts`
  - Auth: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - Usage: Inserts to `contact_messages` table from `src/components/home/Contact.tsx`

**Fonts:**
- Google Fonts API - Font delivery via Next.js
  - Fonts loaded: Cormorant Garamond, Work Sans
  - Integration: `next/font/google` in `src/app/layout.tsx`
  - Strategy: Display swap for performance

**Icons:**
- Lucide React - Icon library (local package, not external API)
  - Package: `lucide-react` (v0.563.0)
  - Used in: `src/components/home/Contact.tsx` (Send, Mail, Check, AlertCircle icons)

## Data Storage

**Databases:**
- Supabase (PostgreSQL)
  - Connection: Environment variables (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`)
  - Client: `@supabase/supabase-js`
  - Table: `contact_messages` (fields: name, email, message)
  - Access pattern: Client-side insert from contact form

**File Storage:**
- Static assets - Stored in local filesystem (images directory)
- Build artifacts - Generated to `out/` directory for static hosting

**Caching:**
- None detected (static site with no explicit caching layer)

## Authentication & Identity

**Auth Provider:**
- None - Portfolio site does not require authentication
  - Supabase client uses anonymous key for public table access

## Monitoring & Observability

**Error Tracking:**
- None detected

**Logs:**
- Client-side error handling in contact form (`src/components/home/Contact.tsx`)
- Status states: idle, sending, sent, error
- No centralized logging service configured

**Analytics:**
- None detected in codebase

## CI/CD & Deployment

**Hosting:**
- Netlify
  - Config: `netlify.toml`
  - Build command: `npm run build`
  - Publish directory: `out`
  - Static site deployment (Next.js static export)

**CI Pipeline:**
- None detected (no `.github/workflows` in project root)
- Build happens on Netlify platform

**Environment Management:**
- Local: `.env.local` file
- Production: Environment variables managed via Netlify dashboard

## Environment Configuration

**Required env vars:**
- `NEXT_PUBLIC_SUPABASE_URL` - Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Supabase anonymous/public key
- Note: `NEXT_PUBLIC_` prefix makes these accessible in browser bundle

**Secrets location:**
- Development: `.env.local` (gitignored)
- Production: Netlify environment variables

## Webhooks & Callbacks

**Incoming:**
- None detected

**Outgoing:**
- None detected
- Contact form writes directly to Supabase, no webhook notifications

## Third-Party Dependencies

**UI/UX:**
- Framer Motion - Animation library for scroll and interaction animations
  - Used in: Contact form (`src/components/home/Contact.tsx`)
  - Features: Motion components with initial, whileInView, viewport props

**Utilities:**
- `clsx` - Conditional class names
- `tailwind-merge` - Tailwind class deduplication via `cn()` utility in `src/lib/utils.ts`

## SEO & Metadata

**Open Graph:**
- Configured in `src/app/layout.tsx`
- Metadata includes: title, description, keywords, Open Graph tags, Twitter card
- Data sourced from `@/data` (site configuration)

**Social:**
- Twitter card metadata configured
- No active social media API integrations

---

*Integration audit: 2026-02-11*
