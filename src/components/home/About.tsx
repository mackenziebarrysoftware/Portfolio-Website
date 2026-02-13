'use client'

import { motion } from 'framer-motion'
import { MapPin, Clock } from 'lucide-react'
import { about } from '@/data'

export default function About() {
  return (
    <section id="about" className="py-32 px-6 md:px-12 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Left - Header */}
          <div className="lg:col-span-5">
            <p className="text-sm uppercase tracking-[0.3em] text-primary mb-6">About</p>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-serif text-foreground">
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
              <p className="text-2xl md:text-3xl font-serif leading-relaxed text-foreground/90">
                {about.bio}
              </p>
              <div className="h-px bg-border w-16" />
            </motion.div>

            {/* Availability, Location, Timezone */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <div className="flex flex-wrap gap-x-6 gap-y-3">
                {/* Availability */}
                <div className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                  </span>
                  <span>{about.availability.message}</span>
                </div>

                {/* Location */}
                <div className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="w-3.5 h-3.5 text-primary" />
                  <span>{about.location.city}, {about.location.country}</span>
                </div>

                {/* Timezone */}
                <div className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="w-3.5 h-3.5 text-primary" />
                  <span>{about.location.timezone}</span>
                </div>
              </div>
            </motion.div>

            {/* Experience */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="space-y-8"
            >
              <h3 className="text-sm uppercase tracking-[0.3em] text-primary">Experience</h3>

              <div className="space-y-6">
                {about.experience.map((exp, i) => (
                  <div key={i} className="border-l border-border pl-8 py-4 space-y-2">
                    <div className="flex justify-between items-start gap-4 flex-wrap">
                      <div>
                        <h4 className="text-xl font-serif text-foreground mb-1">{exp.role}</h4>
                        <p className="text-muted-foreground">{exp.company}</p>
                      </div>
                      <p className="text-sm text-muted-foreground/70">{exp.period}</p>
                    </div>
                    <p className="text-muted-foreground">{exp.description}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Skills */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="space-y-8"
            >
              <h3 className="text-sm uppercase tracking-[0.3em] text-primary">Capabilities</h3>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-4">
                {[
                  ...about.skills.frontend,
                  ...about.skills.backend,
                  ...about.skills.tools
                ].map((skill) => (
                  <div key={skill} className="text-muted-foreground hover:text-foreground transition-colors">
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
