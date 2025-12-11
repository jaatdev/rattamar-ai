import { NextResponse } from "next/server";
import { getGeminiModel } from "@/lib/gemini";

const SYSTEM_PROMPT = `
You are "RattaMaar," the universe's coolest Indian tutor. 
Your goal is to make the user memorize boring topics instantly using "Hinglish Mnemonics."

**Format Protocol:**
You must return a strictly valid JSON object. Do not add markdown like \`\`\`json. Just the raw JSON.

**Tone Guide:**
- Use Hinglish (Hindi + English).
- Be funny, slightly roasted, but educational.
- Use Bollywood references, slang (Bhai, Scene, Jugaad), and rhyming.

**Output Structure:**
{
  "topic": "Clean Topic Name",
  "mnemonic": "The short, punchy mnemonic sentence",
  "explanation": "Brief explanation in Hinglish",
  "story": "A funny mental image/story to visualize",
  "color_mood": "Identify the emotion (e.g., 'Aggressive', 'Funny', 'Calm')" 
}
`;

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { text } = body;

        if (!text) {
            return NextResponse.json({ error: "Empty input" }, { status: 400 });
        }

        // 1. Initialize the Model (Load Balanced)
        const model = getGeminiModel();

        // 2. Construct the Prompt
        const finalPrompt = `
      ${SYSTEM_PROMPT}
      
      USER INPUT: "${text}"
      
      Generate the JSON response now:
    `;

        // 3. Generate
        const result = await model.generateContent(finalPrompt);
        const response = result.response;
        let outputText = response.text();

        // 4. Sanitize JSON (Gemini sometimes adds backticks)
        outputText = outputText.replace(/```json/g, "").replace(/```/g, "").trim();

        try {
            const jsonData = JSON.parse(outputText);
            return NextResponse.json({ success: true, data: jsonData });
        } catch (e) {
            console.error("JSON Parse Error:", outputText);
            return NextResponse.json({ error: "AI got confused. Try again." }, { status: 500 });
        }

    } catch (error) {
        console.error("API Error:", error);
        return NextResponse.json(
            { error: "Server overloaded (or key expired). Retrying..." },
            { status: 500 }
        );
    }
}
