'use client'

import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { projects } from '@/data'
import type { Project } from '@/types/project'

export default function Projects() {
  return (
    <section id="work" className="py-32 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="mb-24">
          <p className="text-sm uppercase tracking-[0.3em] text-primary mb-6">Selected Work</p>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-serif text-foreground mb-8">Projects</h2>
          <div className="h-px bg-border w-32" />
        </div>

        {/* Projects list */}
        <div className="space-y-32">
          {projects.map((project, index) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="group"
            >
              <div className={`grid grid-cols-1 lg:grid-cols-12 gap-12 items-center ${index % 2 === 1 ? 'lg:grid-flow-dense' : ''}`}>
                {/* Project visual */}
                <div className={`lg:col-span-7 ${index % 2 === 1 ? 'lg:col-start-6' : ''}`}>
                  <div className="relative aspect-[4/3] overflow-hidden bg-muted border border-border hover-lift">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-9xl font-serif text-foreground/5">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                    </div>

                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors duration-500" />
                  </div>
                </div>

                {/* Project info */}
                <div className={`lg:col-span-5 space-y-6 ${index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}`}>
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-primary mb-4">
                      {project.tags[0]}
                    </p>
                    <h3 className="text-4xl md:text-5xl font-serif text-foreground mb-4">
                      {project.title}
                    </h3>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {project.tags.slice(1).map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-4 py-2 border border-border text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-4 pt-4">
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm uppercase tracking-wide text-primary hover:text-foreground transition-colors group/link"
                    >
                      <span>View Live</span>
                      <ArrowUpRight className="w-4 h-4 group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform duration-300" />
                    </a>
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm uppercase tracking-wide text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <span>Source</span>
                    </a>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
