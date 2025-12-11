import { NextResponse } from "next/server";
import { getGeminiModel } from "@/lib/gemini";

const SYSTEM_PROMPT = `
You are "RattaMaar," the universe's coolest Indian tutor.
Your goal is to make the user memorize boring topics instantly using "Hinglish Mnemonics."

**Format Protocol:**
You must return a strictly valid JSON object. 
Format:
{
  "topic": "Clean Topic Name",
  "mnemonic": "The short, punchy mnemonic sentence",
  "explanation": "Brief explanation in Hinglish",
  "story": "A funny mental image/story to visualize",
  "color_mood": "Identify the emotion (e.g., 'Aggressive', 'Funny', 'Calm')",
  "quiz": [
    {
      "question": "Question 1",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "answer": "Correct Option string"
    }
    // ... Generate exactly 10 questions
  ]
}

**CRITICAL INSTRUCTIONS:**
1. **GENERATE EXACTLY 10 QUESTIONS.** No less.
2. If the topic is small, ask conceptual or related questions to hit the target of 10.
3. Questions must be in **Hinglish** (Mix of Hindi/English) to sound natural.
4. Make options tricky. Don't make the answer obvious.
`;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { text } = body;

    // 1. Get the Model (We use the one from lib/gemini)
    const model = getGeminiModel();

    // 2. The Prompt
    const finalPrompt = `
      ${SYSTEM_PROMPT}
      USER INPUT: "${text}"
      Generate the JSON response now:
    `;

    // 3. Generate Content (Force JSON Mode if supported, otherwise standard)
    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: finalPrompt }] }],
      // This config forces Gemini 1.5 to output JSON
      generationConfig: { responseMimeType: "application/json" }
    });

    const response = result.response;
    let outputText = response.text();

    console.log("AI Raw Response:", outputText); // For debugging

    // 4. CLEANING: Extract JSON from the text (Regex magic)
    // This finds the first "{" and the last "}" and keeps everything in between
    const jsonMatch = outputText.match(/\{[\s\S]*\}/);

    if (jsonMatch) {
      outputText = jsonMatch[0];
    } else {
      throw new Error("No JSON found in response");
    }

    // 5. Parse
    const jsonData = JSON.parse(outputText);
    return NextResponse.json({ success: true, data: jsonData });

  } catch (error: any) {
    console.error("API Error Detailed:", error);

    // Handle the 404 specifically
    if (error.message?.includes("404") || error.message?.includes("not found")) {
      return NextResponse.json(
        { error: "Model loading failed. Try restarting server or checking API keys." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: "AI got confused. Try again." },
      { status: 500 }
    );
  }
}
