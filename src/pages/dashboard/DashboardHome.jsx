import DashboardHeader from "@/components/dashboard/DashboardHeader";
import StatCard from "@/components/dashboard/StatCard";
import RecentActivity from "@/components/dashboard/RecentActivity";
import QuickActions from "@/components/dashboard/QuickActions";
import { useDashboard } from "@/hooks/useDashboard";

import {
  Users,
  GraduationCap,
  Building2,
  BookOpen,
} from "lucide-react";

export default function DashboardHome() {
  const { dashboard, loading } = useDashboard();
  return (
    <>
      <DashboardHeader />

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

        <StatCard
          title="Students"
          value={dashboard?.totalStudents ?? 0}
          icon={Users}
          color="blue"
        />

        <StatCard
          title="Faculty"
          value={dashboard?.totalFaculty ?? 0}
          icon={GraduationCap}
          color="green"
        />

        <StatCard
          title="Departments"
          value={dashboard?.totalDepartments ?? 0}
          icon={Building2}
          color="orange"
        />

        <StatCard
          title="Books"
          value={dashboard?.totalBooks ?? 0}
          icon={BookOpen}
          color="purple"
        />

      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-3">

        <div className="lg:col-span-2">
          <RecentActivity />
        </div>

        <QuickActions />

      </div>
    </>
  );
}