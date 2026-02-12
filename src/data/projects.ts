import type { Project } from '@/types/project'

/**
 * Projects Data Array
 *
 * Raw project data with const assertion for immutability.
 * This data is validated through projectsArraySchema.parse() in index.ts
 * to ensure build-time safety before reaching components.
 */
export const projects = [
  {
    id: 1,
    title: 'Project 1',
    description: 'A brief description of this project showcasing what it does and the technologies used.',
    image: '/projects/project1.jpg',
    tags: ['Next.js', 'TypeScript', 'Tailwind CSS'],
    github: 'https://github.com/yourusername/project1',
    demo: 'https://project1-demo.com',
    featured: true,
  },
  {
    id: 2,
    title: 'Project Title 2',
    description: 'Another amazing project that demonstrates your skills and expertise.',
    image: '/projects/project2.jpg',
    tags: ['React', 'Node.js', 'PostgreSQL'],
    github: 'https://github.com/yourusername/project2',
    demo: 'https://project2-demo.com',
    featured: true,
  },
  {
    id: 3,
    title: 'Project Title 3',
    description: 'A third project showcasing different technologies and approaches.',
    image: '/projects/project3.jpg',
    tags: ['Python', 'FastAPI', 'Docker'],
    github: 'https://github.com/yourusername/project3',
    demo: 'https://project3-demo.com',
    featured: false,
  },
  {
    id: 4,
    title: 'New Project',
    description: 'Testing that new projects can be added via data file',
    image: '/projects/project4.jpg',
    tags: ['Test'],
    github: 'https://github.com/test/test',
    demo: 'https://test.com',
    featured: false,
  },
] as const satisfies readonly Project[]
