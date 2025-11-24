import { GoogleGenerativeAI } from "@google/generative-ai";
import { fetchSwedishCompanyData } from "@/lib/foretagsapi";
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

    // Find the most relevant sub-page (Pricing > Services > About)
    const keywords = ["pricing", "pris", "tjänster", "services", "about", "om oss"];
    let bestLink = "";

    for (const keyword of keywords) {
      const found = links.find(l => l.href && (l.href.toLowerCase().includes(keyword) || l.text.toLowerCase().includes(keyword)));
      if (found) {
        bestLink = found.href;
        break;
      }
    }

    // Basic cleanup of main page
    const text = html
      .replace(/<script\b[^>]*>([\s\S]*?)<\/script>/gmi, "")
      .replace(/<style\b[^>]*>([\s\S]*?)<\/style>/gmi, "")
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
      .trim();

    let extraContent = "";

    // Fetch sub-page if found
    if (bestLink) {
      // Handle relative URLs
      if (!bestLink.startsWith("http")) {
        const baseUrl = url.replace(/\/$/, "");
        bestLink = bestLink.startsWith("/") ? `${baseUrl}${bestLink}` : `${baseUrl}/${bestLink}`;
      }

      try {
        console.log(`[Deep Scan] Fetching sub-page: ${bestLink}`);
        const subRes = await fetch(bestLink, { signal: AbortSignal.timeout(3000) });
        if (subRes.ok) {
          const subHtml = await subRes.text();
          extraContent += `\n\n--- LINKED PAGE (${bestLink}) ---\n` + subHtml.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim().slice(0, 5000);
        }
      } catch (e) {
        console.warn(`[Deep Scan] Failed to fetch sub-page ${bestLink}:`, e);
      }
    }

    return (text.slice(0, 15000) + extraContent).slice(0, 20000);
  } catch (error) {
    console.warn("Failed to fetch site content:", error);
    return "";
  }
}

const FEW_SHOT_EXAMPLES = `
EXAMPLE 1:
Domain: byggapp.se
Description: "Vi säljer projektsystem till små byggfirmor men CAC är för hög via Google Ads."
Context: Säljer månadsvis till lågt pris. Konkurrerar med Excel. Enmansfirmor kräver samma support som större kunder men betalar minst.
Output:
[
  {
    "icon": "🤝",
    "title": "Gör Dom Till Testare",
    "description": "Dina bästa kunder hänger i Facebook-grupper och snackar verktyg hela dagarna. Du betalar Google istället för att prata med dom.",
    "action": "Hitta 3 relevanta FB-grupper. Identifiera de mest engagerade. Erbjud 'advisor-rabatt' mot 6 månaders testperiod och feedback."
  },
  {
    "icon": "✂️",
    "title": "Sparka Enmansfirmorna",
    "description": "De kräver lika mycket support men betalar minst. Varje såld licens till dem kostar dig pengar.",
    "action": "Sätt ett min-pris som skrämmer bort hobbyprojekten. Låt kunder 'ansöka' och var tydlig: ni riktar er mot firmor med minst 1M i omsättning."
  },
  {
    "icon": "💰",
    "title": "Sälj Året, Finansiera Tillväxten",
    "description": "Byggare har egna cashflow-problem. Du hjälper inte genom att fakturera månadsvis - och du får inget kapital att växa med.",
    "action": "Byt till årsfaktura med 2 månader gratis. Du får in cash direkt, de får en deal. Win-win."
  }
],
"score": 88,
"verdict": "You have a killer product but you are selling it to the wrong people."

EXAMPLE 2:
Domain: solenergi-syd.se
Description: "Vi installerar solceller till villaägare men alla jagar samma leads från jämförelsesajter. Marginalerna kryper ner."
Context: Betalar per lead från jämförelsesajter. Konkurrerar på pris mot 4 andra på varje offert. Inga återkommande intäkter efter installation.
Output:
[
  {
    "icon": "🏠",
    "title": "Mäklarna Sitter På Guldet",
    "description": "Varje husköpare funderar på energikostnader. Mäklare vill ge mervärde till sina köpare. Du jagar cold leads när warm leads byter ägare varje dag i din stad.",
    "action": "Kontakta 5 lokala mäklare. Erbjud 'Solcells-värdering' som de kan ge sina köpare. Du får leads, de får en differentierare."
  },
  {
    "icon": "🔄",
    "title": "Du Säljer En Gång, Sen Försvinner Du",
    "description": "Installation är en engångsdeal. Men kunden har paneler i 25 år och noll relation med dig. Varje nöjd kund är en missad intäkt.",
    "action": "Skapa service-avtal: årlig kontroll, produktionsgaranti, prioriterad support. Recurring revenue + kunden har anledning att prata om dig."
  },
  {
    "icon": "🗑️",
    "title": "Jämförelsesajterna Äter Din Vinst",
    "description": "Du betalar dyrt per lead för att tävla mot 4 andra på pris. Loppet är riggat mot dig från start.",
    "action": "Halvera budget på jämförelsesajter. Lägg på referral-bonus till kunder som tipsar grannar. Varmaste leadsen, noll priskonkurrens."
  }
],
"score": 72,
"verdict": "You are fighting a losing battle on price instead of building a brand."

EXAMPLE 3:
Domain: strategikonsult.se
Description: "Vi säljer strategiprojekt till medelstora bolag men säljcykeln är 6+ månader. Vi har för få deals i pipen."
Context: Säljer stora projekt. Kräver många möten innan beslut. Founders gör all försäljning själva.
Output:
[
  {
    "icon": "🚪",
    "title": "Din Front Door Är För Tung",
    "description": "Ingen köper ett stort projekt utan att ha testat dig först. Du ber om giftermål på första dejten.",
    "action": "Skapa en 'Strategi-Sprint': kort format, avgränsad deliverable, tydligt pris. De som gillar det konverterar till stora projekt."
  },
  {
    "icon": "📞",
    "title": "Dina Gamla Kunder Har Bytt Jobb",
    "description": "Du har ett gäng nöjda köpare. Hälften har bytt bolag sen dess. De vill köpa igen men du ringer aldrig.",
    "action": "LinkedIn-stalk dina champions från senaste 3 åren. Skicka: 'Hej, såg du bytte - hur ser det ut på nya stället?'"
  },
  {
    "icon": "🤖",
    "title": "Du Sitter I Möten Du Inte Borde Ta",
    "description": "Varje intro-möte tar en timme. Majoriteten är fel fit. Du blöder tid på folk som aldrig kommer köpa.",
    "action": "Spela in en video som förklarar hur ni jobbar och ungefärlig prisrange. Skicka innan möte. De som bokar är seriösa."
  }
],
"score": 64,
"verdict": "Your sales process is designed to repel customers, not attract them."

EXAMPLE 4:
Domain: kaffeprenumeration.se
Description: "Vi säljer kaffeprenumerationer till privatpersoner men churn är 40% efter 3 månader. Vi jagar hela tiden nya kunder."
Context: Lågt ordervärde per månad. Marknadsför via Instagram. Ingen B2B-försäljning.
Output:
[
  {
    "icon": "🏢",
    "title": "Kontoret Dricker Mer Än Viktor, 34",
    "description": "Du jagar privatpersoner som churnar efter 3 månader. Ett kontor med 20 personer är 20x volym och stannar i flera år.",
    "action": "Skapa ett 'Office-paket' med vettigt pris för volym. Ring 10 lokala företag med 10-50 anställda denna vecka."
  },
  {
    "icon": "✂️",
    "title": "Instagram-kunder Är Window Shoppers",
    "description": "Billig CPA men de köpte för att de scrollade förbi en snygg bild. Noll intention. Därför churn.",
    "action": "Pausa Instagram en månad. Lägg budget på Google-sök efter 'bästa kaffeprenumeration'. Folk som aktivt letar churnar mindre."
  },
  {
    "icon": "🔒",
    "title": "Månad-till-månad = Churn Built-In",
    "description": "Ingen binding betyder att ingen vana hinner bildas. De avbryter innan de blivit kära i ditt kaffe.",
    "action": "Erbjud en 'smakresa' över flera månader med tema varje leverans. Kunden committar längre, du får högre LTV."
  }
],
"score": 94,
"verdict": "You have a recurring revenue goldmine but you are digging in the wrong spot."
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

    if (description.length > 300) {
      return NextResponse.json(
        { error: "Description is too long (max 300 chars)." },
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
      You are a Strategic Business Consultant, not a copywriter.

      YOUR GOAL:
      1. Analyze the user's business.
      2. Generate 3 strategic plays using "The 5 Lenses".
      3. SCORE the business potential (0-100) based on how much impact Jellymove could have.
      4. Write a short "Verdict" explaining the score.

      THE 5 LENSES:
      1. SUBTRACT (✂️) - What can they stop doing?
      2. ACCESS (🤝) - Who do they already have access to?
      3. PRICE (💰) - Can they raise prices or extend contracts?
      4. FRICTION (🚪) - What is hard that should be easy?
      5. AUTOMATE (🤖) - What repetitive tasks can be automated?

      SCORING GUIDELINES:
      - Use the FULL range (0-100). Do not default to 70-80.
      - < 70: Low potential, bad fit, or too early.
      - 70-79: Average business, incremental improvements possible.
      - 80-89: High potential, "Unicorn" material if they fix 1-2 things.
      - 90+: Absolute goldmine, immediate exponential growth possible.
      - BE CRITICAL. Most businesses are NOT 80+.

      TRAINING EXAMPLES (FEW-SHOT):
      ${FEW_SHOT_EXAMPLES}

      CURRENT BUSINESS TO ANALYZE:
      Domain: ${cleanDomain}
      User's Challenge: "${description}"
      Website Context (Deep Scan): "${siteContent || "Could not read site, rely on domain and challenge."}"

      THINKING PROCESS (Chain-of-Thought):
      1. Analyze the Business Model.
      2. Identify the biggest leak or missed opportunity.
      3. Draft 3 specific plays.
      4. Determine the "Jelly-Score" (0-100). High score = High potential for rapid growth/transformation.
      5. Write a 1-sentence Verdict.

      OUTPUT FORMAT:
      Strictly a JSON object. No markdown.
      {
        "suggestions": [
          {
            "icon": "emoji",
            "title": "Short hook (max 5 words)",
            "description": "The Insight (max 25 words)",
            "action": "First concrete step (max 15 words)"
          },
          ...
        ],
        "score": 85,
        "verdict": "You are sitting on a goldmine but digging with a spoon."
      }
    `;

    // 4. Analyze with Gemini (and fetch Swedish data in parallel)
    // We update the prompt to ask for "Estimated Financials" as a fallback
    const finalPrompt = `
      ${prompt}
      
      IMPORTANT: Also provide an "estimated_financials" object in your JSON response with:
      - revenue: string (e.g. "10-50 MSEK")
      - employees: string (e.g. "10-20")
      - profit: string (e.g. "Profitable")
      If you cannot estimate, use "Unknown".
    `;

    const [result, swedishData] = await Promise.all([
      model.generateContent(finalPrompt),
      fetchSwedishCompanyData(cleanDomain)
    ]);

    const response = await result.response;
    const text = response.text();

    // Clean up the response text
    const cleanText = text.replace(/```json/g, '').replace(/```/g, '').trim();

    let auditData;
    try {
      auditData = JSON.parse(cleanText);
    } catch (e) {
      console.error("Failed to parse Gemini JSON:", text);
      return NextResponse.json(
        { error: "Fumbled the ball. Failed to parse insights." },
        { status: 500 }
      );
    }

    // Merge Logic: Real data > AI Estimate
    const financials = {
      revenue: swedishData?.revenue || auditData.estimated_financials?.revenue || "Unknown",
      employees: swedishData?.employees || auditData.estimated_financials?.employees || "Unknown",
      profit: swedishData?.profit || auditData.estimated_financials?.profit || "Unknown",
      currency: swedishData?.currency || "SEK",
      verified: !!swedishData, // True if we got a hit from the API
      orgNumber: swedishData?.orgNumber,
      city: swedishData?.city
    };

    const finalResponse = {
      ...auditData,
      financials
    };

    return NextResponse.json(finalResponse);

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
