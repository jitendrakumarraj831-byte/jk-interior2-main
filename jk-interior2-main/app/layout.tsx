import type { Metadata, Viewport } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import AnimatedAura from '@/components/animated-aura'
import { createJsonLdScript, getBusinessJsonLd } from '@/lib/json-ld'
import './globals.css'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  // ✅ VERY IMPORTANT (OG image fix ke liye)
  metadataBase: new URL('https://www.jkinterior.online'),

  // 🎯 Title & Description (SEO optimized)
  title: 'Best False Ceiling & Interior Designer in Araria | JK Interior',
  description:
    'JK Interior provides Gypsum False Ceiling, PVC Panel, WPC Wall Panel, Profile Light and Interior Design services in Araria, Purnia, Supaul and Forbesganj. Call +91 8651070831.',

  // 🔥 Powerful Local + Ranking Keywords
  keywords: [
    'PVC wall paneling Forbesganj',
    'False ceiling contractor Forbesganj',
    'Interior designer Forbesganj Bihar',
    'Best interior designer in Forbesganj',
    'PVC ceiling work Narpatganj',
    'False ceiling work Jogbani',
    'Interior contractor Araria Bihar',
    'PVC wall panel price in Forbesganj Bihar',
    'False ceiling design for hall in Bihar',
    'Gypsum ceiling contractor near me Bihar',
    'WPC louvers installation in Forbesganj',
    'Fluted panel design for TV wall Bihar',
    'Modern TV unit design in Araria',
    'Bedroom false ceiling design Bihar',
    'cheap PVC panel installation near me',
    'best false ceiling price in Bihar',
    'low cost interior design in Forbesganj',
    'interior work contact number Forbesganj',
    'JK Interior Forbesganj',
    'JK Interior Bihar',
    'PVC paneling Narpatganj Bihar',
    'Interior designer Jogbani Bihar',
    'False ceiling Araria district'
  ].join(', '),

  // 3. Canonical URL (Duplicate issue se bachne ke liye)
  alternates: {
    canonical: 'https://www.jkinterior.online',
  },

  // 4. Robots (Google Indexing ke liye)
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

  // 5. OpenGraph (Social Media sharing ke liye)
  openGraph: {
    title: 'Best False Ceiling & Interior Designer in Araria | JK Interior',
    description:
      'JK Interior provides Gypsum False Ceiling, PVC Panel, WPC Wall Panel, Profile Light and Interior Design services in Araria, Purnia, Supaul and Forbesganj.',
    url: 'https://www.jkinterior.online/',
    siteName: 'JK Interior',
    images: [
      {
        url: 'https://www.jkinterior.online/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'JK Interior Services - PVC Paneling and Ceiling',
      },
      {
        url: 'https://www.jkinterior.online/images/hero-interior.jpg',
        width: 1200,
        height: 630,
        alt: 'Luxury Interior Design by JK Interior',
      },
    ],
    type: 'website',
    locale: 'en_IN',
  },
  // 6. Icons (Aapka "Gol Chakkar" wala logo fix karne ke liye)
  icons: {
    icon: '/favicon.png',
    apple: '/favicon.png',
  },
  // 7. Twitter Card for social sharing
  twitter: {
    card: 'summary_large_image',
    title: 'Best False Ceiling & Interior Designer in Araria | JK Interior',
    description: 'JK Interior provides Gypsum False Ceiling, PVC Panel, WPC Wall Panel, Profile Light and Interior Design services in Araria, Purnia, Supaul and Forbesganj.',
    images: ['https://www.jkinterior.online/og-image.jpg'],
  },
  // 8. Additional SEO meta tags
  authors: [{ name: 'JK Interior' }],
  creator: 'JK Interior',
  publisher: 'JK Interior',
  category: 'home_and_garden',
  classification: 'interior design services',
}

export const viewport: Viewport = {
  themeColor: '#dbeafe',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
  <body className="font-mono min-h-screen text-foreground selection:bg-gold/25 selection:text-foreground">
    <AnimatedAura />
    <div className="relative z-10 min-h-screen">

    {/* SEO Schema (Google ke liye) */}
    {createJsonLdScript(getBusinessJsonLd(), 'business-schema')}

    {children}

    <Analytics />
    </div>
  </body>
</html>
  )
}
