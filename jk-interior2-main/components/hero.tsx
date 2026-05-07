"use client"

import { useState, useEffect, useCallback } from "react"
import { Phone, ArrowRight, MapPin, Star, ShieldCheck, Layers, LayoutGrid as Layout, Monitor, MessageCircle, Check } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { BUSINESS_CONTACT } from "@/lib/constants"

const easeLux = [0.22, 1, 0.36, 1] as const

const rotatingServices = [
  "PVC False Ceiling",
  "Gypsum Ceiling",
  "WPC Wall Panel",
  "UV Marble Sheet",
  "Profile Light Design",
  "Modular TV Unit",
]

const trustPoints = [
  { icon: ShieldCheck, label: "Premium Finish" },
  { icon: Check, label: "Affordable Pricing" },
  { icon: Layers, label: "Fast Installation" },
  { icon: Layout, label: "Modern Designs" },
]

const featureCards = [
  {
    icon: Layers,
    title: "False Ceiling",
    desc: "Gypsum & PVC ceiling with creative lighting designs",
    image: "/images/gypsum-ceiling.jpg",
  },
  {
    icon: Layout,
    title: "Wall Paneling",
    desc: "WPC louvers & UV marble premium wall finishes",
    image: "/images/wpc-louvers.jpg",
  },
  {
    icon: Monitor,
    title: "Modular TV Unit",
    desc: "Custom TV units with hidden wiring management",
    image: "/images/tv-unit.jpg",
  },
]

const heroSlides = [
  { src: "/images/hero-interior.jpg", alt: "Modern interior false ceiling design by JK Interior" },
  { src: "/images/gypsum-ceiling.jpg", alt: "Gypsum false ceiling design in Araria Bihar" },
  { src: "/images/pvc-ceiling.jpg", alt: "PVC ceiling panel installation in Purnia" },
  { src: "/images/wpc-louvers.jpg", alt: "WPC wall panel design in Supaul Bihar" },
  { src: "/images/tv-unit.jpg", alt: "Modular TV unit design in Forbesganj" },
]

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay, ease: easeLux },
  }),
}

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
}

const staggerItem = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: easeLux } },
}

const slideVariants = {
  enter: (direction: number) => ({ x: direction > 0 ? "100%" : "-100%", opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (direction: number) => ({ x: direction < 0 ? "100%" : "-100%", opacity: 0 }),
}

export default function Hero() {
  const [[page, direction], setPage] = useState([0, 0])
  const index = Math.abs(page % heroSlides.length)
  const [serviceIndex, setServiceIndex] = useState(0)

  const paginate = useCallback(
    (newDirection: number) => setPage([page + newDirection, newDirection]),
    [page],
  )

  useEffect(() => {
    const t = setInterval(() => paginate(1), 5500)
    return () => clearInterval(t)
  }, [paginate])

  useEffect(() => {
    const t = setInterval(() => {
      setServiceIndex((i) => (i + 1) % rotatingServices.length)
    }, 2800)
    return () => clearInterval(t)
  }, [])

  return (
    <section
      id="home"
      aria-labelledby="hero-heading"
      className="relative min-h-[100dvh] w-full overflow-hidden pt-20 sm:pt-24 bg-[#f8faff]"
    >
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden="true">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#dbeafe,#f0f7ff)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_130%_70%_at_50%_-10%,rgba(37,99,235,0.08),transparent_55%)]" />
        <div className="absolute -left-[10%] top-[5%] h-[min(60vw,480px)] w-[min(60vw,480px)] rounded-full bg-[radial-gradient(circle,rgba(96,165,250,0.15)_0%,transparent_65%)] blur-[50px]" />
        <div className="absolute -right-[8%] bottom-[5%] h-[min(50vw,400px)] w-[min(50vw,400px)] rounded-full bg-[radial-gradient(circle,rgba(59,130,246,0.10)_0%,transparent_60%)] blur-[50px]" />
      </div>

      <div className="relative z-10 grid min-h-[calc(100dvh-5rem)] grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-0">
        {/* LEFT CONTENT */}
        <div className="flex flex-col justify-center px-5 py-8 sm:px-8 lg:pl-12 lg:pr-6 xl:pl-20 xl:pr-8">
          {/* Trust Badges */}
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="visible"
            className="mb-5 flex flex-wrap items-center gap-2"
          >
            {[
              { icon: Star, text: "5-Star Rated" },
              { icon: ShieldCheck, text: "Premium Interior Work" },
              { icon: MapPin, text: "Serving Bihar" },
            ].map((badge) => (
              <motion.span
                key={badge.text}
                variants={staggerItem}
                className="inline-flex items-center gap-1.5 rounded-full bg-white/60 border border-blue-100 px-3 py-1.5 backdrop-blur-sm"
              >
                <badge.icon className="h-3 w-3 text-blue-600" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-blue-800">
                  {badge.text}
                </span>
              </motion.span>
            ))}
          </motion.div>

          {/* Location */}
          <motion.div
            custom={0.15}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="mb-4 inline-flex w-fit items-center gap-2 rounded-full bg-blue-50/80 border border-blue-200/60 px-4 py-2"
          >
            <MapPin className="h-3.5 w-3.5 text-blue-600" />
            <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-blue-700">
              Serving Araria &bull; Purnia &bull; Supaul &bull; Forbesganj
            </span>
          </motion.div>

          {/* H1 */}
          <motion.h1
            id="hero-heading"
            custom={0.2}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="text-3xl sm:text-4xl md:text-[2.75rem] lg:text-5xl font-black text-blue-950 leading-[1.1] tracking-tight max-w-xl"
          >
            Best False Ceiling &amp;{" "}
            <span className="gold-text">Interior Designer</span> in Araria,
            Purnia &amp; Supaul
          </motion.h1>

          {/* Brand Name */}
          <motion.p
            custom={0.3}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="mt-3 text-sm font-black uppercase tracking-[0.3em] text-blue-600"
          >
            JK Interior
          </motion.p>

          {/* Rotating Services */}
          <motion.div
            custom={0.35}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="mt-4 flex items-center gap-2 h-7"
          >
            <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Expert in
            </span>
            <span className="relative inline-block min-w-[180px] overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.span
                  key={serviceIndex}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ duration: 0.35, ease: easeLux }}
                  className="inline-block text-sm font-bold text-blue-600"
                >
                  {rotatingServices[serviceIndex]}
                </motion.span>
              </AnimatePresence>
            </span>
          </motion.div>

          {/* Description */}
          <motion.p
            custom={0.4}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="mt-4 max-w-lg text-sm sm:text-base text-gray-600 leading-relaxed"
          >
            JK Interior provides premium false ceiling and modern interior
            solutions for homes, offices and shops across Araria, Purnia, Supaul
            and nearby Bihar areas.
          </motion.p>

          {/* Hindi Luxury Text */}
          <motion.p
            custom={0.45}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="mt-3 text-lg sm:text-xl font-semibold text-blue-950 italic"
          >
            &ldquo;अब आपके घर की हर दीवार बोलेगी{" "}
            <span className="text-blue-600 underline decoration-blue-200 decoration-2 underline-offset-4">
              Luxury
            </span>
            &rdquo;
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            custom={0.5}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="mt-8 flex flex-wrap gap-3"
          >
            <Button
              asChild
              size="lg"
              className="h-13 px-7 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-xl shadow-blue-600/25 transition-all active:scale-95 luxury-animated-shine overflow-hidden relative"
            >
              <a
                href={`tel:${BUSINESS_CONTACT.phone}`}
                className="flex items-center gap-2"
              >
                <Phone className="h-4 w-4" /> Call Now
              </a>
            </Button>

            <Button
              asChild
              size="lg"
              className="h-13 px-7 rounded-full bg-green-600 hover:bg-green-700 text-white shadow-xl shadow-green-600/20 transition-all active:scale-95 luxury-animated-shine overflow-hidden relative"
            >
              <a
                href={`https://wa.me/${BUSINESS_CONTACT.phone.replace("+", "")}?text=Hello%20JK%20Interior%2C%20I%20am%20interested%20in%20your%20services.`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <MessageCircle className="h-4 w-4" /> WhatsApp
              </a>
            </Button>

            <Button
              asChild
              variant="outline"
              size="lg"
              className="h-13 px-7 rounded-full border-blue-200 hover:bg-blue-50 transition-all active:scale-95"
            >
              <Link href="#services" className="flex items-center gap-2">
                View Services <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </motion.div>

          {/* Trust Points */}
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="visible"
            className="mt-8 flex flex-wrap gap-x-5 gap-y-2"
          >
            {trustPoints.map((point) => (
              <motion.div
                key={point.label}
                variants={staggerItem}
                className="flex items-center gap-1.5"
              >
                <point.icon className="h-3.5 w-3.5 text-blue-600" />
                <span className="text-xs font-semibold text-gray-700">
                  {point.label}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* RIGHT CONTENT */}
        <div className="relative z-20 flex flex-col gap-4 p-4 sm:p-6 lg:py-8 lg:pr-8 xl:pr-12 lg:pl-0">
          {/* Image Slider */}
          <div className="relative flex-1 min-h-[280px] sm:min-h-[340px] lg:min-h-0 overflow-hidden rounded-[2rem] sm:rounded-[2.5rem] bg-white shadow-2xl border border-white/80">
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={page}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.3 },
                }}
                className="absolute inset-0"
              >
                <Image
                  src={heroSlides[index].src}
                  alt={heroSlides[index].alt}
                  fill
                  className="object-cover"
                  priority={index === 0}
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 75vw, 50vw"
                  quality={80}
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              </motion.div>
            </AnimatePresence>

            {/* Slider Controls */}
            <div className="absolute bottom-4 left-4 right-4 z-30 flex items-center justify-between">
              <div className="flex gap-2">
                <button
                  onClick={() => paginate(-1)}
                  aria-label="Previous slide"
                  className="p-2.5 rounded-full bg-white/90 text-blue-600 shadow-lg hover:bg-white active:scale-90 transition-all"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
                </button>
                <button
                  onClick={() => paginate(1)}
                  aria-label="Next slide"
                  className="p-2.5 rounded-full bg-white/90 text-blue-600 shadow-lg hover:bg-white active:scale-90 transition-all"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
                </button>
              </div>
              <div className="text-white text-xs font-bold tracking-widest bg-black/20 backdrop-blur-md px-3 py-1 rounded-full">
                0{index + 1} / 0{heroSlides.length}
              </div>
            </div>
          </div>

          {/* Feature Cards */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-3 gap-3"
          >
            {featureCards.map((card) => (
              <motion.article
                key={card.title}
                variants={staggerItem}
                className="group relative overflow-hidden rounded-2xl border border-blue-100/60 glass-panel p-3 sm:p-4 transition-all duration-300 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-100/40 hover:-translate-y-0.5"
              >
                <div className="relative z-10">
                  <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 border border-blue-100 text-blue-600 group-hover:bg-blue-100 transition-colors">
                    <card.icon className="h-4 w-4" />
                  </div>
                  <h3 className="text-xs sm:text-sm font-bold text-blue-950">
                    {card.title}
                  </h3>
                  <p className="mt-0.5 text-[10px] sm:text-xs text-muted-foreground leading-snug line-clamp-2">
                    {card.desc}
                  </p>
                </div>
                {/* Subtle glow on hover */}
                <div className="absolute -bottom-4 -right-4 h-16 w-16 rounded-full bg-blue-200/0 group-hover:bg-blue-200/20 blur-xl transition-all duration-500" aria-hidden="true" />
              </motion.article>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
