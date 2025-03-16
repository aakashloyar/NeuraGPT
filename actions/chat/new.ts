"use server"
import {auth} from '@/lib/auth'
import {prisma} from "@/lib/primsa"
export async function Newchat() {
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
        return chat;
    } catch(err) {
        return null;
    }
}