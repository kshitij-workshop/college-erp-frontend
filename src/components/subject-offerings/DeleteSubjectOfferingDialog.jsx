import { useState } from "react";
import { toast } from "sonner";

import ConfirmDialog from "@/components/common/ConfirmDialog";
import { deleteSubjectOffering } from "@/api/subjectOfferingApi";

export default function DeleteSubjectOfferingDialog({
  open,
  onOpenChange,
  subjectOffering,
  refresh,
}) {
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    if (!subjectOffering) return;

    try {
      setLoading(true);

      await deleteSubjectOffering(subjectOffering.id);

      toast.success("Subject offering deleted successfully");

      onOpenChange(false);

      refresh();
    } catch (error) {
      toast.error(error?.response?.data?.message || "Unable to delete subject offering");
    } finally {
      setLoading(false);
    }
  }

  return (
    <ConfirmDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Delete Subject Offering"
      description={`Are you sure you want to delete "${subjectOffering?.subjectName}"? This action cannot be undone.`}
      confirmText={loading ? "Deleting..." : "Delete"}
      onConfirm={handleDelete}
    />
  );
}
