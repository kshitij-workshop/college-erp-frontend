import { useState } from "react";
import { toast } from "sonner";

import ConfirmDialog from "@/components/common/ConfirmDialog";
import { deleteBatch } from "@/api/batchApi";

export default function DeleteBatchDialog({
  open,
  onOpenChange,
  batch,
  refresh,
}) {
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    if (!batch) return;

    try {
      setLoading(true);

      await deleteBatch(batch.id);

      toast.success("Batch deleted successfully");

      refresh?.();

      onOpenChange(false);
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Unable to delete batch",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <ConfirmDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Delete Batch"
      description={`Are you sure you want to delete "${batch?.name}"? This action cannot be undone.`}
      confirmText={loading ? "Deleting..." : "Delete"}
      onConfirm={handleDelete}
      loading={loading}
    />
  );
}
