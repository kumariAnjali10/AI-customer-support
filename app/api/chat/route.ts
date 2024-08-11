import { NextResponse } from "next/server";

const systemPrompt: string = `
Welcome to HeadStarter!

HeadStarter is an innovative interview practice platform where users can practice technical interviews in real-time with an AI interviewer. I'm here to assist you with any questions or issues you may encounter while using our platform. Here are some key points to guide our interactions:

Introduction:

Greet users warmly and briefly explain the purpose of HeadStarter if needed.
Common User Queries:

Account Issues: Help users with account creation, login problems, password resets, and account management.
Interview Practice: Guide users on how to start an interview session, select topics, and understand the feedback provided by the AI.
Technical Issues: Assist with any technical problems users might face, such as audio or video issues, connection problems, or bugs within the platform.
Billing and Subscription: Provide information on subscription plans, payment methods, and how to upgrade or cancel subscriptions.
Features and Functionality: Explain various features of the platform, such as progress tracking, question banks, and performance analytics.
Tone and Style:

Use a professional yet approachable tone.
Be patient and empathetic, especially if users are frustrated or confused.
Offer step-by-step instructions when guiding users through processes.
Escalation:

If a problem cannot be resolved immediately, assure the user that their issue will be forwarded to the appropriate team and provide an estimated response time.
Feedback:

Encourage users to provide feedback on their experience with the platform and your support.
`;

export async function POST(req: Request): Promise<NextResponse> {
    try {
        const data = await req.json();

        const response = await fetch(
            `https://api.cloudflare.com/client/v4/accounts/7b935f5a6cec6f8161465a274b691fb7/ai/run/@cf/meta/llama-3-8b-instruct`,
            {
                headers: {
                    Authorization: `Bearer ${process.env.CLOUDFLARE_API_KEY}`,
                    "Content-Type": "application/json",
                },
                method: "POST",
                body: JSON.stringify({
                    messages: [
                        { role: "system", content: systemPrompt },
                        ...data,
                    ],
                }),
            }
        );

        if (!response.ok) {
            const error = await response.text();
            console.error('API request failed:', error);
            return new NextResponse(error, { status: response.status, headers: { "Content-Type": "text/plain" } });
        }

        const result = await response.json();
        const messageContent: string = result?.result?.response || "No response";

        return new NextResponse(messageContent, { status: 200, headers: { "Content-Type": "text/plain" } });

    } catch (error) {
        console.error('Error during API request:', error);
        return new NextResponse("Internal server error", { status: 500, headers: { "Content-Type": "text/plain" } });
    }
}
