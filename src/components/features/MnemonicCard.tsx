"use client";
import React, { useRef } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";
import { Copy, Share2, Volume2 } from "lucide-react";

interface MnemonicData {
    topic: string;
    mnemonic: string;
    explanation: string;
    story: string;
    color_mood?: string;
}

export function MnemonicCard({ data }: { data: MnemonicData }) {
    // 3D TILT LOGIC
    const ref = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const xSpring = useSpring(x);
    const ySpring = useSpring(y);
    const transform = useMotionTemplate`rotateX(${xSpring}deg) rotateY(${ySpring}deg)`;

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = (e.clientX - rect.left) * 32.5;
        const mouseY = (e.clientY - rect.top) * 32.5;
        const rX = (mouseY / height - 32.5 / 2) * -1;
        const rY = mouseX / width - 32.5 / 2;
        x.set(rX);
        y.set(rY);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ transformStyle: "preserve-3d", transform }}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="group relative w-full max-w-3xl rounded-3xl border border-white/10 bg-zinc-900/80 p-1 backdrop-blur-xl transition-all hover:shadow-2xl hover:shadow-violet-500/20"
        >
            {/* GLOWING BORDER EFFECT */}
            <div className="absolute -inset-0.5 rounded-3xl bg-gradient-to-r from-violet-600 to-indigo-600 opacity-20 blur transition group-hover:opacity-50" />

            <div className="relative h-full w-full rounded-[22px] bg-zinc-950/90 p-8 shadow-inner">

                {/* HEADER */}
                <div className="flex items-start justify-between">
                    <div>
                        <span className="inline-block rounded-full bg-violet-500/10 px-3 py-1 text-xs font-medium text-violet-300 border border-violet-500/20 mb-3">
                            Cyber-Gurukul v1
                        </span>
                        <h2 className="text-3xl font-bold text-white tracking-tight">{data.topic}</h2>
                    </div>
                    <div className="flex gap-2">
                        <button className="rounded-full bg-zinc-800 p-2 text-zinc-400 hover:bg-zinc-700 hover:text-white transition-colors">
                            <Volume2 size={18} />
                        </button>
                        <button className="rounded-full bg-zinc-800 p-2 text-zinc-400 hover:bg-zinc-700 hover:text-white transition-colors">
                            <Copy size={18} />
                        </button>
                    </div>
                </div>

                {/* THE MNEMONIC (Hero Content) */}
                <div className="my-8 rounded-xl border-l-4 border-violet-500 bg-violet-500/5 p-6">
                    <p className="text-2xl font-bold leading-relaxed text-violet-100 font-mono">
                        "{data.mnemonic}"
                    </p>
                </div>

                {/* STORY & VISUAL CUE */}
                <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                        <h3 className="text-sm font-semibold uppercase text-zinc-500 tracking-wider">The Logic (Samajh)</h3>
                        <p className="text-zinc-300 leading-relaxed">{data.explanation}</p>
                    </div>

                    <div className="space-y-2">
                        <h3 className="text-sm font-semibold uppercase text-zinc-500 tracking-wider">Visual Trigger (Socho)</h3>
                        <p className="text-indigo-200 italic leading-relaxed">
                            {data.story}
                        </p>
                    </div>
                </div>

                {/* BOTTOM DECORATION */}
                <div className="mt-8 flex items-center justify-between border-t border-white/5 pt-4">
                    <div className="flex items-center gap-2 text-xs text-zinc-500">
                        <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                        AI Generated • Verified by RattaMaar
                    </div>
                    <button className="flex items-center gap-2 text-sm font-medium text-violet-400 hover:text-violet-300">
                        <Share2 size={16} /> Share Trick
                    </button>
                </div>

            </div>
        </motion.div>
    );
}
