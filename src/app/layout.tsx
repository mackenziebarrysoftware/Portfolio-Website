import type { Metadata } from 'next'
import './globals.css'
import { siteConfig } from '@/data'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { ThemeProvider } from '@/components/theme/ThemeProvider'

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
  keywords: ['software engineer', 'portfolio', 'web development', 'Next.js', 'TypeScript'],
  authors: [{ name: 'Your Name' }],
  creator: 'Your Name',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteConfig.url,
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.title,
    description: siteConfig.description,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange={false}
        >
          <Navbar />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
