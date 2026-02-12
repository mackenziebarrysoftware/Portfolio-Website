/**
 * Project Type Export
 *
 * Re-exports the Project type from the schema for clean component imports.
 * Components import from @/types/project instead of reaching into schemas.
 */
export type { Project } from '@/data/schemas/project.schema'
