import { UserPlus, BookOpen, GraduationCap } from "lucide-react";
import ActivityItem from "./ActivityItem";

export default function RecentActivity() {

  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">

      <h2 className="mb-5 text-xl font-semibold">

        Recent Activity

      </h2>

      <ActivityItem
        icon={UserPlus}
        title="Rahul Kumar"
        subtitle="New student registered"
        time="2 min ago"
      />

      <ActivityItem
        icon={BookOpen}
        title="Library"
        subtitle="Book issued"
        time="12 min ago"
      />

      <ActivityItem
        icon={GraduationCap}
        title="Faculty"
        subtitle="Professor added"
        time="35 min ago"
      />

    </div>
  );
}