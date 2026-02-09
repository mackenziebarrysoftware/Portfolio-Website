'use client'

import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { projects } from '@/data'

export default function Projects() {
  return (
    <section id="work" className="py-32 px-6 md:px-12 bg-cream">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="mb-24">
          <p className="text-sm uppercase tracking-[0.3em] text-accent mb-6">Selected Work</p>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-serif mb-8">Projects</h2>
          <div className="h-px bg-charcoal/20 w-32" />
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
                  <div className="relative aspect-[4/3] overflow-hidden bg-subtle border border-charcoal/10 hover-lift">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-9xl font-serif text-charcoal/5">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                    </div>

                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-accent/0 group-hover:bg-accent/10 transition-colors duration-500" />
                  </div>
                </div>

                {/* Project info */}
                <div className={`lg:col-span-5 space-y-6 ${index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}`}>
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-accent mb-4">
                      {project.tags[0]}
                    </p>
                    <h3 className="text-4xl md:text-5xl font-serif mb-4">
                      {project.title}
                    </h3>
                    <p className="text-lg text-charcoal/70 leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {project.tags.slice(1).map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-4 py-2 border border-charcoal/10 text-charcoal/60"
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
                      className="inline-flex items-center gap-2 text-sm uppercase tracking-wide text-accent hover:text-charcoal transition-colors group/link"
                    >
                      <span>View Live</span>
                      <ArrowUpRight className="w-4 h-4 group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform duration-300" />
                    </a>
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm uppercase tracking-wide text-charcoal/60 hover:text-charcoal transition-colors"
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
