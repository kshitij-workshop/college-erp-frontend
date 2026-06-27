import {
  LayoutDashboard,
  Users,
  GraduationCap,
  Building2,
  Layers3,
  CalendarDays,
  Library,
  Settings,
} from "lucide-react";

export const sidebarItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
  },
  {
    title: "Students",
    icon: Users,
    href: "/dashboard/students",
  },
  {
    title: "Faculty",
    icon: GraduationCap,
    href: "/dashboard/faculty",
  },
  {
    title: "Departments",
    icon: Building2,
    href: "/dashboard/departments",
  },
  {
    title: "Programs",
    icon: Layers3,
    href: "/dashboard/programs",
  },
  {
    title: "Semesters",
    icon: CalendarDays,
    href: "/dashboard/semesters",
  },
  {
    title: "Library",
    icon: Library,
    href: "/dashboard/library",
  },
  {
    title: "Settings",
    icon: Settings,
    href: "/dashboard/settings",
  },
];