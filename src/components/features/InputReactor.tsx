"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Zap } from "lucide-react";
import { MnemonicCard } from "./MnemonicCard";

export function InputReactor() {
    const [input, setInput] = useState("");
    const [isGenerating, setIsGenerating] = useState(false);
    const [result, setResult] = useState<null | any>(null); // We will type this later

    const handleGenerate = async () => {
        if (!input) return;
        setIsGenerating(true);
        setResult(null); // Reset previous result

        try {
            const response = await fetch("/api/generate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ text: input }),
            });

            const data = await response.json();

            if (data.success) {
                setResult(data.data);
            } else {
                alert("Error: " + data.error);
            }
        } catch (error) {
            alert("Something went wrong. Check console.");
            console.error("API Error:", error);
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <section className="relative z-20 -mt-20 flex w-full flex-col items-center justify-center px-4 pb-20">

            {/* THE REACTOR CONTAINER */}
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.7 }}
                className="relative w-full max-w-3xl overflow-hidden rounded-3xl border border-white/10 bg-zinc-900/50 backdrop-blur-2xl shadow-2xl shadow-violet-500/10"
            >

                {/* Glowing Top Border */}
                <div className="absolute top-0 h-[1px] w-full bg-gradient-to-r from-transparent via-violet-500 to-transparent opacity-50" />

                <div className="p-2">
                    {/* THE INPUT AREA */}
                    <div className="relative">
                        <textarea
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Paste your boring text here (e.g., Article 21, Newton's Laws, Mitochondria)..."
                            className="min-h-[150px] w-full resize-none rounded-2xl border border-zinc-800 bg-zinc-950/50 p-6 text-lg text-zinc-100 placeholder:text-zinc-600 focus:border-violet-500/50 focus:outline-none focus:ring-4 focus:ring-violet-500/10 transition-all"
                        />

                        {/* Corner Accents */}
                        <Zap className="absolute right-4 top-4 h-5 w-5 text-zinc-700" />
                    </div>

                    {/* CONTROL PANEL */}
                    <div className="mt-2 flex items-center justify-between rounded-xl bg-zinc-900/50 p-2">

                        {/* Options (Future Proofing) */}
                        <div className="flex gap-2 px-2">
                            <span className="text-xs font-medium text-zinc-500 uppercase tracking-wider">Mode:</span>
                            <span className="text-xs font-bold text-violet-400">Hinglish Roast</span>
                        </div>

                        {/* THE LAUNCH BUTTON */}
                        <button
                            onClick={handleGenerate}
                            disabled={isGenerating}
                            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-xl bg-violet-600 px-6 py-3 font-semibold text-white transition-all hover:bg-violet-500 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isGenerating ? (
                                <>
                                    <span className="animate-spin">⏳</span> Cooking...
                                </>
                            ) : (
                                <>
                                    <Sparkles className="h-4 w-4 fill-white" />
                                    <span>Memorize This</span>
                                </>
                            )}

                            {/* Button Shine Effect */}
                            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:animate-[shimmer_1.5s_infinite]" />
                        </button>
                    </div>
                </div>
            </motion.div>

            {/* RESULT CARD PREVIEW (Will animate in when data arrives) */}
            <AnimatePresence>
                {result && (
                    <div className="mt-8 flex w-full justify-center" style={{ perspective: "1000px" }}>
                        <MnemonicCard data={result} />
                    </div>
                )}
            </AnimatePresence>

        </section>
    );
}
