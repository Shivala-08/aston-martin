"use client";

import { useRef } from "react";
import { motion, useScroll, useInView } from "framer-motion";
import Navbar from "@/components/Navbar";
import VulcanScrollCanvas from "@/components/VulcanScrollCanvas";
import VulcanExperience from "@/components/VulcanExperience";
import { CAR, SPECS_GRID, FEATURES } from "@/data/carData";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <main className="bg-vulcan-black min-h-screen">
      <Navbar />

      {/* ─── Scroll-Driven Hero Section ─── */}
      <section ref={containerRef} className="h-[500vh] relative">
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          <VulcanScrollCanvas
            scrollYProgress={scrollYProgress}
            totalFrames={CAR.totalFrames}
            imageFolderPath={CAR.imageFolderPath}
          />
          <VulcanExperience scrollYProgress={scrollYProgress} />
        </div>
      </section>

      {/* ─── Below-Fold Content ─── */}
      <div className="relative z-20 bg-vulcan-black">
        <SpecsGrid />
        <FeaturesSection />
        <Footer />
      </div>
    </main>
  );
}

/* ═══════════════════════════════════════════════════
   SPECS GRID
   ═══════════════════════════════════════════════════ */
function SpecsGrid() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 md:py-32 px-6 md:px-16 max-w-7xl mx-auto">
      {/* Section heading */}
      <motion.div
        className="flex items-center gap-4 mb-4"
        initial={{ opacity: 0, x: -30 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <div className="w-8 h-[1px] bg-racing-lime" />
        <span className="text-[10px] tracking-[0.5em] uppercase text-racing-lime font-heading">
          Performance
        </span>
      </motion.div>

      <motion.h2
        className="font-heading text-3xl md:text-5xl font-bold uppercase tracking-tight mb-16"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        By the Numbers
      </motion.h2>

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-[1px] bg-white/5">
        {SPECS_GRID.map((spec, i) => (
          <motion.div
            key={spec.label}
            className="bg-vulcan-black p-6 md:p-8 group hover:bg-carbon-gray/50 transition-colors duration-500"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 + i * 0.06 }}
          >
            <span className="text-2xl mb-3 block">{spec.icon}</span>
            <p className="font-heading text-lg md:text-2xl text-white mb-1 group-hover:text-racing-lime transition-colors duration-300">
              {spec.value}
            </p>
            <p className="text-[10px] tracking-[0.25em] uppercase text-white/40 font-heading">
              {spec.label}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   FEATURES
   ═══════════════════════════════════════════════════ */
function FeaturesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 md:py-32 px-6 md:px-16 max-w-7xl mx-auto">
      {/* Section heading */}
      <motion.div
        className="flex items-center gap-4 mb-4"
        initial={{ opacity: 0, x: -30 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <div className="w-8 h-[1px] bg-racing-lime" />
        <span className="text-[10px] tracking-[0.5em] uppercase text-racing-lime font-heading">
          Engineering
        </span>
      </motion.div>

      <motion.h2
        className="font-heading text-3xl md:text-5xl font-bold uppercase tracking-tight mb-16"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        Built Beyond Limits
      </motion.h2>

      {/* Feature cards */}
      <div className="grid md:grid-cols-2 gap-6">
        {FEATURES.map((feature, i) => (
          <motion.div
            key={feature.title}
            className="relative border border-white/5 p-8 md:p-10 group hover:border-racing-lime/20 transition-all duration-500 bg-gradient-to-br from-carbon-gray/20 to-transparent"
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 + i * 0.1 }}
          >
            {/* Corner accent */}
            <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-racing-lime/30 group-hover:border-racing-lime/60 transition-colors duration-500" />

            <span className="text-[10px] tracking-[0.3em] uppercase text-racing-lime/60 font-heading mb-4 block">
              0{i + 1}
            </span>

            <h3 className="font-heading text-lg md:text-xl uppercase tracking-wider mb-4 group-hover:text-racing-lime transition-colors duration-300">
              {feature.title}
            </h3>

            <p className="text-white/50 text-sm md:text-base leading-relaxed font-body tracking-wide">
              {feature.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   FOOTER
   ═══════════════════════════════════════════════════ */
function Footer() {
  return (
    <footer className="border-t border-white/5 py-16 px-6 md:px-16 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-[2px] bg-racing-lime" />
          <span className="font-heading text-sm tracking-[0.35em] uppercase">
            Aston Martin
          </span>
        </div>

        {/* Links */}
        <div className="flex gap-8">
          {["Heritage", "Ownership", "Racing", "Contact"].map((link) => (
            <a
              key={link}
              href="#"
              className="text-xs tracking-[0.2em] uppercase text-white/40 hover:text-racing-lime transition-colors duration-300 font-heading"
            >
              {link}
            </a>
          ))}
        </div>

        {/* Copyright */}
        <p className="text-[10px] tracking-[0.2em] uppercase text-white/20 font-heading">
          © 2024 Aston Martin Lagonda
        </p>
      </div>

      {/* Bottom accent */}
      <div className="mt-12 flex justify-center">
        <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-racing-lime/30 to-transparent" />
      </div>
    </footer>
  );
}
