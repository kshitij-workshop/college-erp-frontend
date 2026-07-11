import { useState } from "react";
import { toast } from "sonner";

import ConfirmDialog from "@/components/common/ConfirmDialog";
import { deleteRoom } from "@/api/roomApi";

export default function DeleteRoomDialog({
  open,
  onOpenChange,
  room,
  refresh,
}) {
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    if (!room) return;

    try {
      setLoading(true);

      await deleteRoom(room.id);

      toast.success("Room deleted successfully");

      onOpenChange(false);

      refresh();
    } catch (error) {
      toast.error(error?.response?.data?.message || "Unable to delete room");
    } finally {
      setLoading(false);
    }
  }

  return (
    <ConfirmDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Delete Room"
      description={`Are you sure you want to delete "${room?.roomNumber}"? This action cannot be undone.`}
      confirmText={loading ? "Deleting..." : "Delete"}
      onConfirm={handleDelete}
    />
  );
}
