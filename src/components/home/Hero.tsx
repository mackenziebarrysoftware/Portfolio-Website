'use client'

import { ArrowDown } from 'lucide-react'

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center px-6 md:px-12 py-20 relative overflow-hidden">
      {/* Subtle background texture */}
      <div className="absolute inset-0 opacity-[0.015]"
           style={{
             backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%232C2C2C' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
           }}
      />

      <div className="max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left side - Text */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-4">
              <p className="text-sm uppercase tracking-[0.3em] text-accent reveal reveal-1">
                Portfolio 2024
              </p>

              <h1 className="text-6xl md:text-7xl lg:text-8xl leading-[0.95] reveal reveal-2">
                Creative
                <br />
                Developer
              </h1>

              <div className="h-px bg-charcoal/20 w-24 reveal reveal-3 line-reveal" />
            </div>

            <p className="text-xl md:text-2xl leading-relaxed max-w-xl text-charcoal/70 reveal reveal-4">
              Crafting refined digital experiences through thoughtful design and elegant code
            </p>

            <div className="flex flex-wrap gap-4 reveal reveal-5">
              <a
                href="#work"
                className="group inline-flex items-center gap-3 px-8 py-4 bg-charcoal text-cream hover:bg-accent transition-colors duration-300"
              >
                <span className="text-sm tracking-wide">View Work</span>
                <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform duration-300" />
              </a>

              <a
                href="#contact"
                className="inline-flex items-center gap-3 px-8 py-4 border border-charcoal/20 hover:border-accent hover:text-accent transition-all duration-300"
              >
                <span className="text-sm tracking-wide">Get in Touch</span>
              </a>
            </div>
          </div>

          {/* Right side - Minimal decoration */}
          <div className="lg:col-span-5 reveal reveal-6">
            <div className="relative aspect-square max-w-md mx-auto">
              {/* Minimalist geometric shape */}
              <div className="absolute inset-0 border border-charcoal/10" />
              <div className="absolute inset-8 border border-accent/30" />
              <div className="absolute inset-16 bg-accent/5" />

              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center space-y-6">
                  <div className="space-y-2">
                    <p className="text-sm uppercase tracking-[0.3em] text-accent">Based in</p>
                    <p className="text-2xl font-serif">Your City</p>
                  </div>
                  <div className="h-px w-12 bg-charcoal/20 mx-auto" />
                  <div className="space-y-2">
                    <p className="text-sm uppercase tracking-[0.3em] text-accent">Available</p>
                    <p className="text-2xl font-serif">Worldwide</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 reveal reveal-6">
        <div className="flex flex-col items-center gap-3 text-charcoal/40">
          <span className="text-xs uppercase tracking-[0.3em]">Scroll</span>
          <div className="w-px h-16 bg-charcoal/20" />
        </div>
      </div>
    </section>
  )
}
