import {
  Sidebar as AppSidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";

import { ChevronLeft, ChevronRight } from "lucide-react";

import Logo from "./Logo";
import SidebarItem from "./SidebarItem";
import { sidebarItems } from "@/constants/sidebar";

export default function Sidebar() {
  const { state, toggleSidebar } = useSidebar();

  return (
    <AppSidebar collapsible="icon">

      <SidebarHeader className="border-b py-4">
        <Logo />
      </SidebarHeader>

      <SidebarContent>
        <SidebarMenu className="px-2 py-4">
          {sidebarItems.map((item) => (
            <SidebarItem
              key={item.title}
              icon={item.icon}
              label={item.title}
              to={item.href}
            />
          ))}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter className="border-t p-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton onClick={toggleSidebar}>
              {state === "expanded" ? (
                <ChevronLeft className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}

              <span>Collapse</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      <SidebarRail />

    </AppSidebar>
  );
}