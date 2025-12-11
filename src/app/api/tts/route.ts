import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { text } = body;

        if (!text) return NextResponse.json({ error: "No text" }, { status: 400 });

        // The High-Quality Google Endpoint
        const encodedText = encodeURIComponent(text);
        const url = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodedText}&tl=hi&client=tw-ob&ttsspeed=0.9`;

        // Fetch audio from Google on the server side (No CORS here!)
        const response = await fetch(url, {
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
            }
        });

        if (!response.ok) {
            throw new Error(`Google refused: ${response.statusText}`);
        }

        const arrayBuffer = await response.arrayBuffer();

        // Return the raw audio file to the frontend
        return new NextResponse(arrayBuffer, {
            headers: {
                "Content-Type": "audio/mpeg",
                "Content-Length": arrayBuffer.byteLength.toString(),
            },
        });

    } catch (error: any) {
        console.error("TTS Proxy Error:", error);
        return NextResponse.json({ error: "Audio generation failed" }, { status: 500 });
    }
}
