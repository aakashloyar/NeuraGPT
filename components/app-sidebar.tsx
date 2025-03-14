"use client"
import {prisma} from "@/lib/primsa"
import Link from "next/link";
import {Button} from "@/components/ui/button"
import {ChatType} from "@/lib/validation"
import { useChatStore } from '@/store/chatStore';
import { useEffect } from "react";

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
  export function AppSidebar({initChats}:{initChats:ChatType[]}) {
    const chats = useChatStore((state) => state.chats);
    const setChats = useChatStore((state) => state.setChats); // New function
    useEffect(() => {
      if (initChats.length > 0) {
        setChats(initChats);
      }
    }, []);
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
                      <SidebarMenuButton asChild >
                          <Link href={chat.id} >
                            <span className="">{chat.id}</span>
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
  