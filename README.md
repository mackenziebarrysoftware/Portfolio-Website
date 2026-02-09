# Portfolio Website

A modern, high-tech portfolio website built with Next.js 15, TypeScript, Tailwind CSS, and Framer Motion.

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Fonts:** Inter (UI) & Playfair Display (Headings)

## Design System

- **Theme:** High-Tech
- **Primary Color:** Electric Blue (#0066FF)
- **Animations:** Scroll-triggered reveals and staggered entries

## Project Structure

```
src/
├── app/                  # Routes & Layouts
│   ├── layout.tsx        # Global providers, Navbar, Footer
│   ├── page.tsx          # Homepage
│   └── globals.css       # Global styles
├── components/
│   ├── layout/           # Global elements
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   ├── home/             # Homepage sections
│   │   ├── Hero.tsx
│   │   ├── Projects.tsx
│   │   ├── About.tsx
│   │   └── Contact.tsx
│   └── ui/               # Reusable components
│       ├── Button.tsx
│       └── Card.tsx
├── data/                 # Content store
│   └── index.ts          # All website content
└── lib/                  # Utilities
    └── utils.ts          # Tailwind merge helper
```

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Customization

All content is centralized in `src/data/index.ts`. Update this file to personalize:
- Site metadata
- Navigation links
- Hero section content
- Projects showcase
- About section (bio, skills, experience)
- Contact information

## Build for Production

```bash
npm run build
npm start
```

## Features

- ✨ Smooth scroll animations with Framer Motion
- 🎨 Electric Blue color scheme with gradient effects
- 📱 Fully responsive design
- 🌙 Dark theme optimized
- ⚡ Optimized performance with Next.js 15
- 🎯 SEO friendly
- 🔧 Type-safe with TypeScript

## License

MIT
