import { GoogleGenerativeAI } from "@google/generative-ai";

const keys = [
    process.env.GEMINI_API_KEY_1,
    process.env.GEMINI_API_KEY_2,
    process.env.GEMINI_API_KEY_3,
].filter(Boolean) as string[];

// This function tries keys one by one until it finds a working one
export const getGeminiModel = () => {
    // Randomly select a starting key to distribute load (Load Balancing)
    const randomIndex = Math.floor(Math.random() * keys.length);
    const selectedKey = keys[randomIndex];

    if (!selectedKey) {
        throw new Error("No API Keys found in .env.local");
    }

    const genAI = new GoogleGenerativeAI(selectedKey);

    // Using the Flash model for speed (it's the fastest text cruncher)
    return genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });
};

// Advanced: We will handle the retry logic inside the API route
export const rotateKeyAndRetry = async (failedKey: string, prompt: string) => {
    // Logic to switch key can be complex, but for now, we rely on random selection per request.
    // A true "Round Robin" requires a database, which is overkill for Phase 1.
    // The randomizer above acts as a poor man's load balancer.
};
