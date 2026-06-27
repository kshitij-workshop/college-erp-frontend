import { Bell } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function NotificationBell() {
  return (
    <button className="relative rounded-xl p-2 transition hover:bg-slate-100">
      <Bell className="h-6 w-6 text-slate-600" />

      <Badge
        className="absolute -right-1 -top-1 h-5 min-w-5 rounded-full p-0 flex items-center justify-center"
      >
        3
      </Badge>
    </button>
  );
}