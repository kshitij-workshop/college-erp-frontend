import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function AssignmentFilters({
  search,
  onSearchChange,

  status,
  onStatusChange,

  subject,
  onSubjectChange,

  subjects = [],
}) {
  return (
    <div className="rounded-3xl border bg-white p-5 shadow-sm">
      <div className="grid gap-4 lg:grid-cols-4">
        <div className="relative lg:col-span-2">
          <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />

          <Input
            className="pl-9"
            placeholder="Search assignments..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>

        <Select value={status} onValueChange={onStatusChange}>
          <SelectTrigger>
            <SelectValue placeholder="Status" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="ALL">All</SelectItem>

            <SelectItem value="PENDING">Pending</SelectItem>

            <SelectItem value="SUBMITTED">Submitted</SelectItem>

            <SelectItem value="GRADED">Graded</SelectItem>
          </SelectContent>
        </Select>

        <Select value={subject} onValueChange={onSubjectChange}>
          <SelectTrigger>
            <SelectValue placeholder="Subject" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="ALL">All Subjects</SelectItem>

            {subjects.map((subject) => (
              <SelectItem key={subject} value={subject}>
                {subject}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
