import { Eye, MoreHorizontal, Pencil, Trash2 } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const ROOM_TYPE_COLORS = {
  CLASSROOM: "bg-blue-100 text-blue-700",
  LAB: "bg-violet-100 text-violet-700",
  SEMINAR_HALL: "bg-amber-100 text-amber-700",
};

const STATUS_COLORS = {
  true: "bg-green-100 text-green-700",
  false: "bg-red-100 text-red-700",
};

export default function RoomTable({
  rooms,
  loading,
  onView,
  onEdit,
  onDelete,
}) {
  if (!loading && rooms.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white py-20">
        <h3 className="text-lg font-semibold text-slate-800">No Rooms Found</h3>

        <p className="mt-2 text-sm text-slate-500">
          Create your first room to get started.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
      <Table>
        <TableHeader className="sticky top-0 z-10 bg-slate-50">
          <TableRow className="h-16">
            <TableHead>Room</TableHead>

            <TableHead>Type</TableHead>

            <TableHead>Capacity</TableHead>

            <TableHead>Status</TableHead>

            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {rooms.map((room) => (
            <TableRow
              key={room.id}
              className="transition-colors hover:bg-slate-50"
            >
              {/* Room */}

              <TableCell>
                <div>
                  <p className="font-semibold text-slate-900">
                    {room.roomNumber}
                  </p>
                </div>
              </TableCell>

              {/* Room Type */}

              <TableCell>
                <Badge className={ROOM_TYPE_COLORS[room.roomType]}>
                  {room.roomType.replace("_", " ")}
                </Badge>
              </TableCell>

              {/* Capacity */}

              <TableCell>
                <span className="font-medium">{room.capacity} Students</span>
              </TableCell>

              {/* Status */}

              <TableCell>
                <Badge className={STATUS_COLORS[room.active]}>
                  {room.active ? "Active" : "Inactive"}
                </Badge>
              </TableCell>

              {/* Actions */}

              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-full"
                    >
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent align="end" className="w-44 rounded-xl">
                    <DropdownMenuItem onClick={() => onView(room)}>
                      <Eye className="mr-2 h-4 w-4" />
                      View
                    </DropdownMenuItem>

                    <DropdownMenuItem onClick={() => onEdit(room)}>
                      <Pencil className="mr-2 h-4 w-4" />
                      Edit
                    </DropdownMenuItem>

                    <DropdownMenuItem
                      className="text-red-600"
                      onClick={() => onDelete(room)}
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
