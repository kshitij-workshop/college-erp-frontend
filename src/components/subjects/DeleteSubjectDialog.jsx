import { useState } from "react";
import { toast } from "sonner";

import ConfirmDialog from "@/components/common/ConfirmDialog";
import { deleteSubject } from "@/api/subjectApi";

export default function DeleteSubjectDialog({
  open,
  onOpenChange,
  subject,
  refresh,
}) {
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    if (!subject) return;

    try {
      setLoading(true);

      await deleteSubject(subject.id);

      toast.success("Subject deleted successfully");

      onOpenChange(false);

      refresh();
    } catch (error) {
      toast.error(error?.response?.data?.message || "Unable to delete subject");
    } finally {
      setLoading(false);
    }
  }

  return (
    <ConfirmDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Delete Subject"
      description={`Are you sure you want to delete "${subject?.fullName}"? This action cannot be undone.`}
      confirmText={loading ? "Deleting..." : "Delete"}
      onConfirm={handleDelete}
    />
  );
}
