import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export default function AttendanceFilters({

    search,

    setSearch,

    filter,

    setFilter,

}) {

    return (

        <div className="flex flex-col gap-4 rounded-3xl border bg-white p-5 shadow-sm md:flex-row">

            <div className="relative flex-1">

                <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                <Input
                    placeholder="Search subject..."
                    value={search}
                    onChange={(e) =>
                        setSearch(e.target.value)
                    }
                    className="pl-10"
                />

            </div>

            <Select
                value={filter}
                onValueChange={setFilter}
            >

                <SelectTrigger className="w-full md:w-56">

                    <SelectValue />

                </SelectTrigger>

                <SelectContent>

                    <SelectItem value="ALL">
                        All Subjects
                    </SelectItem>

                    <SelectItem value="EXCELLENT">
                        Excellent (90%+)
                    </SelectItem>

                    <SelectItem value="GOOD">
                        Good (75–89%)
                    </SelectItem>

                    <SelectItem value="LOW">
                        Low (Below 75%)
                    </SelectItem>

                </SelectContent>

            </Select>

        </div>

    );

}