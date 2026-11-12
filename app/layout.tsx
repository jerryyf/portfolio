import './global.css'
import type { Metadata } from 'next'
import { GeistMono } from 'geist/font/mono'
import Footer from './components/footer'
import { baseUrl } from './sitemap'

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'jerryyf.dev',
    template: '%s | jerryyf.dev',
  },
  description: 'The personal terminal of jerryyf. Platform engineer. Security first. Vim enjoyer.',
  openGraph: {
    title: 'jerryyf.dev',
    description: 'The personal terminal of jerryyf. Platform engineer. Security first. Vim enjoyer.',
    url: baseUrl,
    siteName: 'jerryyf.dev',
    locale: 'en_US',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={GeistMono.variable}
    >
      <body>
        <a className="skip-link" href="#terminal">Skip to terminal</a>
        <main className="monitor">
          <div className="screen-surround" id="terminal" tabIndex={-1}>{children}</div>
          <Footer />
        </main>
      </body>
    </html>
  )
}
