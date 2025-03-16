import { NextRequest, NextResponse } from "next/server";
import { model } from "@/lib/geminimodel";
import { auth } from "@/lib/auth";
import {prisma} from "@/lib/primsa"
import {HistorySchema} from "@/lib/validation"
export async function POST(req: NextRequest) {
    const session = await auth();
    if (!session || !session.user?.id) 
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const url = req.nextUrl.pathname;
    const chatId = url.split("/")[3];

    if (!chatId || !await prisma.chat.findFirst({ where: { id: chatId } })) 
        return NextResponse.json({ message: "Chat ID not found" }, { status: 404 });

    try {
        const body = await req.json();
        const { question, history } = body;

        if (!Array.isArray(history) || !history.every(item => HistorySchema.safeParse(item).success)) {
            return NextResponse.json({ error: "Invalid Syntax for History" }, { status: 400 });
        }
        if (!question) return NextResponse.json({ error: "Question is required" }, { status: 400 });

        let prompt = "";
        if (history.length === 0) {
            prompt = `
            User Question: ${question}

            - Generate an answer to the question.
            - Also, create a **short and meaningful title** for the chat based on the question.
            - The title should be 3-5 words long.
            - Respond in the format: 

            **Answer:** <your generated answer>
            **Title:** <generated title>
            `;
        } else {
            prompt = `
            Previous conversation:
            ${history.map(h => `Q: ${h.question} \n A: ${h.answer}`).join("\n")}
            
            New Question: ${question}

            Provide a response based on the context.
            `;
        }

        const result = await model.generateContent(prompt);
        const responseText = result.response.text().trim();

        let answer = "";
        let title = "";
        if (history.length === 0) {
            const match = responseText.match(/\*\*Answer:\*\*(.*?)\*\*Title:\*\*(.*)/s);
            if (match) {
                answer = match[1].trim();
                title = match[2].trim();
            } else {
                answer = responseText; // Fallback
                title = "New Chat Title";
            }
        } else {
            answer = responseText;
        }

        const message = await prisma.message.create({
            data: {
                chatId,
                question,
                answer,
            },
        });

        if (history.length === 0) {
            await prisma.chat.update({
                where: { id: chatId },
                data: { title }
            });
        }

        return NextResponse.json({ message, title }, { status: 200 });
    } catch (error) {
        console.error("Error generating chat response:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}



export async function GET(req: NextRequest) {
    const session = await auth();
    if (!session || !session.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const url = req.nextUrl.pathname;
    const chatId=url.split("/")[3];
    if (!chatId ||!await prisma.chat.findFirst({where:{id:chatId}})) {
        return NextResponse.json({ error: "Chat ID is required" }, { status: 400 });
    }
    try {
        const messages = await prisma.message.findMany({
            where: { chatId },
            orderBy: { createdAt: "asc" },
        });

        return NextResponse.json({ messages }, { status: 200 });
    } catch (error) {
        console.error("Error fetching messages:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

