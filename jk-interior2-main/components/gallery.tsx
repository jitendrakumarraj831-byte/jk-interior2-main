"use client"

import { useEffect, useState, useCallback, useRef } from "react"
import Image from "next/image"
import { X, ChevronLeft, ChevronRight, Maximize2, Loader as Loader2 } from "lucide-react"
import { motion, AnimatePresence, useInView } from "framer-motion"
import { fadeSlideUp, fadeSlideUpItem, staggerContainer } from "@/components/motion-reveal"
import { galleryImages, buildGalleryJsonLd } from "@/lib/gallery-data"
import { GALLERY_CONFIG } from "@/lib/constants"
import { createJsonLdScript } from "@/lib/json-ld"

// Configuration moved to constants.ts

function GalleryJsonLdScript() {
  return createJsonLdScript(buildGalleryJsonLd(), 'gallery-schema')
}

export default function Gallery() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const [showAll, setShowAll] = useState(false)
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set())
  const [columns, setColumns] = useState<number>(GALLERY_CONFIG.COLUMNS.desktop)
  const galleryRef = useRef<HTMLDivElement>(null)
  
  // Responsive columns with proper cleanup
  useEffect(() => {
    const updateColumns = () => {
      try {
        const width = window.innerWidth
        if (width < GALLERY_CONFIG.BREAKPOINTS.mobile) setColumns(GALLERY_CONFIG.COLUMNS.mobile)
        else if (width < GALLERY_CONFIG.BREAKPOINTS.tablet) setColumns(GALLERY_CONFIG.COLUMNS.tablet)
        else setColumns(GALLERY_CONFIG.COLUMNS.desktop)
      } catch (error) {
        console.error('Error updating gallery columns:', error)
      }
    }
    
    updateColumns()
    window.addEventListener('resize', updateColumns, { passive: true })
    return () => window.removeEventListener('resize', updateColumns)
  }, [])

  const visibleImages = showAll ? galleryImages : galleryImages.slice(0, GALLERY_CONFIG.VISIBLE_COUNT)
  
  // Pinterest-style masonry distribution
  const distributeImagesToColumns = useCallback(() => {
    type ColumnItem = typeof galleryImages[number] & { originalIndex: number }
    const cols = Array.from({ length: columns }, () => [] as ColumnItem[])
    const colHeights = Array(columns).fill(0)

    visibleImages.forEach((img) => {
      const aspectRatio = img.width / img.height
      const shortestColIndex = colHeights.indexOf(Math.min(...colHeights))
      cols[shortestColIndex].push({ ...img, originalIndex: galleryImages.findIndex(i => i.src === img.src) })
      colHeights[shortestColIndex] += 1 / aspectRatio
    })

    return cols
  }, [visibleImages, columns])
  
  const columnsData = distributeImagesToColumns()

  const nextImage = useCallback(() => {
    setLightboxIndex((prev) => {
      if (prev === null) return null
      return (prev + 1) % galleryImages.length
    })
  }, [])

  const prevImage = useCallback(() => {
    setLightboxIndex((prev) => {
      if (prev === null) return null
      return (prev - 1 + galleryImages.length) % galleryImages.length
    })
  }, [])

  // ✅ FIX 1: Better swipe handling for mobile with debouncing
  const handleDragEnd = useCallback((_: any, info: any) => {
    const swipeDistance = Math.abs(info.offset.x)
    const swipeVelocity = Math.abs(info.velocity.x)

    if (swipeDistance > GALLERY_CONFIG.SWIPE_THRESHOLD || swipeVelocity > 500) {
      if (info.offset.x > 0) prevImage()
      else nextImage()
    }
  }, [prevImage, nextImage])

  // ✅ FIX 2: Optimized image preloading with caching
  useEffect(() => {
    if (lightboxIndex === null) return

    const preloadedImages = new Set<number>()
    
    const preloadImage = (index: number) => {
      if (preloadedImages.has(index)) return
      
      try {
        const img = new window.Image()
        img.src = galleryImages[index].src
        preloadedImages.add(index)
      } catch (error) {
        console.error('Error preloading image:', error)
      }
    }

    const nextIdx = (lightboxIndex + 1) % galleryImages.length
    const prevIdx = (lightboxIndex - 1 + galleryImages.length) % galleryImages.length

    preloadImage(nextIdx)
    preloadImage(prevIdx)
  }, [lightboxIndex])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return
      if (e.key === "Escape") setLightboxIndex(null)
      if (e.key === "ArrowRight") nextImage()
      if (e.key === "ArrowLeft") prevImage()
    }

    window.addEventListener("keydown", handleKeyDown)
    document.body.style.overflow = lightboxIndex!== null? "hidden" : ""

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      document.body.style.overflow = ""
    }
  }, [lightboxIndex, nextImage, prevImage])

  const handleImageLoad = useCallback((index: number) => {
    setLoadedImages(prev => new Set(prev).add(index))
  }, [])
  
  return (
    <>
      <GalleryJsonLdScript />

      <section className="py-12 md:py-24 bg-background" ref={galleryRef}>
        <div className="max-w-7xl mx-auto px-4">
          <motion.div initial="hidden" whileInView="visible" variants={staggerContainer}>

            <motion.div className="text-center mb-12" variants={fadeSlideUp}>
              <h2 className="text-3xl md:text-6xl font-bold">
                Project <span className="gold-text">Gallery</span>
              </h2>
              <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
                Explore our premium interior design projects across Bihar - from luxury false ceilings to modern PVC wall paneling
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                {galleryImages.length} total projects • Keyboard navigation available
              </p>
            </motion.div>

            {/* Pinterest-style Masonry Grid */}
            <div className="relative">
              <div className="flex gap-4">
                {columnsData.map((column, colIndex) => (
                  <div key={colIndex} className="flex-1 flex flex-col gap-4">
                    {column.map((img, idx) => {
                      const globalIndex = img.originalIndex
                      const isLoaded = loadedImages.has(globalIndex)
                      
                      return (
                        <motion.div
                          key={`${globalIndex}-${colIndex}`}
                          variants={fadeSlideUpItem}
                          className="relative group cursor-pointer"
                          onClick={() => setLightboxIndex(globalIndex)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              e.preventDefault()
                              setLightboxIndex(globalIndex)
                            }
                          }}
                          whileHover={{ y: -4 }}
                          transition={{ duration: 0.2 }}
                          role="button"
                          tabIndex={0}
                          aria-label={`View image: ${img.alt}`}
                          aria-describedby={`image-info-${globalIndex}`}
                        >
                          <div className="relative overflow-hidden rounded-xl bg-muted">
                            {!isLoaded && (
                              <div className="absolute inset-0 flex items-center justify-center bg-muted/50 z-10">
                                <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
                              </div>
                            )}
                            <div className="relative">
                              <Image
                                src={img.src}
                                alt={img.alt}
                                width={img.width}
                                height={img.height}
                                sizes={`(max-width:768px) ${100/GALLERY_CONFIG.COLUMNS.mobile}vw, (max-width:1024px) ${100/GALLERY_CONFIG.COLUMNS.tablet}vw, ${100/GALLERY_CONFIG.COLUMNS.desktop}vw`}
                                loading={idx < 2 ? "eager" : "lazy"}
                                placeholder="blur"
                                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                                className="w-full h-auto object-cover transition-all duration-500 group-hover:scale-105"
                                onLoad={() => handleImageLoad(globalIndex)}
                              />
                              <div id={`image-info-${globalIndex}`} className="sr-only">
                                {img.alt} - Image {globalIndex + 1} of {galleryImages.length}
                              </div>
                              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <div className="absolute bottom-0 left-0 right-0 p-4">
                                  <div className="flex items-center justify-between">
                                    <p className="text-white text-sm font-medium line-clamp-2">
                                      {img.alt}
                                    </p>
                                    <Maximize2 className="text-white w-5 h-5 flex-shrink-0 ml-2" />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )
                    })}
                  </div>
                ))}
              </div>
            </div>

            {!showAll && galleryImages.length > GALLERY_CONFIG.VISIBLE_COUNT && (
              <motion.div 
                className="text-center mt-12" 
                variants={fadeSlideUp}
              >
                <button
                  onClick={() => setShowAll(true)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      setShowAll(true)
                    }
                  }}
                  aria-label={`Load ${galleryImages.length - GALLERY_CONFIG.VISIBLE_COUNT} more projects`}
                  className="px-8 py-4 bg-gradient-to-r from-[#D4AF37] to-[#B8962E] hover:from-[#B8962E] hover:to-[#9B7F28] text-black rounded-full font-bold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  Load More Projects ({galleryImages.length - GALLERY_CONFIG.VISIBLE_COUNT} remaining)
                </button>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>

      {/* LIGHTBOX MODAL */}
      <AnimatePresence>
        {lightboxIndex!== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 flex items-center justify-center z-[100] touch-none"
            onClick={() => setLightboxIndex(null)}
          >
              {/* ENHANCED LIGHTBOX */}
              <motion.div
                key={lightboxIndex}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={handleDragEnd}
                className="relative w-full max-w-6xl h-[100dvh] md:h-[85vh] px-2 md:px-4 flex items-center justify-center"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close button */}
                <button
                  aria-label="Close gallery"
                  className="fixed top-4 right-4 md:absolute md:-top-12 md:right-0 bg-white/20 hover:bg-white/30 backdrop-blur-md text-white p-3 md:p-2 rounded-full z-[120] transition-all active:scale-95 border border-white/10"
                  onClick={() => setLightboxIndex(null)}
                  onKeyDown={(e) => {
                    if (e.key === 'Escape') {
                      setLightboxIndex(null)
                    }
                  }}
                >
                  <X size={20} className="md:w-6 md:h-6" />
                </button>

                {/* Main Image Container */}
                <div className="relative w-full h-[80vh] md:h-full flex items-center justify-center">
                  <Image
                    src={galleryImages[lightboxIndex].src}
                    alt={galleryImages[lightboxIndex].alt}
                    fill
                    className="object-contain select-none rounded-lg"
                    priority
                    sizes="100vw"
                    quality={95}
                  />
                </div>

                {/* Navigation Buttons */}
                <button
                  aria-label="Previous image"
                  onClick={(e) => { e.stopPropagation(); prevImage() }}
                  onKeyDown={(e) => {
                    if (e.key === 'ArrowLeft') {
                      e.stopPropagation()
                      prevImage()
                    }
                  }}
                  className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white transition-all bg-black/40 hover:bg-black/60 p-3 rounded-full backdrop-blur-sm border border-white/20"
                >
                  <ChevronLeft size={24} />
                </button>

                <button
                  aria-label="Next image"
                  onClick={(e) => { e.stopPropagation(); nextImage() }}
                  onKeyDown={(e) => {
                    if (e.key === 'ArrowRight') {
                      e.stopPropagation()
                      nextImage()
                    }
                  }}
                  className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white transition-all bg-black/40 hover:bg-black/60 p-3 rounded-full backdrop-blur-sm border border-white/20"
                >
                  <ChevronRight size={24} />
                </button>

                {/* Image Info */}
                <div className="absolute bottom-4 md:-bottom-12 left-0 right-0 text-center px-4">
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <p className="text-white/95 text-sm md:text-base font-medium px-4 py-2 bg-black/40 backdrop-blur-sm rounded-lg inline-block" role="img" aria-label={`Image: ${galleryImages[lightboxIndex].alt}`}>
                      {galleryImages[lightboxIndex].alt}
                    </p>
                    <p className="text-white/60 text-xs md:text-sm mt-2" aria-live="polite">
                      Image {lightboxIndex + 1} of {galleryImages.length}
                    </p>
                  </motion.div>
                </div>
              </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
