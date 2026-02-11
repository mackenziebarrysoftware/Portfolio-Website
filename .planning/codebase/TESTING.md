# Testing Patterns

**Analysis Date:** 2026-02-11

## Test Framework

**Runner:**
- Not configured (no Jest, Vitest, or other test framework detected)
- No test config files found (no jest.config.*, vitest.config.*, etc.)

**Assertion Library:**
- None configured

**Run Commands:**
```bash
# No test commands configured in package.json
# Only available npm scripts are:
npm run dev              # Development server
npm run build            # Production build
npm run start            # Production server
npm run lint             # Next.js linting
```

## Test File Organization

**Location:**
- No test files detected in src/ directory
- Test files found only in node_modules (third-party dependencies)

**Naming:**
- Not applicable (no test files in application code)

**Structure:**
```
No test directory structure present
```

## Test Structure

**Suite Organization:**
Not applicable - no test framework configured

**Patterns:**
Not applicable - no tests present

## Mocking

**Framework:** Not configured

**Patterns:**
Not applicable - no mocking infrastructure present

**What to Mock:**
Not applicable

**What NOT to Mock:**
Not applicable

## Fixtures and Factories

**Test Data:**
Not applicable - no test fixtures detected

**Location:**
Not applicable

## Coverage

**Requirements:** None enforced

**View Coverage:**
```bash
# No coverage tooling configured
```

## Test Types

**Unit Tests:**
- Not implemented

**Integration Tests:**
- Not implemented

**E2E Tests:**
- Not implemented

## Common Patterns

**Async Testing:**
Not applicable - no async test patterns present

**Error Testing:**
Not applicable - no error test patterns present

## Recommendations for Implementation

**If implementing tests, consider:**

1. **Framework Selection:**
   - Vitest recommended for Next.js + TypeScript projects (faster, native ESM support)
   - Jest also compatible (more established, larger ecosystem)
   - React Testing Library for component testing

2. **Test File Location:**
   - Co-located pattern: `src/components/ui/__tests__/Button.test.tsx`
   - OR separate: `tests/components/ui/Button.test.tsx`

3. **Priority Testing Areas:**
   - `src/lib/utils.ts` - cn() utility function
   - `src/components/ui/Button.tsx` - Reusable UI component with variants
   - `src/components/ui/Card.tsx` - Reusable UI component with variants
   - `src/components/home/Contact.tsx` - Form submission logic with Supabase integration

4. **Mock Targets:**
   - Supabase client (`src/lib/supabase.ts`) for database operations
   - Framer Motion animations (to avoid animation timing issues in tests)
   - Next.js router/navigation
   - Window scrolling events (in Navbar component)

5. **Example Test Structure (if implementing):**
```typescript
// src/lib/__tests__/utils.test.ts
import { describe, it, expect } from 'vitest'
import { cn } from '../utils'

describe('cn utility', () => {
  it('merges class names correctly', () => {
    expect(cn('text-red-500', 'text-blue-500')).toBe('text-blue-500')
  })

  it('handles conditional classes', () => {
    expect(cn('base', false && 'hidden', 'visible')).toBe('base visible')
  })
})

// src/components/ui/__tests__/Button.test.tsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Button from '../Button'

describe('Button component', () => {
  it('renders with default variant', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole('button')).toHaveTextContent('Click me')
  })

  it('applies variant classes correctly', () => {
    render(<Button variant="secondary">Click me</Button>)
    const button = screen.getByRole('button')
    expect(button.className).toContain('bg-gray-800')
  })
})
```

6. **Setup Steps:**
```bash
# Install testing dependencies
npm install -D vitest @testing-library/react @testing-library/jest-dom jsdom

# Create vitest.config.ts
# Add test script to package.json: "test": "vitest"
# Create __tests__ directories alongside components
```

---

*Testing analysis: 2026-02-11*
