import { CalendarDays } from "lucide-react";

export default function DashboardHeader() {
  const hour = new Date().getHours();

  let greeting = "Good Evening";

  if (hour < 12) greeting = "Good Morning";
  else if (hour < 17) greeting = "Good Afternoon";

  const date = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="mb-8 flex items-center justify-between">

      <div>

        <h1 className="text-4xl font-bold tracking-tight">
          {greeting}, Kshitij 👋
        </h1>

        <p className="mt-2 text-blue-500">
          Welcome back to your College ERP dashboard.
        </p>

      </div>

      <div className="flex items-center gap-2 rounded-xl border bg-white px-4 py-2 shadow-sm">

        <CalendarDays className="h-5 w-5 text-blue-600" />

        <span className="text-sm font-medium">
          {date}
        </span>

      </div>

    </div>
  );
}