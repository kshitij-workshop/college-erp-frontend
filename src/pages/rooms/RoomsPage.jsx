import { useState } from "react";
import { Plus } from "lucide-react";

import { useRooms } from "@/hooks/useRooms";

import PageHeader from "@/components/common/PageHeader";
import EntityToolbar from "@/components/common/EntityToolbar";

import RoomTable from "@/components/rooms/RoomTable";
import RoomDialog from "@/components/rooms/RoomDialog";
import RoomViewSheet from "@/components/rooms/RoomViewSheet";
import DeleteRoomDialog from "@/components/rooms/DeleteRoomDialog";
import RoomPagination from "@/components/rooms/RoomPagination";
import RoomSkeleton from "@/components/rooms/RoomSkeleton";

import { ROOM_TYPE_OPTIONS } from "@/constants/options";

export default function RoomsPage() {
  const {
    rooms,
    loading,

    page,
    setPage,

    keyword,
    setKeyword,

    filters,
    handleFilterChange,

    pagination,

    refresh,
  } = useRooms();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);

  const [viewOpen, setViewOpen] = useState(false);
  const [viewRoomId, setViewRoomId] = useState(null);

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteRoom, setDeleteRoom] = useState(null);

  function handleAdd() {
    setSelectedRoom(null);
    setDialogOpen(true);
  }

  function handleEdit(room) {
    setSelectedRoom(room);
    setDialogOpen(true);
  }

  function handleView(room) {
    setViewRoomId(room.id);
    setViewOpen(true);
  }

  function handleDelete(room) {
    setDeleteRoom(room);
    setDeleteOpen(true);
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Rooms"
        description="Manage classrooms, laboratories and seminar halls."
        buttonText="Add Room"
        buttonIcon={Plus}
        onButtonClick={handleAdd}
      />

      <EntityToolbar
        search={keyword}
        onSearchChange={setKeyword}
        placeholder="Search rooms..."
        filters={filters}
        filterOptions={{
          roomType: ROOM_TYPE_OPTIONS.map((option) => ({
            id: option.value,
            name: option.label,
          })),

          active: [
            { id: "true", name: "Active" },
            { id: "false", name: "Inactive" },
          ],
        }}
        onFilterChange={handleFilterChange}
        onRefresh={refresh}
      />

      {loading ? (
        <RoomSkeleton />
      ) : (
        <RoomTable
          rooms={rooms}
          loading={loading}
          onView={handleView}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}

      <RoomPagination
        page={page}
        setPage={setPage}
        totalPages={pagination.totalPages}
        totalElements={pagination.totalElements}
      />

      <RoomDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        room={selectedRoom}
        refresh={refresh}
      />

      <RoomViewSheet
        open={viewOpen}
        onOpenChange={setViewOpen}
        roomId={viewRoomId}
      />

      <DeleteRoomDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        room={deleteRoom}
        refresh={refresh}
      />
    </div>
  );
}
