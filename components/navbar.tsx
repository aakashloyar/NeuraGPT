"use client"
import { useRouter } from "next/navigation";
import Link from "next/link";
import {Button} from '@/components/ui/button'
export default function() {
    const router = useRouter();
    function handleLog() {
        router.push('api/auth/signin');
    }
    return (
        <div className='w-full h-14 bg-slate-200 flex justify-between items-center'>
            <div className='pl-2 font-bold'>
                <Link href="/" className="text-xl cursor-pointer">
                   NeuraAI
                </Link>
            </div>
            <div className='pr-2'>
                <Button variant={"default"} size={"lg"} className='bg-slate-900 hover:bg-slate-600 text-xl font-semibold ' onClick={handleLog}>
                   Login
                </Button>
            </div>
        </div>
    )
}