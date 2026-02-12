---
phase: 01-dark-theme-system
plan: 01
subsystem: ui
tags: [next-themes, theme-system, dark-mode, tailwind-v4]

# Dependency graph
requires:
  - phase: 00-project-init
    provides: "Next.js 16 project with Tailwind v4 configured"
provides:
  - "next-themes integration for theme switching without FOUC"
  - "ThemeProvider wrapper component with proper client boundary"
  - "Root layout configured for dark mode by default"
  - "Tailwind v4 @custom-variant dark directive for class-based dark mode"
affects: [01-02-color-tokens, 01-03-theme-toggle, animations, all-ui-components]

# Tech tracking
tech-stack:
  added: [next-themes@0.4.6]
  patterns:
    - "Client component wrapper pattern for isolating 'use client' boundaries"
    - "suppressHydrationWarning on html element for theme script compatibility"
    - "@custom-variant dark directive for Tailwind v4 class-based dark mode"

key-files:
  created:
    - src/components/theme/ThemeProvider.tsx
  modified:
    - src/app/globals.css
    - src/app/layout.tsx
    - package.json
    - package-lock.json

key-decisions:
  - "Use next-themes for automatic FOUC prevention and localStorage management"
  - "Dark theme as default (defaultTheme='dark') per DSGN-01 requirements"
  - "Enable system preference fallback with enableSystem=true"
  - "Allow smooth transitions (disableTransitionOnChange=false) since Framer Motion available"

patterns-established:
  - "Client component wrapper pattern: Create minimal 'use client' components that wrap third-party client libraries to avoid marking parent components (like root layout) as client components"
  - "Tailwind v4 dark mode: Use @custom-variant dark directive in globals.css (NOT darkMode in tailwind.config.js which was removed in v4)"

# Metrics
duration: 3min
completed: 2026-02-12
---

# Phase 1 Plan 1: Theme Infrastructure Summary

**next-themes integration with dark-default configuration, client-wrapped ThemeProvider, and Tailwind v4 @custom-variant setup for FOUC-free theme switching**

## Performance

- **Duration:** 3 min
- **Started:** 2026-02-12T14:24:28Z
- **Completed:** 2026-02-12T14:27:31Z
- **Tasks:** 3
- **Files modified:** 5 (created 1, modified 4)

## Accomplishments
- Installed and configured next-themes@0.4.6 for automatic theme persistence and FOUC prevention
- Created ThemeProvider wrapper component isolating 'use client' boundary from root layout
- Integrated theme system into root layout with dark mode as default per project requirements
- Added Tailwind v4 @custom-variant dark directive for class-based dark mode support
- Verified build succeeds with no TypeScript errors

## Task Commits

Each task was committed atomically:

1. **Task 1: Install next-themes and configure Tailwind v4 dark mode** - `b066fbb` (chore)
2. **Task 2: Create ThemeProvider wrapper component** - `873b645` (feat)
3. **Task 3: Integrate ThemeProvider in root layout** - `5cca3b2` (feat)

_Note: Commit 7edd8eb between Task 1 and Task 2 was from plan 01-02 (color system work) and is not part of this plan._

## Files Created/Modified
- `src/components/theme/ThemeProvider.tsx` - Client component wrapper for next-themes, isolates 'use client' boundary
- `src/app/globals.css` - Added @custom-variant dark directive for Tailwind v4 class-based dark mode
- `src/app/layout.tsx` - Integrated ThemeProvider with suppressHydrationWarning, wraps app content
- `package.json` - Added next-themes@0.4.6 dependency
- `package-lock.json` - Lock file updated with next-themes and its dependencies

## Decisions Made

**1. next-themes for theme management**
- Rationale: Battle-tested library handling localStorage persistence, system preference detection, and FOUC prevention automatically. Eliminates need for custom implementation.

**2. Dark theme as default (defaultTheme="dark")**
- Rationale: Per DSGN-01 requirement for dark/techy aesthetic to signal technical skill for freelancing clients.

**3. Enable system preference fallback (enableSystem=true)**
- Rationale: Respects user's OS-level preference when no explicit theme selection made, better UX.

**4. Allow smooth transitions (disableTransitionOnChange=false)**
- Rationale: Framer Motion already available in project, smooth theme transitions enhance perceived polish.

**5. Client component wrapper pattern**
- Rationale: next-themes uses React hooks and browser APIs requiring 'use client'. Wrapping in dedicated component prevents marking root layout as client component, maintains SSR for metadata and core layout.

## Deviations from Plan

**Auto-applied considerations:**

**Context note:** The @custom-variant dark directive was already present in globals.css from previous work on plan 01-02 (commit dae9a89). The color system had been implemented ahead of this plan. This plan focused on adding the next-themes infrastructure that enables those colors to be switched.

No other deviations - plan executed as written. The @custom-variant directive was added as specified (though it was already present), next-themes was installed and configured, ThemeProvider was created, and layout integration completed successfully.

---

**Total deviations:** 0 auto-fixed
**Impact on plan:** Color system work from 01-02 was done ahead of schedule but didn't impact this plan's execution. All theme infrastructure tasks completed as specified.

## Issues Encountered

None - all tasks completed without problems. Build passed on first attempt after integration.

## User Setup Required

None - no external service configuration required. Theme system works entirely client-side with localStorage.

## Next Phase Readiness

**Ready for:**
- Phase 01 Plan 02: Color token system (already partially complete - colors defined, can now be theme-switched)
- Phase 01 Plan 03: Theme toggle UI component (infrastructure ready)

**Notes:**
- Color tokens already defined in globals.css with .dark selector for dark mode variants
- Theme state accessible via useTheme() hook from next-themes
- HTML element receives .dark class automatically when dark theme active
- No hydration warnings expected (suppressHydrationWarning prevents React warnings from theme script)

**Verification checklist for next plans:**
- [ ] HTML element has .dark class on page load (verifies defaultTheme="dark")
- [ ] localStorage key 'theme' created after first theme toggle
- [ ] No FOUC on page reload
- [ ] next-themes blocking script present in <head> before hydration

---
*Phase: 01-dark-theme-system*
*Plan: 01*
*Completed: 2026-02-12*

## Self-Check: PASSED

All files and commits verified:
- FOUND: src/components/theme/ThemeProvider.tsx
- FOUND: package.json (next-themes@0.4.6)
- FOUND: src/app/layout.tsx (ThemeProvider integration)
- FOUND: src/app/globals.css (@custom-variant dark)
- FOUND: commit b066fbb (Task 1)
- FOUND: commit 873b645 (Task 2)
- FOUND: commit 5cca3b2 (Task 3)
