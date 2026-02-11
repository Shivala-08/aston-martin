"use client";

import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useState } from "react";

export default function Navbar() {
    const { scrollY } = useScroll();
    const [scrolled, setScrolled] = useState(false);

    useMotionValueEvent(scrollY, "change", (latest) => {
        setScrolled(latest > 50);
    });

    return (
        <motion.nav
            className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-10 py-4 transition-all duration-500 ${scrolled
                    ? "bg-vulcan-black/70 backdrop-blur-xl border-b border-white/5"
                    : "bg-transparent"
                }`}
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
            {/* Wordmark */}
            <div className="flex items-center gap-3">
                <div className="w-8 h-[2px] bg-racing-lime" />
                <span className="font-heading text-sm md:text-base tracking-[0.35em] uppercase text-white">
                    Aston Martin
                </span>
            </div>

            {/* CTA */}
            <motion.button
                className="relative px-5 py-2 text-xs tracking-[0.25em] uppercase font-heading border border-racing-lime/40 text-racing-lime bg-racing-lime/5 cursor-pointer transition-all duration-300 hover:bg-racing-lime/15 hover:border-racing-lime"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
            >
                <span className="relative z-10">Inquire</span>
            </motion.button>
        </motion.nav>
    );
}
