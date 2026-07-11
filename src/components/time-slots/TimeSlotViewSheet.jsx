import { useEffect, useState } from "react";
import { Clock3 } from "lucide-react";

import { getTimeSlot } from "@/api/timeSlotApi";

import { Sheet, SheetContent } from "@/components/ui/sheet";

import { Skeleton } from "@/components/ui/skeleton";

import EntitySection from "@/components/common/EntitySection";
import DetailField from "@/components/common/DetailField";

function formatTime(time) {
  if (!time) return "-";

  return new Date(`1970-01-01T${time}`).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function getDuration(startTime, endTime) {
  if (!startTime || !endTime) return "-";

  const start = new Date(`1970-01-01T${startTime}`);
  const end = new Date(`1970-01-01T${endTime}`);

  const minutes = (end - start) / 60000;

  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  if (hours && remainingMinutes) {
    return `${hours} hr ${remainingMinutes} min`;
  }

  if (hours) {
    return `${hours} Hour${hours > 1 ? "s" : ""}`;
  }

  return `${remainingMinutes} Minutes`;
}

export default function TimeSlotViewSheet({ open, onOpenChange, timeSlotId }) {
  const [timeSlot, setTimeSlot] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!open || !timeSlotId) return;

    async function loadTimeSlot() {
      try {
        setLoading(true);

        const response = await getTimeSlot(timeSlotId);

        setTimeSlot(response.data.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadTimeSlot();
  }, [open, timeSlotId]);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-xl p-0 bg-slate-50">
        {loading ? (
          <div className="space-y-6 p-8">
            <Skeleton className="mx-auto h-24 w-24 rounded-full" />
            <Skeleton className="mx-auto h-8 w-48" />
            <Skeleton className="h-56 rounded-2xl" />
          </div>
        ) : timeSlot ? (
          <>
            {/* Hero */}

            <div className="bg-gradient-to-br from-violet-600 to-indigo-600 px-8 py-10 text-white">
              <div className="flex flex-col items-center">
                <div className="flex h-24 w-24 items-center justify-center rounded-full border-4 border-white bg-white/10">
                  <Clock3 className="h-12 w-12" />
                </div>

                <h1 className="mt-5 text-3xl font-bold">{timeSlot.label}</h1>
              </div>
            </div>

            {/* Details */}

            <div className="space-y-6 p-8">
              <EntitySection icon={Clock3} title="Time Slot Information">
                <div className="grid gap-6 md:grid-cols-2">
                  <DetailField label="Label" value={timeSlot.label} />

                  <DetailField
                    label="Start Time"
                    value={formatTime(timeSlot.startTime)}
                  />

                  <DetailField
                    label="End Time"
                    value={formatTime(timeSlot.endTime)}
                  />

                  <DetailField
                    label="Duration"
                    value={getDuration(timeSlot.startTime, timeSlot.endTime)}
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
