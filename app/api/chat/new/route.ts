import {auth} from '@/lib/auth'
import { NextRequest,NextResponse } from "next/server";
import {prisma} from "@/lib/primsa"
export async function POST(req:NextRequest) {
    try{
        const session=await auth();
        const userId=session?.user?.id||"";
        const chat=await prisma.chat.create({
            data: {
                userId:userId
            },
            select:{
                id:true,
                title:true,
                createdAt:true
            }
        })
        return NextResponse.json({message:chat},{status:200});
    } catch(err) {
        return NextResponse.json({error:err},{status:500})
    }
    
}

export async function GET(req:NextRequest) {
    return NextResponse.json({message:"hello world"},{status:200})
}