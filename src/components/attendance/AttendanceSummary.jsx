import {
  Users,
  CheckCircle2,
  XCircle,
  Clock3,
  CalendarCheck,
} from "lucide-react";

import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const cards = [
  {
    key: "total",
    title: "Students",
    icon: Users,
    bg: "bg-slate-100",
    color: "text-slate-700",
  },
  {
    key: "present",
    title: "Present",
    icon: CheckCircle2,
    bg: "bg-green-100",
    color: "text-green-600",
  },
  {
    key: "absent",
    title: "Absent",
    icon: XCircle,
    bg: "bg-red-100",
    color: "text-red-600",
  },
  {
    key: "late",
    title: "Late",
    icon: Clock3,
    bg: "bg-yellow-100",
    color: "text-yellow-600",
  },
  {
    key: "leave",
    title: "Leave",
    icon: CalendarCheck,
    bg: "bg-blue-100",
    color: "text-blue-600",
  },
];

export default function AttendanceSummary({ summary }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <Card
            key={card.key}
            className="rounded-2xl p-5 transition-shadow hover:shadow-md"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">{card.title}</p>

                <h2 className="mt-2 text-3xl font-bold">
                  {summary?.[card.key] ?? 0}
                </h2>
              </div>

              <div
                className={`flex h-12 w-12 items-center justify-center rounded-xl ${card.bg}`}
              >
                <Icon className={`h-6 w-6 ${card.color}`} />
              </div>
            </div>

            
          </Card>
          
          
        );
      })}
    </div>
  );
}
