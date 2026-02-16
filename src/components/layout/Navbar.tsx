'use client'

import { useState, useEffect } from 'react'
import { Menu, X, Github, Linkedin } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { navigation } from '@/data'
import { ThemeToggle } from '@/components/theme/ThemeToggle'

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-background/95 backdrop-blur-sm border-b border-border'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <a
              href="/"
              className="text-xl font-serif text-foreground hover:text-accent transition-colors"
            >
              Portfolio
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navigation.main.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-sm uppercase tracking-wide text-muted-foreground hover:text-foreground transition-colors"
                >
                  {item.name}
                </a>
              ))}
              <div className="border-l border-border h-4" />
              {navigation.social
                .filter((s) => s.icon === 'Github' || s.icon === 'Linkedin')
                .map((social) => {
                  const Icon = social.icon === 'Github' ? Github : Linkedin
                  return (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                      aria-label={social.name}
                    >
                      <Icon className="w-4 h-4" />
                    </a>
                  )
                })}
              <ThemeToggle />
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center gap-4">
              <ThemeToggle />
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="w-10 h-10 flex items-center justify-center text-foreground hover:text-accent transition-colors"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden overflow-hidden bg-card border-t border-border"
            >
              <div className="px-6 py-8 space-y-4">
                {navigation.main.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block text-lg font-serif text-foreground hover:text-accent transition-colors"
                  >
                    {item.name}
                  </a>
                ))}
                <div className="pt-4 border-t border-border flex gap-4">
                  {navigation.social
                    .filter((s) => s.icon === 'Github' || s.icon === 'Linkedin')
                    .map((social) => {
                      const Icon = social.icon === 'Github' ? Github : Linkedin
                      return (
                        <a
                          key={social.name}
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="text-muted-foreground hover:text-foreground transition-colors"
                          aria-label={social.name}
                        >
                          <Icon className="w-5 h-5" />
                        </a>
                      )
                    })}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileMenuOpen(false)}
            className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-40 md:hidden"
          />
        )}
      </AnimatePresence>
    </>
  )
}
