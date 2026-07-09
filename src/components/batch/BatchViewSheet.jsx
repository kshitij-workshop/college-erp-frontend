import { useEffect, useState } from "react";

import { getBatchById } from "@/api/batchApi";

import { Sheet, SheetContent } from "@/components/ui/sheet";

import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

import { CalendarRange, GraduationCap } from "lucide-react";

import EntitySection from "@/components/common/EntitySection";
import DetailField from "@/components/common/DetailField";

export default function BatchViewSheet({ open, onOpenChange, batchId }) {
  const [batch, setBatch] = useState(null);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!open || !batchId) return;

    async function loadBatch() {
      try {
        setLoading(true);

        const response = await getBatchById(batchId);

        setBatch(response.data.data);
      } finally {
        setLoading(false);
      }
    }

    loadBatch();
  }, [open, batchId]);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-2xl p-0 bg-slate-50">
        {loading ? (
          <div className="space-y-6 p-8">
            <Skeleton className="mx-auto h-24 w-24 rounded-full" />
            <Skeleton className="mx-auto h-8 w-56" />
            <Skeleton className="mx-auto h-5 w-28" />
            <Skeleton className="h-44 rounded-2xl" />
          </div>
        ) : batch ? (
          <>
            <div className="bg-gradient-to-br from-blue-600 to-indigo-600 px-8 py-10 text-white">
              <div className="flex flex-col items-center text-center">
                <div className="flex h-24 w-24 items-center justify-center rounded-full border-4 border-white bg-white/10">
                  <CalendarRange className="h-12 w-12" />
                </div>

                <h1 className="mt-5 text-3xl font-bold">{batch.name}</h1>

                <p className="mt-2 text-blue-100">
                  {batch.startYear} - {batch.endYear}
                </p>

                <Badge
                  className={
                    batch.active
                      ? "mt-5 bg-green-100 text-green-700"
                      : "mt-5 bg-red-100 text-red-700"
                  }
                >
                  {batch.active ? "ACTIVE" : "INACTIVE"}
                </Badge>
              </div>
            </div>

            <div className="space-y-6 p-8">
              <EntitySection icon={GraduationCap} title="Batch Information">
                <div className="grid gap-6 md:grid-cols-2">
                  <DetailField
                    className="md:col-span-2"
                    label="Batch Name"
                    value={batch.name}
                  />

                  <DetailField
                    label="Department"
                    value={batch.departmentName}
                  />

                  <DetailField label="Program" value={batch.programName} />

                  <DetailField label="Start Year" value={batch.startYear} />

                  <DetailField label="End Year" value={batch.endYear} />

                  <DetailField
                    className="md:col-span-2"
                    label="Academic Session"
                    value={`${batch.startYear} - ${batch.endYear}`}
                  />

                  <DetailField
                    className="md:col-span-2"
                    label="Status"
                    value={batch.active ? "ACTIVE" : "INACTIVE"}
                  />
                </div>
              </EntitySection>
            </div>
          </>
        ) : null}
      </SheetContent>
    </Sheet>
  );
}
