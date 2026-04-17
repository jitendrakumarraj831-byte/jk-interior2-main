import type { Metadata } from "next"
import dynamic from "next/dynamic"
import Navbar from "@/components/navbar"
import Hero from "@/components/hero"

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
  title: "Best Interior Designer in Forbesganj Bihar | JK Interior",
  description:
    "JK Interior provides gypsum ceiling, POP design, PVC wall paneling, WPC louvers, grid ceiling and home decor services in Forbesganj, Araria, Narpatganj, Jogbani, Raniganj, Kursakanta, Chhatapur and Tribeniganj.",
  keywords: [
    "interior designer Forbesganj",
    "best interior designer near me",
    "gypsum ceiling Forbesganj",
    "false ceiling Bihar",
    "POP ceiling design",
    "PVC wall panel Bihar",
    "WPC louvers design",
    "grid ceiling work",
    "home decor Forbesganj",
    "interior designer Araria",
    "JK Interior Bihar",
  ],
  alternates: {
    canonical: "https://www.jkinterior.online",
  },
  openGraph: {
    title: "Best Interior Designer in Forbesganj Bihar | JK Interior",
    description:
      "JK Interior provides gypsum ceiling, POP design, PVC wall paneling, WPC louvers and home decor services in Forbesganj, Araria, Bihar.",
    url: "https://www.jkinterior.online",
    siteName: "JK Interior",
    type: "website",
    images: [
      {
        url: "https://www.jkinterior.online/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Best Interior Designer in Forbesganj - JK Interior",
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
    title: "Best Interior Designer in Forbesganj Bihar | JK Interior",
    description:
      "JK Interior provides gypsum ceiling, POP design, PVC wall paneling, WPC louvers and home decor services in Forbesganj, Araria, Bihar.",
    images: ["https://www.jkinterior.online/og-image.jpg"],
  },
  // Additional SEO meta
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
      <Services />
      <ExperienceSection />
      <ServiceAreas />
      <Contact />
      <Footer />
    </main>
  )
}
