import { NextResponse } from "next/server";
import type { Suggestion, EmailCaptureRequest } from "@/lib/types";

export async function POST(req: Request) {
  try {
    const { email, domain, score, type, suggestions, verdict }: EmailCaptureRequest = await req.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { error: "Invalid email address." },
        { status: 400 }
      );
    }

    // --- EMAIL SENDING LOGIC (Resend) ---
    if (process.env.RESEND_API_KEY) {
      try {
        const { Resend } = await import('resend');
        const resend = new Resend(process.env.RESEND_API_KEY);

        await resend.emails.send({
          from: 'Jellymove <audit@mail.jellymove.com>', // Use default testing domain or your verified domain
          to: email,
          subject: `Your Audit Results for ${domain}`,
          html: `
                    <div style="font-family: sans-serif; color: #333;">
                        <h1>Jelly-Score: ${score}/100</h1>
                        <p style="font-size: 18px;"><strong>Verdict:</strong> "${verdict}"</p>
                        <hr style="border: 1px solid #eee; margin: 20px 0;" />
                        <h2>Your 3 Plays:</h2>
                        ${suggestions ? suggestions.map((s: Suggestion) => `
                            <div style="margin-bottom: 20px; padding: 15px; background: #f9f9f9; border-radius: 8px;">
                                <h3 style="margin-top: 0;">${s.icon} ${s.title}</h3>
                                <p>${s.description}</p>
                                <p><strong>Action:</strong> ${s.action}</p>
                            </div>
                        `).join('') : '<p>No plays generated.</p>'}
                        <p style="margin-top: 30px; font-size: 14px; color: #666;">
                            Ready to execute? <a href="https://jellymove.com">Book a call</a>.
                        </p>
                    </div>
                `
        });
        console.log(`[EMAIL SENT] To: ${email}`);
      } catch (emailError) {
        console.error("Failed to send email:", emailError);
        // Don't fail the request, just log the error
      }
    } else {
      console.warn("RESEND_API_KEY is missing. Email not sent.");
    }
    // For now, we log it so it appears in Vercel logs.
    console.log(`[LEAD CAPTURE] ------------------------------------------------`);
    console.log(`TYPE: ${type?.toUpperCase() || "UNKNOWN"}`);
    console.log(`EMAIL: ${email}`);
    console.log(`DOMAIN: ${domain || "N/A"}`);
    console.log(`SCORE: ${score || "N/A"}`);
    console.log(`VERDICT: ${verdict || "N/A"}`);
    console.log(`PLAYS: ${suggestions ? suggestions.length : 0} generated`);
    console.log(`TIMESTAMP: ${new Date().toISOString()}`);
    console.log(`---------------------------------------------------------------`);

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error("Email capture error:", error);
    return NextResponse.json(
      { error: "Failed to capture email." },
      { status: 500 }
    );
  }
}
