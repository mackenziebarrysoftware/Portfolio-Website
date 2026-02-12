import { z } from 'zod'

/**
 * Project Schema with Validation Rules
 *
 * Validates project data at build time using Zod.
 * Invalid data causes build to fail with clear error messages.
 */

export const projectSchema = z.object({
  // Unique identifier - must be positive integer
  id: z.number().positive('Project ID must be a positive number'),

  // Title with length constraints
  title: z.string()
    .min(1, 'Project title is required')
    .max(100, 'Project title must be 100 characters or less'),

  // Description with minimum length for meaningful content
  description: z.string()
    .min(10, 'Project description must be at least 10 characters for meaningful content'),

  // Image path must be absolute and have valid image extension
  image: z.string()
    .startsWith('/', 'Image path must start with / (absolute path)')
    .regex(/\.(jpg|jpeg|png|webp)$/i, 'Image must have valid extension (.jpg, .jpeg, .png, .webp)'),

  // Tags array with constraints
  tags: z.array(z.string().min(1, 'Tag cannot be empty'))
    .min(1, 'At least one tag is required')
    .max(10, 'Maximum 10 tags allowed'),

  // Optional URLs with validation
  github: z.string().url('GitHub must be a valid URL').optional(),
  demo: z.string().url('Demo must be a valid URL').optional(),

  // Featured flag - explicit boolean
  featured: z.boolean(),
})

/**
 * Projects Array Schema
 *
 * Validates array of projects with additional constraints:
 * - At least one project required
 * - All project IDs must be unique (prevents copy-paste errors)
 */
export const projectsArraySchema = z.array(projectSchema)
  .min(1, 'At least one project is required')
  .refine(
    (projects) => {
      const ids = projects.map(p => p.id)
      const uniqueIds = new Set(ids)
      return ids.length === uniqueIds.size
    },
    {
      message: 'All project IDs must be unique. Found duplicate IDs in projects array.',
    }
  )

/**
 * TypeScript Type inferred from Zod schema
 *
 * This ensures types stay in sync with validation rules.
 * No manual type definitions that could drift from the schema.
 */
export type Project = z.infer<typeof projectSchema>
