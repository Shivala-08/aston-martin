"use client";

import {
    AnimatePresence,
    motion,
    MotionValue,
    useMotionValueEvent,
} from "framer-motion";
import { useState } from "react";
import { HERO_DATA, DESIGN_DATA, ENGINE_DATA } from "@/data/carData";

type Phase = "hero" | "design" | "engine";

interface VulcanExperienceProps {
    scrollYProgress: MotionValue<number>;
}

const fade = {
    initial: { opacity: 0, y: 30, filter: "blur(8px)" },
    animate: { opacity: 1, y: 0, filter: "blur(0px)" },
    exit: { opacity: 0, y: -20, filter: "blur(8px)" },
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
};

const stagger = {
    animate: { transition: { staggerChildren: 0.08 } },
};

export default function VulcanExperience({
    scrollYProgress,
}: VulcanExperienceProps) {
    const [phase, setPhase] = useState<Phase>("hero");

    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        if (latest < 0.33) setPhase("hero");
        else if (latest < 0.66) setPhase("design");
        else setPhase("engine");
    });

    return (
        <div
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            style={{ zIndex: 10 }}
        >
            {/* Vignette overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-vulcan-black via-transparent to-vulcan-black/60" />
            <div className="absolute inset-0 bg-gradient-to-r from-vulcan-black/40 via-transparent to-vulcan-black/40" />

            <AnimatePresence mode="wait">
                {phase === "hero" && <HeroPhase key="hero" />}
                {phase === "design" && <DesignPhase key="design" />}
                {phase === "engine" && <EnginePhase key="engine" />}
            </AnimatePresence>

            {/* HUD corner accents */}
            <HudCorners />

            {/* Scroll indicator */}
            <motion.div
                className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 2, repeat: Infinity }}
            >
                <span className="text-[10px] tracking-[0.3em] uppercase font-heading text-white/50">
                    Scroll to Explore
                </span>
                <div className="w-[1px] h-6 bg-gradient-to-b from-racing-lime/80 to-transparent" />
            </motion.div>
        </div>
    );
}

/* ─── HERO Phase ──────────────────────────────────── */
function HeroPhase() {
    return (
        <motion.div
            className="relative z-10 flex flex-col items-center text-center px-6"
            variants={stagger}
            initial="initial"
            animate="animate"
            exit="exit"
        >
            {/* Top accent line */}
            <motion.div
                className="w-16 h-[1px] bg-racing-lime mb-6"
                variants={fade}
            />

            <motion.p
                className="text-[10px] md:text-xs tracking-[0.5em] uppercase text-racing-lime font-heading mb-4"
                variants={fade}
            >
                Track-Only Hypercar
            </motion.p>

            <motion.h1
                className="font-heading text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-none"
                variants={fade}
            >
                <span className="block">{HERO_DATA.title.split(" ").slice(0, 2).join(" ")}</span>
                <span className="block text-racing-lime mt-1">
                    {HERO_DATA.title.split(" ").slice(2).join(" ")}
                </span>
            </motion.h1>

            {/* Divider */}
            <motion.div
                className="flex items-center gap-4 my-6"
                variants={fade}
            >
                <div className="w-12 h-[1px] bg-white/20" />
                <div className="w-2 h-2 rotate-45 border border-racing-lime/50" />
                <div className="w-12 h-[1px] bg-white/20" />
            </motion.div>

            {/* Price badge */}
            <motion.div
                className="border border-white/10 bg-white/5 backdrop-blur-sm px-8 py-3"
                variants={fade}
            >
                <p className="text-[10px] tracking-[0.3em] uppercase text-white/50 font-heading mb-1">
                    Starting From
                </p>
                <p className="font-heading text-xl md:text-2xl text-white tracking-wider">
                    {HERO_DATA.price}
                </p>
            </motion.div>

            {/* CTA */}
            <motion.button
                className="mt-8 px-8 py-3 border border-racing-lime text-racing-lime text-xs tracking-[0.3em] uppercase font-heading pointer-events-auto cursor-pointer bg-racing-lime/5 hover:bg-racing-lime/20 transition-all duration-300"
                variants={fade}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
            >
                {HERO_DATA.cta}
            </motion.button>
        </motion.div>
    );
}

/* ─── DESIGN Phase ────────────────────────────────── */
function DesignPhase() {
    return (
        <motion.div
            className="relative z-10 w-full max-w-6xl px-6 md:px-16 flex items-end"
            variants={stagger}
            initial="initial"
            animate="animate"
            exit="exit"
        >
            <div className="max-w-lg">
                {/* Section label */}
                <motion.div className="flex items-center gap-3 mb-4" variants={fade}>
                    <div className="w-8 h-[1px] bg-racing-lime" />
                    <span className="text-[10px] tracking-[0.5em] uppercase text-racing-lime font-heading">
                        02 / 03
                    </span>
                </motion.div>

                <motion.h2
                    className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold uppercase tracking-tight mb-6"
                    variants={fade}
                >
                    {DESIGN_DATA.title}
                </motion.h2>

                {/* HUD-style content box */}
                <motion.div
                    className="border-l-2 border-racing-lime/40 pl-6 py-2"
                    variants={fade}
                >
                    <p className="font-body text-base md:text-lg text-white/70 leading-relaxed tracking-wide">
                        {DESIGN_DATA.body}
                    </p>
                </motion.div>

                {/* Decorative element */}
                <motion.div
                    className="flex items-center gap-2 mt-6"
                    variants={fade}
                >
                    <div className="w-3 h-3 border border-racing-lime/30 rotate-45" />
                    <div className="w-24 h-[1px] bg-gradient-to-r from-racing-lime/40 to-transparent" />
                </motion.div>
            </div>
        </motion.div>
    );
}

/* ─── ENGINE Phase ────────────────────────────────── */
function EnginePhase() {
    return (
        <motion.div
            className="relative z-10 w-full max-w-6xl px-6 md:px-16 flex justify-end"
            variants={stagger}
            initial="initial"
            animate="animate"
            exit="exit"
        >
            <div className="text-right max-w-md">
                {/* Section label */}
                <motion.div
                    className="flex items-center gap-3 mb-4 justify-end"
                    variants={fade}
                >
                    <span className="text-[10px] tracking-[0.5em] uppercase text-racing-lime font-heading">
                        03 / 03
                    </span>
                    <div className="w-8 h-[1px] bg-racing-lime" />
                </motion.div>

                <motion.h2
                    className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold uppercase tracking-tight mb-8"
                    variants={fade}
                >
                    {ENGINE_DATA.title}
                </motion.h2>

                {/* Spec list */}
                <div className="space-y-3">
                    {ENGINE_DATA.specs.map((spec) => (
                        <motion.div
                            key={spec.label}
                            className="flex items-baseline justify-end gap-4 border-b border-white/5 pb-3"
                            variants={fade}
                        >
                            <span className="text-xs tracking-[0.2em] uppercase text-white/40 font-heading">
                                {spec.label}
                            </span>
                            <span className="font-heading text-lg md:text-xl text-white tabular-nums">
                                {spec.value}
                            </span>
                        </motion.div>
                    ))}
                </div>

                {/* Decorative element */}
                <motion.div
                    className="flex items-center gap-2 mt-6 justify-end"
                    variants={fade}
                >
                    <div className="w-24 h-[1px] bg-gradient-to-l from-racing-lime/40 to-transparent" />
                    <div className="w-3 h-3 border border-racing-lime/30 rotate-45" />
                </motion.div>
            </div>
        </motion.div>
    );
}

/* ─── HUD Corner Accents ──────────────────────────── */
function HudCorners() {
    const cornerClass = "absolute w-6 h-6 border-racing-lime/20";
    return (
        <>
            <div
                className={`${cornerClass} top-20 left-6 border-t border-l`}
            />
            <div
                className={`${cornerClass} top-20 right-6 border-t border-r`}
            />
            <div
                className={`${cornerClass} bottom-16 left-6 border-b border-l`}
            />
            <div
                className={`${cornerClass} bottom-16 right-6 border-b border-r`}
            />
        </>
    );
}
