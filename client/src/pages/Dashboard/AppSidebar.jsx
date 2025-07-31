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
  LogOut,
} from "lucide-react";
import Logo from "@/ui/Logo";
import { cn } from "@/lib/utils";

// Define navigation items
const navItems = [
  { title: "Dashboard", url: "/admin", icon: Home },
  { title: "Add Blogs", url: "/admin/addblogs", icon: CirclePlus },
  { title: "Blog lists", url: "/admin/bloglist", icon: ScrollText },
  { title: "Comments", url: "/admin/comment", icon: MessageCircleHeart },
];

export function AppSidebar() {
  const { isCollapsed } = useSidebar();

  return (
    <Sidebar>
      <SidebarContent className="mt-2">
        <SidebarGroup className="space-y-2">
          <SidebarGroupLabel className={cn(isCollapsed && "hidden")}>
            <Logo />
          </SidebarGroupLabel>
          <SidebarGroupContent className="mt-4">
            <SidebarMenu className="space-y-2 font-default-family">
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link to={item.url}>
                      <item.icon className="w-8 h-8" />
                      <p className="font-medium text-lg">{item.title}</p>
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
