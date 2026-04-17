"use client"

import WhyUs from "@/components/why-us"
import Gallery from "@/components/gallery"

export default function ExperienceSection() {
  return (
    <section
      id="experience"
      className="relative overflow-hidden border-y border-gold/10 bg-background/50 scroll-mt-24"
    >
      {/* Background Decorative Glows */}
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        <div className="absolute -left-[20%] top-[10%] h-[min(70vw,520px)] w-[min(70vw,520px)] rounded-full bg-gold/10 blur-[100px] opacity-50" />
        <div className="absolute -right-[15%] bottom-[5%] h-[min(65vw,480px)] w-[min(65vw,480px)] rounded-full bg-gold/5 blur-[120px] opacity-30" />
      </div>

      <div className="relative z-10">
        {/* WhyUs agar props accept karta hai toh layout rehne dein, 
            warna ise bhi <WhyUs /> kar dein */}
        <WhyUs layout="experience" />
        
        {/* Gallery se layout prop hata diya gaya hai build error fix karne ke liye */}
        <Gallery />
      </div>
    </section>
  )
}
