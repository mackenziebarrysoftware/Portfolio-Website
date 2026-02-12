# Phase 2: Project Data Infrastructure - Research

**Researched:** 2026-02-12
**Domain:** TypeScript schema validation, data modeling, Next.js static builds
**Confidence:** HIGH

## Summary

Phase 2 transforms the existing untyped `projects` array into a type-safe, validated data layer using Zod. The standard approach is to define a Zod schema first, use `z.infer` to extract TypeScript types, and validate data at build time using `.parse()` in a Data Access Layer (DAL). For Next.js static exports, validation occurs during `next build` when Server Components execute, causing build failures if data is invalid—which is exactly what we want.

The current `src/data/index.ts` file exports a plain array with no validation. Best practice in 2026 is to create a dedicated data layer with: (1) Zod schemas as the single source of truth, (2) type inference from schemas, (3) validation in a DAL pattern, and (4) DTOs (Data Transfer Objects) that expose only needed fields.

**Primary recommendation:** Define a single Zod schema for projects, validate the data array in a DAL function, and use `.parse()` to fail builds on invalid data. Use `as const` for readonly data and export inferred types for components.

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| zod | 4.x (latest stable) | Runtime schema validation with TypeScript inference | Industry standard for TypeScript-first validation; 2KB bundle, zero dependencies, excellent DX |
| server-only | latest | Prevent server code from bundling in client | Official Next.js recommendation for DAL; causes build errors if imported client-side |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| zod-validation-error | latest | Human-readable Zod error messages | Optional; improves error output during development |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Zod | TypeScript types only | No runtime validation—data could be invalid at runtime |
| Zod | Yup | Less TypeScript-native, inference not as seamless |
| Zod | io-ts | More complex API, less adoption in 2026 |
| Data Access Layer | Component-level validation | Higher risk of exposing unvalidated data to client |

**Installation:**
```bash
npm install zod server-only
```

## Architecture Patterns

### Recommended Project Structure
```
src/
├── data/
│   ├── schemas/
│   │   └── project.schema.ts    # Zod schema definitions
│   ├── projects.ts               # Data array with 'as const'
│   └── dal.ts                    # Data Access Layer (server-only)
├── types/
│   └── project.ts                # Exported types from schemas
└── app/
    └── components/               # Consume validated DTOs
```

### Pattern 1: Schema-First Type Inference
**What:** Define Zod schemas and extract TypeScript types using `z.infer`, making schemas the single source of truth.
**When to use:** Always—keeps validation and types synchronized automatically.
**Example:**
```typescript
// src/data/schemas/project.schema.ts
import { z } from 'zod';

export const projectSchema = z.object({
  id: z.number().positive(),
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  image: z.string().startsWith('/', 'Image path must start with /'),
  tags: z.array(z.string().min(1)).min(1, 'At least one tag required'),
  github: z.string().url().optional(),
  demo: z.string().url().optional(),
  featured: z.boolean(),
});

export const projectsArraySchema = z.array(projectSchema);

// Type inference - single source of truth
export type Project = z.infer<typeof projectSchema>;
export type ProjectsArray = z.infer<typeof projectsArraySchema>;
```

### Pattern 2: Const Assertions for Readonly Data
**What:** Use `as const` on data arrays to create readonly tuples, preventing mutations and signaling data is static.
**When to use:** For all static data in portfolio sites—projects won't change at runtime.
**Example:**
```typescript
// src/data/projects.ts
export const projects = [
  {
    id: 1,
    title: 'Project Title 1',
    description: 'Description here',
    image: '/projects/project1.jpg',
    tags: ['Next.js', 'TypeScript'],
    github: 'https://github.com/user/repo',
    demo: 'https://demo.com',
    featured: true,
  },
  // ... more projects
] as const;
```

### Pattern 3: Data Access Layer (DAL) Pattern
**What:** Centralized module that validates data and returns DTOs; marked `server-only` to prevent client bundling.
**When to use:** Always for new Next.js projects per official 2026 guidance.
**Example:**
```typescript
// src/data/dal.ts
import 'server-only';
import { projectsArraySchema } from './schemas/project.schema';
import { projects } from './projects';

export function getProjects() {
  // .parse() throws ZodError on validation failure
  // Build fails in Next.js static export = exactly what we want
  return projectsArraySchema.parse(projects);
}

export function getFeaturedProjects() {
  const validatedProjects = getProjects();
  return validatedProjects.filter(p => p.featured);
}

export function getProjectById(id: number) {
  const validatedProjects = getProjects();
  return validatedProjects.find(p => p.id === id) ?? null;
}
```

### Pattern 4: Build-Time Validation in Server Components
**What:** Call DAL functions in Server Components during `next build`, causing builds to fail on invalid data.
**When to use:** Always with static exports—validation becomes a build-time safety check.
**Example:**
```typescript
// app/page.tsx (Server Component)
import { getProjects } from '@/data/dal';

export default async function ProjectsPage() {
  // This runs during 'next build' for static export
  // If data is invalid, build FAILS - preventing broken deploys
  const projects = getProjects();

  return (
    <div>
      {projects.map(project => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
}
```

### Anti-Patterns to Avoid

- **Defining TypeScript types separately from schemas:** Types and validation drift out of sync. Always use `z.infer`.
- **Using `.safeParse()` for static data validation:** `.safeParse()` is for user input. For static data, use `.parse()` to fail fast.
- **Importing database/validation code in client components:** Use `server-only` package to prevent accidental client bundling.
- **Passing entire data objects to client components:** Create minimal DTOs with only needed fields.
- **Mixing validation approaches:** Choose one pattern (DAL recommended) and use consistently.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Runtime type validation | Custom validation functions | Zod with `.parse()` | Edge cases: URL formats, nested objects, array validation, async refinements—Zod handles all |
| TypeScript type extraction | Manually writing types that match schemas | `z.infer<typeof schema>` | Types automatically stay in sync with validation rules; zero chance of drift |
| Error message formatting | String concatenation for validation errors | Zod's `.issues` array or `zod-validation-error` | Detailed paths, codes, and messages built-in; handles nested errors |
| Data transformation | Manual mapping before validation | Zod `.transform()` and `.preprocess()` | Zod supports coercion (string→number), transformations, and refinements in schema |
| Server-only enforcement | Comments saying "don't import on client" | `server-only` package | Build fails if DAL imported in client component; foolproof enforcement |

**Key insight:** Schema validation is deceptively complex—URL validation, nested object validation, array min/max, optional vs nullable, custom refinements. Zod handles all edge cases and has been battle-tested across thousands of production apps. Don't reinvent this wheel.

## Common Pitfalls

### Pitfall 1: Using `z.string()` for Literal Types
**What goes wrong:** `z.string()` accepts any string, not just specific values like tech stack names.
**Why it happens:** Developers assume `z.string()` works like TypeScript string literals.
**How to avoid:** Use `z.enum()` for fixed sets, `z.literal()` for single values, or `z.refine()` for complex validation.
**Warning signs:** Data passes validation but contains unexpected values.
**Example:**
```typescript
// BAD: Accepts any string
const projectSchema = z.object({
  status: z.string(), // Could be anything!
});

// GOOD: Only specific values
const projectSchema = z.object({
  status: z.enum(['draft', 'published', 'archived']),
});
```

### Pitfall 2: Using `.safeParse()` for Build-Time Validation
**What goes wrong:** Validation errors are swallowed; invalid data makes it to production.
**Why it happens:** Developers use `.safeParse()` everywhere, treating all validation the same.
**How to avoid:** Use `.parse()` for static data (fail fast), `.safeParse()` only for user input.
**Warning signs:** Build succeeds with invalid data; errors discovered at runtime.
**Example:**
```typescript
// BAD: For static data
const result = projectsArraySchema.safeParse(projects);
if (!result.success) {
  console.error(result.error); // Build continues!
}

// GOOD: Fail the build
const validatedProjects = projectsArraySchema.parse(projects);
// Throws ZodError → Next.js build fails → can't deploy broken data
```

### Pitfall 3: Empty String Coercion with `z.coerce.number()`
**What goes wrong:** Empty strings convert to `0`, causing false positives in validation.
**Why it happens:** Zod uses JavaScript's `Number()` which converts `''` to `0`.
**How to avoid:** Add explicit checks for empty strings before coercion, or use `.preprocess()`.
**Warning signs:** Required numeric fields accept empty values.
**Example:**
```typescript
// BAD: Empty string becomes 0
const schema = z.object({
  year: z.coerce.number().min(2000),
});
schema.parse({ year: '' }); // Passes! year = 0 fails .min() BUT empty→0 is unexpected

// GOOD: Explicit handling
const schema = z.object({
  year: z.preprocess((val) => {
    if (val === '' || val === null || val === undefined) return undefined;
    return Number(val);
  }, z.number().min(2000)),
});
```

### Pitfall 4: Not Using `as const` for Static Data
**What goes wrong:** Arrays are mutable, TypeScript infers less precise types.
**Why it happens:** Developers forget TypeScript doesn't make data immutable by default.
**How to avoid:** Add `as const` to all static data arrays and objects.
**Warning signs:** Can accidentally `.push()` to arrays; types are too wide.
**Example:**
```typescript
// BAD: Mutable array
export const projects = [
  { id: 1, title: 'Project' },
];
// Later: projects.push(...) accidentally mutates data

// GOOD: Readonly
export const projects = [
  { id: 1, title: 'Project' },
] as const;
// projects.push(...) → TypeScript error
```

### Pitfall 5: Forgetting `server-only` Package
**What goes wrong:** DAL code (validation, schemas) bundles in client JavaScript, increasing bundle size.
**Why it happens:** Next.js allows importing Server Component code unless explicitly prevented.
**How to avoid:** Add `import 'server-only'` at the top of DAL files.
**Warning signs:** Large client bundles; Zod included in browser JavaScript.
**Example:**
```typescript
// BAD: No protection
// src/data/dal.ts
export function getProjects() { ... }
// Can be imported in 'use client' components

// GOOD: Build fails if imported on client
// src/data/dal.ts
import 'server-only';
export function getProjects() { ... }
// Import in client component → build error
```

### Pitfall 6: Image Path Validation Missed
**What goes wrong:** Invalid image paths (typos, missing leading `/`) pass validation, causing broken images.
**Why it happens:** Developers validate URLs but forget local file paths have rules too.
**How to avoid:** Use `.startsWith('/')` or `.regex()` for local paths; validate file extensions.
**Warning signs:** Broken images in production; paths like `projects/image.jpg` instead of `/projects/image.jpg`.
**Example:**
```typescript
// BAD: Any string
const projectSchema = z.object({
  image: z.string(),
});

// GOOD: Validated path
const projectSchema = z.object({
  image: z.string()
    .startsWith('/', 'Image path must start with /')
    .regex(/\.(jpg|jpeg|png|webp)$/i, 'Invalid image format'),
});
```

## Code Examples

Verified patterns from official sources:

### Complete Schema Definition
```typescript
// Source: https://zod.dev/api (Zod official docs)
import { z } from 'zod';

export const projectSchema = z.object({
  id: z.number().positive(),
  title: z.string().min(1, 'Title cannot be empty').max(100),
  description: z.string().min(10, 'Description too short'),
  image: z.string().startsWith('/').regex(/\.(jpg|jpeg|png|webp)$/i),
  tags: z.array(z.string().min(1)).min(1).max(10),
  github: z.string().url().optional(),
  demo: z.string().url().optional(),
  featured: z.boolean(),
});

export const projectsArraySchema = z.array(projectSchema).min(1);

export type Project = z.infer<typeof projectSchema>;
```

### Data Access Layer with Validation
```typescript
// Source: https://nextjs.org/docs/app/guides/data-security (Next.js 16 Data Security)
import 'server-only';
import { projectsArraySchema, type Project } from './schemas/project.schema';
import { projects } from './projects';

export function getProjects(): Project[] {
  // Validates at build time for static export
  // Throws ZodError on failure → build fails
  return projectsArraySchema.parse(projects);
}

export function getFeaturedProjects(): Project[] {
  return getProjects().filter(p => p.featured);
}

export function getProjectById(id: number): Project | null {
  return getProjects().find(p => p.id === id) ?? null;
}

export function getProjectsByTag(tag: string): Project[] {
  return getProjects().filter(p => p.tags.includes(tag));
}
```

### Static Data with Const Assertion
```typescript
// Source: https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-4.html
import type { Project } from './schemas/project.schema';

export const projects = [
  {
    id: 1,
    title: 'E-Commerce Platform',
    description: 'Full-stack shopping application with payment integration',
    image: '/projects/ecommerce.png',
    tags: ['Next.js', 'TypeScript', 'Stripe', 'PostgreSQL'],
    github: 'https://github.com/username/ecommerce',
    demo: 'https://ecommerce-demo.com',
    featured: true,
  },
  {
    id: 2,
    title: 'Task Manager',
    description: 'Collaborative task tracking with real-time updates',
    image: '/projects/taskmanager.jpg',
    tags: ['React', 'Node.js', 'Socket.io', 'MongoDB'],
    github: 'https://github.com/username/taskmanager',
    featured: true,
  },
] as const satisfies readonly Project[];
// 'as const' makes readonly, 'satisfies' ensures type-safety
```

### Server Component Using DAL
```typescript
// Source: https://nextjs.org/docs/app/guides/static-exports (Next.js Static Exports)
import { getProjects, getFeaturedProjects } from '@/data/dal';
import ProjectCard from '@/components/ProjectCard';

// Server Component - runs during 'next build'
export default async function ProjectsPage() {
  // Validation happens here during build
  // If data invalid → ZodError thrown → build fails
  const projects = getProjects();
  const featured = getFeaturedProjects();

  return (
    <section>
      <h2>Featured Projects</h2>
      <div className="grid">
        {featured.map(project => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      <h2>All Projects</h2>
      <div className="grid">
        {projects.map(project => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}
```

### Handling Validation Errors in Development
```typescript
// For development debugging only
import { projectsArraySchema } from './schemas/project.schema';
import { projects } from './projects';

const result = projectsArraySchema.safeParse(projects);
if (!result.success) {
  console.error('Validation errors:');
  result.error.issues.forEach(issue => {
    console.error(`- ${issue.path.join('.')}: ${issue.message}`);
  });
  throw new Error('Invalid project data');
}
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| PropTypes (runtime) | Zod schemas with `z.infer` | 2021-2023 | Type safety at compile AND runtime; single source of truth |
| Separate TS types + runtime validation | Schema-first with type inference | 2022-2024 | No type drift; schemas define both validation and types |
| Component-level data fetching | Data Access Layer (DAL) | 2024-2026 | Centralized validation; easier auditing; `server-only` enforcement |
| Manual type guards | Zod `.parse()` and `.safeParse()` | 2021-2026 | Automatic error messages; comprehensive validation |
| `.env` variables accessed anywhere | DAL-only access with `server-only` | 2024-2026 | Prevents accidental exposure to client |
| `next export` command | `output: 'export'` in next.config.js | Next.js 14 (2023) | Simplified configuration |

**Deprecated/outdated:**
- **PropTypes:** Removed from React 19—use TypeScript + Zod instead
- **`next export` CLI command:** Replaced by config option in Next.js 14
- **Yup for TypeScript projects:** Zod's type inference is superior
- **Mixing validation libraries:** Standardize on Zod for consistency

## Open Questions

1. **Should we validate image files exist in the filesystem?**
   - What we know: Zod can validate path strings, but not file existence
   - What's unclear: Whether to add build-time checks for `/public` files
   - Recommendation: Start with path validation; add file existence checks in later phase if needed (would require Node.js fs module during build)

2. **How granular should error messages be for content editors?**
   - What we know: Zod provides detailed error paths and messages
   - What's unclear: User's preference for technical vs friendly messages
   - Recommendation: Use Zod's default messages for now; can refine with custom messages or `zod-validation-error` if needed

3. **Should we validate unique IDs in the schema?**
   - What we know: Zod supports `.refine()` for custom validation
   - What's unclear: Whether duplicate ID prevention is needed
   - Recommendation: Add `.refine()` check for unique IDs to prevent copy-paste errors

## Sources

### Primary (HIGH confidence)
- [Zod Official Documentation](https://zod.dev/) - Core API, schema types, validation methods
- [Zod Basics Guide](https://zod.dev/basics) - Usage patterns, error handling, type inference
- [Zod Schema API](https://zod.dev/api) - Object, array, string, enum, union types
- [Next.js Data Security Guide](https://nextjs.org/docs/app/guides/data-security) - DAL pattern, server-only, DTOs (v16.1.6, 2026-02-11)
- [Next.js Static Exports Guide](https://nextjs.org/docs/app/guides/static-exports) - Build-time validation, Server Component execution (v16.1.6, 2026-02-11)
- [TypeScript Const Assertions](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-4.html) - `as const` syntax and semantics

### Secondary (MEDIUM confidence)
- [How to Validate Data with Zod in TypeScript](https://oneuptime.com/blog/post/2026-01-25-zod-validation-typescript/view) - Best practices, entry point validation (Jan 2026)
- [How to Create Const Assertions in TypeScript](https://oneuptime.com/blog/post/2026-01-30-typescript-const-assertions/view) - Readonly arrays, tuples (Jan 2026)
- [In a Next.js application, the Data Access Layer](https://medium.com/@javadmohammadi.career/in-a-next-js-cb8e180bf10a) - DAL implementation patterns
- [Ultimate TypeScript Project Structure for 2026](https://medium.com/@mernstackdevbykevin/an-ultimate-typescript-project-structure-2026-edition-4a2d02faf2e0) - Data layer organization
- [How I Structure Next.js Projects for Scale](https://medium.com/javascript-render/how-i-structure-next-js-projects-for-scale-80646889fd4e) - Feature-first architecture (Dec 2025)
- [Mastering Zod Validation](https://blog.codeminer42.com/zod-validation-101/) - Error handling, safeParse vs parse
- [Customizing Zod errors](https://zod.dev/error-customization) - Custom error messages

### Tertiary (LOW confidence - community resources)
- [Tecktol: Zod Coerce Edge Cases](https://tecktol.com/zod-coerce/) - Empty string to number conversion issue
- [GitHub: Zod + Next.js Production Issues](https://github.com/colinhacks/zod/issues/4924) - Production build considerations
- [Zod String Literal Validation Mistakes](https://www.codegenes.net/blog/how-to-validate-a-string-literal-type-using-zod/) - z.enum vs z.string pitfall

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - Zod 4 stable, official Next.js DAL guidance from Feb 2026
- Architecture: HIGH - DAL pattern is official Next.js recommendation; multiple verified sources
- Pitfalls: MEDIUM-HIGH - Common issues well-documented but some are community-reported

**Research date:** 2026-02-12
**Valid until:** ~30 days (2026-03-12) - Zod and Next.js are stable; validation patterns are mature
