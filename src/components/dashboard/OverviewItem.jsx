import { ArrowRight } from "lucide-react";

export default function OverviewItem({ icon: Icon, title, value }) {
  return (
    <div className="flex items-center justify-between rounded-xl border p-4 hover:bg-slate-50 transition">

      <div className="flex items-center gap-3">

        <div className="rounded-lg bg-blue-100 p-2">
          <Icon className="h-5 w-5 text-blue-600" />
        </div>

        <span className="font-medium">
          {title}
        </span>

      </div>

      <div className="flex items-center gap-2">

        <span className="font-bold">
          {value}
        </span>

        <ArrowRight className="h-4 w-4 text-slate-400" />

      </div>

    </div>
  );
}