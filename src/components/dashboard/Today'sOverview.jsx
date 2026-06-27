import {
  BookOpen,
  Users,
  ClipboardCheck,
  School,
} from "lucide-react";

import OverviewItem from "./OverviewItem";

export default function TodaysOverview() {

  return (

    <div className="rounded-2xl border bg-white p-6 shadow-sm">

      <h2 className="mb-6 text-xl font-semibold">

        Today's Overview

      </h2>

      <div className="space-y-3">

        <OverviewItem
          icon={School}
          title="Classes Today"
          value="24"
        />

        <OverviewItem
          icon={Users}
          title="Faculty Present"
          value="78"
        />

        <OverviewItem
          icon={BookOpen}
          title="Books Issued"
          value="18"
        />

        <OverviewItem
          icon={ClipboardCheck}
          title="Attendance Submitted"
          value="82%"
        />

      </div>

    </div>

  );
}