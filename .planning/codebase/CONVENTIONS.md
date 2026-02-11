# Coding Conventions

**Analysis Date:** 2026-02-11

## Naming Patterns

**Files:**
- Components: PascalCase (e.g., `Hero.tsx`, `Contact.tsx`, `Navbar.tsx`)
- Utilities: camelCase (e.g., `utils.ts`, `supabase.ts`)
- Data: lowercase (e.g., `index.ts`)
- Config files: kebab-case (e.g., `next.config.js`, `tailwind.config.js`)

**Functions:**
- Components: PascalCase with default export (e.g., `export default function Hero()`)
- Utilities: camelCase (e.g., `function cn()`)
- Event handlers: camelCase with "handle" prefix (e.g., `handleSubmit`, `handleScroll`)
- State setters: camelCase with "set" prefix from useState (e.g., `setName`, `setEmail`, `setStatus`)

**Variables:**
- State variables: camelCase (e.g., `isScrolled`, `isMobileMenuOpen`, `name`, `email`)
- Constants/Config: camelCase for exports (e.g., `siteConfig`, `navigation`, `hero`, `projects`)
- CSS custom properties: kebab-case with double dash prefix (e.g., `--color-cream`, `--font-serif`)
- Component variants: camelCase objects (e.g., `variants`, `sizes`)

**Types:**
- Interfaces: PascalCase with "Props" suffix for component props (e.g., `ButtonProps`, `CardProps`)
- Type imports: `type` keyword prefix (e.g., `import type { Metadata }`, `import { type ClassValue }`)

## Code Style

**Formatting:**
- No explicit formatter config detected (no .prettierrc or .eslintrc)
- Indentation: 2 spaces (consistent across all TypeScript/TSX files)
- String quotes: Single quotes for TypeScript/JSX, double quotes for HTML attributes
- Semicolons: Not used (omitted throughout codebase)
- Trailing commas: Not used in object literals or arrays
- Line length: Generally kept under 100 characters, with exceptions for long strings/JSX

**Linting:**
- Built-in Next.js linting via `npm run lint`
- TypeScript strict mode enabled (`"strict": true` in tsconfig.json)
- No build errors allowed (`ignoreBuildErrors: false` in next.config.js)

## Import Organization

**Order:**
1. Type imports from external packages (e.g., `import type { Metadata } from 'next'`)
2. External package imports (e.g., `import { motion } from 'framer-motion'`)
3. React hooks (e.g., `import { useState, useEffect } from 'react'`)
4. Icon imports (e.g., `import { ArrowDown } from 'lucide-react'`)
5. Internal utilities (e.g., `import { cn } from '@/lib/utils'`)
6. Data/config imports (e.g., `import { navigation } from '@/data'`)
7. Component imports (e.g., `import Navbar from '@/components/layout/Navbar'`)
8. CSS imports last (e.g., `import './globals.css'`)

**Path Aliases:**
- `@/*` maps to `./src/*` (configured in tsconfig.json)
- Used consistently throughout codebase (e.g., `@/components/home/Hero`, `@/lib/utils`, `@/data`)

## Error Handling

**Patterns:**
- Async errors: Check error object from Supabase responses
- Example from `src/components/home/Contact.tsx`:
```typescript
const { error } = await supabase
  .from('contact_messages')
  .insert({ name, email, message })

if (error) {
  setStatus('error')
  return
}
```
- UI error states: Status-based rendering with conditional JSX
- Form validation: HTML5 required attributes on inputs
- Type safety: Non-null assertion operator (!) for environment variables that must exist

## Logging

**Framework:** Console (no logging library detected)

**Patterns:**
- No explicit logging statements found in application code
- Error handling through UI state changes rather than console logging
- Development errors surface through Next.js dev server

## Comments

**When to Comment:**
- Section headers in components (e.g., `{/* Subtle background texture */}`, `{/* Left side - Text */}`)
- JSDoc for utility functions (e.g., `@/lib/utils.ts` has function documentation)
- File-level documentation headers (e.g., `src/data/index.ts` has centralized content store comment)
- Complex CSS animations and custom properties

**JSDoc/TSDoc:**
- Used for utility functions:
```typescript
/**
 * Utility function to merge Tailwind CSS classes with proper override handling
 * Uses clsx for conditional classes and tailwind-merge to handle conflicts
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```
- Not used for component props (rely on TypeScript interfaces instead)

## Function Design

**Size:** Components range from 15 lines (simple) to 150 lines (complex forms/layouts)

**Parameters:**
- Components use destructured props with TypeScript interfaces
- Default parameter values in destructuring (e.g., `variant = 'primary'`, `size = 'md'`)
- Spread remaining props with `...props` pattern

**Return Values:**
- Components return JSX
- Utilities return typed values (string, client instance, etc.)
- Event handlers return void or Promise<void>

## Module Design

**Exports:**
- Components: Default export for component, named interface for props
- Example from `src/components/ui/Button.tsx`:
```typescript
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(...)

Button.displayName = 'Button'

export default Button
```
- Utilities: Named exports (e.g., `export function cn()`, `export const supabase`)
- Data: Named exports for all config objects (e.g., `export const siteConfig`, `export const navigation`)

**Barrel Files:**
- Not used (no index.ts re-exports)
- Each module imported directly from its file path

## React Patterns

**Client Components:**
- Marked with `'use client'` directive at top of file
- Used for interactivity (state, event handlers, hooks, animations)
- Examples: `src/components/home/Hero.tsx`, `src/components/home/Contact.tsx`, `src/components/layout/Navbar.tsx`

**Server Components:**
- Default (no directive needed)
- Used for static content and layout
- Examples: `src/app/page.tsx`, `src/app/layout.tsx`

**Component Composition:**
- forwardRef pattern for reusable UI components
- Props spread with `{...props}` for HTML attribute passthrough
- Conditional rendering with ternary operators and logical AND

**State Management:**
- useState for local component state
- No global state management (Redux/Zustand) detected
- Form state managed locally with controlled inputs

**Styling:**
- Tailwind CSS utility classes directly in JSX
- `cn()` utility for conditional class merging
- Custom CSS in `globals.css` for animations and base styles
- Inline styles for dynamic SVG data URIs
- CSS custom properties defined in @theme directive

## TypeScript Usage

**Strict Mode:** Enabled

**Type Patterns:**
- Interface for component props extending HTML element types
- Union types for variants (e.g., `'primary' | 'secondary' | 'outline' | 'ghost'`)
- Optional properties with `?` operator
- Non-null assertion `!` for required environment variables
- Type imports with `type` keyword for type-only imports

**Type Definitions:**
- Inline interfaces (no separate .d.ts files for application types)
- next-env.d.ts for Next.js types (auto-generated)

---

*Convention analysis: 2026-02-11*
