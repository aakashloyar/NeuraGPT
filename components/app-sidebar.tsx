import {prisma} from "@/lib/primsa"
import { auth } from '@/lib/auth';
import Link from "next/link";
import {Button} from "@/components/ui/button"
import {
  Sidebar,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  } from "@/components/ui/sidebar"
  export async function AppSidebar() {
    const session=await auth();
    let chats=null;
    if(session &&session.user && session.user.id) {
        chats=await prisma.chat.findMany({
        where:{userId:session.user.id}
      })
    }
    return (
      <Sidebar>
        <SidebarHeader>
          <div className="text-xl text-slate-900 font-semibold">
            Chat History
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup />
            <SidebarGroupLabel>Chats</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {chats!=null &&
                  chats.map((chat) => (
                    <SidebarMenuItem key={chat.id} >
                      <SidebarMenuButton asChild>
                          <Link href={chat.id} className="flex items-center w-full group">
                              <span>{chat.id}</span>
                          </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))
                }
                
              </SidebarMenu>
            </SidebarGroupContent>

          <SidebarGroup />
        </SidebarContent>
        <SidebarFooter>
          <div className="bg-slate-200">
            <div className=''>
              Parent Company
            </div>
            <div className='text-xl text-slate-900'>
              NeuraAI
            </div>
          </div>
        
        </SidebarFooter>
      </Sidebar>
    )
  }
  