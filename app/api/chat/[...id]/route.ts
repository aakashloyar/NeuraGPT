import { NextRequest, NextResponse } from "next/server";
import { model } from "@/lib/geminimodel";
import { auth } from "@/lib/auth";
import {prisma} from "@/lib/primsa"
export async function POST(req: NextRequest) {
    const session = await auth();
    if (!session || !session.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const url = req.nextUrl.pathname;
    const chatId=url.split("/")[3];
    if (!chatId) return NextResponse.json({ error: "Chat ID is required" }, { status: 400 });
    try {
        const body = await req.json();
        const { question } = body;
        if (!question) return NextResponse.json({ error: "Question is required" }, { status: 400 });
        const result = await model.generateContent(question);
        const answer = result.response.text();
        const message = await prisma.message.create({
            data: {
                chatId,
                question,
                answer,
            },
        });
        console.log(message);
        return NextResponse.json({ message:message }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}



export async function GET(req: NextRequest) {
    const session = await auth();
    if (!session || !session.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const url = req.nextUrl.pathname;
    const chatId=url.split("/")[3];
    if (!chatId) return NextResponse.json({ error: "Chat ID is required" }, { status: 400 });
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