import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

// Image prompts based on score tier
const SCORE_IMAGE_PROMPTS: Record<string, string> = {
  asleep: "A cute cartoon jellyfish mascot sleeping on a bench in a basketball court, snoring with Z's floating above, pastel colors, playful style, no text",
  awake: "A cute cartoon jellyfish mascot stretching and yawning on a basketball court, morning sunrise, energetic but sleepy, pastel colors, playful style, no text",
  ready: "A cute cartoon jellyfish mascot doing warm-up exercises on a basketball court, determined expression, athletic pose, pastel colors, playful style, no text",
  scaling: "A cute cartoon jellyfish mascot dunking a basketball with lightning effects, powerful pose, dynamic action shot, pastel colors with electric cyan accents, playful style, no text",
  exponential: "A cute cartoon jellyfish mascot floating in space wearing a tiny astronaut helmet, holding a trophy, stars and galaxies behind, celebrating victory, pastel colors with gold accents, playful style, no text",
};

function getScoreTier(score: number): string {
  if (score < 20) return "asleep";
  if (score < 40) return "awake";
  if (score < 60) return "ready";
  if (score < 80) return "scaling";
  return "exponential";
}

export async function POST(req: Request) {
  try {
    const { score, domain } = await req.json();

    if (score === undefined || score === null) {
      return NextResponse.json(
        { error: "Score is required" },
        { status: 400 }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.error("GEMINI_API_KEY is not set");
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }

    const genAI = new GoogleGenerativeAI(apiKey);

    // Use Imagen 3 model for image generation
    const model = genAI.getGenerativeModel({ model: "gemini-3-pro-image-preview" });

    const tier = getScoreTier(score);
    const basePrompt = SCORE_IMAGE_PROMPTS[tier];

    // Add domain context for personalization
    const prompt = domain
      ? `${basePrompt}, subtle reference to ${domain} business theme`
      : basePrompt;

    console.log(`[Image Gen] Generating image for score ${score} (${tier})`);

    const result = await model.generateContent(prompt);
    const response = await result.response;

    // Check if we got image data
    const candidates = response.candidates;
    if (!candidates || candidates.length === 0) {
      throw new Error("No image generated");
    }

    // Get the image data
    const parts = candidates[0].content?.parts;
    if (!parts || parts.length === 0) {
      throw new Error("No image data in response");
    }

    // Find the inline data part (base64 image)
    const imagePart = parts.find(part => part.inlineData);
    if (!imagePart?.inlineData) {
      throw new Error("No inline image data");
    }

    const imageData = imagePart.inlineData.data;
    const mimeType = imagePart.inlineData.mimeType || "image/png";

    return NextResponse.json({
      success: true,
      image: `data:${mimeType};base64,${imageData}`,
      tier,
    });

  } catch (error: unknown) {
    console.error("Image generation error:", error);

    const errorMessage = error instanceof Error ? error.message : "Failed to generate image";

    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
