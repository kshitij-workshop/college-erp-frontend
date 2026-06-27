import {
  ChevronLeft,
} from "lucide-react";

import { sidebarItems } from "@/constants/sidebar";

import Logo from "./Logo";
import SidebarItem from "./SidebarItem";


export default function Sidebar() {
  return (
    <aside className="flex h-screen w-72 flex-col border-r bg-white">

      <div className="border-b py-4">
        <Logo />
      </div>

      <nav className="flex-1 space-y-2 px-4 py-6">

        {sidebarItems.map((item) => (
          <SidebarItem
            key={item.title}
            icon={item.icon}
            label={item.title}
            to={item.href}
          />
        ))}

      </nav>

      <div className="border-t p-4">

        <button
          className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-slate-500 transition hover:bg-slate-100"
        >
          <ChevronLeft className="h-5 w-5" />

          Collapse

        </button>

      </div>

    </aside>
  );
}