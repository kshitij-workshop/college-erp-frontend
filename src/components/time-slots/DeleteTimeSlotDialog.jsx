import { useState } from "react";
import { toast } from "sonner";

import { deleteTimeSlot } from "@/api/timeSlotApi";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export default function DeleteTimeSlotDialog({
  open,
  onOpenChange,
  timeSlot,
  refresh,
}) {
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    try {
      setLoading(true);

      await deleteTimeSlot(timeSlot.id);

      toast.success("Time slot deleted successfully");

      refresh?.();

      onOpenChange(false);
    } catch (error) {
      console.error(error);

      toast.error(
        error?.response?.data?.message ?? "Failed to delete time slot",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Time Slot</AlertDialogTitle>

          <AlertDialogDescription>
            Are you sure you want to delete this time slot? This action cannot
            be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>

          <AlertDialogAction onClick={handleDelete} disabled={loading}>
            {loading ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
