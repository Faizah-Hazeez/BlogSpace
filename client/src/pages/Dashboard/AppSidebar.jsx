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
import { useAppContext } from "@/context/AppContex";

// Define navigation items
const navItems = [
  { title: "Dashboard", url: "/admin", icon: Home },
  { title: "Add Blogs", url: "/admin/addblogs", icon: CirclePlus },
  { title: "Blog lists", url: "/admin/bloglist", icon: ScrollText },
  { title: "Comments", url: "/admin/comment", icon: MessageCircleHeart },
];

export function AppSidebar() {
  const { logout, user } = useAppContext();
  const { isCollapsed } = useSidebar();

  const handleLogout = () => {
    logout();
  };
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
              {/* logout */}
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={handleLogout}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50 cursor-pointer mt-[100%]"
                >
                  <LogOut className="w-5 h-5" />
                  <span className="text-xl">Logout</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
