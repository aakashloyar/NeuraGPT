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
  const items = [
    {
      title: "Home",
      url: "#",
    },
    {
      title: "Inbox",
      url: "#",
    },
    {
      title: "Calendar",
      url: "#",
    },
    {
      title: "Search",
      url: "#",
    },
    {
      title: "Settings",
      url: "#",
    },
  ]
  export function AppSidebar() {
    return (
      <Sidebar>
        <SidebarHeader>
          <div className="text-xl text-slate-900 font-semibold">
            Chat History
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup />
            <SidebarGroupLabel>Application</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <a href={item.url}>
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
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
  