'use client'

import { motion } from 'framer-motion'
import { Send, Mail } from 'lucide-react'

export default function Contact() {
  return (
    <section id="contact" className="py-32 px-6 md:px-12 bg-cream">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="space-y-16"
        >
          {/* Header */}
          <div className="text-center space-y-6">
            <p className="text-sm uppercase tracking-[0.3em] text-accent">Let's Connect</p>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-serif">
              Start a Project
            </h2>
            <p className="text-xl text-charcoal/70 max-w-2xl mx-auto">
              I'm available for select freelance projects. Let's create something exceptional together.
            </p>
          </div>

          {/* Form */}
          <div className="max-w-2xl mx-auto">
            <form className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-xs uppercase tracking-[0.2em] text-charcoal/60">
                    Your Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-0 py-3 bg-transparent border-b border-charcoal/20 focus:border-accent outline-none transition-colors text-lg"
                    placeholder="John Doe"
                  />
                </div>

                <div className="space-y-3">
                  <label className="text-xs uppercase tracking-[0.2em] text-charcoal/60">
                    Email Address
                  </label>
                  <input
                    type="email"
                    className="w-full px-0 py-3 bg-transparent border-b border-charcoal/20 focus:border-accent outline-none transition-colors text-lg"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-xs uppercase tracking-[0.2em] text-charcoal/60">
                  Project Details
                </label>
                <textarea
                  rows={6}
                  className="w-full px-0 py-3 bg-transparent border-b border-charcoal/20 focus:border-accent outline-none transition-colors text-lg resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>

              <div className="pt-8">
                <button
                  type="submit"
                  className="group w-full md:w-auto px-12 py-4 bg-charcoal text-cream hover:bg-accent transition-colors duration-300 inline-flex items-center justify-center gap-3"
                >
                  <span className="text-sm tracking-wide">Send Message</span>
                  <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </button>
              </div>
            </form>

            {/* Alternative contact */}
            <div className="mt-16 pt-8 border-t border-charcoal/10 text-center space-y-4">
              <p className="text-sm text-charcoal/60">Or email directly at</p>
              <a
                href="mailto:your.email@example.com"
                className="inline-flex items-center gap-3 text-accent hover:text-charcoal transition-colors group"
              >
                <Mail className="w-5 h-5" />
                <span className="text-lg">your.email@example.com</span>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
