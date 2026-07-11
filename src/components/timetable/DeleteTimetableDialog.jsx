import { useState } from "react";
import { toast } from "sonner";

import { deleteTimetableEntry } from "@/api/timetableApi";

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

export default function DeleteTimetableDialog({
  open,
  onOpenChange,
  timetable,
  refresh,
}) {
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    try {
      setLoading(true);

      await deleteTimetableEntry(timetable.id);

      toast.success("Timetable deleted successfully");

      refresh?.();

      onOpenChange(false);
    } catch (error) {
      console.error(error);

      toast.error(
        error?.response?.data?.message ??
          "Failed to delete timetable"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <AlertDialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <AlertDialogContent>

        <AlertDialogHeader>

          <AlertDialogTitle>
            Delete Timetable
          </AlertDialogTitle>

          <AlertDialogDescription>
            Are you sure you want to delete this timetable entry?
            This action cannot be undone.
          </AlertDialogDescription>

        </AlertDialogHeader>

        <AlertDialogFooter>

          <AlertDialogCancel>
            Cancel
          </AlertDialogCancel>

          <AlertDialogAction
            disabled={loading}
            onClick={handleDelete}
          >
            {loading ? "Deleting..." : "Delete"}
          </AlertDialogAction>

        </AlertDialogFooter>

      </AlertDialogContent>
    </AlertDialog>
  );
}