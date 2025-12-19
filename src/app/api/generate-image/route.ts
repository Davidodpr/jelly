import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

// Common style for consistency - Cinematic & Premium
const STYLE_SUFFIX = "8k resolution, cinematic lighting, volumetric fog, octane render, highly detailed translucent jelly texture, subsurface scattering, vibrant neon accents (cyan #00f5ff, pink #ff006e), macro photography, shallow depth of field, professional studio setting, sharp focus, masterpiece";

// Image prompts templates based on score tier
const SCORE_PROMPT_TEMPLATES: Record<string, (context: string) => string> = {
  asleep: (context) => `A glowing translucent jelly mascot slumped on a dimly lit basketball bench, sleeping deeply. A slightly deflated neon basketball rests nearby. ${context} The mood is quiet and atmospheric with cool blue shadows.`,
  awake: (context) => `A cute translucent jelly mascot sitting on a gym bench, rubbing its eyes. One tentacle holds a steaming neon-rimmed coffee mug. Soft morning sunlight filtering through high windows. ${context} Hopeful and cozy atmosphere.`,
  ready: (context) => `A determined translucent jelly mascot in a heroic stance on a polished basketball court, tying glowing neon shoelaces. Dust motes dancing in light beams. ${context} Intense focus and preparation.`,
  scaling: (context) => `An action shot of a glowing translucent jelly mascot performing a high-speed crossover dribble. Electric sparks and neon light trails following the movement. ${context} High energy, motion blur on the background, sharp focus on the mascot.`,
  exponential: (context) => `The translucent jelly mascot soaring through the air for a legendary slam dunk. Wearing a flowing neon cape. Explosion of holographic confetti. ${context} Ultimate victory, god-ray lighting, majestic and powerful.`,
};

function getScoreTier(score: number): string {
  if (score < 50) return "asleep";
  if (score < 70) return "awake";
  if (score < 80) return "ready";
  if (score < 90) return "scaling";
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
        const businessName = domain ? `'${domain}'` : "the business";
        businessContext = `The mascot is wearing a small badge with a subtle logo for ${businessName}. A futuristic holographic tablet nearby shows business charts.`;
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