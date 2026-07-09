import { useState } from "react";
import { toast } from "sonner";

import ConfirmDialog from "@/components/common/ConfirmDialog";
import { deleteSection } from "@/api/sectionApi";

export default function DeleteSectionDialog({
  open,
  onOpenChange,
  section,
  refresh,
}) {
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    if (!section) return;

    try {
      setLoading(true);

      await deleteSection(section.id);

      toast.success("Section deleted successfully");

      refresh?.();

      onOpenChange(false);
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Unable to delete section",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <ConfirmDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Delete Section"
      description={`Are you sure you want to delete "${section?.name}"? This action cannot be undone.`}
      confirmText={loading ? "Deleting..." : "Delete"}
      onConfirm={handleDelete}
      loading={loading}
    />
  );
}
