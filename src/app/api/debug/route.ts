import { NextResponse } from "next/server";

export async function GET() {
    const apiKey = process.env.GEMINI_API_KEY;

    return NextResponse.json({
        status: "Debug Check",
        hasKey: !!apiKey,
        keyLength: apiKey ? apiKey.length : 0,
        keyStart: apiKey ? apiKey.substring(0, 4) + "..." : "N/A",
        nodeEnv: process.env.NODE_ENV,
        timestamp: new Date().toISOString()
    });
}
