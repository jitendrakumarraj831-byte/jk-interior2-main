import type { Metadata } from "next"
import dynamic from "next/dynamic"
import Navbar from "@/components/navbar"
import Hero from "@/components/hero"
import ErrorBoundary from "@/components/ui/error-boundary"

const Services = dynamic(() => import("@/components/services"), {
  loading: () => <div className="min-h-[28rem]" aria-hidden />,
})

const ExperienceSection = dynamic(() => import("@/components/experience-section"), {
  loading: () => <div className="min-h-[24rem]" aria-hidden />,
})

const ServiceAreas = dynamic(() => import("@/components/service-areas"), {
  loading: () => <div className="min-h-[20rem]" aria-hidden />,
})

const Contact = dynamic(() => import("@/components/contact"), {
  loading: () => <div className="min-h-[24rem]" aria-hidden />,
})

const Footer = dynamic(() => import("@/components/footer"), {
  loading: () => <div className="h-32" aria-hidden />,
})

export const metadata: Metadata = {
  title: "Best False Ceiling & Interior Designer in Araria | JK Interior",
  description:
    "JK Interior provides Gypsum False Ceiling, PVC Panel, WPC Wall Panel, Profile Light and Interior Design services in Araria, Purnia, Supaul and Forbesganj. Call +91 8651070831.",
  keywords: [
    "false ceiling Araria",
    "gypsum ceiling Purnia",
    "PVC ceiling panel Supaul",
    "WPC wall panel Bihar",
    "interior designer Araria",
    "profile light design",
    "modular TV unit Forbesganj",
    "UV marble sheet Bihar",
    "best interior designer near me",
    "JK Interior Bihar",
    "false ceiling contractor Araria",
    "home interior design Purnia",
  ],
  alternates: {
    canonical: "https://www.jkinterior.online",
  },
  openGraph: {
    title: "Best False Ceiling & Interior Designer in Araria | JK Interior",
    description:
      "JK Interior provides Gypsum False Ceiling, PVC Panel, WPC Wall Panel, Profile Light and Interior Design services in Araria, Purnia, Supaul and Forbesganj.",
    url: "https://www.jkinterior.online",
    siteName: "JK Interior",
    type: "website",
    images: [
      {
        url: "https://www.jkinterior.online/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Best False Ceiling & Interior Designer in Araria - JK Interior",
      },
      {
        url: "https://www.jkinterior.online/images/hero-interior.jpg",
        width: 1200,
        height: 630,
        alt: "Luxury Interior Design by JK Interior",
      },
    ],
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Best False Ceiling & Interior Designer in Araria | JK Interior",
    description:
      "JK Interior provides Gypsum False Ceiling, PVC Panel, WPC Wall Panel, Profile Light and Interior Design services in Araria, Purnia, Supaul and Forbesganj.",
    images: ["https://www.jkinterior.online/og-image.jpg"],
  },
  authors: [{ name: "JK Interior" }],
  creator: "JK Interior",
  category: "home_and_garden",
  classification: "interior design services",
}

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <ErrorBoundary>
        <Services />
      </ErrorBoundary>
      <ErrorBoundary>
        <ExperienceSection />
      </ErrorBoundary>
      <ErrorBoundary>
        <ServiceAreas />
      </ErrorBoundary>
      <ErrorBoundary>
        <Contact />
      </ErrorBoundary>
      <ErrorBoundary>
        <Footer />
      </ErrorBoundary>
    </main>
  )
}
