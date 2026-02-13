/**
 * Centralized Content Store
 * All website text content is managed here for easy updates and maintenance
 */

import { projectsArraySchema } from './schemas/project.schema'
import { projects as rawProjects } from './projects'

export const siteConfig = {
  name: 'Mackenzie Barry',
  title: 'Mackenzie Barry — Software Engineering Portfolio',
  description: 'Showcasing my skills, experience and qualifications in Software Engineering',
  url: 'https://yourportfolio.com',
}

export const navigation = {
  main: [
    { name: 'Home', href: '/' },
    { name: 'Projects', href: '#work' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' },
  ],
  social: [
    { name: 'GitHub', href: 'https://github.com/yourusername', icon: 'Github' },
    { name: 'LinkedIn', href: 'https://linkedin.com/in/yourusername', icon: 'Linkedin' },
    { name: 'Email', href: 'mailto:Mackenzie.barry@icloud.com', icon: 'Mail' },
  ],
}

export const hero = {
  title: 'Software Engineer',
  subtitle: 'Building exceptional digital experiences',
  description: 'Passionate about creating innovative solutions and bringing ideas to life through code.',
  cta: {
    primary: { text: 'View Projects', href: '#projects' },
    secondary: { text: 'Contact Me', href: '#contact' },
  },
}

/**
 * Validated Projects Export
 *
 * Validates projects at build time using Zod schema.
 * .parse() throws ZodError on validation failure → build fails → prevents invalid data in production.
 *
 * This adapts the Data Access Layer pattern to client component architecture:
 * - Validation happens at build time when module is imported
 * - Validated data is accessible to client components
 * - No server-only wrapper needed since Projects.tsx is a client component
 */
export const projects = projectsArraySchema.parse(rawProjects)

export const about = {
  title: 'About Me',
  bio: 'I am a Software Engineering student at Lancaster University, pursuing an integrated masters degree in Software Engineering (MEng, 2024–2028). Based in Belfast, I build modern web applications with React, Next.js, and TypeScript — and I am available for freelance projects that need polished, performant front-ends.',
  availability: {
    status: 'available' as const,
    message: 'Available for freelance projects',
  },
  location: {
    city: 'Belfast',
    country: 'Northern Ireland',
    timezone: 'GMT/BST (UTC+0/+1)',
  },
  skills: {
    frontend: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'],
    backend: ['Node.js', 'Python', 'PostgreSQL', 'MongoDB'],
    tools: ['Git', 'Docker', 'VS Code', 'Figma'],
  },
  experience: [
    {
      role: 'Software Engineering (MEng)',
      company: 'Lancaster University',
      period: '2024 - 2028',
      description: 'Integrated masters degree in Software Engineering.',
    },
  ],
}

export const contact = {
  title: 'Get In Touch',
  description: "I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions.",
  email: 'Mackenzie.barry@icloud.com',
  phone: '07986633394',
}

export const footer = {
  copyright: `© ${new Date().getFullYear()} Mackenzie Barry. All rights reserved.`,
  builtWith: 'Built with Next.js, TypeScript, and Tailwind CSS',
}
