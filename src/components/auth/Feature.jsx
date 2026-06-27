import { CheckCircle2 } from "lucide-react";

export default function Feature({ icon, title }) {
  return (
    <div className="flex items-center gap-4">
      <div className="rounded-xl bg-white/10 p-3">
        {icon}
      </div>

      <div>
        <p className="font-medium">{title}</p>

        <div className="flex items-center gap-2 text-sm text-blue-100">
          <CheckCircle2 size={16} />
          <span>Fully Integrated</span>
        </div>
      </div>
    </div>
  );
}