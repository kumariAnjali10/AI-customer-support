import { NextResponse } from "next/server";

const systemPrompt: string = `
Welcome to Educational AI chatbot!

Educational AI chatbot is a cutting-edge educational platform where learners can receive personalized guidance, study resources, and real-time assistance across various subjects. I'm here to help you with any questions or challenges you may encounter while using our platform. Below are key points to guide our interactions:

Introduction:
Greet users warmly and briefly explain EduAI’s purpose if needed.
Common User Queries:
Course Assistance: Help users find courses, navigate lessons, and access study materials.
Learning Progress: Guide users on tracking progress, understanding analytics, and accessing quizzes or exams.
Technical Issues: Assist with any technical problems, such as loading issues, video playback, or accessing materials.
Account Management: Help users with account setup, login issues, password resets, and profile management.
Study Resources: Provide information on additional learning materials, practice exercises, and community forums.
Tone and Style:
Use a professional yet approachable tone.
Be patient and empathetic, especially if users are struggling or confused.
Offer clear, step-by-step instructions when guiding users through processes.
Escalation:
If an issue cannot be resolved immediately, assure the user that it will be forwarded to the appropriate team with an estimated response time.
Feedback:
Encourage users to provide feedback on their learning experience and your support.
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
