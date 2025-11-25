import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

// Common style for consistency
const STYLE_SUFFIX = "High quality 3D render, cute character design, translucent jelly material, subsurface scattering, soft studio lighting, vibrant neon accents (cyan #00f5ff, pink #ff006e), depth of field, 8k resolution, octane render style, minimal background";

// Image prompts templates based on score tier
const SCORE_PROMPT_TEMPLATES: Record<string, (context: string) => string> = {
  asleep: (context) => `A translucent jelly mascot slumped over on a bench, sleeping with a deflated basketball nearby. The mascot looks glowing but dim. Moody lighting. ${context}`,
  awake: (context) => `A cute jelly mascot sitting up on a bench, rubbing its eyes, one tentacle holding a coffee cup. Waking up, soft morning light, hopeful expression. ${context}`,
  ready: (context) => `A determined jelly mascot tying its shoelaces (metaphorically) on a basketball court. Glowing brighter, energetic stance, preparing for the game. Sharp focus. ${context}`,
  scaling: (context) => `A dynamic action shot of the jelly mascot dribbling a basketball with electric sparks. High energy, motion blur, glowing intensely, confident cool look. ${context}`,
  exponential: (context) => `The jelly mascot soaring through the air for a slam dunk, wearing a crown or cape. Explosion of confetti and neon light trails. Ultimate victory, majestic pose. ${context}`,
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
    const { score, domain, description } = await req.json();

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

    // Use Gemini 3 Pro Image Preview model
    const model = genAI.getGenerativeModel({ model: "gemini-3-pro-image-preview" });

    const tier = getScoreTier(score);
    
    // Create a context string based on domain and description
    let businessContext = "";
    if (domain || description) {
        const businessName = domain ? `the business '${domain}'` : "a business";
        const businessDesc = description ? `described as: ${description}` : "";
        businessContext = `Integrate subtle visual elements representing ${businessName} ${businessDesc} into the mascot's accessories or background props.`;
    }

    const promptTemplate = SCORE_PROMPT_TEMPLATES[tier];
    const finalPrompt = `${promptTemplate(businessContext)} ${STYLE_SUFFIX}`;

    console.log(`[Image Gen] Generating image for score ${score} (${tier}) with prompt length: ${finalPrompt.length}`);

    const result = await model.generateContent(finalPrompt);
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