'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, Mail, Check, AlertCircle } from 'lucide-react'
import { supabase } from '@/lib/supabase'

export default function Contact() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('sending')

    const { error } = await supabase
      .from('contact_messages')
      .insert({ name, email, message })

    if (error) {
      setStatus('error')
      return
    }

    setStatus('sent')
    setName('')
    setEmail('')
    setMessage('')
  }

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
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-xs uppercase tracking-[0.2em] text-charcoal/60">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
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
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-0 py-3 bg-transparent border-b border-charcoal/20 focus:border-accent outline-none transition-colors text-lg resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>

              <div className="pt-8">
                {status === 'sent' ? (
                  <div className="inline-flex items-center gap-3 px-12 py-4 bg-accent/10 text-accent">
                    <Check className="w-4 h-4" />
                    <span className="text-sm tracking-wide">Message sent! I'll be in touch soon.</span>
                  </div>
                ) : status === 'error' ? (
                  <div className="space-y-4">
                    <div className="inline-flex items-center gap-3 px-12 py-4 bg-red-50 text-red-600">
                      <AlertCircle className="w-4 h-4" />
                      <span className="text-sm tracking-wide">Something went wrong. Please try again.</span>
                    </div>
                    <div>
                      <button
                        type="submit"
                        className="group w-full md:w-auto px-12 py-4 bg-charcoal text-cream hover:bg-accent transition-colors duration-300 inline-flex items-center justify-center gap-3"
                      >
                        <span className="text-sm tracking-wide">Retry</span>
                        <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="group w-full md:w-auto px-12 py-4 bg-charcoal text-cream hover:bg-accent transition-colors duration-300 inline-flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span className="text-sm tracking-wide">
                      {status === 'sending' ? 'Sending...' : 'Send Message'}
                    </span>
                    <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </button>
                )}
              </div>
            </form>

            {/* Alternative contact */}
            <div className="mt-16 pt-8 border-t border-charcoal/10 text-center space-y-4">
              <p className="text-sm text-charcoal/60">Or email directly at</p>
              <a
                href="mailto:Mackenzie.barry@icloud.com"
                className="inline-flex items-center gap-3 text-accent hover:text-charcoal transition-colors group"
              >
                <Mail className="w-5 h-5" />
                <span className="text-lg">Mackenzie.barry@icloud.com</span>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
