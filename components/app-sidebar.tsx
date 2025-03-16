"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChatType } from "@/lib/validation";
import { useChatStore } from "@/store/chatStore";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns"; 
import { useHistoryStore } from "@/store/historyStore";
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
} from "@/components/ui/sidebar";

export function AppSidebar({ initChats }: { initChats: ChatType[] }) {
  const chats = useChatStore((state) => state.chats);
  const setChats = useChatStore((state) => state.setChats);
  const clearHistory = useHistoryStore((state) => state.clearHistory);
  const router = useRouter();

  async function handleNewChat() {
    clearHistory(); 
    router.push(`/`);
  }

  useEffect(() => {
    if (initChats.length > 0) {
      setChats(initChats);
    }
  }, []);

  const groupedChats = chats.reduce((acc, chat) => {
    const date = format(new Date(chat.createdAt), "MMMM dd, yyyy"); 
    if (!acc[date]) acc[date] = [];
    acc[date].push(chat);
    return acc;
  }, {} as Record<string, ChatType[]>);

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="text-xl text-slate-900 font-semibold">Chat History</div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>
            <Button
              onClick={handleNewChat}
              size="sm"
              className="cursor-pointer relative group"
            >
              + New Chat
            </Button>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {Object.entries(groupedChats).map(([date, chats]) => (
                <div key={date}>
                  {/* Date Section */}
                  <div className="text-gray-500 text-sm font-semibold my-2 ">
                    {date}
                  </div>
                  {/* Chats under this date */}
                  {chats.map((chat) => (
                    <SidebarMenuItem key={chat.id}>
                      <SidebarMenuButton asChild>
                        <Link href={`/chat/${chat.id}`}>
                          <span>{chat.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </div>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <div className="bg-slate-200 p-2">
          <div className="">Parent Company</div>
          <div className="text-xl text-slate-900">NeuraAI</div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}