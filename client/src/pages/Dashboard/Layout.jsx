import {
  Sidebar,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <AppSidebar className="w-10" />
        <main className="flex-1 lg:p-4 ">
          <SidebarTrigger className="absolute top-4 mb-4" />
          <div className="lg:p-4">
            <Outlet />
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}

export default Layout;
