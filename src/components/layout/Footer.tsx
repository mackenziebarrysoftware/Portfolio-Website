'use client'

import { Github, Linkedin, Mail } from 'lucide-react'
import { navigation } from '@/data'

export default function Footer() {
  return (
    <footer className="py-16 px-6 md:px-12 bg-card text-card-foreground border-t border-border">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-2xl font-serif text-foreground">Portfolio</h3>
            <p className="text-muted-foreground text-sm">
              Creative developer crafting refined digital experiences.
            </p>
          </div>

          {/* Links */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Navigate</h4>
            <nav className="flex flex-col gap-2">
              {navigation.main.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {item.name}
                </a>
              ))}
            </nav>
          </div>

          {/* Social */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Connect</h4>
            <div className="flex gap-4">
              {navigation.social.map((social) => {
                const Icon = social.icon === 'Github' ? Github : social.icon === 'Linkedin' ? Linkedin : Mail
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 border border-border hover:border-foreground/60 flex items-center justify-center transition-colors"
                    aria-label={social.name}
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                )
              })}
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground/70">
          <p>© {new Date().getFullYear()} All rights reserved</p>
          <p>Built with Next.js & TypeScript</p>
        </div>
      </div>
    </footer>
  )
}
