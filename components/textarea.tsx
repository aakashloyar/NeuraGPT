"use client";
import { useRouter,usePathname } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import axios from "axios"
import { useChatStore } from "@/store/chatStore";
import { useMessageStore } from "@/store/messageStore";
import {Newchat} from "@/actions/chat/new"
export function Textarea() {
    const router=useRouter();
    const pathname =usePathname();
    const [text, setText] = useState("");
    const addChat = useChatStore((state) => state.addChat);
    const addMessage = useMessageStore((state) => state.addMessages);  
    function handleChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
      setText(event.target.value);
    }

    async function chatInitiate() {
        const chat=await Newchat();
        if(chat==null) {
            router.push('/');
            return null;
        }
        addChat(chat);
        router.push(`/chat/${chat.id}`);
        return chat.id;
    }
    async function handleClick() {
        var chatId=null;
        if(pathname=="/") chatId=await chatInitiate();
        else chatId=pathname.split('/')[2];
        if(chatId==null) return;

        const res=await axios.post(`/api/chat/${chatId}`,{
            question:text
        });
        if(res.status==200) {
            addMessage(res.data.message);  
            setText("");
        } 
    }
    return (
        <div className='border border-slate-200 shadow-lg shadow-slate-300 rounded-2xl w-1/2'>
            <div className='w-full'>
                <textarea  className='w-full h-24 focus:outline-none px-2 py-1'
                   name="textarea" 
                   id="textarea" 
                   placeholder='Ask Anything'
                   value={text}
                   onChange={handleChange}
                >
                </textarea>
            </div>
            <div className='flex justify-end px-2 pb-1 mt-1'>
                <button className={`p-1 rounded-lg ${text.length < 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-200"}`} 
                    disabled={text.length < 1}
                    onClick={handleClick}>
                   <Image src="/next.png" alt="Send" width={24} height={24} className='cursor-pointer' />
                </button>
            </div>
        </div>
    )
}