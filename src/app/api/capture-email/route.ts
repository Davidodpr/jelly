import { NextResponse } from "next/server";
import type { Suggestion, EmailCaptureRequest } from "@/lib/types";

export async function POST(req: Request) {
  try {
    const { email, domain, score, type, suggestions, verdict, generatedImage }: EmailCaptureRequest = await req.json();

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
          from: 'Jellymove <audit@mail.jellymove.com>',
          to: email,
          subject: `Your Jelly Score: ${score}/100 for ${domain}`,
          html: `
                    <div style="font-family: sans-serif; color: #333; max-width: 600px; margin: 0 auto;">
                        <div style="text-align: center; padding: 20px 0;">
                            <h1 style="font-size: 48px; margin: 0; color: #111;">Jelly Score: ${score}/100</h1>
                        </div>
                        ${generatedImage ? `
                        <div style="text-align: center; margin: 20px 0;">
                            <img src="${generatedImage}" alt="Your Jelly Score Artwork" style="max-width: 300px; border-radius: 16px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);" />
                        </div>
                        ` : ''}
                        <div style="background: linear-gradient(to right, #00f5ff, #ff006e); height: 4px; margin: 20px 0;"></div>
                        <p style="font-size: 20px; font-style: italic; text-align: center; color: #555; padding: 0 20px;">
                            "${verdict}"
                        </p>
                        <hr style="border: 1px solid #eee; margin: 30px 0;" />
                        <h2 style="color: #0891b2; font-size: 14px; text-transform: uppercase; letter-spacing: 2px;">Your 3 Plays:</h2>
                        ${suggestions ? suggestions.map((s: Suggestion) => `
                            <div style="margin-bottom: 20px; padding: 20px; background: #f9f9f9; border-radius: 12px; border-left: 4px solid #00f5ff;">
                                <h3 style="margin-top: 0; font-size: 18px;">${s.icon} ${s.title}</h3>
                                <p style="color: #666; font-style: italic;">"${s.description}"</p>
                                <p style="color: #111; font-weight: bold;"><span style="color: #0891b2;">The Play:</span> ${s.action}</p>
                            </div>
                        `).join('') : '<p>No plays generated.</p>'}
                        <div style="text-align: center; margin-top: 40px; padding: 30px; background: #f9f9f9; border-radius: 12px;">
                            <p style="font-size: 16px; color: #666; margin-bottom: 20px;">
                                Ready to execute these plays?
                            </p>
                            <a href="https://jellymove.com" style="display: inline-block; background: #ff006e; color: white; padding: 14px 28px; border-radius: 50px; text-decoration: none; font-weight: bold;">
                                Let's Talk
                            </a>
                        </div>
                        <p style="margin-top: 30px; font-size: 12px; color: #999; text-align: center;">
                            Built on millions of real conversations. We've heard every "no" so you don't have to.
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
