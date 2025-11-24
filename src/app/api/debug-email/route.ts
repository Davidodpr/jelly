import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
    const apiKey = process.env.RESEND_API_KEY;
    const hasKey = !!apiKey;
    const keyPreview = hasKey ? `${apiKey.slice(0, 5)}...` : "MISSING";

    try {
        if (!hasKey) {
            return NextResponse.json({
                status: "error",
                message: "RESEND_API_KEY is missing in environment variables.",
                env: { RESEND_API_KEY: "MISSING" }
            }, { status: 500 });
        }

        const { Resend } = await import('resend');
        const resend = new Resend(apiKey);

        // Try to send a test email to the sender itself (safe test)
        // or to a hardcoded test address if you prefer.
        // We'll use the 'from' address as 'to' just to verify the API works.
        // Actually, let's send to 'delivered@resend.dev' which is a sink.

        const { data, error } = await resend.emails.send({
            from: 'Jellymove <audit@mail.jellymove.com>',
            to: 'delivered@resend.dev',
            subject: 'Jellymove Debug Test',
            html: '<p>If you see this, Resend is working!</p>'
        });

        if (error) {
            return NextResponse.json({
                status: "error",
                message: "Resend API returned an error.",
                error: error,
                env: { RESEND_API_KEY: keyPreview }
            }, { status: 500 });
        }

        return NextResponse.json({
            status: "success",
            message: "Email sent successfully to delivered@resend.dev",
            data: data,
            env: { RESEND_API_KEY: keyPreview }
        });

    } catch (e: any) {
        return NextResponse.json({
            status: "error",
            message: "Unexpected error during execution.",
            error: e.toString(),
            env: { RESEND_API_KEY: keyPreview }
        }, { status: 500 });
    }
}
