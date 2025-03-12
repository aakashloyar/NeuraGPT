"use client"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { signOut } from "next-auth/react";
import {Button } from "@/components/ui/button"
import Image from "next/image"
import { useSession } from "next-auth/react";
export function Dropdown() {
    const session=useSession();
    function handleLog() {
        signOut();
    }
    return (
        <div>
            
            <DropdownMenu>
                <DropdownMenuTrigger>
                    {session.data?.user?.image && <Image className="rounded-full" src={session.data.user.image} alt="User Profile" width={40} height={40} />}
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                        <div className="font-semibold">
                          {session.data?.user?.name}
                        </div>
                    </DropdownMenuItem>

                    <DropdownMenuItem>
                        <Button variant={"destructive"} size={"lg"} className=' hover:bg-red-400 cursor-pointer text-xl font-semibold ' onClick={handleLog}>
                            LogOut
                        </Button>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

        </div>
    )
}