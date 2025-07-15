import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Link } from "react-router-dom";
import {
  Home,
  ScrollText,
  CirclePlus,
  MessageCircleHeart,
  Handshake,
} from "lucide-react";
import Logo from "@/ui/Logo";
import { cn } from "@/lib/utils";

// Define navigation items
const navItems = [
  { title: "Dashboard", url: "/dashboard", icon: Home },
  { title: "Add Blogs", url: "/dashboard/addblogs", icon: CirclePlus },
  { title: "Blog lists", url: "/dashboard/bloglist", icon: ScrollText },
  { title: "Comments", url: "/dashboard/comment", icon: MessageCircleHeart },
  { title: "Community", url: "/category/technology", icon: Handshake },
];

export function AppSidebar() {
  const { isCollapsed } = useSidebar();
  return (
    <Sidebar>
      <SidebarContent className="mt-2 pl-4">
        <SidebarGroup className="space-y-4">
          <SidebarGroupLabel className={cn(isCollapsed && "hidden")}>
            <Logo />
          </SidebarGroupLabel>
          <SidebarGroupContent className="mt-4">
            <SidebarMenu className="space-y-4 font-default-family">
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link to={item.url}>
                      <item.icon className="w-5 h-5" />
                      <span className="text-xl">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
