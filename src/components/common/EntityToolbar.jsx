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

export default function EntityToolbar({
  search,
  onSearchChange,

  filters = {},

  filterOptions = {},

  onFilterChange,

  onRefresh,

  placeholder = "Search...",
}) {
  return (
    <div className="rounded-xl border bg-white p-4 shadow-sm">

      <div className="flex flex-col gap-4 lg:flex-row lg:items-center">

        {/* Search */}

        <div className="relative flex-1">

          <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />

          <Input
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder={placeholder}
            className="pl-10"
          />

        </div>

        {/* Dynamic Filters */}

        {Object.keys(filterOptions).map((key) => (

          <Select
            key={key}
            value={filters[key] || ""}
            onValueChange={(value) =>
              onFilterChange(key, value)
            }
          >

            <SelectTrigger className="w-full lg:w-48">

              <SelectValue
                placeholder={`Select ${key}`}
              />

            </SelectTrigger>

            <SelectContent>

              <SelectItem value="">
                All
              </SelectItem>

              {filterOptions[key].map((item) => (

                <SelectItem
                  key={item.id}
                  value={item.id.toString()}
                >
                  {item.name}

                </SelectItem>

              ))}

            </SelectContent>

          </Select>

        ))}

        {/* Refresh */}

        <Button
          variant="outline"
          onClick={onRefresh}
        >

          <RotateCcw className="mr-2 h-4 w-4" />

          Refresh

        </Button>

      </div>

    </div>
  );
}