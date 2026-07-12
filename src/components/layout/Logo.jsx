import { GraduationCap } from "lucide-react";
import { useSidebar } from "@/components/ui/sidebar";

export default function Logo() {
  const { state } = useSidebar();

  const collapsed = state === "collapsed";

  return (
    <div
      className={`flex items-center transition-all duration-300 ${
        collapsed ? "justify-center px-2" : "gap-3 px-4"
      }`}
    >
      {/* Logo */}

      <div
        className={`
          flex items-center justify-center
          rounded-2xl bg-blue-600 text-white shadow-lg
          transition-all duration-300

          ${
            collapsed
              ? "h-10 w-10 rounded-xl"
              : "h-14 w-14 rounded-2xl"
          }
        `}
      >
        <GraduationCap
          className={`transition-all duration-300 ${
            collapsed ? "h-5 w-5" : "h-7 w-7"
          }`}
        />
      </div>

      {/* Text */}

      <div
        className={`
          overflow-hidden transition-all duration-300

          ${
            collapsed
              ? "w-0 opacity-0"
              : "w-40 opacity-100"
          }
        `}
      >
        <h2 className="text-lg font-bold whitespace-nowrap">
          College ERP
        </h2>

        <p className="text-sm text-slate-500 whitespace-nowrap">
          Campus Management
        </p>
      </div>
    </div>
  );
}