/**
 * Centralized Content Store
 * All website text content is managed here for easy updates and maintenance
 */

export const siteConfig = {
  name: 'Portfolio',
  title: 'Software Engineering Portfolio',
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
    { name: 'Email', href: 'mailto:your.email@example.com', icon: 'Mail' },
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

export const projects = [
  {
    id: 1,
    title: 'Project Title 1',
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
]

export const about = {
  title: 'About Me',
  bio: 'I am a passionate Software Engineer with experience in building web applications and solving complex problems. I love learning new technologies and applying them to create meaningful solutions.',
  skills: {
    frontend: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'],
    backend: ['Node.js', 'Python', 'PostgreSQL', 'MongoDB'],
    tools: ['Git', 'Docker', 'VS Code', 'Figma'],
  },
  experience: [
    {
      role: 'Software Engineer',
      company: 'Company Name',
      period: '2023 - Present',
      description: 'Working on exciting projects and technologies.',
    },
  ],
}

export const contact = {
  title: 'Get In Touch',
  description: "I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions.",
  email: 'your.email@example.com',
}

export const footer = {
  copyright: `© ${new Date().getFullYear()} Portfolio. All rights reserved.`,
  builtWith: 'Built with Next.js, TypeScript, and Tailwind CSS',
}
