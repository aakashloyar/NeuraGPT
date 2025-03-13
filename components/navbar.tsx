import Link from "next/link"
import {Dropdown} from "@/components/dropdown"
export default function() {    
    return (
        <div className='w-full h-14 bg-slate-200 flex justify-between items-center'>
            <div className='pl-2 font-bold'>
                <Link href="/" className="text-xl cursor-pointer">
                   NeuraGPT
                </Link>
            </div>
            <div className='pr-2'>
                <Dropdown/>
            </div>
        </div>
    )
}