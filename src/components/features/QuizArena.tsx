"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Trophy, XCircle, CheckCircle, BrainCircuit } from "lucide-react";
import confetti from "canvas-confetti";

interface QuizQuestion {
    question: string;
    options: string[];
    answer: string;
}

export function QuizArena({ questions }: { questions: QuizQuestion[] }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [score, setScore] = useState(0);
    const [showResult, setShowResult] = useState(false);
    const [isWrong, setIsWrong] = useState(false);

    const handleOptionClick = (option: string) => {
        if (selectedOption) return; // Prevent double clicking
        setSelectedOption(option);

        const isCorrect = option === questions[currentIndex].answer;

        if (isCorrect) {
            setScore((prev) => prev + 1);
            // Trigger mini confetti for correct answer
            confetti({ particleCount: 30, spread: 50, origin: { y: 0.8 } });
        } else {
            setIsWrong(true);
        }

        // Auto-advance after 1.5 seconds
        setTimeout(() => {
            if (currentIndex < questions.length - 1) {
                setCurrentIndex((prev) => prev + 1);
                setSelectedOption(null);
                setIsWrong(false);
            } else {
                setShowResult(true);
                if (score + (isCorrect ? 1 : 0) === questions.length) {
                    // GRAND VICTORY CONFETTI
                    confetti({ particleCount: 150, spread: 100, origin: { y: 0.6 } });
                }
            }
        }, 1500);
    };

    if (showResult) {
        return (
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="mt-8 flex flex-col items-center rounded-3xl border border-violet-500/20 bg-zinc-900/80 p-8 text-center backdrop-blur-xl"
            >
                <Trophy className="mb-4 h-16 w-16 text-yellow-400 drop-shadow-[0_0_15px_rgba(250,204,21,0.5)]" />
                <h3 className="text-2xl font-bold text-white">Quiz Complete!</h3>
                <p className="mt-2 text-zinc-400">
                    You scored <span className="font-bold text-violet-400">{score}</span> / {questions.length}
                </p>
                <button
                    onClick={() => { setShowResult(false); setCurrentIndex(0); setScore(0); setSelectedOption(null); }}
                    className="mt-6 rounded-full bg-white px-6 py-2 font-medium text-black hover:bg-zinc-200"
                >
                    Replay Challenge
                </button>
            </motion.div>
        );
    }

    const currentQ = questions[currentIndex];

    return (
        <div className="mt-12 w-full max-w-3xl">
            <div className="mb-4 flex items-center justify-between">
                <h3 className="flex items-center gap-2 text-xl font-bold text-white">
                    <BrainCircuit className="text-violet-500" /> Quiz Arena
                </h3>
                <span className="text-xs font-medium text-zinc-500">
                    Question {currentIndex + 1} / {questions.length}
                </span>
            </div>

            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-zinc-950/50 p-6 backdrop-blur-md">
                {/* PROGRESS BAR */}
                <div className="absolute top-0 left-0 h-1 bg-violet-600 transition-all duration-500" style={{ width: `${((currentIndex) / questions.length) * 100}%` }} />

                <h4 className="mb-6 text-lg font-medium text-zinc-200">
                    {currentQ.question}
                </h4>

                <div className="grid gap-3 sm:grid-cols-2">
                    {currentQ.options.map((option, idx) => {
                        const isSelected = selectedOption === option;
                        const isCorrect = option === currentQ.answer;
                        const showCorrect = selectedOption && isCorrect;
                        const showWrong = isSelected && !isCorrect;

                        let btnClass = "border-zinc-800 bg-zinc-900/50 hover:bg-zinc-800 hover:border-zinc-700";
                        if (showCorrect) btnClass = "border-green-500/50 bg-green-500/20 text-green-200";
                        if (showWrong) btnClass = "border-red-500/50 bg-red-500/20 text-red-200";

                        return (
                            <motion.button
                                key={idx}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => handleOptionClick(option)}
                                disabled={!!selectedOption}
                                className={`relative flex items-center justify-between rounded-xl border p-4 text-left text-sm font-medium text-zinc-300 transition-all ${btnClass}`}
                            >
                                {option}
                                {showCorrect && <CheckCircle size={18} className="text-green-400" />}
                                {showWrong && <XCircle size={18} className="text-red-400" />}
                            </motion.button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
