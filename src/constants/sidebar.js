import {
  LayoutDashboard,
  Users,
  GraduationCap,
  Building2,
  Library,
  Settings,
  CalendarRange,
  BookOpen,
  LayoutGrid,
  UserCog,
  BookPlus
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
    icon: UserCog,
    href: "/dashboard/faculty",
  },
  {
    title: "Departments",
    icon: Building2,
    href: "/dashboard/departments",
  },
  {
    title: "Programs",
    icon: GraduationCap,
    href: "/dashboard/programs",
  },
  {
    title: "Batches",
    icon: CalendarRange,
    href: "/dashboard/batches",
  },
  {
    title: "Semesters",
    icon: BookOpen,
    href: "/dashboard/semesters",
  },
  {
    title: "Sections",
    icon: LayoutGrid,
    href: "/dashboard/sections",
  },
  {
    title: "Subjects",
    icon: BookPlus,
    href: "/dashboard/subjects",
  },
  {
    title: "Subject-offerings",
    icon: Settings,
    href: "/dashboard/subject-offerings",
  },
  {
    title: "rooms",
    icon: Building2,
    href: "/dashboard/rooms",
  },
  {
    title: "time-slots",
    icon: CalendarRange,
    href: "/dashboard/time-slots",
  },
  {
    title: "Library",
    icon: Library,
    href: "/dashboard/library",
  },
  {
    title: "Time Table",
    icon: BookOpen,
    href: "/dashboard/timetable",
  },
  {
    title: "Settings",
    icon: Settings,
    href: "/dashboard/settings",
  },
  
];