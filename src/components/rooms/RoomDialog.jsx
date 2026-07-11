import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import RoomForm from "./RoomForm";
import { useRoomForm } from "@/hooks/useRoomForm";

export default function RoomDialog({
  open,
  onOpenChange,
  room,
  refresh,
}) {
  function handleSuccess() {
    onOpenChange(false);
    refresh?.();
  }

  const {
    form,
    loading,
    onSubmit,
  } = useRoomForm(room, handleSuccess);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>
            {room ? "Edit Room" : "Add Room"}
          </DialogTitle>
        </DialogHeader>

        <RoomForm
          form={form}
          loading={loading}
          onSubmit={onSubmit}
          onCancel={() => onOpenChange(false)}
          submitLabel={room ? "Update Room" : "Create Room"}
        />
      </DialogContent>
    </Dialog>
  );
}