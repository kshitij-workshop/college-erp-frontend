import {
  SidebarProvider,
  SidebarInset,
} from "@/components/ui/sidebar";

import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export default function DashboardLayout({ children }) {
  return (
    <SidebarProvider defaultOpen={true}>
      <Sidebar />

      <SidebarInset>
        <div className="flex min-h-screen flex-col bg-slate-50">

          <Navbar />

          <main className="flex-1 overflow-y-auto p-8">
            {children}
          </main>

        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}