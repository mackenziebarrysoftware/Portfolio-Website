# Portfolio Website

## What This Is

A professional portfolio website for Mackenzie Barry, a freelance software engineer based in Belfast. The site targets potential freelance clients across web apps, mobile, APIs, and general software development. It needs to look impressive, build trust, and make visitors want to get in touch.

## Core Value

The site itself must look and feel like the work of a skilled developer — polished design and smooth interactions are the portfolio's first project.

## Requirements

### Validated

- ✓ Contact form submits to Supabase `contact_messages` table — existing
- ✓ Basic site structure (Hero, Projects, About, Contact sections) — existing
- ✓ Navbar and Footer layout — existing
- ✓ Static export to Netlify — existing
- ✓ Profile photo in hero section — existing

### Active

- [ ] Redesign to dark, techy/modern aesthetic (replacing current cream/editorial style)
- [ ] Project case study pages with detailed breakdowns (screenshots, tech used, lessons learned)
- [ ] Data-file-driven project content (add projects by editing a data file, no code changes)
- [ ] Polished animations and interactions throughout
- [ ] Responsive design that looks great on all devices
- [ ] Placeholder project structure ready to fill with real projects

### Out of Scope

- Blog/articles section — not needed for v1, revisit later
- CMS/admin dashboard — data file approach is simpler and sufficient
- Authentication/user accounts — not applicable for a portfolio
- OAuth or third-party login — no users beyond the contact form

## Context

- Existing Next.js 16 + React 19 + Tailwind CSS 4 codebase with static export
- Supabase integration already working for contact form
- Deployed to Netlify via `netlify.toml`
- Data layer exists at `src/data/index.ts` — centralized content store
- UI primitives (Button, Card) already scaffolded in `src/components/ui/`
- Framer Motion already installed for animations
- Current design is cream/charcoal editorial — shifting to dark/modern/techy
- No projects to showcase yet — site needs to look good with placeholder slots

## Constraints

- **Tech stack**: Next.js 16, React 19, Tailwind CSS 4, TypeScript — already established
- **Hosting**: Netlify static export — no server-side rendering
- **Database**: Supabase for contact messages only
- **Content**: Data-file driven (no CMS dependency)

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Dark/techy aesthetic over editorial | Client-facing portfolio for dev freelancing — needs to signal technical skill | — Pending |
| Data file for projects over CMS | Simpler, no extra infrastructure, developer can edit directly | — Pending |
| Static export stays | Already configured, fast hosting, no server costs | ✓ Good |
| Supabase for contact form | Already working, lightweight, free tier sufficient | ✓ Good |

---
*Last updated: 2026-02-11 after initialization*
