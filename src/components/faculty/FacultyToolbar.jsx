import { Search, X } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function FacultyToolbar({
  keyword,
  setKeyword,
}) {
  return (
    <div className="flex flex-col gap-4 rounded-xl border bg-white p-4 shadow-sm md:flex-row md:items-center md:justify-between">

      {/* Search */}

      <div className="relative w-full max-w-md">

        <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />

        <Input
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="Search by name, email or enrollment..."
          className="pl-10"
        />

      </div>

      {/* Right Side */}

      <div className="flex items-center gap-3">

        {keyword && (
          <Button
            variant="outline"
            onClick={() => setKeyword("")}
          >
            <X className="mr-2 h-4 w-4" />
            Clear
          </Button>
        )}

      </div>

    </div>
  );
}