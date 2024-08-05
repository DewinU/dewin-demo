import type { Metadata } from 'next'
import './globals.css'
import NavBar from '@/components/custom/NavBar'
import { geistMono, geistSans } from './fonts/fonts'

export const metadata: Metadata = {
  title: 'Next.js Demo',
  metadataBase: new URL('https://demo.dewinu.dev'),
  openGraph: {
    title: 'Next.js Demo',
    url: 'https://demo.dewinu.dev',
    siteName: 'Next.js Demo',
  },
  twitter: {
    title: 'Next.js Demo',
    card: 'summary_large_image',
    site: '@dewinu',
    creator: '@dewinu',
  },
  description:
    'A simple app to demonstate the ease of fetching and mutating data with Next.js App Router, RSC, and Server Actions.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  )
}
