import { Search, RotateCcw } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const DEFAULT_LABELS = {
  departmentId: "Department",
  programId: "Program",
  batchId: "Batch",
  semesterId: "Semester",
  sectionId: "Section",
  facultyId: "Faculty",
  roomId: "Room",
  subjectId: "Subject",
  academicSession: "Academic Session",
};

export default function EntityToolbar({
  search,
  onSearchChange,

  filters = {},

  // Old API
  filterOptions = {},

  // New API
  filterConfig = {},

  onFilterChange,

  onRefresh,

  placeholder = "Search...",
}) {
  // ==========================================
  // Backward Compatibility
  // ==========================================

  const config =
    Object.keys(filterConfig).length > 0
      ? filterConfig
      : Object.fromEntries(
          Object.entries(filterOptions).map(([key, options]) => [
            key,
            {
              label: DEFAULT_LABELS[key] ?? key,
              options,
            },
          ]),
        );

  return (
    <div className="rounded-xl border bg-white p-4 shadow-sm">
      <div className="flex flex-col gap-4 lg:flex-row lg:flex-wrap lg:items-center">
        {/* Search */}

        <div className="relative min-w-[260px] flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />

          <Input
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder={placeholder}
            className="pl-10"
          />
        </div>

        {/* Dynamic Filters */}

        {Object.entries(config).map(([key, cfg]) => {
          const { label, options = [], getOptionLabel, getOptionValue } = cfg;

          return (
            <Select
              key={key}
              value={filters[key] || "ALL"}
              onValueChange={(value) =>
                onFilterChange?.(key, value === "ALL" ? "" : value)
              }
            >
              <SelectTrigger className="w-full lg:w-48">
                <SelectValue placeholder={label} />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="ALL">All {label}</SelectItem>

                {options.map((item) => {
                  const optionValue = getOptionValue
                    ? getOptionValue(item)
                    : (item.id ?? item.value);

                  let optionLabel;

                  if (typeof getOptionLabel === "function") {
                    optionLabel = getOptionLabel(item);
                  } else {
                    optionLabel =
                      item.name ?? item.label ?? String(optionValue);
                  }
                  return (
                    <SelectItem
                      key={String(optionValue)}
                      value={String(optionValue)}
                    >
                      {optionLabel}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          );
        })}

        {/* Refresh */}

        <Button variant="outline" onClick={onRefresh}>
          <RotateCcw className="mr-2 h-4 w-4" />
          Refresh
        </Button>
      </div>
    </div>
  );
}
