# JellyBrain 3.0: The Intelligence Upgrade
*Från "Smart Copywriter" till "Strategisk Partner".*

För att göra AI:n reellt intelligentare (inte bara bättre på att formulera sig) måste vi ge den **bättre data**, **djupare process** och **vassare referensramar**.

Här är den tekniska planen för 3.0:

## 1. Data Ingestion: "The Deep Scan"
*Idag:* Vi läser bara startsidan. Det är som att döma en bok efter omslaget.
*3.0 Upgrade:* Vi måste förstå affärsmodellen på djupet.

*   **Multi-page Fetching:**
    *   `/pricing` → Avslöjar affärsmodell, ARPU-potential och upsell-möjligheter.
    *   `/about` eller `/team` → Avslöjar storlek, mognad och kompetensgap.
    *   `/careers` → Avslöjar tillväxtstrategi (Söker de säljare? Utvecklare? Det är en signal).
*   **Signal Extraction:**
    *   Identifiera tech-stack (använder de HubSpot? Stripe? Shopify?). Det ger oss "Access"-linsen direkt.

## 2. Reasoning Engine: "Chain-of-Thought"
*Idag:* Input → Output. AI:n gissar direkt.
*3.0 Upgrade:* Tvinga AI:n att "tänka" i steg innan den svarar.

*   **Step 1: The Diagnosis:** "Analysera nuvarande affärsmodell. Var tjänar de pengar? Var läcker de pengar?"
*   **Step 2: The Friction Audit:** "Simulera en kundresa. Var är det jobbigt att köpa?"
*   **Step 3: The Lens Application:** "Applicera nu 'Subtract'-linsen. Vad är det absolut dummaste de gör?"
*   **Step 4: The Synthesis:** "Välj de 3 mest kritiska insikterna och formulera dem som Plays."

*Tekniskt:* Vi använder en "Chain-of-Thought" prompt där AI:n först genererar en intern analys (som vi döljer för användaren) och sedan baserar sina råd på den.

## 3. Knowledge Injection: "Few-Shot Excellence"
*Idag:* Vi säger "Var smart".
*3.0 Upgrade:* Vi ger den facit.

*   **The Golden Dataset:** Vi matar prompten med 5-10 exempel på *perfekta* Jellymove-analyser (skrivna av dig).
*   **Mental Models:** Vi injicerar specifika ramverk (t.ex. "The 4 Fits", "Blue Ocean") som den ska validera mot.
*   **Effekt:** AI:n gissar inte vad "Jellymove-style" är. Den härmar mästaren.

## 4. Competitor Awareness (Optional but Powerful)
*   **Market Context:** Be AI:n identifiera 3 konkurrenter baserat på domänen.
*   **Gap Analysis:** "Vad gör konkurrent X som denna sajt missar?"
*   *Kräver:* Att AI:n får "hallucinera" lite mer fritt baserat på sin träningsdata, eller att vi kopplar på en sök-modul (Google Search Grounding).

---

## Sammanfattning: Vad krävs?

1.  **Utökad Scraping:** Bygg ut `fetchSiteContent` för att leta efter länkar till Pricing/About och hämta dem också.
2.  **Prompt Engineering v3:** Skriv om prompten till en flerstegs-process (CoT).
3.  **Curated Examples:** Du behöver skriva 3-5 "dröm-analyser" som vi kan använda som träningsdata i prompten.

Detta tar oss från "Kul copy" till "Hur visste den det där?!".

*Ska vi börja med punkt 1 (Deep Scan) eller punkt 3 (Curated Examples)?*
