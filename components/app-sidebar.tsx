"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChatType } from "@/lib/validation";
import { useChatStore } from "@/store/chatStore";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns"; // To format dates easily
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
  const router = useRouter();

  async function handleNewChat() {
    router.push(`/`);
  }

  useEffect(() => {
    if (initChats.length > 0) {
      setChats(initChats);
    }
  }, []);

  // Group chats by date
  const groupedChats = chats.reduce((acc, chat) => {
    const date = format(new Date(chat.createdAt), "MMMM dd, yyyy"); // Format as "March 16, 2025"
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
              +
              <span className="absolute left-full ml-2 px-2 py-1 bg-gray-700 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity">
                New Chat
              </span>
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
