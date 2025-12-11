// src/lib/gemini.ts
import { GoogleGenerativeAI } from "@google/generative-ai";

const keys = [
    process.env.GEMINI_API_KEY_1,
    process.env.GEMINI_API_KEY_2,
    process.env.GEMINI_API_KEY_3,
].filter(Boolean) as string[];

export const getGeminiModel = () => {
    const randomIndex = Math.floor(Math.random() * keys.length);
    const selectedKey = keys[randomIndex];

    if (!selectedKey) {
        console.error("❌ NO API KEYS FOUND in .env.local");
        throw new Error("No API Keys found");
    }

    const genAI = new GoogleGenerativeAI(selectedKey);

    // UPDATED: Using the exact model name from your list
    return genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
};
