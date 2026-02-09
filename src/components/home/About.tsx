'use client'

import { motion } from 'framer-motion'
import { about } from '@/data'

export default function About() {
  return (
    <section id="about" className="py-32 px-6 md:px-12 bg-subtle/30">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Left - Header */}
          <div className="lg:col-span-5">
            <p className="text-sm uppercase tracking-[0.3em] text-accent mb-6">About</p>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-serif">
              Background &
              <br />
              Expertise
            </h2>
          </div>

          {/* Right - Content */}
          <div className="lg:col-span-7 space-y-16">
            {/* Bio */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <p className="text-2xl md:text-3xl font-serif leading-relaxed text-charcoal/90">
                {about.bio}
              </p>
              <div className="h-px bg-charcoal/20 w-16" />
            </motion.div>

            {/* Experience */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-8"
            >
              <h3 className="text-sm uppercase tracking-[0.3em] text-accent">Experience</h3>

              <div className="space-y-6">
                {about.experience.map((exp, i) => (
                  <div key={i} className="border-l border-charcoal/10 pl-8 py-4 space-y-2">
                    <div className="flex justify-between items-start gap-4 flex-wrap">
                      <div>
                        <h4 className="text-xl font-serif mb-1">{exp.role}</h4>
                        <p className="text-charcoal/60">{exp.company}</p>
                      </div>
                      <p className="text-sm text-charcoal/40">{exp.period}</p>
                    </div>
                    <p className="text-charcoal/70">{exp.description}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Skills */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="space-y-8"
            >
              <h3 className="text-sm uppercase tracking-[0.3em] text-accent">Capabilities</h3>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-4">
                {[
                  ...about.skills.frontend,
                  ...about.skills.backend,
                  ...about.skills.tools
                ].map((skill) => (
                  <div key={skill} className="text-charcoal/70 hover:text-charcoal transition-colors">
                    {skill}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
