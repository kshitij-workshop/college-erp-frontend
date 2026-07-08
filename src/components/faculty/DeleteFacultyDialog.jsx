import { useState } from "react";
import { toast } from "sonner";

import ConfirmDialog from "@/components/common/ConfirmDialog";
import { deleteFaculty } from "@/api/facultyApi";

export default function DeleteFacultyDialog({
  open,
  onOpenChange,
  faculty,
  refresh,
}) {
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    if (!faculty) return;

    try {
      setLoading(true);

      await deleteFaculty(faculty.id);

      toast.success("Faculty deleted successfully");

      refresh?.();

      onOpenChange(false);

    } catch (error) {

      toast.error(
        error?.response?.data?.message ||
        "Unable to delete faculty"
      );

    } finally {

      setLoading(false);

    }
  }

  return (
    <ConfirmDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Delete Faculty"
      description={`Are you sure you want to delete "${faculty?.fullName}"? This action cannot be undone.`}
      confirmText={loading ? "Deleting..." : "Delete"}
      onConfirm={handleDelete}
      loading={loading}
    />
  );
}