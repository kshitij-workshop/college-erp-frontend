import { GraduationCap } from "lucide-react";

export default function Logo() {
  return (
    <div className="flex items-center gap-3 px-4 py-3">
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 shadow-lg">
        <GraduationCap className="h-6 w-6 text-white" />
      </div>

      <div>
        <h1 className="text-xl font-bold tracking-tight text-slate-900">
          College ERP
        </h1>

        <p className="text-xs text-slate-500">
          Campus Management
        </p>
      </div>
    </div>
  );
}