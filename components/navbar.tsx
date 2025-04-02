import Link from "next/link"
import {Dropdown} from "@/components/dropdown"
import { SidebarTrigger } from "@/components/ui/sidebar";

export default function Navbar() {    
    return (
        <div className='w-full h-14 bg-slate-200 flex justify-start items-center'>
            <div className="">
                <SidebarTrigger />
            </div>
            <div className="w-full flex justify-between items-center">
                <div className='pl-2 font-bold'>
                    <Link href="/" className="text-xl cursor-pointer">
                    NeuraGPT
                    </Link>
                </div>
                <div className='pr-2'>
                    <Dropdown/>
                </div>
            </div>
            
        </div>
    )
}