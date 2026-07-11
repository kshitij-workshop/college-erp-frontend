import { useEffect, useState } from "react";
import { Building2 } from "lucide-react";

import { getRoom } from "@/api/roomApi";

import { Sheet, SheetContent } from "@/components/ui/sheet";

import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

import EntitySection from "@/components/common/EntitySection";
import DetailField from "@/components/common/DetailField";

const STATUS_VARIANTS = {
  true: "bg-green-100 text-green-700",
  false: "bg-red-100 text-red-700",
};

function formatRoomType(type) {
  return type
    ?.split("_")
    .map((word) => word.charAt(0) + word.slice(1).toLowerCase())
    .join(" ");
}

export default function RoomViewSheet({ open, onOpenChange, roomId }) {
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!open || !roomId) return;

    async function loadRoom() {
      try {
        setLoading(true);

        const response = await getRoom(roomId);

        setRoom(response.data.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadRoom();
  }, [open, roomId]);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-xl p-0 bg-slate-50">
        {loading ? (
          <div className="space-y-6 p-8">
            <Skeleton className="mx-auto h-24 w-24 rounded-full" />

            <Skeleton className="mx-auto h-8 w-48" />

            <Skeleton className="h-52 rounded-2xl" />
          </div>
        ) : room ? (
          <>
            {/* Hero */}

            <div className="bg-gradient-to-br from-indigo-600 to-blue-600 px-8 py-10 text-white">
              <div className="flex flex-col items-center">
                <div className="flex h-24 w-24 items-center justify-center rounded-full border-4 border-white bg-white/10">
                  <Building2 className="h-12 w-12" />
                </div>

                <h1 className="mt-5 text-3xl font-bold">{room.roomNumber}</h1>

                <Badge className={`mt-5 ${STATUS_VARIANTS[room.active]}`}>
                  {room.active ? "Active" : "Inactive"}
                </Badge>
              </div>
            </div>

            {/* Details */}

            <div className="space-y-6 p-8">
              <EntitySection icon={Building2} title="Room Information">
                <div className="grid gap-6 md:grid-cols-2">
                  <DetailField label="Room Number" value={room.roomNumber} />

                  <DetailField
                    label="Room Type"
                    value={formatRoomType(room.roomType)}
                  />

                  <DetailField
                    label="Capacity"
                    value={`${room.capacity} Students`}
                  />

                  <DetailField
                    label="Status"
                    value={
                      <Badge className={STATUS_VARIANTS[room.active]}>
                        {room.active ? "Active" : "Inactive"}
                      </Badge>
                    }
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
