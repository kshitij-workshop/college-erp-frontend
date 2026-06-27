import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function SearchBar() {
  return (
    <div className="relative w-96">
      <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

      <Input
        placeholder="Search students, faculty, books..."
        className="h-11 rounded-xl border-slate-200 bg-slate-50 pl-11 shadow-sm focus-visible:ring-2 focus-visible:ring-blue-500"
      />
    </div>
  );
}