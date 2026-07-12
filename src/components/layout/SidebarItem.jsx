import { NavLink } from "react-router-dom";

import {
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

export default function SidebarItem({
  icon: Icon,
  label,
  to,
}) {
  return (
    <SidebarMenuItem>
      <NavLink to={to} end={to === "/dashboard"}>
        {({ isActive }) => (
          <SidebarMenuButton
            tooltip={label}
            isActive={isActive}
            className="
              h-12 rounded-xl
              text-slate-700
              hover:bg-slate-100
              hover: cursor-pointer
              hover:text-slate-900
              data-[active=true]:bg-blue-600
              data-[active=true]:text-white
              data-[active=true]:shadow-lg
            "
          >
            <Icon className="h-5 w-5" />
            <span className="font-medium">{label}</span>
          </SidebarMenuButton>
        )}
      </NavLink>
    </SidebarMenuItem>
  );
}