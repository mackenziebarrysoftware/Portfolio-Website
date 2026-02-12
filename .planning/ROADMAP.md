# Roadmap: Portfolio Website

## Overview

Transform the existing portfolio from cream/editorial aesthetic to a dark, techy design that showcases technical skill through polished interactions and comprehensive project presentations. This roadmap delivers a data-driven, fully responsive portfolio with professional design system, smooth animations, and optimal performance.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [x] **Phase 1: Dark Theme System** - Establish professional dark aesthetic with accessibility and theme switching
- [ ] **Phase 2: Project Data Infrastructure** - Create type-safe data structure for project content
- [ ] **Phase 3: Content & Navigation** - Build core content sections and site navigation
- [ ] **Phase 4: Project Showcase UI** - Design and implement visual project presentation
- [ ] **Phase 5: Performance & SEO** - Optimize for speed, search engines, and edge cases
- [ ] **Phase 6: Animations & Polish** - Add polished micro-interactions and page transitions

## Phase Details

### Phase 1: Dark Theme System
**Goal**: Site uses professional dark aesthetic with accessible contrast and user-controlled theme switching
**Depends on**: Nothing (first phase)
**Requirements**: DSGN-01, DSGN-02, DSGN-04, DSGN-05, DSGN-06
**Success Criteria** (what must be TRUE):
  1. All text and UI elements pass WCAG AA contrast ratios (4.5:1 body text, 3:1 UI components)
  2. User can toggle between dark and light themes with preference persisting across sessions
  3. Theme system prevents flash of unstyled content (FOUC) on page load
  4. Interactive elements display polished hover states and visual feedback
  5. Typography uses professional fonts that maintain readability in dark mode
**Plans**: 4 plans in 3 waves

Plans:
- [x] 01-01-PLAN.md - Theme infrastructure with next-themes and dark mode config (Wave 1)
- [x] 01-02-PLAN.md - Dark color system with WCAG AA contrast verification (Wave 1)
- [x] 01-03-PLAN.md - Theme toggle component and semantic token migration (Wave 2)
- [x] 01-04-PLAN.md - Human verification checkpoint (Wave 3)

### Phase 2: Project Data Infrastructure
**Goal**: Project content is managed through type-safe data files with validation
**Depends on**: Phase 1 (needs design tokens for component previews)
**Requirements**: PROJ-04
**Success Criteria** (what must be TRUE):
  1. New projects can be added by editing a TypeScript data file without code changes
  2. Project data structure validates against Zod schema at build time
  3. Data model supports project title, description, tech stack, images, and metadata
  4. All existing placeholder projects render from data file configuration
**Plans**: 1 plan in 1 wave

Plans:
- [ ] 02-01-PLAN.md - Type-safe project data layer with Zod validation (Wave 1)

### Phase 3: Content & Navigation
**Goal**: Core site sections are complete with professional bio, contact methods, and smooth navigation
**Depends on**: Phase 1 (needs dark theme styling)
**Requirements**: CONT-01, CONT-02, CONT-03, CONT-04, CONT-05, CNCT-01, CNCT-02
**Success Criteria** (what must be TRUE):
  1. About section displays professional bio with profile photo
  2. Site shows current freelance availability status and Belfast location with timezone
  3. Navigation includes working links to GitHub and LinkedIn profiles
  4. User can navigate between all sections smoothly using navbar
  5. Contact form submits to Supabase successfully (already working, verify still functional)
  6. Direct email link provides alternative contact method
**Plans**: TBD

Plans:
- [ ] TBD

### Phase 4: Project Showcase UI
**Goal**: Projects display in visually appealing grid with thumbnails, descriptions, and tech badges
**Depends on**: Phase 2 (needs project data structure), Phase 3 (needs navigation context)
**Requirements**: PROJ-01, PROJ-02, PROJ-03, DSGN-03
**Success Criteria** (what must be TRUE):
  1. Projects render in responsive grid layout that adapts to mobile, tablet, and desktop
  2. Each project card shows visual thumbnail, title, description, and tech stack badges
  3. Tech stack displays as styled badges that match the dark theme
  4. Grid layout looks professional with placeholder projects (ready for real content)
  5. Project cards have polished hover states signaling interactivity
**Plans**: TBD

Plans:
- [ ] TBD

### Phase 5: Performance & SEO
**Goal**: Site achieves professional performance scores and search engine optimization
**Depends on**: Phase 4 (needs complete UI to measure performance)
**Requirements**: PERF-01, PERF-02, PERF-05
**Success Criteria** (what must be TRUE):
  1. Lighthouse performance score exceeds 90 on mobile with throttled CPU
  2. Every page includes proper SEO metadata (title, description, Open Graph tags)
  3. Custom 404 page matches site design and provides navigation back to homepage
  4. Images are optimized and lazy-loaded appropriately
  5. Static export builds successfully with all routes generated
**Plans**: TBD

Plans:
- [ ] TBD

### Phase 6: Animations & Polish
**Goal**: Site features smooth page transitions and scroll-triggered animations without performance degradation
**Depends on**: Phase 5 (animations added after performance baseline established)
**Requirements**: PERF-03, PERF-04
**Success Criteria** (what must be TRUE):
  1. Below-fold content reveals smoothly with scroll-triggered animations
  2. Page transitions between sections feel polished and intentional
  3. Animations enhance user experience without blocking content visibility
  4. Lighthouse performance score remains above 90 after animation implementation
  5. Animations work correctly on mobile devices without jank
**Plans**: TBD

Plans:
- [ ] TBD

## Progress

**Execution Order:**
Phases execute in numeric order: 1 → 2 → 3 → 4 → 5 → 6

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Dark Theme System | 4/4 | ✓ Complete | 2026-02-12 |
| 2. Project Data Infrastructure | 0/1 | Not started | - |
| 3. Content & Navigation | 0/TBD | Not started | - |
| 4. Project Showcase UI | 0/TBD | Not started | - |
| 5. Performance & SEO | 0/TBD | Not started | - |
| 6. Animations & Polish | 0/TBD | Not started | - |

---
*Roadmap created: 2026-02-12*
*Last updated: 2026-02-12 after Phase 2 planning*
