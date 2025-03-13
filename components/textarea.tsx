"use client";
import { useRouter,usePathname } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import axios from "axios"
export function Textarea() {
    const router=useRouter();
    const pathname =usePathname();
    const [text, setText] = useState("");
    function handleChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
      setText(event.target.value);
    }

    async function chatInitiate() {
        try{
            const res=await axios.post("/api/chat/new")
            if(res.status==200) {
                return router.push(`/chat/${res.data.message}`);
            }
        } catch(error){
            return router.push('/');
        }
    }
    async function handleClick() {
        console.log(pathname)
        if(pathname=="/") {
            await chatInitiate();
        }
    }
    return (
        <div className='border border-slate-200 shadow-lg shadow-slate-300 rounded-2xl w-1/2'>
            <div className='w-full'>
                {/* {console.log('happening again')} */}
                <textarea  className='w-full h-24 focus:outline-none px-2 py-1'
                   name="textarea" 
                   id="textarea" 
                   placeholder='Ask Anything'
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