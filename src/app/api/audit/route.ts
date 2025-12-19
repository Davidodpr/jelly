import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

// Simple in-memory rate limiter with lazy cleanup
const rateLimit = new Map<string, number>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute

// Global daily request counter (server-side, can't be bypassed)
const DAILY_LIMIT = 75;
let dailyRequestCount = 0;
let lastResetDate = new Date().toDateString();

function checkAndResetDaily() {
  const today = new Date().toDateString();
  if (today !== lastResetDate) {
    dailyRequestCount = 0;
    lastResetDate = today;
    console.log(`[Rate Limit] Daily counter reset for ${today}`);
  }
}

// Lazy cleanup: Run cleanup with 10% probability on each request
function lazyCleanup() {
  if (Math.random() > 0.1) return;

  const now = Date.now();
  for (const [ip, time] of rateLimit.entries()) {
    if (now - time > RATE_LIMIT_WINDOW) {
      rateLimit.delete(ip);
    }
  }
}

// Helper to fetch and clean site content
async function fetchSiteContent(url: string): Promise<string> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); // 5s timeout

    const res = await fetch(url, {
      signal: controller.signal,
      headers: {
        'User-Agent': 'Jellymove-Audit/3.0'
      }
    });
    clearTimeout(timeoutId);

    if (!res.ok) return "";

    const html = await res.text();

    // Extract links before cleaning
    const linkRegex = /<a\s+(?:[^>]*?\s+)?href="([^"]*)"[^>]*>(.*?)<\/a>/gi;
    const links: { href: string; text: string }[] = [];
    let match;

    while ((match = linkRegex.exec(html)) !== null) {
      links.push({ href: match[1], text: match[2].replace(/<[^>]+>/g, "").trim() });
    }

    // Find the most relevant sub-pages (Pricing > Services > Careers > About)
    const keywords = ["pricing", "pris", "tjänster", "services", "careers", "jobb", "about", "om oss"];
    const linksToFetch = links
      .filter(l => l.href && keywords.some(k => l.href.toLowerCase().includes(k) || l.text.toLowerCase().includes(k)))
      .slice(0, 3); // Limit to top 3 findings

    // Basic cleanup of main page
    const text = html
      .replace(/<script\b[^>]*>([\s\S]*?)<\/script>/gmi, "")
      .replace(/<style\b[^>]*>([\s\S]*?)<\/style>/gmi, "")
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
      .trim();

    // Scan for tech signals in HTML (HubSpot, Stripe, etc)
    const techSignals = [];
    if (html.includes("js.hs-scripts.com")) techSignals.push("HubSpot");
    if (html.includes("stripe.com")) techSignals.push("Stripe");
    if (html.includes("shopify.com")) techSignals.push("Shopify");
    if (html.includes("intercom.io")) techSignals.push("Intercom");
    if (html.includes("googletagmanager.com")) techSignals.push("GTM");

    let extraContent = `\n\n--- TECH SIGNALS ---\n${techSignals.join(", ") || "None detected"}`;

    // Fetch sub-pages in parallel
    const subPagesPromises = linksToFetch.map(async (l) => {
      let fullUrl = l.href;
      if (!fullUrl.startsWith("http")) {
        const baseUrl = url.replace(/\/$/, "");
        fullUrl = fullUrl.startsWith("/") ? `${baseUrl}${fullUrl}` : `${baseUrl}/${fullUrl}`;
      }
      try {
        const subRes = await fetch(fullUrl, { signal: AbortSignal.timeout(3000) });
        if (subRes.ok) {
          const subHtml = await subRes.text();
          return `\n\n--- PAGE: ${fullUrl} ---\n` + subHtml.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim().slice(0, 3000);
        }
      } catch (e) {
        console.warn(`[Deep Scan] Failed to fetch sub-page ${fullUrl}:`, e);
      }
      return "";
    });

    const subPagesContent = await Promise.all(subPagesPromises);
    extraContent += subPagesContent.join("");

    return (text.slice(0, 10000) + extraContent).slice(0, 18000);
  } catch (error) {
    console.warn("Failed to fetch site content:", error);
    return "";
  }
}

const FEW_SHOT_EXAMPLES = `
EXAMPLE 1: buildapp.io
Challenge: "Our CAC is too high."
Deep Scan: pricing shows $29/mo, careers searching for 3 sales reps.
[
  {
    "icon": "✂️",
    "title": "Kill the $29 Plan",
    "description": "Your unit economics are broken. Each customer costs more in support than they pay in margin. You're hiring sales for a low-LTV product.",
    "action": "Remove the self-serve $29 plan. Introduce a $250/mo minimum 'Professional' tier with high-touch onboarding."
  },
  {
    "icon": "🤝",
    "title": "Access the Channel",
    "description": "Stop chasing individual contractors. They follow their material suppliers. You have access but you're not using it.",
    "action": "Contact the top 3 specialized material suppliers. Offer a co-branded 'Efficiency Tool' for their VIP accounts."
  },
  {
    "icon": "🤖",
    "title": "Automate Onboarding",
    "description": "Manual setup for a $29 plan is business suicide. Your current process is manual and slow.",
    "action": "Use Stripe Tax and automated workspace provisioning to cut human touch from the sign-up flow."
  }
],
"score": 42,
"verdict": "You are running a hobby at scale. Fix the pricing before you burn more cash on sales reps."

EXAMPLE 2: cleanbeauty.se
Challenge: "We want to scale international."
Deep Scan: shopify site, using Intercom, about page mentions family business in Skåne.
[
  {
    "icon": "💰",
    "title": "Premium Packaging, Not Price",
    "description": "Your brand looks luxe, but you're priced like a supermarket. You are leaving 40% margin on the table in the US market.",
    "action": "Raise price by 30% for international markets. Use the margin to pay for premium influencers."
  },
  {
    "icon": "🚪",
    "title": "The International Wall",
    "description": "Your checkout still asks for Personnummer if they switch to English. It's a conversion killer for anyone outside Sweden.",
    "action": "Switch to Shopify Markets Pro. Localize currency, taxes, and shipping globally overnight."
  },
  {
    "icon": "🤝",
    "title": "Micro-Ambassadors",
    "description": "You have 500+ repeat customers in Skåne. They are your best marketing team but they have no tools.",
    "action": "Launch a referral program giving 'founder-exclusive' early access to new products for top referrers."
  }
],
"score": 89,
"verdict": "You have a world-class product trapped in a local checkout. The potential is exponential."
`;

export async function POST(req: Request) {
  try {
    // 1. Global Daily Limit Check (server-side, can't be bypassed)
    checkAndResetDaily();
    if (dailyRequestCount >= DAILY_LIMIT) {
      console.log(`[Rate Limit] Daily limit reached: ${dailyRequestCount}/${DAILY_LIMIT}`);
      return NextResponse.json(
        { error: "We've hit our daily limit. Come back tomorrow!" },
        { status: 429 }
      );
    }

    // 2. Per-IP Rate Limiting
    const ip = req.headers.get("x-forwarded-for") || "unknown";
    const now = Date.now();
    const lastRequest = rateLimit.get(ip);

    if (lastRequest && now - lastRequest < RATE_LIMIT_WINDOW) {
      return NextResponse.json(
        { error: "Whoa, slow down! One audit per minute." },
        { status: 429 }
      );
    }
    rateLimit.set(ip, now);
    lazyCleanup();

    // Increment daily counter
    dailyRequestCount++;
    console.log(`[Rate Limit] Request ${dailyRequestCount}/${DAILY_LIMIT}`);

    // 3. Input Validation & Sanitization
    const { domain, description } = await req.json();

    if (!domain || !description) {
      return NextResponse.json(
        { error: "Domain and description are required." },
        { status: 400 }
      );
    }

    if (description.length > 500) {
      return NextResponse.json(
        { error: "Description is too long (max 500 chars)." },
        { status: 400 }
      );
    }

    // Sanitize domain
    let cleanDomain = domain.trim().toLowerCase();
    cleanDomain = cleanDomain.replace(/^https?:\/\//, "").replace(/\/$/, "");

    // Basic domain validation
    if (!/^[a-z0-9.-]+\.[a-z]{2,}$/.test(cleanDomain)) {
      return NextResponse.json(
        { error: "Invalid domain format." },
        { status: 400 }
      );
    }

    // 3. Fetch Site Content (Deep Scan)
    const siteContent = await fetchSiteContent(`https://${cleanDomain}`);

    // 4. AI Generation
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.error("GEMINI_API_KEY is not set");
      return NextResponse.json(
        { error: "Server configuration error." },
        { status: 500 }
      );
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const prompt = `
      You are the Jellymove Brain (Version 3.0).
      You are a World-Class Strategic Business Consultant analyzing COMPANIES.

      YOUR MISSION:
      Analyze the BUSINESS through the lens of their digital presence and their stated challenge.
      The website content, tech signals, and even their career page are SIGNALS of how they run their operation.

      CHAIN-OF-THOUGHT (Think before you output):
      1. DIAGNOSIS: What does their tech-stack, pricing, and messaging reveal about their internal friction?
      2. OPERATIONAL LEAKS: Where are they losing money? Manual tasks? Low-value customers? Bad pricing?
      3. STRATEGIC PLAYS: Generate 3 "Plays" using the 5 Lenses (Subtract, Access, Price, Friction, Automate).
      4. JELLY-SCORE: Score their 'Exponential Potential' (0-100).
         - < 60: "Asleep" - Fundamental business model issues or too early.
         - 60-79: "High" - Good potential, but needs significant operational shifts.
         - 80-94: "Elite" - Massive impact if they automate/pivot.
         - 95+: "Unicorn Match" - Extremely rare. Immediate fit for Jellymove.

      BE BRUTALLY HONEST. "Nice-to-have" advice is useless. Focus on money, time, and scale.

      TRAINING EXAMPLES:
      ${FEW_SHOT_EXAMPLES}

      INPUT:
      Domain: ${cleanDomain}
      Challenge: "${description}"
      Deep Scan Context: "${siteContent || "Only domain available."}"

      OUTPUT FORMAT (Strict JSON):
      {
        "suggestions": [
          {
            "icon": "emoji",
            "title": "The Hook (max 5 words)",
            "description": "The Business Reality (max 20 words)",
            "action": "The First Step (max 12 words)"
          },
          ...3 items
        ],
        "score": number,
        "verdict": "1-sentence roast-style verdict."
      }
    `;

    // 4. Analyze with Gemini
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Clean up the response text
    const cleanText = text.replace(/```json/g, '').replace(/```/g, '').trim();

    let auditData;
    try {
      auditData = JSON.parse(cleanText);
    } catch {
      console.error("Failed to parse Gemini JSON:", text);
      return NextResponse.json(
        { error: "Fumbled the ball. Failed to parse insights." },
        { status: 500 }
      );
    }

    return NextResponse.json(auditData);

  } catch (error: unknown) {
    console.error("Audit API Error:", error);

    // Detailed error logging
    if (error && typeof error === 'object' && 'response' in error) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      console.error("Gemini API Response Error:", JSON.stringify((error as any).response, null, 2));
    }

    const errorMessage = error instanceof Error ? error.message : "Internal Server Error";
    const errorDetails = error instanceof Error ? error.toString() : String(error);

    return NextResponse.json(
      {
        error: errorMessage,
        details: errorDetails
      },
      { status: 500 }
    );
  }
}
