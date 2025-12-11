"use client";
import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, BrainCircuit } from "lucide-react";

export function HeroSection() {
    return (
        <div className="relative flex min-h-[90vh] w-full flex-col items-center justify-center overflow-hidden bg-[#09090B]">

            {/* 1. THE GOD RAY (Background Gradient) */}
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-[#09090B] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]">
                <div className="absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2 bg-violet-600/30 blur-[120px]" />
                <div className="absolute left-1/2 top-0 h-[300px] w-[300px] -translate-x-1/2 bg-indigo-500/20 blur-[80px]" />
            </div>

            {/* 2. THE CONTENT */}
            <div className="relative z-10 flex max-w-4xl flex-col items-center px-4 text-center">

                {/* Badge */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-6 inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-3 py-1 text-sm text-violet-300 backdrop-blur-sm"
                >
                    <span className="flex h-2 w-2 relative">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-500"></span>
                    </span>
                    v1.0 Public Beta Live
                </motion.div>

                {/* Headline */}
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="bg-gradient-to-b from-white to-white/60 bg-clip-text text-5xl font-bold tracking-tight text-transparent sm:text-7xl md:text-8xl"
                >
                    Forget <br /> <span className="text-violet-500">Forgetting.</span>
                </motion.h1>

                {/* Sub-headline */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="mt-6 max-w-2xl text-lg text-zinc-400 sm:text-xl"
                >
                    The first AI engine designed for Indian students. We turn boring text
                    into <span className="text-zinc-200 font-medium">Hinglish mnemonics</span>, funny stories, and instant brain-tattoos.
                </motion.p>

                {/* Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
                >
                    {/* Primary CTA */}
                    <button className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-full bg-white px-8 font-medium text-black transition-all hover:bg-zinc-200">
                        <span className="mr-2">Start Ratta-fication</span>
                        <BrainCircuit className="h-4 w-4 transition-transform group-hover:rotate-12" />
                        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-violet-600 to-indigo-600 opacity-0 transition-opacity group-hover:opacity-10" />
                    </button>

                    {/* Secondary CTA */}
                    <button className="inline-flex h-12 items-center justify-center rounded-full px-8 font-medium text-zinc-400 transition-colors hover:text-white">
                        How it works <ArrowRight className="ml-2 h-4 w-4" />
                    </button>
                </motion.div>
            </div>

            {/* 3. GRID OVERLAY (The Tech Vibe) */}
            <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

        </div>
    );
}
