export interface CompanyFinancials {
    revenue?: string; // Omsättning
    profit?: string; // Resultat
    employees?: string; // Antal anställda
    currency?: string;
    name?: string;
    orgNumber?: string;
    city?: string;
    description?: string;
    verified: boolean; // True if from API, False if AI estimate
}

export async function fetchSwedishCompanyData(domain: string): Promise<CompanyFinancials | null> {
    const apiKey = process.env.FORETAGSAPI_API_KEY;

    if (!apiKey) {
        console.warn('FORETAGSAPI_API_KEY is missing. Skipping Swedish company data fetch.');
        return null;
    }

    // Simple heuristic: Only try for .se domains or if we can extract a likely Swedish name
    // For now, let's try for all, but the API is specific to Sweden.
    // Ideally, we check if domain ends in .se
    const isSwedish = domain.endsWith('.se');
    if (!isSwedish) {
        console.log(`Skipping FöretagsAPI for non-.se domain: ${domain}`);
        return null;
    }

    const companyName = domain.split('.')[0]; // simplistic, but works for spotify.se -> spotify

    console.log(`🔍 Searching FöretagsAPI for: ${companyName}...`);

    try {
        const response = await fetch('https://api.foretagsapi.se/v1/search', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                q: companyName,
                limit: 1
            })
        });

        if (!response.ok) {
            console.error(`FöretagsAPI error: ${response.status} ${response.statusText}`);
            return null;
        }

        const data = await response.json();
        const companies = data.hits || [];

        if (companies.length === 0) {
            console.log("No hits found in FöretagsAPI.");
            return null;
        }

        const company = companies[0];

        // Map API response to our interface
        // Note: The documentation was unclear on financial fields. 
        // We map what we know and hope for extended fields or fallback to AI for the rest.
        return {
            name: company.organisationsnamn,
            orgNumber: company.organisationsidentitet,
            city: company.postadress?.postort,
            description: company.verksamhetsbeskrivning,
            // These fields might not be present in the basic search response
            // If they are missing, the UI will handle it or we merge with AI data later
            revenue: company.omsattning || undefined,
            profit: company.resultat || undefined,
            employees: company.antalAnstallda || undefined,
            currency: 'SEK',
            verified: true
        };

    } catch (error) {
        console.error('Error fetching from FöretagsAPI:', error);
        return null;
    }
}
